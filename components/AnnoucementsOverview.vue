<template>
  <div>
    <!-- Header -->
    <div class="flex justify-center mx-5">
      <h2
        class="text-stone-300 text-3xl sm:text-5xl font-semibold cursor-pointer"
      >
        Ankündigungen
      </h2>
    </div>
    <!-- Content -->
    <div v-for="announcement in announcements" class="flex flex-col gap-3">
      <AnnoucementElement :announcementDetails="announcement" class="my-2" />
    </div>
  </div>
</template>

<script setup>
  // ## refs ##
  const announcements = ref(null);

  // Strapi
  const { find } = useStrapi();

  // events
  onMounted(() => {
    getData();
  });

  // ## Api call ##
  const getData = async () => {
    try {
      const res = await find("announcements");
      announcements.value = res.data;
    } catch (err) {
      console.error("An error occured: ", err);
    }
  };
</script>
