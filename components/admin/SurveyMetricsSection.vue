<template>
  <div class="flex flex-col gap-6 mx-3 sm:mx-[10%] mb-10">
    <section
      v-for="category in categories"
      :key="category.title"
      class="flex flex-col gap-3"
    >
      <h3 class="text-stone-400 text-sm font-semibold uppercase tracking-wider">
        {{ category.title }}
      </h3>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <shared-stat-card
          v-for="stat in category.stats"
          :key="stat.label"
          :label="stat.label"
          :value="stat.value"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
  const { find } = useStrapi();
  const persons = ref([]);

  // ## events
  onMounted(() => {
    getData();
  });

  // ## api calls
  const getData = async () => {
    try {
      const { data } = await find("survey-answears");
      persons.value = flattenPersons(data);
    } catch (err) {
      console.error("An error occured while loading data: ", err);
    }
  };

  // Nutzer + alle Begleitpersonen als eine flache Personen-Liste.
  const flattenPersons = (data) => {
    const all = [];
    (data ?? []).forEach((entry) => {
      const response = entry.response ?? {};
      all.push(response);
      (response.companions ?? []).forEach((c) => all.push(c));
    });
    return all;
  };

  const countBy = (predicate) => persons.value.filter(predicate).length;

  // Kennzahlen nach Kategorien gruppiert.
  const categories = computed(() => [
    {
      title: "Teilnehmer",
      stats: [
        { label: "Gäste gesamt", value: countBy((p) => p.attending?.friday || p.attending?.saturday) },
        { label: "Freitag", value: countBy((p) => p.attending?.friday) },
        { label: "Samstag", value: countBy((p) => p.attending?.saturday) },
        { label: "Zelte", value: countBy((p) => p.attending?.tent) },
        { label: "Artists", value: countBy((p) => p.artist?.isArtist) },
      ],
    },
    {
      title: "Anreise",
      stats: [
        { label: "Auto-Fahrer", value: countBy((p) => p.arrival === "car_driver") },
        { label: "Zug", value: countBy((p) => p.arrival === "train") },
      ],
    },
    {
      title: "Frühstück",
      stats: [
        { label: "Samstag", value: countBy((p) => p.breakfast?.saturday) },
        { label: "Sonntag", value: countBy((p) => p.breakfast?.sunday) },
      ],
    },
  ]);
</script>
