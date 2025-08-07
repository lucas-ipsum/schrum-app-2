<template>
  <div class="flex w-full justify-center">
    <div class="alternating-lines-background w-[600px]">
      <div v-for="artist in artistsFestivalFormat" class="flex justify-center">
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
  const artistsFestivalFormat = ref([]);

  // ## helper methods ##
  const formatFestivalTimes = () => {
    for (let i = 0; i < props.artists.length; i++) {
        console.log(typeof props.artists[i].performanceEventEndTime)
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
      artistsFestivalFormat.value.push({...props.artists[i], festivalTimeFormat})
      console.log(festivalTimeFormat)
    }
    // start sorting after formating
    sortStartTime();
  };

  const sortStartTime = () => {
    artistsFestivalFormat.value.sort((a, b) => {
        if (a.festivalTimeFormat.startHour !== b.festivalTimeFormat.startHour) {
            return a.festivalTimeFormat.startHour - b.festivalTimeFormat.startHour
        } else {
            return a.festivalTimeFormat.startMinute - b.festivalTimeFormat.startMinute
        }
    })
  }

  // add method to add time difference ti each artist object and calculate the complete time for the day

  const calcDiffHours = (e1EndH, e2StartH) => {
    return (e2StartH - e1EndH) * 60;
  };

  const calcDiffMinutes = (e1EndH, e2StartH, e1EndM, e2StartM) => {
    return (e2StartH - e1EndH) * 60 + (e2StartM - e1EndM);
  };

  // weird time formating for the timetable we want that time continues for the same day after 24:00
  const getExtendedHours = (hour) => {
    if (hour <= 6) {
      return hour + 24;
    } else {
        return hour
    }
  };
  // ## events ##
  /*
  watch(
    props.artists,
    () => {
      formatFestivalTimes();
    },
    { immediate: true }
  );
  */
 onMounted(() => {
    formatFestivalTimes();
 })
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
