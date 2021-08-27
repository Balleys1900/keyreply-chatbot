import { createApp } from "vue";
import "@/middleware";
import App from "./App.vue";

import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";

import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

import store from "./store";

import router from "./router";

const app = createApp(App);

app.use(ElementPlus);

app.use(store);

app.use(router);

app.mount("#app");
