import { createApp } from "vue";
import App from "./App.vue";

import { createRouter, createWebHistory } from "vue-router";

import "bootstrap/dist/css/bootstrap.css";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";

import login from "../src/components/Login.vue";
import register from "../src/components/Register.vue";
import verifyaccount from "../src/components/Verifyaccount.vue";
import home from "../src/components/home.vue";

import notification from "../src/components/notification.vue";
import dashboard from "../src/components/dashboard.vue";
import verifypassword from "../src/components/verifynewpassword.vue";
import notfound from "../src/components/404.vue";

const routes = [
  { path: "/register", component: register },
  { path: "/login", component: login },
  { path: "/v/:token", component: verifyaccount },
  { path: "/login", component: login },
  { path: "/", component: home },
  { path: "/home", component: home },
  { path: "/:component?/:part?", component: home },
  { path: "/notification", component: notification },
  { path: "/dashboard/:component?", component: dashboard },
  { path: "/f/:token", component: verifypassword },
  { path: "/:pathMatch(.*)", component: notfound },
  { path: "/notfound", component: notfound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(bootstrap).use(router).mount("#app");
