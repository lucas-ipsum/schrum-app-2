<template>
  <!-- Layout Head -->
  <div class="flex gap-4 justify-center text-center mt-3 mb-4">
    <div class="my-auto">
      <h1
        v-if="festivalInformation"
        class="text-stone-300 my-auto text-5xl sm:text-4xl font-semibold"
      >
        {{ festivalInformation?.name }}
      </h1>
      <h1
        v-if="festivalInformation"
        class="text-stone-300 my-auto text-2xl sm:text-xl font-semibold"
      >
        {{ format(festivalInformation?.startDate, "iii dd.MM.") }}
        -
        {{ format(festivalInformation?.endDate, "iii dd.MM.") }}
      </h1>
    </div>
  </div>
  <!-- Page content -->
  <div class="text-center mb-5">
    <h2 class="text-stone-300 text-3xl sm:text-5xl font-semibold">Anreise</h2>
  </div>
  <div class="px-4 sm:px-16">
    <GeneralInfo :travelInformation="travelInformation" />
    <!-- By car section -->
    <h2
      class="text-stone-300 text-xl text-center sm:text-2xl font-semibold mb-4 mt-6"
    >
      Mit dem Auto
    </h2>
    <CarSection :travelInformation="travelInformation" />

    <!-- train section -->
    <h2
      class="text-stone-300 text-xl text-center sm:text-2xl font-semibold mb-4 mt-6"
    >
      Mit dem Zug
    </h2>
    <TrainSection :travelInformation="travelInformation" />
  </div>
  <PopupImage
    @displayPopupChange="(res) => (displayMap = res)"
    :displayPopup="displayMap"
    imgSrc="/images/map_travel_info.jpg"
  />
</template>

<!-- Specify the layout -->
<script setup>
  import CarSection from "~/components/travelInfo/CarSection.vue";
  import GeneralInfo from "~/components/travelInfo/GeneralInfo.vue";
  import TrainSection from "~/components/travelInfo/TrainSection.vue";
  import { format } from "date-fns";

  const store = useFestivalInformationStore();
  const { festivalInformation } = storeToRefs(store);

  // Strapi
  const { find } = useStrapi();
  const content = ref(null);

  // ## Refs ##
  const travelInformation = ref(null);

  // ## Api call ##
  const res = await find("travel-information");
  travelInformation.value = res.data;
</script>
