<template>
    <div class="multiple-backgrounds p-4 text-stone-300">
    <div class="flex gap-4">
        <button @click="navbarOpen = !navbarOpen" class="border-0">
            <font-awesome class="text-5xl" icon="bars" />
        </button>
        <Navbar class="my-auto" v-if="navbarOpen"/>
    </div>
    <!-- App Title -->
    <div class="flex justify-center text-center">
        <h1 class="text-stone-300 text-5xl sm:text-4xl font-semibold">Title</h1>
    </div>
      <slot />
    </div>
</template>

<script setup>
    const navbarOpen = ref(false);
</script>