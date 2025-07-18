// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ["schrum.xyz"], // Add your host here
    },
  },
  modules: ["@nuxtjs/strapi", "@vesp/nuxt-fontawesome", "@pinia/nuxt"],
  fontawesome: {
    icons: {
      solid: ["circle", "dollar-sign", "right-from-bracket"],
    },
  },
  strapi: {
    url: process.env.STRAPI_URL || "http://localhost:1337",
    prefix: "/api",
    admin: "/admin",
    version: "v5",
    cookie: {
      path: "/",
      maxAge: 14 * 24 * 60 * 60,
      secure: process.env.NODE_ENV === "production",
      sameSite: true,
    },
    cookieName: "strapi_jwt",
  },
});
