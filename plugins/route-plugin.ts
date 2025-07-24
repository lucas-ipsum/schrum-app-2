export default defineNuxtPlugin(() => {
  const jwt = useCookie("strapi_jwt"); // or whatever name you used
  addRouteMiddleware(
    "global-middleware",
    (to, from) => {
      if (!jwt.value) {
        // Redirect to the login page
        console.log('redirect to login')
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
