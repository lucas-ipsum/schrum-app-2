<template>
  <!-- Layout Head -->
  <div class="flex gap-4 justify-center text-center mt-3 mb-4">
    <div class="my-auto">
      <h1 class="text-stone-300 my-auto text-5xl sm:text-4xl font-semibold">
        {{ festivalInformation?.name }}
      </h1>
      <h1
        v-if="festivalInformation"
        class="text-stone-300 my-auto text-2xl sm:text-xl font-semibold"
      >
        {{ format(festivalInformation?.startDate, "iii dd.MM.") }}
        -
        {{ format(festivalInformation?.endDate, "iii dd.MM.") }}
      </h1>
    </div>
  </div>
  <!-- Page content -->
  <div class="text-center mb-5">
    <h2 class="text-stone-300 text-3xl sm:text-5xl font-semibold">Umfrage</h2>
  </div>
  <div class="flex justify-center">Placeholder</div>
</template>

<script setup>
  import { format } from "date-fns";

  const store = useFestivalInformationStore();
  const { festivalInformation } = storeToRefs(store);
</script>
