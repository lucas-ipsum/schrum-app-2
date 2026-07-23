<template>
  <div>
    <shared-simple-table :table-data="surveyResults" :columns="columns" />
  </div>
</template>

<script setup>
  const { find } = useStrapi();

  // ## refs
  const surveyResults = ref(null);
  // Single source of truth for the columns: each header is paired with the
  // response field rendered beneath it, so they can never fall out of order.
  const columns = ref([
    { header: "Name", field: "username" },
    { header: "Dabei?", field: "attending" },
    { header: "Ankunft", field: "arrival" },
    { header: "Shuttle-Zeit", field: "shuttle" },
    { header: "Frühstück", field: "breakfast" },
    { header: "Artist?", field: "artist" },
  ]);

  // ## events
  onMounted(() => {
    getData();
  });

  // ## api calls
  // Load up to 100 entries and show them all in a single, unpaged table.
  const getData = async () => {
    try {
      const { data } = await find("survey-answears", {
        pagination: { pageSize: 100 },
      });
      surveyResults.value = flattenResponses(data);
    } catch (err) {
      console.error("An error occured while loading data: ", err);
    }
  };

  // Turn each survey entry into one row for the user plus one row per companion.
  // The table reads each cell by field name (see `columns`), so ordering is
  // handled there; here we only shape the name and drop the companions array.
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
