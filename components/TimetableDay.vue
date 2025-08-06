<template>
  <div class="flex w-full justify-center">
    <div class="alternating-lines-background w-[600px]">
      <div v-for="artist in artists" class="flex justify-center">
        <div class="bg-green-800 h-[89px] mt-[1px] w-[300px]">
          {{ artist.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    artists: {
      type: Array,
    },
  });

  // ## refs ##

  const formatFestivalTimes = () => {

  }
</script>

<style scoped>
  .alternating-lines-background {
    margin: 0;
    height: 200px;
    background-image: radial-gradient(circle, white 1px, transparent 1px),
      repeating-linear-gradient(
        to bottom,
        white 0px,
        white 1px,
        transparent 1px,
        transparent 90px
      );
    background-size: 10px 90px, /* Dots: one row every 40px */ 100% 180px; /* Solid lines every 80px */
    background-position: 0px 90px, /* Dots appear between solid lines */ 0 0;
    background-repeat: repeat;
  }
</style>
