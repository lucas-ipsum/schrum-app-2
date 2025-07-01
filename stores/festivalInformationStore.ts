import { defineStore } from "pinia";

export const useFestivalInformationStore = defineStore(
  "festivalInformation",
  () => {
    const festivalInformation = ref<FestivalInformation | null>(null);

    const setFestivalInformation = (data: FestivalInformation) => {
      festivalInformation.value = {
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
      };
    };

    return { festivalInformation, setFestivalInformation };
  }
);
