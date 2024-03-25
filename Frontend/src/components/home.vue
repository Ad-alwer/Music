<template>
  <div id="parent ">
    <header class="d-flex align-items-center gap-1 mt-3">
      <hmheader />
    </header>
    <main class="d-flex">
      <aside class="menu">
        <hmmenu />
      </aside>
      <section class="content">
        <discover v-if="component == 'discover'" />
        <explore v-if="component == 'explore'" />
        <search v-if="component == 'search'" />
        <laibrarytrack v-if="component == 'laibrarytrack'" />
        <laibraryAlbum v-if="component == 'laibraryalbum'" />
        <laibraryplaylist v-if="component == 'laibraryplaylist'" />
        <laibraryArtist v-if="component == 'laibraryartist'" />
      </section>
      <aside class="player">
        <player />
      </aside>
    </main>
  </div>
</template>

<script>
import hmheader from "./home components/header";
import hmmenu from "./home components/menu";

import discover from "./home components/discover.vue";
import player from "./home components/Player.vue";
import explore from "./home components/explor.vue";
import search from "./home components/search.vue";
import laibrarytrack from "./home components/libraryTrack.vue";
import laibraryAlbum from './home components/laibraryAlbum.vue';
import laibraryplaylist from './home components/laibraryPlaylist.vue';
import laibraryArtist from './home components/laibraryArtist.vue';



export default {
  name: "home",
  data() {
    return {
      component: "laibrarytrack",
    };
  },
  methods: {},
  components: {
    hmheader,
    hmmenu,
    discover,
    player,
    explore,
    search,
    laibrarytrack,
    laibraryAlbum,
    laibraryplaylist,
    laibraryArtist

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
