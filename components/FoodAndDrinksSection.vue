<template>
  <!-- Drinks -->
  <div class="flex flex-col">
    <span class="font-semibold text-xl w-fit px-1 bg-yellow-800">
      Getränke
    </span>
    <div
      class="text-lg mw-[400px] markdown-list"
      v-html="contentDrinksList"
    ></div>
  </div>
  <!-- Food -->
  <div class="flex flex-col mt-4">
    <span class="font-semibold text-xl w-fit px-1 bg-yellow-800"> Essen </span>
    <div
      class="text-lg mw-[400px] markdown-list"
      v-html="contentFoodList"
    ></div>
  </div>
</template>

<script setup>
  // ## props ##
  const props = defineProps({
    foodAndDrinks: {
      type: Object,
      required: true,
    },
  });

  // ## refs ##
  const contentDrinksList = ref(null);
  const contentFoodList = ref(null);

  // Markdown
  const { $markdown } = useNuxtApp();

  if (props.foodAndDrinks) {
    contentDrinksList.value = $markdown.render(props.foodAndDrinks.drinksList);
    contentFoodList.value = $markdown.render(props.foodAndDrinks.foodList);
  }
</script>
