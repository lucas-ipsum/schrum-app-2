<template>
  <!-- Friday -->
  <h3 class="text-stone-300 text-xl sm:text-2xl font-bold">Freitag</h3>
  <div class="wrap">
    <div class="flex flex-wrap text-xl font-semibold">
      <div class="flex w-fit" v-for="(artist, index) in artistsFriday">
        <div class="flex flex-col w-fit my-1">
          <div class="w-fit bg-green-800 px-1">
            {{ artist.name }}
          </div>
          <div class="font-medium">({{ artist.genre }})</div>
        </div>
        <!-- Divider -->
        <div v-if="index < artistsFriday.length - 1" class="my-auto mx-2">
          *
        </div>
      </div>
    </div>
  </div>

  <!-- Saturday -->
  <h3 class="text-stone-300 text-xl sm:text-xl font-bold">Samstag</h3>
  <div class="wrap">
    <div class="flex flex-wrap text-xl text-nowrap font-semibold">
      <div class="flex w-fit" v-for="(artist, index) in artistsSaturday">
        <div class="flex flex-col w-fit my-1">
          <div class="w-fit bg-green-800 px-1">
            {{ artist.name }}
          </div>
          <div class="font-medium">({{ artist.genre }})</div>
        </div>
        <!-- Divider -->
        <div v-if="index < artistsSaturday.length - 1" class="my-auto mx-2">
          *
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // TODO Friday and Saturday should be not duplicated code

  const artistsFriday = ref([
    {
      name: "Test",
      genre: "Test",
    },
  ]);

  const artistsSaturday = ref([
    {
      name: "Test",
      genre: "Test",
    },
  ]);
</script>
