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
  modules: [
    "@nuxtjs/strapi",
    "@vesp/nuxt-fontawesome",
    "@pinia/nuxt",
    "@nuxt/image",
  ],
  fontawesome: {
    icons: {
      solid: ["circle", "dollar-sign", "right-from-bracket", "bars"],
      brands: ["spotify", "soundcloud"],
    },
  },
  strapi: {
    url:
      process.env.STRAPI_URL ||
      (process.env.NODE_ENV === "production"
        ? "https://strapi-cms.schrum.xyz"
        : "http://localhost:1337"),
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
  app: {
    head: {
      link: [
        {
          rel: "icon",
          type: "image/png",
          sizes: "96x96",
          href: "/favicon-96x96.png",
        },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "shortcut icon", href: "/favicon.ico" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
      meta: [{ name: "apple-mobile-web-app-title", content: "Schrum" }],
    },
  },
});
