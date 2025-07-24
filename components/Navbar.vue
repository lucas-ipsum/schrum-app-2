<template>
  <div v-if="user" class="w-full">
    <ul class="flex flex-wrap gap-3 w-full">
      <NavbarLink link="/" title="Home" />
      <NavbarLink link="/travelInfo" title="Anreise" />
      <NavbarLink link="/survey" title="Umfrage" />
      <NavbarLink link="/infoPage" title="Infos" />
      <NavbarLink link="/packingList" title="Packliste" />
      <NavbarLink link="/foodAndDrinks" title="Essen & Getränke" />
      <NavbarLink link="/profile" title="Profil" />

      <div class="ml-auto">
        <button @click="onClick">
          <font-awesome :icon="['fas', 'right-from-bracket']" />
        </button>
      </div>
    </ul>
  </div>
</template>

<script setup lang="ts">
  const { logout } = useStrapiAuth();
  const router = useRouter();
  const user = useStrapiUser();

  const onClick = () => {
    logout();
    useUserStore().logoutUser();
    router.push("/login");
  };
</script>
