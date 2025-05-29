<template>
  <div class="multiple-backgrounds p-4 text-stone-300">
    <div class="flex gap-4">
      <button @click="navbarOpen = !navbarOpen" class="border-0">
        <!--<font-awesome class="text-5xl" icon="bars" />-->
      </button>
      <Navbar class="my-auto" />
    </div>
    <slot />
  </div>
</template>

<script setup>
  const navbarOpen = ref(false);
</script>
