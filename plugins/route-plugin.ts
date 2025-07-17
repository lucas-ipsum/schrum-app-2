export default defineNuxtPlugin(() => {
  addRouteMiddleware(
    "global-middleware",
    (to, from) => {
      console.log(useUserStore().isLoggedIn);
      if (!useUserStore().isLoggedIn && to.path !== "/login") {
        // Redirect to the login page
        return navigateTo("/login");
      }
    },
    { global: true }
  );
});
