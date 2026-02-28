<template>
  <div v-if="appSettings?.prevModeNextYear" class="h-full">
    <div class="flex flex-col gap-3 justify-center pt-[15%] text-center items-center">
      <h1 class="text-stone-300 text-5xl sm:text-8xl font-extrabold">
        {{ festivalInformation?.name }}
      </h1>
      <h2
        v-if="festivalInformation"
        class="text-stone-300 my-auto text-3xl sm:text-4xl font-semibold"
      >
        {{ format(festivalInformation?.startDate, "iii dd.MM.") }}
        -
        {{ format(festivalInformation?.endDate, "iii dd.MM.") }}
      </h2>

      <img
        class="rounded w-[95%] md:w-[60%] my-3"
        :src="
          useIsDev().isDev
            ? 'http://localhost:1337/uploads/schrum_logo_26_ex_2_58fb884a21.png'
            : 'https://strapi-cms.schrum.xyz/uploads/schrum_logo_25_bc52d7a486.jpg'
        "
        alt=""
      />
    </div>
  </div>

  <div v-else-if="appSettings" class="p-4">
    <div class="flex flex-col gap-4">
      <!-- App Title -->
      <div class="flex flex-col justify-center text-center items-center">
        <h1 class="text-stone-300 text-5xl sm:text-8xl font-extrabold">
          {{ festivalInformation?.name }}
        </h1>
        <img
          class="rounded w-[80%] md:w-[350px] my-3"
          :src="
            useIsDev().isDev
              ? 'http://localhost:1337/uploads/schrum_logo_26_ex_2_58fb884a21.png'
              : 'https://strapi-cms.schrum.xyz/uploads/schrum_logo_25_bc52d7a486.jpg'
          "
          alt=""
        />
        <h2
          v-if="festivalInformation"
          class="text-stone-300 my-auto text-3xl sm:text-4xl font-semibold"
        >
          {{ format(festivalInformation?.startDate, "iii dd.MM.") }}
          -
          {{ format(festivalInformation?.endDate, "iii dd.MM.") }}
        </h2>
      </div>
      <!-- Festival Logo -->
      <div class="flex justify-center">
        <!--img class="rounded w-[80%] md:w-[350px]" src="/icons/schrum_logo_24.png" alt="">-->
      </div>
      <!-- Artists Section -->
      <div>
        <ArtistsSection />
      </div>
      <!-- Annoucement Section -->
      <div>
        <AnnoucementsOverview />
      </div>
      <!-- Spotify embedded playlist -->
      <div>
        <SpotifyEmbeddedPlaylist />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { format } from "date-fns";

  // ## Refs ##
  const navbarOpen = ref(false);

  const store = useFestivalInformationStore();
  const settingsStore = useAppSettingStore();
  const { appSettings } = storeToRefs(settingsStore);
  const { festivalInformation } = storeToRefs(store);

  const { find } = useStrapi();

  // ## Refs ##

  // ### Events ###
  onMounted(() => {
    getAppSettings();
    getData();
  });

  // ### API Requests ###
  const getData = async () => {
    try {
      const { data } = await find("event-detail");
      useFestivalInformationStore().setFestivalInformation(data);
    } catch {
      console.error("An error occured while loading data");
    }
  };

  const getAppSettings = async () => {
    try {
      const { data } = await find("app-setting");
      useAppSettingStore().setAppSettings(data);
      // useFestivalInformationStore().setFestivalInformation(data);
    } catch {
      console.error("An error occured while loading data");
    }
  };
</script>
