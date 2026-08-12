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

  // ## label maps (raw keys/values -> nice German labels)
  const EMPTY = "–";
  const attendingLabels = { friday: "Freitag", saturday: "Samstag", tent: "Zelt" };
  const breakfastLabels = { saturday: "Samstag", sunday: "Sonntag" };
  const dayLabels = { friday: "Freitag", saturday: "Samstag" };
  const arrivalLabels = {
    car_driver: "Auto Fahrer*in",
    car_passenger: "Auto Beifahrer*in",
    train: "Zug",
    other: "Andere",
  };

  // Join the truthy boolean keys of an object as their German labels.
  const formatBooleans = (obj, labels) => {
    const parts = Object.keys(labels)
      .filter((key) => obj?.[key])
      .map((key) => labels[key]);
    return parts.length ? parts.join(", ") : EMPTY;
  };

  const formatArrival = (arrival) => arrivalLabels[arrival] ?? EMPTY;

  const formatShuttle = (shuttle) => {
    if (!shuttle?.day || !shuttle?.hour) return EMPTY;
    return `${dayLabels[shuttle.day] ?? shuttle.day} ${shuttle.hour}`;
  };

  const formatArtist = (artist) => {
    if (!artist?.isArtist) return EMPTY;
    return artist.band_name?.trim() ? artist.band_name : "Ja";
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

  // Pre-format every cell into a readable German string so the table shows
  // "Freitag, Samstag" / "Auto Fahrer*in" instead of raw keys like "friday" / "car_driver".
  const personColumns = (name, person) => ({
    username: name,
    attending: formatBooleans(person.attending, attendingLabels),
    arrival: formatArrival(person.arrival),
    shuttle: formatShuttle(person.shuttle),
    breakfast: formatBooleans(person.breakfast, breakfastLabels),
    artist: formatArtist(person.artist),
  });
</script>
