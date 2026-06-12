<template>
  <div class="wrap">
    <div class="flex flex-wrap gap-3 sm:gap-0 text-xl font-semibold">
      <div class="flex w-fit" v-for="(artist, index) in artists">
        <div
          @click="handleDisplayArtistsDetails(artist)"
          class="flex flex-col w-fit my-1 cursor-pointer"
        >
          <div class="w-fit bg-primary px-1">
            {{ artist.name }}
          </div>
          <div class="font-medium">({{ artist.genre }})</div>
        </div>
        <!-- Divider -->
        <div v-if="index < artists.length - 1" class="my-auto mx-2 hidden sm:block">
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
    artists: {
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
