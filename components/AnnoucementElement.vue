<template>
    <div class="flex flex-col outline outline-2 py-1 px-2 outline-green-800">
        <span class="font-semibold w-fit px-1 bg-yellow-800">
            {{ annoucementDetails.title }}
        </span>
        <span>
            {{ annoucementDetails.date }}
        </span>
        <span>
            {{ annoucementDetails.content }}
        </span>
    </div>
</template>

<script setup>
const props = defineProps({
    annoucementDetails: {
        type: Object,
        required: true
    }
})

</script>