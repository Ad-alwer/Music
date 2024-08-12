<template>
  <div id="parent" class="container px-5">
    <h4 class="text-capitalize fw-bold title mt-5">explore</h4>
    <loader v-if="loader" />
    <section v-else-if="seemore" class="seemore-parent">
      <i
        class="fas fa-solid fa-arrow-left text-danger mt-5 fs-5 pointer"
        @click="seemore = null"
      ></i>
      <div class="d-flex align-items-center flex-wrap gap-3 mt-2">
        <div
          v-for="(x, i) in seemore.val"
          :key="x"
          @click="seemoreclick(i)"
          class="d-flex justify-content-center align-items-center flex-column gap-1 col-3"
        >
          <img
            :src="x.cover.url"
            class="seemore rounded-4 img-img-fluid"
            alt=""
          />
          <span
            class="color-black text-capitalize text-center fw-bold seemore-name pointer swiper-text"
            >{{ x.name }}</span
          >
          <span
            @click="
              gotoartist(
                x.artist ? x.artist.username : x.tracks[0].artist.username
              )
            "
            class="text-capitalize text-center text-secondary seemore-username pointer swiper-subtext"
            >{{
              x.artist ? x.artist.username : x.tracks[0].artist.username
            }}</span
          >
        </div>
      </div>
    </section>
    <section v-else>
      <div v-if="data.newalbum.length > 0" id="album">
        <div class="d-flex justify-content-between pt-4">
          <span class="text-uppercase color-black fw-semibold">new Album</span>
          <span
            @click="openseemore(data.newalbum, 'album')"
            class="text-capitalize color-gray pointer color-blue"
            >See All</span
          >
        </div>
        <Swiper
          class="py-4"
          :modules="modules"
          :slides-per-view="responsive ? 2 : 3"
          :space-between="20"
          :scrollbar="{ draggable: true }"
          loop="true"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
          :autoplay="autoplay"
        >
          <swiper-slide
            v-for="x in data.newalbum"
            @click="gotoalbum(x.name, x.tracks[0].artist.username)"
            :key="x"
            data-swiper-autoplay="5000"
            class="swiper-playlist-child d-flex justify-content-center align-items-center flex-column pointer position-relative"
          >
            <img
              :src="x.cover.url"
              class="img-fluid swiper-img rounded-4 newalbum-img"
              alt=""
            />
            <div
              class="swiper-playlist-text d-flex flex-column align-items-center"
            >
              <p class="color-black text-capitalize swiper-text">
                {{ x.name }}
              </p>
              <span class="text-capitalize swiper-subtext">{{
                x.tracks[0].artist.username
              }}</span>
            </div>
          </swiper-slide>
        </Swiper>
      </div>
      <div v-if="data.newmusic.length > 0" id="music">
        <div class="d-flex justify-content-between pt-5">
          <span class="text-uppercase color-black fw-semibold">new music</span>
          <span
            @click="openseemore(data.newmusic, 'music')"
            class="text-capitalize color-gray pointer color-blue"
            >See All</span
          >
        </div>
        <Swiper
          class="py-4"
          :modules="modules"
          :slides-per-view="responsive ? 3 : 5"
          :space-between="20"
          :scrollbar="{ draggable: true }"
          loop="true"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
          :autoplay="autoplay"
        >
          <swiper-slide
            v-for="x in data.newmusic"
            @click="play(x._id)"
            :key="x"
            data-swiper-autoplay="2000"
            class="swiper-newmusic-child d-flex justify-content-center align-items-center flex-column pointer"
          >
            <img
              :src="x.cover.url"
              class="img-fluid swiper-img rounded-4 newtrack-img"
              alt=""
            />
            <p class="color-black text-capitalize swiper-text">{{ x.name }}</p>
            <span class="text-capitalize swiper-subtext"
              >{{ formatview(x.plays) }} palys</span
            >
          </swiper-slide>
        </Swiper>
      </div>
      <div v-if="data.newpodcast.length > 0" id="podcast">
        <div class="d-flex justify-content-between pt-5">
          <span class="text-uppercase color-black fw-semibold"
            >new podcast</span
          >
          <span
            @click="openseemore(data.newpodcast, 'podcast')"
            class="text-capitalize color-gray pointer color-blue"
            >See All</span
          >
        </div>
        <Swiper
          class="py-4"
          :modules="modules"
          :slides-per-view="responsive ? 3 : 5"
          :space-between="20"
          :scrollbar="{ draggable: true }"
          loop="true"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
          :autoplay="autoplay"
        >
          <swiper-slide
            v-for="x in data.newpodcast"
            :key="x"
            data-swiper-autoplay="2000"
            class="swiper-newmusic-child d-flex justify-content-center align-items-center flex-column pointer"
          >
            <img
              :src="x.cover.url"
              class="img-fluid swiper-img rounded-4 newtrack-img"
              alt=""
            />
            <p class="color-black text-capitalize swiper-text">{{ x.name }}</p>
            <span class="text-capitalize swiper-subtext"
              >{{ formatview(x.plays) }} palys</span
            >
          </swiper-slide>
        </Swiper>
      </div>
    </section>
  </div>
