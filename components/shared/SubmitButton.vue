<template>
  <div>
    <button @click="$emit('submit')" class="outline-2 p-2 flex font-semibold w-fit cursor-pointer">
      <span> {{ text }} </span>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
    text: {
        type: String, 
        required: true
    }
})

const emit = defineEmits(['submit'])
</script>
