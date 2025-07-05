<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
  const { find } = useStrapi();

  // ## Refs ##
  const festivalInformation = ref(null);

  // ### Events ###
  onMounted(() => {
    getData();
  });

  // ### API Requests ###
  const getData = async () => {
    try {
      festivalInformation.value = await find("event-detail");
      useFestivalInformationStore().setFestivalInformation(
        festivalInformation.value.data
      );
    } catch {
      console.error("An error occured while loading data");
    }
  };
</script>

<style>
  .markdown-list ul {
    list-style-type: circle;
  }

  .markdown-list ul li {
    margin-left: 22px;
    margin-bottom: 8px; /* Example: Add margin between list items */
  }
</style>
