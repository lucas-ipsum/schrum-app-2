<template>
  <div class="flex flex-col outline-2 py-1 px-2 outline-green-800">
    <span class="font-semibold w-fit px-1 bg-yellow-800">
      {{ announcementDetails.category }}
    </span>
    <span>
      {{ announcementDetails.date }}
    </span>
    <span>
      {{ announcementDetails.content }}
    </span>
  </div>
</template>

<script setup>
  const props = defineProps({
    announcementDetails: {
      type: Object,
      required: true,
    },
  });
</script>
