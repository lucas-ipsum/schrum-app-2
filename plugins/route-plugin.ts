export default defineNuxtPlugin(() => {
const jwt = useCookie('strapi_jwt'); // or whatever name you used
  addRouteMiddleware(
    "global-middleware",
    (to, from) => {
      console.log(useUserStore().isLoggedIn);
      if (!useUserStore().isLoggedIn && to.path !== "/login" && !jwt) {
        // Redirect to the login page
        return navigateTo("/login");
      }
    },
    { global: true }
  );
});
