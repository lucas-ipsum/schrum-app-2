<template>
  <div class="flex flex-col outline-2 py-1 px-2 outline-green-800">
    <span class="font-semibold w-fit px-1 bg-yellow-800">
      {{ announcementDetails.category }}
    </span>
    <span>
      {{ format(new Date(announcementDetails.date), "iii dd.MM.") }}
    </span>
    <span>
      {{ announcementDetails.content }}
    </span>
  </div>
</template>

<script setup>
  import { format } from "date-fns";

  const props = defineProps({
    announcementDetails: {
      type: Object,
      required: true,
    },
  });
</script>
