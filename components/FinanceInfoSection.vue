<template>
  <div
    v-if="contentFinanceInfo"
    class="text-lg mw-[400px] markdown-list"
    v-html="contentFinanceInfo"
  ></div>
</template>

<script setup>
  const props = defineProps({
    financeInfoList: {
      type: [Object, String],
    },
  });

  const contentFinanceInfo = ref(null);
  // Markdown
  const { $markdown } = useNuxtApp();
  // Watch for changes in `myProp`
  watch(
    () => props.financeInfoList,
    (newVal) => {
      if (newVal) {
        console.log("change");
        // Execute code if myProp changes and is truthy
        contentFinanceInfo.value = $markdown.render(props.financeInfoList);
        console.log(contentFinanceInfo.value);
      }
    }
  );
</script>
