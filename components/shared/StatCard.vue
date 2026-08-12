<template>
  <div
    class="flex flex-col items-center justify-center gap-1.5 rounded-xl bg-stone-900/90 outline-1 outline-stone-700 px-3 py-5 text-center shadow-lg transition-colors hover:bg-stone-900 hover:outline-stone-500"
  >
    <span class="text-4xl font-semibold leading-none text-stone-100">{{ value }}</span>
    <span class="text-xs font-medium uppercase tracking-wide text-stone-400">{{ label }}</span>
  </div>
</template>

<script setup>
  defineProps({
    label: { type: String, required: true },
    value: { type: [Number, String], required: true },
  });
</script>
