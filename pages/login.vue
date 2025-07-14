<template>
  <div class="mt-[20%]">
    <h1 class="text-center text-2xl font-semibold">Login</h1>

    <div class="flex justify-center">
      <div class="flex flex-col gap-4">
        <SharedTextInput
          @update="(res) => (email = res)"
          name="email"
          label="E-Mail"
          type="email"
        />
        <SharedTextInput
          @update="(res) => (password = res)"
          name="password"
          label="Passwort"
          type="password"
        />
        <SharedSubmitButton text="Einloggen" @submit="onSubmit" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { login } = useStrapiAuth();
  const router = useRouter();

  // ## refs ##
  const email = ref("");
  const password = ref("");

  const onSubmit = async () => {
    try {
      await login({ identifier: email.value, password: password.value });

      router.push("/");
    } catch (e) {}
  };
</script>
