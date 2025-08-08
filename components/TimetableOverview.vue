<template>
  <div class="flex flex-col gap-10 mt-5">
    <div>
      <h2 class="text-stone-300 text-center text-xl sm:text-3xl font-semibold px-2">
        Freitag
      </h2>
      <timetable-day :artists="artistsFriday" />
    </div>
    <div class="mt-[50px]">
      <h2 class="text-stone-300 text-center text-xl sm:text-3xl font-semibold px-2">
        Samstag
      </h2>
      <timetable-day :artists="artistsSaturday" />
    </div>

  </div>
</template>

<script setup>
  const props = defineProps({
    artistsFriday: {
      type: Array,
    },
    artistsSaturday: {
      type: Array,
    },
  });
</script>
