import { ref } from "vue";

export function useIsDev() {
  const isDev = process.env.NODE_ENV === "development";

  return {
    isDev,
  };
}
