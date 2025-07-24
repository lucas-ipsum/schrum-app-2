<template>
  <div class="popup-window" @click="closePopup">
    <div @click.stop class="flex flex-col gap-1 popup-content text-white">
      <h1 class="font-bold text-4xl">{{ artistData?.name }}</h1>
      <p class="font-semibold">{{ artistData?.genre }}</p>
      <p>{{ artistData?.description }}</p>
      <div class="w-full flex justify-evenly">
        <a
          class="cursor-pointer"
          :href="artistData?.musicExample"
          target="_blank"
        >
          <font-awesome
            v-if="artistData?.musicExample.includes('spotify')"
            :icon="['fab', 'spotify']"
            size="2xl"
          />
          <font-awesome
            v-if="artistData?.musicExample.includes('soundcloud')"
            :icon="['fab', 'soundcloud']"
            size="2xl"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
  const { findOne } = useStrapi();

  const props = defineProps({
    artistDocumentId: {
      type: String,
      required: true,
    },
  });

  // refs
  const artistData = ref(null);

  // Emits
  const emit = defineEmits(["displayPopupChange"]);

  // events
  onMounted(() => {
    getData();
  });

  const closePopup = () => {
    emit("displayPopupChange");
  };

  // ## api calls
  const getData = async () => {
    const { data } = await findOne("artists", props.artistDocumentId);
    artistData.value = data;
  };

  // ## helper methods
  const getBrandIcon = (url) => {
    if (url && url.includes("spotify")) {
      return "spotify";
    }
  };
</script>

<style scoped>
  .popup-window {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }

  .popup-content {
    max-width: 90%;
    max-height: 90%;
    overflow: auto;
    background-color: rgb(0, 4, 0);
    border-radius: 4px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }

  .popup-content img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
</style>
