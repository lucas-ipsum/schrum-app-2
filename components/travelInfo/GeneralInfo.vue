<template>
  <div class="w-full text-center">
    <span class="text-center text-2xl w-full">Koordinaten</span>
  </div>
  <div class="flex flex-col">
    <span class="font-semibold text-xl w-fit px-1 bg-yellow-800">
      Anreise am Freitag
    </span>
    <div
      v-html="contentTravelInfo"
      class="markdown-list text-lg mw-[400px]"
    ></div>
  </div>
</template>

<script setup>
  // Props
  const props = defineProps({
    travelInformation: {
      type: Object,
      required: true,
    },
  });

  // ## Refs ##
  const contentTravelInfo = ref(null);

  // Markdown
  const { $markdown } = useNuxtApp();

  contentTravelInfo.value = $markdown.render(
    props.travelInformation.descriptionArrival
  );
</script>
