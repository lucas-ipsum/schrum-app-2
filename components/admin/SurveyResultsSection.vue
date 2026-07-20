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
      surveyResults.value = flattenResponses(data);
    } catch (err) {
      console.error("An error occured while loading data: ", err);
    }
  };

  // Turn each survey entry into one row for the user plus one row per companion.
  // Keys are rebuilt explicitly so the columns line up with the table headers
  // and the companions array itself never renders as its own column.
  const flattenResponses = (data) => {
    const rows = [];
    (data ?? []).forEach((entry) => {
      const response = entry.response ?? {};
      rows.push({ response: personColumns(response.username, response) });
      (response.companions ?? []).forEach((companion) => {
        const name = `${companion.name || "Begleitperson"} (Begleitung von ${response.username})`;
        rows.push({ response: personColumns(name, companion) });
      });
    });
    return rows;
  };

  const personColumns = (name, person) => ({
    username: name,
    attending: person.attending,
    arrival: person.arrival,
    shuttle: person.shuttle,
    breakfast: person.breakfast,
    artist: person.artist,
  });
</script>
