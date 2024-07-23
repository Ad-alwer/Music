<template>
  <div id="parent ">
    <header class="d-flex align-items-center gap-1 mt-3">
      <hmheader
      class="header"
        :reload="reloadheader"
        @changecomponent="changecomponent"
        @sidemenu="sidemenu"
      />
    </header>
    <main class="d-flex">
      <aside class="menu" ref="aside">
        <hmmenu
          @change="changecomponent"
          :component="component"
          @sidemenu="sidemenu"
        />
      </aside>
      <section class="content">
        <discover v-if="component == 'discover'" class="active" />
        <explore v-if="component == 'explore'" @changemusic="changemusic" />
        <search v-if="component == 'search'" @changemusic="changemusic" />
        <laibrarytrack
          v-if="component == 'laibrarytrack'"
          @changemusic="changemusic"
          @check="changeplayersaveandlike"
          :check="this.librarycheck"
        />
        <laibraryAlbum
          v-if="component == 'laibraryalbum'"
          @changemusic="changemusic"
        />
        <laibraryplaylist v-if="component == 'laibraryplaylist'" />
        <laibraryArtist
          v-if="component == 'laibraryartist'"
          @changemusic="changemusic"
        />
        <upload v-if="component == 'upload'" :user="user" />
        <publishTrack
          @changemusic="changemusic"
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
        <user v-if="component == 'user'" @changemusic="changemusic" />
        <profile v-if="component == 'profile'" />
        <socialmedia v-if="component == 'socialmedia'" />
        <request v-if="component == 'request'" />
        <recomenduser v-if="component == 'recomenduser'" />
        <toptracks
          v-if="component == 'toptracks'"
          @changemusic="changemusic"
          @check="changeplayersaveandlike"
          :check="this.librarycheck"
        />
        <notification v-if="component == 'notification'" />
        <loader v-if="popups.loader" />
      </section>
      <aside class="player">
        <player
          @check="this.librarycheck = !this.librarycheck"
          :data="newmusic"
          :check="playercheck"
        />
      </aside>
    </main>
  </div>
</template>

<script>
import hmheader from "./home components/header";
import hmmenu from "./home components/menu";

import loader from "./loader.vue";

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
import toptracks from "./home components/toptracks.vue";
import notification from "./home components/notification.vue";

import Register from "./Register.vue";
import axios from "axios";
import info from "../../default";

export default {
  name: "home",
  beforeMount() {
    this.getdata();
    if (this.user) {
      this.routing();
      this.popups.loader = false;
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
      popups: {
        loader: true,
      },
      playercheck: null,
      librarycheck: null,
    };
  },

  methods: {
    changecomponent: function (e) {
      this.component = e;
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
          "toptracks",
          "notification",
        ];

        let search = componentsarr.find((e) => {
          return e == firsturllocation;
        });

        if (firsturllocation !== "home") {
          if (firsturllocation && search) {
            this.popups.loader = false;
            this.component = search;
          } else {
            location.href = "/notfound";
          }

          if (firsturllocation == "profile" && secondurllocation) {
            const profilearr = ["socialmedia", "request", "recomenduser"];
            search = profilearr.find((e) => {
              return e == secondurllocation;
            });

            if (search) {
              this.component = search;

              this.popups.loader = false;
            } else {
              location.href = "/notfound";
            }
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
    changeplayersaveandlike: function (x) {
      this.playercheck = x;
    },
    changelibrarysaveandlike: function (x) {
      this.librarycheck = x;
    },
    sidemenu: function (e) {
      this.$refs.aside.classList.toggle("d-block", e);
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
    loader,
    toptracks,
    notification,
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
