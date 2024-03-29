import { createApp } from "vue";
import App from "./App.vue";

import { createRouter, createWebHistory } from "vue-router";

import "bootstrap/dist/css/bootstrap.css";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";

import login from "../src/components/Login.vue";
import register from "../src/components/Register.vue";
import verifyaccount from "../src/components/Verifyaccount.vue";
import home from "../src/components/home.vue"
import profile from "../src/components/Profile.vue"
import profileRequest from "../src/components/profile components/request.vue"

const routes = [
  { path: "/register", component: register },
  { path: "/login", component: login },
  { path: "/v/:token", component: verifyaccount },
  { path: "/login", component: login },
  { path: "/", component: home },
  { path: "/profile", component: profile },
  { path: "/profile/request", component: profileRequest },



];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(bootstrap).use(router).mount("#app");
