import { defineStore } from "pinia";

export const useAppSettingStore = defineStore(
  "appSetting",
  () => {
    const appSettings = ref<AppSettings | null>(null);

    const setAppSettings = (data: AppSettings) => {
      appSettings.value = {
        ...data,
      };
    };

    return { appSettings, setAppSettings };
  }
);
