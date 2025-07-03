<template>
  <!-- Layout Head -->
  <div class="flex gap-4 justify-center text-center mb-4">
    <div class="my-auto">
      <h1 class="text-stone-300 my-auto text-5xl sm:text-4xl font-semibold">
        Title
      </h1>
      <h1 class="text-stone-300 my-auto text-2xl sm:text-xl font-semibold">
        Date
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
    <CarSection />

    <!-- train section -->
    <h2
      class="text-stone-300 text-xl text-center sm:text-2xl font-semibold mb-4 mt-6"
    >
      Mit dem Zug
    </h2>
    <TrainSection />
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

  // Strapi
  const { find } = useStrapi();
  const content = ref(null);

  // ## Refs ##
  const travelInformation = ref(null);

  // ## Api call ##
  const res = await find("travel-information");
  travelInformation.value = res.data;
</script>
