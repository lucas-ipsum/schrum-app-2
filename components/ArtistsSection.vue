<template>
<div class="flex flex-col gap-5">
    <div class="flex justify-center mx-5">
        <h2 @click="lineUpActive = true" class="text-stone-300 text-3xl sm:text-5xl font-semibold cursor-pointer" :class="lineUpActive ? 'underline underline-offset-8' : ''">Line Up</h2>
        <h2 class="text-stone-300 text-3xl sm:text-5xl font-semibold px-2">/</h2>
        <h2 @click="lineUpActive = false" class="text-stone-300 text-3xl sm:text-5xl font-semibold cursor-pointer" :class="!lineUpActive ? 'underline underline-offset-8' : ''">Timetable</h2>
    </div>
    <LineUpComponent v-if="lineUpActive" />
    <div v-if="!lineUpActive">
        <h2 class="text-stone-300 text-xl sm:text-3xl font-semibold px-2">Kommt noch ...</h2>

    </div>
</div>
</template>

<script setup>
import { ref } from 'vue';

// Refs 
const lineUpActive = ref(true);
</script>