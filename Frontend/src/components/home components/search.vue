<template>
  <div id="parent" class="container px-5 mt-4">
    <section class="d-flex justify-content-center">
      <div
        class="search-parent d-flex rounded-3 px-2 py-1 justify-content-between mt-1 ms-3 align-items-center"
      >
        <input
          type="text"
          class="search-input"
          maxlength="69"
          placeholder="Search ..."
          ref="searchinp"
        />
        <svg
          @click="search($refs.searchinp.value)"
          class="search-icon pointer"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 19L13.8571 13.8571M8.71429 16.4286C4.4538 16.4286 1 12.9748 1 8.71429C1 4.4538 4.4538 1 8.71429 1C12.9748 1 16.4286 4.4538 16.4286 8.71429C16.4286 12.9748 12.9748 16.4286 8.71429 16.4286Z"
            stroke="#B3B3BC"
            stroke-width="2"
          />
        </svg>
      </div>
    </section>
    <loader v-if="loader" />

    <section v-else-if="seemore" class="mx-2">
      <i
        class="fas fa-solid fa-arrow-left text-danger mt-5 fs-5 pointer"
        @click="seemore = null"
      ></i>
      <div v-if="seemore.val.length > 0" class="d-flex align-items-center flex-wrap gap-3 mt-2">

        <div
          v-for="x in seemore.val"
          :key="x"
          class="d-flex justify-content-center flex-column gap-1"
        >
          <img
            :src="
              x.cover
                ? x.cover.url
                : x.profile
                ? x.profile
                : require('../../assets/img/icon.jpg')
            "
            :class="
              x.cover
                ? 'seemore rounded-4 img-img-fluid'
                : 'seemore-profile img-thumbnail rounded-circle'
            "
            alt=""
          />
          <p class="text-center text-capitalize fw-semibold">
            {{ x.username ? x.username : x.name }}
          </p>
        </div>
      </div>
      <div v-else class="d-flex justify-content-center align-items-center">
        <img src="../../assets/img/empty.png" class="img-fluid" alt="" />
      </div>
    </section>
    <section
      v-else-if="
        !loader &&
        data &&
        (data.users.length > 0 ||
          data.tracks.length > 0 ||
          data.albums.length > 0 ||
          data.playlists.length > 0)
      "
    >
      <div v-if="data.users.length > 0">
        <div class="d-flex justify-content-between pt-2 mt-4">
          <span class="text-uppercase color-black fw-semibold">Members</span>
          <span
            @click="openseemore(data.users, 'user')"
            class="text-capitalize color-gray pointer color-blue"
            >See All</span
          >
        </div>
        <Swiper
          class="py-4"
          :modules="modules"
          :slides-per-view="8"
          :space-between="20"
          :scrollbar="{ draggable: true }"
          loop="true"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
          :autoplay="autoplay"
        >
          <swiper-slide
            v-for="x in data.users"
            @click="gotoartist(x.username)"
            :key="x"
            data-swiper-autoplay="2000"
            class="swiper-members-child d-flex justify-content-center align-items-center flex-column pointer"
          >
            <img
              :src="
                x.profile ? x.profile : require('../../assets/img/icon.jpg')
              "
              class="img-thumbnail swiper-img rounded-circle user-img"
              alt=""
            />
            <p class="color-black">{{ x.username }}</p>
          </swiper-slide>
        </Swiper>
      </div>
      <div v-if="data.tracks.length > 0">
        <div class="d-flex justify-content-between pt-4">
          <span class="text-uppercase color-black fw-semibold">Tracks</span>
          <span
            @click="openseemore(data.tracks, 'track')"
            class="text-capitalize color-gray pointer color-blue"
            >See All</span
          >
        </div>
        <Swiper
          class="py-4"
          :modules="modules"
          :slides-per-view="6"
          :space-between="20"
          :scrollbar="{ draggable: true }"
          loop="true"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
          :autoplay="autoplay"
        >
          <swiper-slide
            @click="play(x._id)"
            v-for="x in data.tracks"
            :key="x"
            data-swiper-autoplay="2000"
            class="swiper-tracks-child d-flex justify-content-center align-items-center flex-column pointer"
          >
            <img
              :src="x.cover.url"
              class="img-fluid swiper-img rounded-4 tracks-img"
              alt=""
            />
            <p class="color-black">{{ x.name }}</p>
            <span>{{ x.artist.username }}</span>
          </swiper-slide>
        </Swiper>
      </div>
      <div v-if="data.albums.length > 0">
        <div class="d-flex justify-content-between pt-2">
          <span class="text-uppercase color-black fw-semibold">Albums</span>
          <span
            @click="openseemore(data.albums, 'album')"
            class="text-capitalize color-gray pointer color-blue"
            >See All</span
          >
        </div>
        <Swiper
          class="py-4"
          :modules="modules"
          :slides-per-view="5"
          :space-between="20"
          :scrollbar="{ draggable: true }"
          loop="true"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
          :autoplay="autoplay"
        >
          <swiper-slide
            v-for="x in data.albums"
            :key="x"
            @click="gotoalbum(x.name, x.tracks[0].artistid)"
            data-swiper-autoplay="2000"
            class="swiper-albums-child d-flex justify-content-center align-items-center flex-column pointer"
          >
            <img
              :src="x.cover.url"
              class="img-fluid swiper-img rounded-4 albumandplaylist-img"
              alt=""
            />
            <div
              class="swiper-albums-text d-flex flex-column align-items-center"
            >
              <p class="text-capitalize">{{ x.name }}</p>
            </div>
          </swiper-slide>
        </Swiper>
      </div>
      <div v-if="data.playlists.length > 0">
        <div class="d-flex justify-content-between pt-2">
          <span class="text-uppercase color-black fw-semibold">Playlist</span>
          <span
            @click="openseemore(data.playlists, 'playlist')"
            class="text-capitalize color-gray pointer color-blue"
            >See All</span
          >
        </div>
        <Swiper
          class="py-4"
          :modules="modules"
          :slides-per-view="5"
          :space-between="20"
          :scrollbar="{ draggable: true }"
          loop="true"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
          :autoplay="autoplay"
        >
          <swiper-slide
            v-for="x in data.playlists"
            :key="x"
            @click="gotoplaylist(x.name, x.creator)"
            data-swiper-autoplay="2000"
            class="swiper-albums-child d-flex justify-content-center align-items-center flex-column pointer"
          >
            <img
              :src="x.cover.url"
              class="img-fluid swiper-img rounded-4 albumandplaylist-img"
              alt=""
            />
            <div
              class="swiper-albums-text d-flex flex-column align-items-center"
            >
              <p class="text-capitalize">{{ x.name }}</p>
            </div>
          </swiper-slide>
        </Swiper>
      </div>
    </section>
    <section
      v-else-if="!loader"
      class="d-flex justify-content-center pt-5 mt-5"
    >
      <img src="../../assets/img/empty.png" class="img-fluid" alt="" />
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

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/grid";

