<template>
  <div>
    <shared-simple-table
      :table-data="surveyResults"
      :table-config="tableConfig"
      :table-header="tableHeaders"
    />
  </div>
</template>

<script setup>
  const { find } = useStrapi();

  // ## refs
  const surveyResults = ref(null);
  const tableConfig = ref([['response', 'username']]);
  const tableHeaders = ref(["Name", "Dabei?", "Ankunft", "Shuttle-Zeit", "Frühstück", "Artist?"])

  // ## events
  onMounted(() => {
    getData();
  });

  // ## api calls
  const getData = async () => {
    try {
      const { data } = await find("survey-answears");
      surveyResults.value = data;
    } catch (err) {
      console.error("An error occured while loading data: ", err);
    }
  };
</script>
