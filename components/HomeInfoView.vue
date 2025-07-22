<template>
  <div class="p-4">
    <div class="flex flex-col gap-4">
      <!-- App Title -->
      <div class="flex flex-col justify-center text-center items-center">
        <h1 class="text-stone-300 text-5xl sm:text-8xl font-extrabold">
          {{ festivalInformation?.name }}
        </h1>
        <img class="rounded w-[80%] md:w-[350px] my-3" src="http://localhost:1337/uploads/schrum_logo_25_fbda9a094a.jpg" alt="" />
        {{ festivalInformation.image }}
        <h2
          v-if="festivalInformation"
          class="text-stone-300 my-auto text-3xl sm:text-4xl font-semibold"
        >
          {{ format(festivalInformation?.startDate, "iii dd.MM.") }}
          -
          {{ format(festivalInformation?.endDate, "iii dd.MM.") }}
        </h2>
      </div>
      <!-- Festival Logo -->
      <div class="flex justify-center">
        <!--img class="rounded w-[80%] md:w-[350px]" src="/icons/schrum_logo_24.png" alt="">-->
      </div>
      <!-- Artists Section -->
      <div>
        <ArtistsSection />
      </div>
      <!-- Annoucement Section -->
      <div>
        <AnnoucementsOverview />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { format } from "date-fns";

  // ## Refs ##
  const navbarOpen = ref(false);

  const store = useFestivalInformationStore();
  const { festivalInformation } = storeToRefs(store);
</script>
