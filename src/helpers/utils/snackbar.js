import { reactive } from "vue";

export const snackbar = reactive({
  show: false,
  text: "",
  color: "info",
  timeout: 0,
  actions: [],
});

export function useSnackbar() {
  const close = () => {
    snackbar.show = false;
    snackbar.text = "";
    snackbar.actions = [];
    snackbar.color = "info";
    snackbar.timeout = 0;
  };

  const show = (
    message,
    { color = "info", timeout = 0, actions = [] } = {}
  ) => {
    snackbar.text = message;
    snackbar.color = color;
    snackbar.timeout = timeout;
    snackbar.actions = actions.map((a) => {
      const original = a.onClick;
      return {
        label: a.label,
        color: a.color || "white",
        onClick: () => {
          try {
            if (typeof original === "function") original();
          } finally {
            close();
          }
        },
      };
    });
    snackbar.show = true;
  };

  return { snackbar, show, close };
}