</template>

<script>
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/grid";

import axios from "axios";
import loader from "../loader.vue";
import Register from "../Register.vue";

export default {
  name: "explore",
  beforeMount() {
    axios.get(`${this.apiaddress}users/newtracksandalbum`).then((res) => {
      if (res.data) {
        this.data = res.data;
        this.loader = false;

        const url = location.hash;
        const id = url.substring(1);

        const datas = ["album", "music", "podcast"];
        const search = datas.find((e) => e === id.toLowerCase());

        if (location && search) {
          const element = document.getElementById(search);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    });
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener("resize", this.checkScreenSize);
  },
  data() {
    return {
      apiaddress: process.env.VUE_APP_Api_ADDRESS,
      pagination: true,
      draggable: true,

      autoplay: {
        delay: 5000,
      },
      data: [],
      seemore: null,
      loader: true,
      responsive: false,
    };
  },
  methods: {
    gotoalbum: function (albumname, userid) {
      location.href = `/user/${userid}/album/${albumname}`;
    },
    gotoplaylist: function (name, id) {
      location.href = `/user/${id}/playlist/${name}`;
    },
    openseemore: function (val, type) {
      this.seemore = { val: val.reverse(), type };
    },
    seemoreclick: function (index) {
      this.seemore.type === "album"
        ? this.gotoalbum(
            this.seemore.val[index].name,
            this.seemore.val[index].tracks[0].artist.username
          )
        : this.play(this.seemore.val[index]._id);
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
            this.$emit("changemusic", id);
          }
        });
    },
    gotoartist: function (username) {
      location.href = `/user/${username}`;
    },
    checkScreenSize: function () {
      this.responsive = window.matchMedia("(max-width: 768px)").matches;
    },
  },
  components: {
    Swiper,
    SwiperSlide,
    loader,
  },
  setup() {
    const onSwiper = () => {};
    const onSlideChange = () => {};
    return {
      onSwiper,
      onSlideChange,
      modules: [Navigation, Pagination, Scrollbar, A11y, Autoplay],
    };
  },
};
</script>

<style scoped>
.title {
  color: var(--blue-main);
}

.swiper-playlist-child span {
  font-size: 12px;
}
.swiper-playlist-child p {
  color: white;
  font-weight: bold;
  margin-bottom: 0 !important;
  font-size: 18px;
}
.swiper-playlist-child .swiper-playlist-text {
  position: absolute;
  color: white;
  bottom: 2%;
}

.swiper-newmusic-child span {
  font-size: 12px;
}
.swiper-newmusic-child p {
  color: var(-black-main);
  font-weight: bold;
  margin-bottom: 0 !important;
  font-size: 18px;
}

.newtrack-img {
  width: 158px;
  height: 158px;
}
.newalbum-img {
  width: 275px;
  height: 275px;
}

.seemore {
  width: 180px;
  height: 180px;
}

.seemore-username {
  margin-top: -7px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
}

.seemore-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 140px;
}

.swiper-text{
  white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 140px;
}

@media screen and (max-width: 767px) {
  #parent {
    margin-bottom: 66px;
    height: 78vh;
    overflow: auto !important;
    padding: 0 10px !important;
  }
  swiper {
    padding: 0 5px !important;
  }
  .title {
    margin: 10px 0px 5px 20px !important;
  }

  .newalbum-img {
    width: 170px;
    height: 170px;
  }

  .newtrack-img {
    width: 100px;
    height: 100px;
  }
  .seemore-parent {
    padding: 15px 10% !important;
  }
  .seemore {
    width: 90px;
    height: 90px;
  }
  .swiper-text {
    font-size: 11px !important;
    max-width: 60px;
  }

  .swiper-subtext {
    font-size: 10px !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 60px;
  }
}
</style>
