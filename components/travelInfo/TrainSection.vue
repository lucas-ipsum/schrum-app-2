<template>
  <div class="flex flex-col">
    <span class="font-semibold text-xl w-fit px-1 bg-yellow-800">
      Bahnhof & Shuttle
    </span>
    <div
      class="text-lg mw-[400px] markdown-list"
      v-html="contentTrainShuttleInfo"
    ></div>

    <span class="font-semibold text-xl w-fit px-1 bg-yellow-800">
      Shuttle Fahrtzeiten
    </span>
    <div
      class="text-lg mw-[400px] markdown-list"
      v-html="contentShuttleTimes"
    ></div>
  </div>
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
  const contentTrainShuttleInfo = ref(null);
  const contentShuttleTimes = ref(null);

  // Markdown
  const { $markdown } = useNuxtApp();

  if (props.travelInformation) {
    contentTrainShuttleInfo.value = $markdown.render(
      props.travelInformation.trainShuttleInfo
    );

    contentShuttleTimes.value = $markdown.render(
      props.travelInformation.shuttleTimes
    );
  }
</script>
