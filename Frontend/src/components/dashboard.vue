<template>
  <div id="parent ">
    <header class="d-flex align-items-center gap-1 mt-3">
      <hmheader />
    </header>
    <main class="d-flex">
      <aside class="menu">
        <dashmenu :component="component" @change="change" />
      </aside>
      <section class="content">
        <users v-if="component == 'users'" :user="user" />
        <requests v-else-if="component == 'requests'" />
        <verify v-else-if="component == 'verify'" :user="user" />
        <home v-else-if="component == 'home'" />
        <analyzeTopArtist v-else-if="component == 'analyzeTopArtist'" />
        <analyzeTopMusic
          v-else-if="
            component == 'analyzeTopMusic' || component == 'analyzeTopPodcast'
          "
          :type="component == 'analyzeTopMusic' ? 'music' : 'podcast'"
        />
        <analyzeTopAlbum
          v-else-if="
            component == 'analyzeTopAlbum' || component == 'analyzeTopPlaylist'
          "
          :type="component == 'analyzeTopAlbum' ? 'album' : 'playlist'"
        />
      </section>
      <aside class="player">
        <player />
      </aside>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import info from "../../default";
import Register from "./Register.vue";
import hmheader from "./home components/header";
import dashmenu from "./dashboard components/menu.vue";
import player from "./home components/Player.vue";

import users from "./dashboard components/users.vue";
import requests from "./dashboard components/requests.vue";
import verify from "./dashboard components/verify.vue";
import home from "./dashboard components/home.vue";
import analyzeTopArtist from "./dashboard components/analyzeTopArtist.vue";
import analyzeTopMusic from "./dashboard components/analyzeTopMusic.vue";
import analyzeTopAlbum from "./dashboard components/analyzeTopAlbum.vue";

export default {
  name: "dashboard",
  beforeMount() {
    this.getuser();
    const urllocation = location.pathname.split("/dashboard/")[1];

    const componentsarr = [
      "users",
      "requests",
      "verify",
      "home",
      "analyzeTopArtist",
      "analyzeTopMusic",
      "analyzeTopAlbum",
    ];

    urllocation
      ? (this.component = componentsarr.find((e) => {
          return e == urllocation;
        }))
      : null;
  },

  data() {
    return {
      component: "users",
      user: {},
      loader: true,
      apiaddress: info.Api_ADDRESS,
    };
  },
  methods: {
    change: function (e) {
      this.component = e;
    },
    getuser: function () {
      axios
        .get(`${this.apiaddress}users/user`, {
          headers: {
            jwt: Register.methods.getcookies("jwt"),
          },
        })
        .then((res) => {
          !res.data.isadmin ? (location.href = "/") : null;
          this.user = res.data;
        });
    },
  },
  components: {
    hmheader,
    dashmenu,
    player,
    users,
    requests,
    verify,
    home,
    analyzeTopArtist,
    analyzeTopMusic,
    analyzeTopAlbum,
  },
};
</script>

<style scoped>
* {
  overflow: hidden;
}
.content {
  width: 62%;
  overflow-y: scroll !important;
  max-height: 90vh;
}
aside.menu {
  width: 240px;
  height: 92vh;
}
aside.player {
  width: 25%;
  /* background-color: aqua; */
}
.loader-parent {
  min-width: 62% !important;
  min-height: 91vh !important;
  background-color: black !important;
  overflow: hidden !important;
}
</style>
