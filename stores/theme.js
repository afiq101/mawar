import { defineStore, skipHydrate } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const useThemeStore = defineStore({
  id: "theme",
  state: () => ({
    theme: "light",
    layoutType: "vertical",
    primaryColor: useLocalStorage("primaryColor", "#F3586A"),
    secondaryColor: useLocalStorage("secondaryColor", "#F07A25"),
    infoColor: useLocalStorage("infoColor", "#4185F2"),
    successColor: useLocalStorage("successColor", "#4FC067"),
    warningColor: useLocalStorage("warningColor", "#F68D20"),
    dangerColor: useLocalStorage("dangerColor", "#E55345"),
    codeTheme: "oneDark",
  }),
  actions: {
    setTheme(theme) {
      this.theme = theme;
    },
    setLayoutType(layoutType) {
      this.layoutType = layoutType;
    },
    setCodeTheme(codeTheme) {
      this.codeTheme = codeTheme;
    },
    setThemeColor(type, color) {
      this[type] = color;
    },
    resetThemeColor() {
      this.primaryColor = "#F3586A";
      this.secondaryColor = "#F07A25";
      this.infoColor = "#4185F2";
      this.successColor = "#4FC067";
      this.warningColor = "#F68D20";
      this.dangerColor = "#E55345";
    },
  },
  hydrate(state, initialState) {
    state.primaryColor = useLocalStorage("primaryColor", "#F3586A");
    state.secondaryColor = useLocalStorage("secondaryColor", "#F07A25");
    state.infoColor = useLocalStorage("infoColor", "#4185F2");
    state.successColor = useLocalStorage("successColor", "#4FC067");
    state.warningColor = useLocalStorage("warningColor", "#F68D20");
    state.dangerColor = useLocalStorage("dangerColor", "#E55345");
  },
});
