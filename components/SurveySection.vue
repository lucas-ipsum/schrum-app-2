<template>
  <div class="flex flex-col gap-6 mx-3 sm:mx-[20%]">
    <!-- Logged in user -->
    <!-- Add companion -->
    <div class="flex justify-end w-full">
      <shared-submit-button text="Friends hinzufügen" @submit="addCompanion" />
    </div>

    <div class="flex flex-col gap-4 sm:outline-2 sm:p-5">
      <survey-person-form
        :person="surveyResponse"
        :shuttle-time-options="shuttleTimeOptions"
      />
    </div>

    <!-- Companions -->
    <div
      v-for="(companion, index) in surveyResponse.companions"
      :key="index"
      class="flex flex-col outline-2"
    >
      <!-- Accordion header -->
      <div class="flex justify-between items-center gap-2 p-3">
        <button
          type="button"
          class="flex items-center gap-2 font-3xl font-extrabold cursor-pointer text-left grow"
          @click="toggleCompanion(index)"
        >
          <span
            class="inline-block transition-transform text-base"
            :class="companionsOpen[index] ? 'rotate-90' : ''"
            >▶</span
          >
          <span>{{ companion.name?.trim() || `Friend ${index + 1}` }}</span>
        </button>
        <button
          type="button"
          class="outline-2 p-2 font-semibold cursor-pointer w-fit"
          @click="removeCompanion(index)"
        >
          Entfernen
        </button>
      </div>
      <!-- Accordion body -->
      <div
        v-show="companionsOpen[index]"
        class="flex flex-col gap-4 p-3 pt-0 sm:px-5 sm:pb-5"
      >
        <survey-person-form
          :person="companion"
          show-name
          :shuttle-time-options="shuttleTimeOptions"
        />
      </div>
    </div>

    <!-- Submit -->
    <div class="flex justify-center w-full">
      <shared-submit-button
        v-if="!surveyDataExists"
        text="Absenden"
        @submit="submitData"
        :disabled="requestInProgress"
      />
      <shared-submit-button
        v-if="surveyDataExists"
        text="Änderungen absenden"
        @submit="submitData"
        :disabled="requestInProgress"
      />
    </div>
    <!-- Error / success message-->
    <p v-if="displayMessage">{{ messageContent }}</p>
  </div>
</template>

<script setup>
  const { create, find, update } = useStrapi();
  const user = useStrapiUser();

  // ## refs and input data ##
  // dsiplay values
  const displayMessage = ref(false);
  const messageContent = ref(false);
  const requestInProgress = ref(false);

  const surveyDataExists = ref(false);
  const currentSurveyId = ref(null);
  const shuttleTimeOptions = ref([
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
  ]);

  // Default answers for a single person (shared by the user and companions).
  const createPersonResponse = () => ({
    attending: {
      friday: false,
      saturday: false,
      tent: false,
    },
    arrival: "",
    shuttle: {
      day: null,
      hour: null,
    },
    breakfast: {
      saturday: false,
      sunday: false,
    },
    artist: {
      isArtist: false,
      band_name: "",
    },
  });

  // A companion additionally carries a name (they have no user account).
  const createCompanionResponse = () => ({
    name: "",
    ...createPersonResponse(),
  });

  const surveyResponse = ref({
    // The logged in user is identified by their username.
    username: user?.value.username,
    ...createPersonResponse(),
    // Additional friends the user fills out the survey for.
    companions: [],
  });

  // Accordion open/closed state, kept in sync with the companions array.
  const companionsOpen = ref([]);

  // ## Events ##
  onMounted(() => {
    checkForExcistingData();
  });

  watch(
    surveyResponse.value,
    () => {
      checkData();
    },
    { deep: true },
  );

  watch(displayMessage, () => {
    if (displayMessage.value) {
      setTimeout(() => {
        displayMessage.value = false;
      }, 5000);
    }
  });

  // ## companions ##
  const addCompanion = () => {
    surveyResponse.value.companions.push(createCompanionResponse());
    // Open the newly added companion so it can be filled out right away.
    companionsOpen.value.push(true);
  };

  const removeCompanion = (index) => {
    surveyResponse.value.companions.splice(index, 1);
    companionsOpen.value.splice(index, 1);
  };

  const toggleCompanion = (index) => {
    companionsOpen.value[index] = !companionsOpen.value[index];
  };

  // check for available data
  const checkForExcistingData = async () => {
    try {
      const { data } = await find("survey-answears", {
        filters: { user_id: user.value.id },
      });
      if (data[0]) {
        currentSurveyId.value = data[0].documentId;
        surveyDataExists.value = true;
        surveyResponse.value = data[0].response;
        // Backwards compatibility for entries saved before companions existed.
        if (!Array.isArray(surveyResponse.value.companions)) {
          surveyResponse.value.companions = [];
        }
        // Start with all loaded companions collapsed.
        companionsOpen.value = surveyResponse.value.companions.map(() => false);
      }
    } catch (err) {
      console.error("An error occured while loading data: ", err);
    }
  };
  // data checks
  const checkData = () => {
    normalizePerson(surveyResponse.value);
    surveyResponse.value.companions.forEach(normalizePerson);
  };

  // Clear values that no longer apply for a single person.
  const normalizePerson = (person) => {
    // train and shuttle time check
    if (person.arrival !== "train") {
      person.shuttle.day = null;
      person.shuttle.hour = null;
    }
    // artists section
    if (!person.artist.isArtist) {
      person.artist.band_name = "";
    }
  };

  // submit data
  const submitData = async () => {
    if (requestInProgress.value) {
      return;
    }
    requestInProgress.value = true;
    checkData();
    try {
      // update survey data
      if (surveyDataExists.value && currentSurveyId.value) {
        await update("survey-answears", currentSurveyId.value, {
          response: surveyResponse.value,
          user_id: user.value.id,
        });
        // create survey data
      } else if (!surveyDataExists.value) {
        const { data } = await create("survey-answears", {
          response: surveyResponse.value,
          user_id: user.value.id,
        });
        currentSurveyId.value = data.documentId;
      }
      surveyDataExists.value = true;
      displayMessage.value = true;
      messageContent.value = "Umfrage erfolgreich abgesendet.";
    } catch (err) {
      displayMessage.value = true;
      messageContent.value =
        "Fehler beim absenden der Umfrage aufgetreten. Bitte erneut versuchen!";
      console.error(err);
    } finally {
      requestInProgress.value = false;
    }
  };
</script>
