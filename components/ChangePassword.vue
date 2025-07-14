<template>
  <div class="flex flex-col gap-3 outline-2 p-4">
    <SharedTextInput
      @update="(res) => (currentPassword = res)"
      name="currentPassword"
      label="Aktuelles Passwort"
      type="password"
    />
    <SharedTextInput
      @update="(res) => (password = res)"
      name="password"
      label="Neues Passwort"
      type="password"
    />
    <SharedTextInput
      @update="(res) => (passwordConfirmation = res)"
      name="passwordConfirmation"
      label="Passwort bestätigen"
      type="password"
    />
    <div class="flex justify-evenly">
      <SharedSubmitButton text="Abbrechen" @submit="$emit('abort')" />
      <SharedSubmitButton text="Speichern" @submit="onSubmit" />
    </div>
  </div>
</template>

<script setup lang="ts">
  const { changePassword } = useStrapiAuth();

  // ## refs ##
  const currentPassword = ref("");
  const password = ref("");
  const passwordConfirmation = ref("");

  // ## emits ##
  const emit = defineEmits(["passwordChanged", "abort"]);

  // ## Events ##
  const onSubmit = async () => {
    try {
      await changePassword({
        currentPassword: currentPassword.value,
        password: password.value,
        passwordConfirmation: passwordConfirmation.value,
      });
      emit("passwordChanged")
      // $toast.success('Password changed!')
    } catch (e) {}
  };
</script>
