<template>
  <div class="flex flex-col gap-5">
    <div class="flex gap-6 justify-center">
      <button
        @click="displayMap = true"
        class="outline-2 p-4 flex font-semibold w-fit"
      >
        <span> Karte anzeigen </span>
      </button>
      <a
        :href="props.travelInformation.mapsUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="outline-2 p-4 flex font-semibold w-fit"
      >
        Google Maps
      </a>
    </div>

    <div class="flex flex-col">
      <span class="font-semibold text-xl w-fit px-1 bg-yellow-800">
        Info!
      </span>
      <div
        class="text-lg mw-[400px] markdown-list"
        v-html="contentCarInfo"
      ></div>
    </div>

    <div class="flex flex-col">
      <span class="font-semibold text-xl w-fit px-1 bg-yellow-800">
        Anfahrt
      </span>
      <div
        class="text-lg mw-[400px] markdown-list"
        v-html="contentCarDirections"
      ></div>
    </div>
  </div>
  <PopupImage
    @displayPopupChange="(res) => (displayMap = res)"
    :displayPopup="displayMap"
    imgSrc="http://localhost:1337/uploads/map_travel_info_77155e18d6.jpg"
  />
</template>

<script setup>
  // ## Props ##
  const props = defineProps({
    travelInformation: {
      type: Object,
      required: true,
    },
  });

  // ## Refs ##
  const displayMap = ref(false);
  const contentCarDirections = ref(null);
  const contentCarInfo = ref(null);

  // Markdown
  const { $markdown } = useNuxtApp();

  if (props.travelInformation) {
    contentCarDirections.value = $markdown.render(
      props.travelInformation.carDirections
    );

    contentCarInfo.value = $markdown.render(
      props.travelInformation.carInfoList
    );
  }
</script>
