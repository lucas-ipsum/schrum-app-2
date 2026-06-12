<template>
  <div class="flex flex-col gap-5 my-5">
    <div class="flex justify-center mx-5">
      <h2
        @click="lineUpActive = true"
        class="text-stone-300 text-3xl sm:text-5xl font-semibold cursor-pointer"
        :class="lineUpActive ? 'underline underline-offset-8' : ''"
      >
        Line Up
      </h2>
      <h2 class="text-stone-300 text-3xl sm:text-5xl font-semibold px-2">/</h2>
      <h2
        @click="lineUpActive = false"
        class="text-stone-300 text-3xl sm:text-5xl font-semibold cursor-pointer"
        :class="[!lineUpActive ? 'underline underline-offset-8' : '', !artistsDetailMode ? 'pointer-none' : '']"
      >
        Timetable
      </h2>
    </div>
    <LineUpComponent
      v-if="lineUpActive && artistsDetailMode"
      :artists-friday="artistsFriday"
      :artists-saturday="artistsSaturday"
    />

    <LineUpPreview
      v-if="lineUpActive && !artistsDetailMode"
      :artists="artists"
    />

    <div v-if="!lineUpActive && artistsDetailMode">
      <TimetableOverview
        :artists-friday="artistsFriday"
        :artists-saturday="artistsSaturday"
      />

    </div>
    <div v-if="!lineUpActive && !artistsDetailMode" class="my-1">
      <p class="text-center font-semibold text-2xl">Kommt später...</p>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
import LineUpPreview from "./LineUpPreview.vue";

  // Strapi
  const { find } = useStrapi();
  // Refs
  const lineUpActive = ref(true);
  const artistsDetailMode = ref(useAppSettingStore().appSettings?.artistsDetailMode);
  const artists = ref([]);
  const artistsFriday = ref([]);
  const artistsSaturday = ref([]);

  // ## Events ##
  onMounted(() => {
    getData();
  });

  // ### API Requests ###
  const getData = async () => {
    try {
      const res = await find("artists");

      artists.value = res.data.map((artist) => ({
        ...artist,
        performanceEvent: new Date(artist.performanceEvent),
        performanceEventEndTime: new Date(artist.performanceEventEndTime)
      }));

      artists.value.forEach((obj) => {
        if (obj.performanceEvent.getDay() == 5) {
          artistsFriday.value.push(obj);
        } else {
          artistsSaturday.value.push(obj);
        }
      });
    } catch (err) {
      console.error("An error occured while loading data", err);
    }
  };
</script>
