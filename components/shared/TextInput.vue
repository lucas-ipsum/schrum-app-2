<template>
  <div class="flex flex-col">
    <label :for="name" class="text-xl">{{ label }}</label>
    <input
      @input="$emit('update', value)"
      v-model="value"
      :id="name"
      :type="type"
      class="w-[300px] bg-white p-1 rounded text-black"
    />
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    type: {
      type: String,
      required: false,
      default: "text",
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  });

  const emits = defineEmits(["update"]);

  const value = ref("");
  const updateValue = () => {
    console.log(value.value);
  };
</script>
