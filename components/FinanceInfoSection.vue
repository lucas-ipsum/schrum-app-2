<template>
    <div>
        {{ financeInfoList }}
    </div>
</template>

<script setup lang="ts">
    defineProps({
        financeInfoList: {
            type: Object
        }
    })
</script>