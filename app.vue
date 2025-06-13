<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
  const { find } = useStrapi();

  const festivalInformation = ref(null);

  // ### Events ###
  onMounted(() => {
    getData();
  });

  // ### API Requests ###
  const getData = async () => {
    festivalInformation.value = await find("event-detail");
  };
</script>
