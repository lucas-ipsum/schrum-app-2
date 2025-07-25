<template>
  <div v-if="jwt" class="w-full">
    <button class="cursor-pointer sm:hidden" @click="handleClickBurgerMenu">
      <font-awesome
        v-if="!openNavbarMobile"
        :icon="['fas', 'bars']"
        size="2xl"
      />
      <font-awesome
        v-if="openNavbarMobile"
        :icon="['fas', 'x']"
        size="2xl"
      />
    </button>
    <ul
      id="navbar"
      class="sm:flex flex-col sm:flex-row text-center flex-wrap gap-3 w-full sm:mt-0 mt-2"
      :class="!openNavbarMobile ? 'hidden' : ''"
    >
      <NavbarLink
        link="/"
        title="Home"
        @link-changed="openNavbarMobile = false"
      />
      <NavbarLink
        link="/travelInfo"
        title="Anreise"
        @link-changed="openNavbarMobile = false"
      />
      <NavbarLink
        link="/survey"
        title="Umfrage"
        @link-changed="openNavbarMobile = false"
      />
      <NavbarLink
        link="/infoPage"
        title="Infos"
        @link-changed="openNavbarMobile = false"
      />
      <NavbarLink
        link="/packingList"
        title="Packliste"
        @link-changed="openNavbarMobile = false"
      />
      <NavbarLink
        link="/foodAndDrinks"
        title="Essen & Getränke"
        @link-changed="openNavbarMobile = false"
      />
      <NavbarLink
        link="/profile"
        title="Profil"
        @link-changed="openNavbarMobile = false"
      />
      <NavbarLink
        v-if="user.isAdmin"
        link="/adminPage"
        title="Admin"
        @link-changed="openNavbarMobile = false"
      />

      <div class="md:ml-auto">
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

  // refs
  const openNavbarMobile = ref(false);

  // ## events
  const onClick = () => {
    logout();
    useUserStore().logoutUser();
    router.push("/login");
  };

  const handleClickBurgerMenu = () => {
    openNavbarMobile.value = !openNavbarMobile.value;
  };
</script>
