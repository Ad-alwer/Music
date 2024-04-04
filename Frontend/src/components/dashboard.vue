<template>
  <div id="parent ">
    <header class="d-flex align-items-center gap-1 mt-3">
      <hmheader />
    </header>
    <main class="d-flex">
      <aside class="menu">
        <dashmenu />
      </aside>
      <section class="content">
        <users v-if="component == 'users'" />
        <requests v-else-if="component == 'requests'" />
        <verify v-else-if="component == 'verify'" />
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
  data() {
    return {
      component: "home",
    };
  },
  methods: {},
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
</style>
