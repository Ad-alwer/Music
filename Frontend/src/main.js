import { createApp } from "vue";
import App from "./App.vue";

import { createRouter, createWebHistory } from "vue-router";

import "bootstrap/dist/css/bootstrap.css";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";

import login from "../src/components/Login.vue";
import register from "../src/components/Register.vue";
import verifyaccount from "../src/components/Verifyaccount.vue";
import home from "../src/components/home.vue";
import profile from "../src/components/Profile.vue";
import profileRequest from "../src/components/profile components/request.vue";
import profileSocialmedia from "../src/components/profile components/socialmedia.vue";
import profileMonthlylistener from "../src/components/profile components/monthlylistener.vue";
import notification from "../src/components/notification.vue";
import dashboard from "../src/components/dashboard.vue"
import notfound from "../src/components/404.vue"


const routes = [
  { path: "/register", component: register },
  { path: "/login", component: login },
  { path: "/v/:token", component: verifyaccount },
  { path: "/login", component: login },
  { path: "/", component: home },
  { path: "/profile", component: profile },
  { path: "/profile/request", component: profileRequest },
  { path: "/profile/socialmedia", component: profileSocialmedia },
  { path: "/profile/monthlylistener", component: profileMonthlylistener },
  { path: "/notification", component: notification },
  { path: "/dashboard", component: dashboard },
  { path: "/:pathMatch(.*)", component: notfound },


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(bootstrap).use(router).mount("#app");
