import { createApp } from "vue";
import VueAwesomePaginate from "vue-awesome-paginate";
import Vue3Toasity, { type ToastContainerOptions } from "vue3-toastify";

import "vue3-toastify/dist/index.css";
import "./style.css";
import "vue-awesome-paginate/dist/style.css";

import App from "./App.vue";
import router from "./router";

createApp(App)
  .use(router)
  .use(VueAwesomePaginate)
  .use(Vue3Toasity, {
    autoClose: 3000,
  } as any)
  .mount("#app");
