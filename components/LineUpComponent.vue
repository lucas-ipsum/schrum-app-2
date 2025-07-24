<template>
  <!-- Friday -->
  <h3 class="text-stone-300 text-xl sm:text-2xl font-bold">Freitag</h3>
  <div class="wrap">
    <div class="flex flex-wrap gap-3 sm:gap-0 text-xl font-semibold">
      <div class="flex w-fit" v-for="(artist, index) in artistsFriday">
        <div
          @click="handleDisplayArtistsDetails(artist)"
          class="flex flex-col w-fit my-1 cursor-pointer"
        >
          <div class="w-fit bg-green-800 px-1">
            {{ artist.name }}
          </div>
          <div class="font-medium">({{ artist.genre }})</div>
        </div>
        <!-- Divider -->
        <div v-if="index < artistsFriday.length - 1" class="my-auto mx-2 hidden sm:block">
          *
        </div>
      </div>
    </div>
  </div>

  <!-- Saturday -->
  <h3 class="text-stone-300 text-xl sm:text-2xl font-bold">Samstag</h3>
  <div class="wrap">
    <div class="flex flex-wrap gap-3 sm:gap-0 text-xl text-nowrap font-semibold">
      <div class="flex w-fit" v-for="(artist, index) in artistsSaturday">
        <div
          @click="handleDisplayArtistsDetails(artist)"
          class="flex flex-col w-fit my-1 cursor-pointer"
        >
          <div class="w-fit bg-green-800 px-1">
            {{ artist.name }}
          </div>
          <div class="font-medium">({{ artist.genre }})</div>
        </div>
        <!-- Divider -->
        <div v-if="index < artistsSaturday.length - 1" class="my-auto mx-2 hidden sm:block">
          *
        </div>
      </div>
    </div>
  </div>

  <!-- Detail Popup -->
  <artist-detail-popup v-if="displayArtistDetails" :artist-document-id="currentDetailArtist" @display-popup-change="displayArtistDetails = !displayArtistDetails" />
</template>

<script setup>
  // TODO Friday and Saturday should be not duplicated code

  const props = defineProps({
    artistsFriday: {
      type: Array,
    },
    artistsSaturday: {
      type: Array,
    },
  });

  const displayArtistDetails = ref(false);
  const currentDetailArtist = ref(false);

  // ## events
  const handleDisplayArtistsDetails = (artist) => {
    currentDetailArtist.value = artist.documentId;
    displayArtistDetails.value = true;
  };
</script>
