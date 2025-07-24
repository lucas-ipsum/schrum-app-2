<template>
  <div class="flex flex-col gap-4 mx-3 sm:mx-[20%] sm:outline-2 sm:p-5">
    <!-- Question 1 -->
    <div class="">
      <p class="font-3xl font-extrabold">Bist du dabei?</p>
      <div class="flex flex-col gap-2 font-bold ml-2">
        <div>
          <input
            type="checkbox"
            id="friday"
            name="friday"
            value="friday"
            v-model="surveyResponse.attending.friday"
          />
          <label class="ml-2" for="friday">Freitag</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="saturday"
            name="saturday"
            value="saturday"
            v-model="surveyResponse.attending.saturday"
          />
          <label class="ml-2" for="saturday">Samstag</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="tent"
            name="tent"
            value="tent"
            v-model="surveyResponse.attending.tent"
          />
          <label class="ml-2" for="tent">Mit Zelt</label>
        </div>
      </div>
    </div>

    <!-- Question Arrival -->
    <div class="">
      <p class="font-3xl font-extrabold">Anreise</p>
      <div class="flex flex-col gap-2 font-bold ml-2">
        <fieldset>
          <div>
            <input
              type="radio"
              id="car_driver"
              name="arrival"
              value="car_driver"
              v-model="surveyResponse.arrival"
            />
            <label class="ml-2" for="car_driver">Auto Fahrer*in</label>
          </div>
          <div>
            <input
              type="radio"
              id="car_passenger"
              name="arrival"
              value="car_passenger"
              v-model="surveyResponse.arrival"
            />
            <label class="ml-2" for="car_passenger">Auto Beifahrer*in</label>
          </div>
          <div>
            <input
              type="radio"
              id="train"
              name="arrival"
              value="train"
              v-model="surveyResponse.arrival"
            />
            <label class="ml-2" for="train">Zug</label>
          </div>
          <div>
            <input
              type="radio"
              id="other"
              name="arrival"
              value="other"
              v-model="surveyResponse.arrival"
            />
            <label class="ml-2" for="other">Andere</label>
          </div>
        </fieldset>
      </div>
    </div>

    <!-- Question Shuttle time -->
    <div v-if="surveyResponse.arrival == 'train'" class="">
      <p class="font-3xl font-extrabold">Abholzeit am Bahnhof:</p>
      <div class="flex flex-col gap-2 font-bold ml-2">
        <fieldset>
          <div class="flex gap-2">
            <select
              name="shuttle_day"
              id="shuttle_day"
              v-model="surveyResponse.shuttle.day"
            >
              <option value="friday">Freitag</option>
              <option value="saturday">Samstag</option>
            </select>
            <select
              name="shuttle_time"
              id="shuttle_time"
              v-model="surveyResponse.shuttle.hour"
            >
              <option v-for="hour in shuttleTimeOptions" :value="hour">
                {{ hour }} Uhr
              </option>
            </select>
          </div>
        </fieldset>
      </div>
    </div>

    <!-- Question 3 -->
    <div class="">
      <p class="font-3xl font-extrabold">Bock auf Frühstück?</p>
      <div class="flex flex-col gap-2 font-bold ml-2">
        <div>
          <input
            type="checkbox"
            id="saturday"
            name="saturday"
            value="saturday"
            v-model="surveyResponse.breakfast.saturday"
          />
          <label class="ml-2" for="saturday">Samstag</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="sunday"
            name="sunday"
            value="sunday"
            v-model="surveyResponse.breakfast.sunday"
          />
          <label class="ml-2" for="sunday">Sonntag</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="no_breakfast"
            name="no_breakfast"
            value="no_breakfast"
            v-model="surveyResponse.breakfast.no_breakfast"
          />
          <label class="ml-2" for="no_breakfast">Nope</label>
        </div>
      </div>
    </div>

    <!-- Question 4 -->
    <div class="">
      <p class="font-3xl font-extrabold">Als Künstler*in dabei?</p>
      <div class="flex flex-col gap-2 font-bold ml-2">
        <div>
          <input
            type="checkbox"
            id="yes"
            name="yes"
            value="yes"
            v-model="surveyResponse.artist.isArtist"
          />
          <label class="ml-2" for="yes">Ja</label>
        </div>
        <div v-if="surveyResponse.artist.isArtist" class="flex flex-col">
          <label class="ml-2" for="band_name">Band / Name:</label>
          <input
            class="bg-white rounded p-1 w-[250px] text-black"
            type="text"
            id="band_name"
            name="band_name"
            v-model="surveyResponse.artist.band_name"
          />
        </div>
      </div>
    </div>
    <div class="flex justify-center w-full">
      <shared-submit-button
        v-if="!surveyDataExists"
        text="Absenden"
        @submit="submitData"
      />
      <shared-submit-button
        v-if="surveyDataExists"
        text="Änderungen absenden"
        @submit="submitData"
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

  const surveyDataExists = ref(false);
  const currentSurveyId = ref(null);
  const shuttleTimeOptions = ref([
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ]);
  const surveyResponse = ref({
    username: user?.value.username,
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
      friday: false,
      saturday: false,
      no_breakfast: false,
    },
    artist: {
      isArtist: false,
      band_name: "",
    },
  });

  // ## Events ##
  onMounted(() => {
    checkForExcistingData();
  });

  watch(
    surveyResponse.value,
    () => {
      checkData();
    },
    { deep: true }
  );

  // check for available data
  const checkForExcistingData = async () => {
    const { data } = await find("survey-answears", {
      filters: { user_id: user.id },
    });
    if (data[0]) {
      currentSurveyId.value = data[0].documentId;
      surveyDataExists.value = true;
      surveyResponse.value = data[0].response;
    }
  };
  // data checks
  const checkData = () => {
    // train and shuttle time check
    if (surveyResponse.value.arrival.train) {
      surveyResponse.value.shuttle.day = null;
      surveyResponse.value.shuttle.hour = null;
    }
    //
    if (surveyResponse.value.breakfast.no_breakfast) {
      surveyResponse.value.breakfast.saturday = false;
      surveyResponse.value.breakfast.sunday = false;
    }
    // artists section
    if (!surveyResponse.value.artist.isArtist) {
      surveyResponse.value.artist.band_name = "";
    }
  };

  // submit data
  const submitData = async () => {
    checkData();
    try {
      // update survey data
      if (surveyDataExists.value) {
        await update("survey-answears", currentSurveyId.value, {
          response: surveyResponse.value,
          user_id: user.id,
        });
        // create survey data
      } else {
        await create("survey-answears", {
          response: surveyResponse.value,
          user_id: user.id,
        });
      }
      surveyDataExists.value = true;
      displayMessage.value = true;
      messageContent.value = "Umfrage erfolgreich abgesendet.";
    } catch (err) {
      displayMessage.value = true;
      messageContent.value =
        "Fehler beim absenden der Umfrage aufgetreten. Bitte erneut versuchen!";
      console.error(err);
    }
  };
</script>
