<template>
    <div>
        <!-- Header -->
        <div class="flex justify-center mx-5">
            <h2 class="text-stone-300 text-3xl sm:text-5xl font-semibold cursor-pointer">Ankündigungen</h2>
        </div>
        <!-- Content -->
        <div v-for="annoucement in annoucements" class="flex flex-col gap-3">
            <AnnoucementElement :annoucementDetails="annoucement" class="my-2"/> 
        </div>
    </div>

</template>

<script setup>

    const annoucements = ref([
    {
            date: '15.08.2024',
            title: 'Food & Drinks',
            content: 'Placeholder'
        }
    ])
</script>