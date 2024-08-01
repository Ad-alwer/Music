<template>
  <div id="parent" class="d-flex flex-column mt-1">
    <section v-if="!laoder" class="px-3 top-tracks">
      <div class="d-flex justify-content-between align-items-center">
        <span class="text-uppercase color-black fs-5 fw-semibold">Top tracks </span>
        <span class="text-capitalize color-gray pointer fw-semibold" @click="gototoptracks">More List</span>
      </div>
      <div class="mt-2">
        <div
          v-for="(x, i) in tracks"
          :key="x"
          @click="play(x._id)"
          class="monthly-box d-flex gap-3 align-items-center"
        >
          <div
            class="monthly-num d-flex justify-content-center align-items-center"
          >
            <span class="color-gray fs-3">{{ formatNumber(i + 1) }}</span>
          </div>
          <img
            class="monthly-img img-fluid rounded-3"
            :src="x.cover.url"
            alt=""
          />
          <div class="d-flex flex-column monthly-text">
            <p class="text-capitalize fs-5 fw-bold m-0 p-0 color-dark pointer">
              {{ x.name }}
            </p>
            <span class="text-capitalize color-gray pointer">{{
              x.artist
            }}</span>
          </div>
          <div class="duration-box d-flex justify-content-center">
            <span class="">{{
              formattime(x.duration ? x.duration : x.track.duration)
            }}</span>
          </div>
        </div>
      </div>
    </section>
    <hr v-if="!laoder" class="mx-5" />
    <playerbox v-if="!laoder"
      @check="checkfollowandsave"
      :data="data"
      :check="check"
      :playmusic="playmusic"
    />
    <loader v-else/>
    
  </div>
</template>

<script>
import playerbox from "./playerbox.vue";

import axios from "axios";
import Register from "../Register.vue";

import loader from '../loader.vue';

export default {
  name: "player",
  beforeMount() {
    axios.get(`${this.apiaddress}users/toptracks`).then((res) => {
      if (res.data) {
        this.tracks = res.data.splice(0, 3);
        this.loader = false
      }
    });
  },
  data() {
    return {
      apiaddress: process.env.VUE_APP_Api_ADDRESS,
      tracks: [],
      loader: true,
      playmusic: null,
    };
  },
  components: {
    playerbox,
    loader
  },
  methods: {
    checkfollowandsave: function (e) {
      this.$emit("check", e);
    },
    formatNumber: function (num) {
      return num < 10 ? "0" + num : num.toString();
    },
    formattime: function (seconds) {
      let minutes = Math.floor(seconds / 60);
      let remainingSeconds = seconds % 60;

      let formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      let formattedSeconds =
        remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

      return `${formattedMinutes}:${formattedSeconds}`;
    },
    formatview: function (number) {
      if (number >= 1e6) {
        return (number / 1e6).toFixed(0) + "M";
      } else if (number >= 1e3) {
        return (number / 1e3).toFixed(0) + "K";
      } else {
        return number;
      }
    },
    play: function (id) {
      let data;

      data = {
        type: "track",
        id,
        time: 0,
      };

      axios
        .put(
          `${this.apiaddress}users/lastplay`,
          {
            data,
          },
          {
            headers: {
              jwt: Register.methods.getcookies("jwt"),
            },
          }
        )
        .then((res) => {
          if (res.data) {
            this.playmusic = id;
          }
        });
    },
    gototoptracks:function(){
      location.href = `/toptracks`
    }
  },
  mounted() {},
  props: ["data", "check"],
};
</script>

<style scoped>
* {
  overflow: hidden;
}
.monthly-box {
  height: 75px;
}
.monthly-img {
  width: 50px;
  height: 50px;
}
.monthly-text {
  width: 140px;
  text-align: left !important;
}

.monthly-text p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
}
.monthly-num {
  width: 35px;
  height: 45px;
}

.duration-box {
  width: 80px;
}

@media screen and (max-width: 767px) {
  .top-tracks,hr{
    display: none !important;
  }
}

</style>
