<template>
    <li @click="$emit('linkChanged')" :class="route.path === link ? 'bg-green-800' : ''" class="hover:bg-green-800 py-1 sm:py-0 px-3 sm:text-lg text-xl font-bold sm:font-semibold"><NuxtLink :to="link">{{ title }}</NuxtLink></li>
</template>

<script setup>
import { useRoute } from 'vue-router';

const props = defineProps({
    link: {
        type: String,
        required: true
    },
    title: {
        type: String, 
        required: true
    }
})

const route = useRoute();

  const emit = defineEmits(["linkChanged"]);
</script>