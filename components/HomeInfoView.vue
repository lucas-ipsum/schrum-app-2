<template>
  <div class="p-4">
    <div class="flex flex-col gap-4">
      <!-- App Title -->
      <div class="flex flex-col justify-center text-center">
        <h1 class="text-stone-300 text-5xl sm:text-8xl font-extrabold">
          Title
        </h1>
        <h2 class="text-stone-300 my-auto text-3xl sm:text-4xl font-semibold">
          Date
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

  const navbarOpen = ref(false);

</script>
