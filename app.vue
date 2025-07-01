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
