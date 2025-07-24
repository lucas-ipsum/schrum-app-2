export default defineNuxtPlugin(() => {
  const jwt = useCookie("strapi_jwt"); // or whatever name you used
  addRouteMiddleware(
    "global-middleware",
    (to, from) => {
      if (!useUserStore().isLoggedIn || !jwt) {
        // Redirect to the login page
        if (to.path == "/login") {
          return;
        } else {
          return navigateTo("/login");
        }
      }
    },
    { global: true }
  );
});
