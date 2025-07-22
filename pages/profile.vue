<template>
  <div class="flex justify-center mt-[10%]">
    <div class="flex flex-col gap-2">
      <p class="font-semibold text-xl">Name: {{ user?.username }}</p>
      <p class="font-semibold text-xl">E-Mail: {{ user?.email }}</p>
      <SharedSubmitButton v-if="!displayChangePasswordSection" @submit="displayChangePasswordSection = true" text="Passwort ändern" />
    </div>
  </div>
  <div v-if="displayChangePasswordSection" class="flex justify-center mt-10">
      <ChangePassword @abort="displayChangePasswordSection =false" @password-changed="passwordChangeSuccessfull"/>
  </div>
  <div v-if="displaySuccessMessage" class="text-center mt-5">
    <p class="font-semibold text-xl">Passwort wurde erfolgreich geändert!</p>
  </div>
</template>

<script setup lang="ts">
  const user = useStrapiUser();

  // ## refs ## 
  const displayChangePasswordSection = ref(false);
  const displaySuccessMessage = ref(false);

  // ## Events ##
  const passwordChangeSuccessfull = () => {
    displayChangePasswordSection.value = false;
    displaySuccessMessage.value = true;
  }
</script>
