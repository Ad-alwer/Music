<template>
  <div id="parent ">
    <header class="d-flex align-items-center gap-1 mt-3">
      <hmheader :reload="reloadheader" />
    </header>
    <main class="d-flex">
      <aside class="menu">
        <hmmenu @change="changecomponent" :component="component" />
      </aside>
      <section class="content">
        <discover v-if="component == 'discover'" class="active" />
        <explore v-if="component == 'explore'" />
        <search v-if="component == 'search'" />
        <laibrarytrack v-if="component == 'laibrarytrack'" />
        <laibraryAlbum v-if="component == 'laibraryalbum'" />
        <laibraryplaylist v-if="component == 'laibraryplaylist'" />
        <laibraryArtist v-if="component == 'laibraryartist'" />
        <upload v-if="component == 'upload'" :user="user" />
        <publishTrack
          v-if="component == 'publishmusic' || component == 'publishpodcast'"
          :type="component == 'publishmusic' ? 'music' : 'podcast'"
        />
        <PublishAlbum
          v-if="component == 'publishalbum' || component == 'publishplaylist'"
          :type="component == 'publishalbum' ? 'albums' : 'playlists'"
          :user="user"
          @changemusic="changemusic"

        />
        <settings
          :username="user.username"
          v-if="component == 'settings'"
          @reload="changeusername"
        />
        <user
          v-if="component == 'user'"
          :otheruser="finduser"
          :thisuser="user"
          @reload="findotheruser"
          @changemusic="changemusic"
        />
        <profile v-if="component == 'profile'" />
        <socialmedia v-if="component == 'socialmedia'" />
        <request v-if="component == 'request'" />
        <recomenduser v-if="component == 'recomenduser'" />
      </section>
      <aside class="player">
        <player :data="newmusic" />
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
import laibraryAlbum from "./home components/laibraryAlbum.vue";
import laibraryplaylist from "./home components/laibraryPlaylist.vue";
import laibraryArtist from "./home components/laibraryArtist.vue";
import upload from "./home components/upload.vue";
import publishTrack from "./home components/PublishTrack.vue";
import PublishAlbum from "./home components/PublishAlbum.vue";
import settings from "./home components/setting.vue";
import user from "./home components/user.vue";
import profile from "./home components/Profile.vue";
import socialmedia from "./profile components/socialmedia.vue";
import request from "./profile components/request.vue";
import recomenduser from "./profile components/recomenduser.vue";

import Register from "./Register.vue";
import axios from "axios";
import info from "../../default";

export default {
  name: "home",
  beforeMount() {
    this.getdata();
    if (this.user) {
      this.routing();
    }
  },
  data() {
    return {
      apiaddress: info.Api_ADDRESS,
      component: "discover",
      reloadheader: true,
      user: {},
      finduser: {},
      newmusic: null,
    };
  },
  watch: {
    component: function () {
      if (this.component === "user") {
        this.findotheruser();
      }
    },
  },
  methods: {
    changecomponent: function (e) {
      this.component = e;
    },
    findotheruser: function () {
      const id = location.pathname.split("/user/")[1];
      axios
        .get(`${this.apiaddress}users/getuserbyidorusername/${id}`)
        .then((res) => {
          if (res.data) {
            this.finduser = res.data;
          } else {
            location.href = "/notfound";
          }
        });
    },
    changemusic: function (id) {
      this.newmusic = id;
    },
    changeusername: function () {
      this.reloadheader = !this.reloadheader;
      this.getdata();
    },
    routing: function () {
      const firsturllocation = location.pathname.split("/")[1];
      const secondurllocation = location.pathname.split("/")[2];

      if (firsturllocation) {
        const componentsarr = [
          "discover",
          "explore",
          "search",
          "laibrarytrack",
          "laibraryalbum",
          "laibraryplaylist",
          "laibraryartist",
          "upload",
          "publishmusic",
          "publishpodcast",
          "publishalbum",
          "publishplaylist",
          "user",
          "settings",
          "profile",
        ];

        let search = componentsarr.find((e) => {
          return e == firsturllocation;
        });

        if (firsturllocation !== "home") {
          firsturllocation && search
            ? (this.component = search)
            : (location.href = "/notfound");

          if (firsturllocation == "profile" && secondurllocation) {
            const profilearr = ["socialmedia", "request", "recomenduser"];
            search = profilearr.find((e) => {
              return e == secondurllocation;
            });

            search ? (this.component = search) : (location.href = "/notfound");
          }
        }
      }
    },
    getdata: function () {
      axios
        .get(`${this.apiaddress}users/user`, {
          headers: {
            jwt: Register.methods.getcookies("jwt"),
          },
        })
        .then((res) => {
          this.user = res.data;
        });
    },
  },
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
    laibraryArtist,
    upload,
    publishTrack,
    PublishAlbum,
    settings,
    user,
    profile,
    socialmedia,
    request,
    recomenduser,
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
