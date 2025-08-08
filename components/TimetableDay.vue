<template>
  <div class="flex justify-center w-full">
    <div
      class="alternating-lines-background flex flex-col justify-center w-full sm:w-[600px]"
      :style="{ height: `${dayInMinutes * 1.5}px` }"
    >
      <div
        v-for="artist in artistsFestivalFormat"
        class="flex justify-center"
        :style="{
          height: `${artist.duration * 1.5 - 1}px`,
          marginTop: `${artist.timeDiffToPrevEvent * 1.5 + 1}px`,
        }"
      >
        <div
          @click="handleDisplayArtistsDetails(artist)"
          class="bg-green-800 w-[90%] sm:w-[350px] p-2 flex cursor-pointer"
          :class="
            artist.duration < 45 ? 'flex-row gap-1 text-sm' : 'flex-col text-center text-xl'
          "
        >
          <p>
            {{ format(artist.performanceEvent, "HH:mm") }} -
            {{ format(artist.performanceEventEndTime, "HH:mm") }}
          </p>
          <p class="font-bold">{{ artist.name }}</p>
        </div>
      </div>
    </div>
  </div>
  <!-- Detail Popup -->
  <artist-detail-popup
    v-if="displayArtistDetails"
    :artist-document-id="currentDetailArtist"
    @display-popup-change="displayArtistDetails = !displayArtistDetails"
  />
</template>

<script setup>
  import { format } from "date-fns";

  const props = defineProps({
    artists: {
      type: Array,
    },
  });

  // ## refs ##
  const artistsFestivalFormat = ref([]);
  const dayInMinutes = ref(0);
  // display refs
  const displayArtistDetails = ref(false);
  const currentDetailArtist = ref(false);

  // ## helper methods ##
  const formatFestivalTimes = () => {
    for (let i = 0; i < props.artists.length; i++) {
      let festivalTimeFormat = {
        startHour: getExtendedHours(
          props.artists[i].performanceEvent.getHours()
        ),
        startMinute: props.artists[i].performanceEvent.getMinutes(),
        endMinute: props.artists[i].performanceEventEndTime.getMinutes(),
        endHour: getExtendedHours(
          props.artists[i].performanceEventEndTime.getHours()
        ),
      };
      artistsFestivalFormat.value.push({
        ...props.artists[i],
        festivalTimeFormat,
      });
    }
    // start sorting after formating
    sortStartTime();
  };
  // :class="`h-[${artist.duration * 1.5}px] mt-[${artist.timeDiffToPrevEvent * 1.5}px]`
  const sortStartTime = () => {
    artistsFestivalFormat.value.sort((a, b) => {
      if (a.festivalTimeFormat.startHour !== b.festivalTimeFormat.startHour) {
        return a.festivalTimeFormat.startHour - b.festivalTimeFormat.startHour;
      } else {
        return (
          a.festivalTimeFormat.startMinute - b.festivalTimeFormat.startMinute
        );
      }
    });
    getTimeDifference();
  };

  // add method to add time difference ti each artist object and calculate the complete time for the day

  const getTimeDifference = () => {
    for (let i = 0; i < artistsFestivalFormat.value.length; i++) {
      let event = artistsFestivalFormat.value[i];
      let timeDiffToPrevEvent;
      // condition first event of the day
      if (i === 0) {
        timeDiffToPrevEvent = calcDiffMinutes(
          event.festivalTimeFormat.startHour,
          event.festivalTimeFormat.startHour,
          0,
          event.festivalTimeFormat.startMinute
        );
      } else {
        timeDiffToPrevEvent = calcDiffMinutes(
          artistsFestivalFormat.value[i - 1].festivalTimeFormat.endHour,
          event.festivalTimeFormat.startHour,
          artistsFestivalFormat.value[i - 1].festivalTimeFormat.endMinute,
          event.festivalTimeFormat.startMinute
        );
      }
      console.log(timeDiffToPrevEvent);
      artistsFestivalFormat.value[i].timeDiffToPrevEvent = timeDiffToPrevEvent;
      // get duration in minutes
      artistsFestivalFormat.value[i].duration = calcDiffMinutes(
        event.festivalTimeFormat.startHour,
        event.festivalTimeFormat.endHour,
        event.festivalTimeFormat.startMinute,
        event.festivalTimeFormat.endMinute
      );
      dayInMinutes.value +=
        artistsFestivalFormat.value[i].duration +
        artistsFestivalFormat.value[i].timeDiffToPrevEvent;
    }
  };

  const calcDiffMinutes = (e1EndH, e2StartH, e1EndM, e2StartM) => {
    return (e2StartH - e1EndH) * 60 + (e2StartM - e1EndM);
  };

  // weird time formating for the timetable we want that time continues for the same day after 24:00
  const getExtendedHours = (hour) => {
    if (hour <= 6) {
      return hour + 24;
    } else {
      return hour;
    }
  };
  // ## events ##
  onMounted(() => {
    formatFestivalTimes();
  });

  const handleDisplayArtistsDetails = (artist) => {
    currentDetailArtist.value = artist.documentId;
    displayArtistDetails.value = true;
  };
</script>

<style scoped>
  .alternating-lines-background {
    margin: 0;
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
