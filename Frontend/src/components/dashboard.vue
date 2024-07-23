<template>
  <div id="parent ">
    <header class="d-flex align-items-center gap-1 mt-3"  >
      <hmheader  @sidemenu="sidemenu"/>
    </header>
    <main class="d-flex">
      <aside class="menu" ref="aside">
        <dashmenu :component="component" @change="change" @sidemenu="sidemenu" />
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

    if (urllocation) {
      this.component = componentsarr.find((e) => {
        return e.toLocaleLowerCase() == urllocation.toLocaleLowerCase();
      });

      !this.component ? (location.href = "/notfound") : null;

    }

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
    sidemenu: function (e) {
      console.log('e');
      this.$refs.aside.classList.toggle("d-block", e);
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
}


@media screen and (max-width: 767px) {
  aside.menu {
    display: none;
    position: absolute;
    top: 0;
    width: 180px;
    min-height: 100vh !important;
    background: white;
    z-index: 500;
  }
  aside.player{
    position: absolute;
    bottom: 0;
    width: 100vw;
    height: 65px;
    z-index: 500;
    background: white;
    

  }
  .content{
    width: 100%;
  }
}
</style>
