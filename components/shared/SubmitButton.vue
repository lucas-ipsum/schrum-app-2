<template>
  <div>
    <button @click="$emit('submit')" :disabled="disabled" class="outline-2 p-2 flex font-semibold w-fit" :class="disabled ? 'outline-gray-600 text-gray-600 cursor-not-allowed' : 'cursor-pointer'">
      <span> {{ text }} </span>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
    text: {
        type: String, 
        required: true
    },
    disabled: {
      type: Boolean,
      required: false
    }
})

const emit = defineEmits(['submit'])
</script>
