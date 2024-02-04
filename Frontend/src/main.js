import { createApp } from "vue";
import App from "./App.vue";

import { createRouter, createWebHistory } from "vue-router";

import "bootstrap/dist/css/bootstrap.css";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";

import login from "../src/components/Login.vue";
import register from "../src/components/Register.vue";

const routes = [
  { path: "/register", component: register },
  { path: "/login", component: login },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(bootstrap).use(router).mount("#app");
