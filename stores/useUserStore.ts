import { defineStore } from "pinia";

export const useUserStore = defineStore(
  "userStore",
  () => {
    const isLoggedIn = ref(false);

    const loginUser = () => {
        isLoggedIn.value = true;
    };

    const logoutUser = () => {
        isLoggedIn.value = false;
    }

    return { isLoggedIn, loginUser, logoutUser };
  }
);
