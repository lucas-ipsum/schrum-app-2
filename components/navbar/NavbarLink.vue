<template>
    <li @click="$emit('linkChanged')" :class="route.path === link ? 'bg-green-800' : ''" class="hover:bg-green-800 px-3 font-semibold"><NuxtLink :to="link">{{ title }}</NuxtLink></li>
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