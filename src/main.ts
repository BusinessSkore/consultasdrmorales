import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import 'bootswatch/dist/cerulean/bootstrap.min.css'
import "./styles/index.css";

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
