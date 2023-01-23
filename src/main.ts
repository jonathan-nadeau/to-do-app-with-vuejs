import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/sass/reset.scss";
import "./assets/sass/main.scss";

import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vuepic/vue-datepicker/dist/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
