<template>
  <div class="flex flex-col">
    <div
      class="text-lg mw-[400px] markdown-list"
      v-html="contentPackingList"
    ></div>
  </div>
</template>

<script setup>
  // ## Props ##
  const props = defineProps({
    packingList: {
      type: Object,
      required: true,
    },
  });

  // ## refs ##
  const contentPackingList = ref(null);
  // Markdown
  const { $markdown } = useNuxtApp();

  if (props.packingList) {
    contentPackingList.value = $markdown.render(props.packingList.listContent);
  }
</script>
