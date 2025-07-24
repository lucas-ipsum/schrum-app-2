<template>
  <div v-if="jwt" class="w-full">
    <ul class="flex flex-wrap gap-3 w-full">
      <NavbarLink link="/" title="Home" />
      <NavbarLink link="/travelInfo" title="Anreise" />
      <NavbarLink link="/survey" title="Umfrage" />
      <NavbarLink link="/infoPage" title="Infos" />
      <NavbarLink link="/packingList" title="Packliste" />
      <NavbarLink link="/foodAndDrinks" title="Essen & Getränke" />
      <NavbarLink link="/profile" title="Profil" />
      <NavbarLink v-if="user.isAdmin" link="/adminPage" title="Admin" />

      <div class="ml-auto">
        <button class="cursor-pointer" @click="onClick">
          <font-awesome :icon="['fas', 'right-from-bracket']" />
        </button>
      </div>
    </ul>
  </div>
</template>

<script setup>
  const { logout } = useStrapiAuth();
  const router = useRouter();
  const jwt = useCookie("strapi_jwt"); 
  const user = useStrapiUser();

  const onClick = () => {
    logout();
    useUserStore().logoutUser();
    router.push("/login");
  };
</script>
