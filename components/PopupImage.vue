<template>
  <div v-if="showPopup" class="image-popup" @click="closePopup">
    <div class="popup-content">
      <slot name="image" />
      <!--<img :src="imgSrc" alt="Fullscreen Image" @click.stop />-->
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";

  const props = defineProps({
    displayPopup: {
      required: true,
      type: Boolean,
    },
    imgSrc: {
      required: true,
    },
  });
  const showPopup = ref(false);

  onMounted(() => {
    console.log("mounted");
    console.log(props.imgSrc);
  });

  // Watch changes in props
  watch(
    () => props.displayPopup,
    () => {
      showPopup.value = props.displayPopup;
    }
  );

  // Emits
  const emit = defineEmits(["displayPopupChange"]);
  const openPopup = () => {
    showPopup.value = true;
  };

  const closePopup = () => {
    showPopup.value = false;
    emit("displayPopupChange", showPopup.value);
  };
</script>

<style scoped>
  .image-popup {
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
    background-color: #fff;
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