import axios from "axios";
import info from "../../../default";
import Register from "../Register.vue";
import loader from "../loader.vue";
export default {
  name: "search",
  beforeMount() {
    const search = location.pathname.split("/")[2];

    if (search) {
      this.search(search);
    }
  },
  methods: {
    search: function (value) {
      if (value) {
        this.loader = true;
        axios.get(`${this.apiaddress}users/fullsearch/${value}`).then((res) => {
          res.data ? (this.data = res.data) : null;
          this.$refs.searchinp.value = value;

          if (this.seemore) {
            this.seemore.val =
              this.seemore.type === "user"
                ? (this.seemore.val = res.data.users)
                : this.seemore.type === "album"
                ? (this.seemore.val = res.data.albums)
                : this.seemore.type === "playlist"
                ? (this.seemore.val = res.data.playlists)
                : (this.seemore.val = res.data.tracks);
          }

          this.loader = false;

        });
      }
    },
    gotoartist: function (username) {
      location.href = `/user/${username}`;
    },
    play: function (id) {
      let data = {
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
    gotoalbum: function (albumname, userid) {
      location.href = `/user/${userid}/album/${albumname}`;
    },
    gotoplaylist: function (name, id) {
      location.href = `/user/${id}/playlist/${name}`;
    },
    openseemore: function (val, type) {
      this.seemore = { val: val.reverse(), type };
    },
  },
  data() {
    return {
      apiaddress: info.Api_ADDRESS,
      pagination: true,
      draggable: true,
      autoplay: {
        delay: 5000,
      },
      data: null,
      loader: false,
      seemore: null,
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    loader,
  },
  setup() {
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log("slide change");
    };
    return {
      onSwiper,
      onSlideChange,
      modules: [Navigation, Pagination, Scrollbar, A11y, Autoplay],
    };
  },
};
</script>

<style scoped>
.search-icon {
  width: 18px;
  height: 18px;
}
.search-input {
  caret-color: var(--blue-main);
  width: 750px;

  color: var(--gray-main);
}
.search-parent {
  width: 800px;
  height: 45px;
  border: 1px solid var(--gray-main);
}

/* .swiper-members-child img{
    height: 120px;
} */
.swiper-members-child span {
  font-size: 12px;
}
.swiper-members-child p {
  font-weight: bold;
  margin-bottom: 0 !important;
  font-size: 16px;
}

.swiper-tracks-child span {
  font-size: 12px;
}
.swiper-tracks-child p {
  font-weight: bold;
  margin-bottom: 0 !important;
  font-size: 16px;
}

.swiper-albums-child p {
  color: var(-black-main);
  font-weight: bold;
  margin-bottom: 0 !important;
  font-size: 18px;
}
.swiper-albums-child .swiper-albums-text {
  position: absolute;
  color: white;
  bottom: 2%;
}

.user-img {
  width: 90px;
  height: 90px;
}
.tracks-img {
  width: 128px;
  height: 128px;
}
.albumandplaylist-img {
  width: 158px;
  height: 158px;
}
.seemore {
  width: 120px;
  height: 120px;
}

.seemore-profile {
  width: 90px;
  height: 90px;
}
</style>
