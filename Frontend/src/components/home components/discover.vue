<template>
  <div id="parent" class="mt-4 container">
    <loader v-if="loader" />
    <section v-else>
      <div class="slider d-flex px-5 ms-3 position-relative">
        <div ref="sliderparent" class="img-parent rounded-4 d-flex gap-2">
          <img
            v-for="x in banner"
            :key="x"
            @click="goto(x.banner.link)"
            class="slider-img rounded-4 img-fluid w-100"
            :src="x.banner.url"
            alt=""
          />
        </div>

        <div class="parent-box d-flex flex-column gap-2">
          <div
            v-for="(x, i) in banner"
            :key="x"
            @click="changesliderbyclick(i)"
            class="circle-box rounded-circle pointer"
          ></div>
        </div>
      </div>
      <div class="mt-4 topartists px-4" v-if="data.topusers.length">
        <div class="d-flex justify-content-between">
          <span class="text-uppercase color-black fs-5 fw-semibold"
            >top artists</span
          >
        </div>
        <Swiper
          class="py-4"
          :modules="modules"
          :slides-per-view="responsive ? 5 : 8"
          :space-between="20"
          :scrollbar="{ draggable: true }"
          loop="true"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
          :autoplay="autoplay"
        >
          <swiper-slide
            v-for="(x, i) in data.topusers"
            :key="i"
            @click="gotoartist(x.username)"
            data-swiper-autoplay="2000"
            class="swiper-child d-flex justify-content-center align-items-center flex-column gap-1 pointer"
          >
            <img
              :src="
                x.profile ? x.profile : require('../../assets/img/icon.jpg')
              "
              class="img-thumbnail img-users rounded-circle"
              alt=""
            />
            <p class="color-black text-capitalize fw-semibold trim-text">
              {{ x.username }}
            </p>
          </swiper-slide>
        </Swiper>
      </div>
      <div class="d-flex gap-5 w-100 mt-3 togenreandtopplaylists-parent">
        <div class="w-50 topcollactions-parent" v-if="data.topplaylists.length">
          <div
            class="mt-4 topcollactions d-flex align-items-center justify-content-between ps-4"
          >
            <span class="text-uppercase color-black fs-5 fw-semibold"
              >Top Playlist</span
            >
          </div>
          <div class="mt-4 d-flex justify-content-between">
            <div
              class="col-4 d-flex flex-column align-items-center pointer"
              v-for="x in data.topplaylists.slice(0, 3)"
              :key="x"
              @click="gotoplaylist(x.name, x.creator)"
            >
              <img
                :src="x.cover.url"
                class="w-100 img-topcollactions rounded-4"
                alt=""
              />
              <span class="text-center fw-bold text-capitalize">{{ x.name }}</span>
            </div>
           
          </div>
        </div>
        <div class="w-50 topgenre-parent">
          <div
            class="mt-4 topcollactions d-flex justify-content-between align-items-center"
          >
            <span class="text-uppercase color-black fs-5 fw-semibold"
              >Top Genre</span
            >
          </div>
          <div class="d-flex mt-4 flex-wrap justify-content-evenly">
            <div
              v-for="x in data.topgenre"
              :key="x"
              class="d-flex justify-content-center align-items-center"
            >
              <p
                class="text-white p-3 text-capitalize rounded-3 fs-5 rounded-3"
                :style="{ 'background-color': x.color }"
              >
                {{ x.genre }}
              </p>
            </div>
          </div>
        </div>
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
export default {
  name: "Content",
  beforeMount() {
    axios.get(`${this.apiaddress}users/discover`).then((res) => {
      if (res.data) {
        this.data = res.data;
        this.loader = false;
        this.banner = this.responsive ? this.data.resbanner : this.data.banner;
        this.changescrollbytime();
      }
    });
  },
  mounted() {
    this.totalImages = this.banner.length;
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
      loader: true,
      responsive: false,
      banner: [],
      timeinterval: null,
    };
  },
  methods: {
    gotoartist: function (username) {
      location.href = `/user/${username}`;
    },
    gotoplaylist: function (name, id) {
      location.href = `/user/${id}/playlist/${name}`;
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
    changesliderbyclick(i) {
      const scrollContainer = this.$refs.sliderparent;
      const containerWidth = scrollContainer.clientWidth;

      const slideWidth = containerWidth + 8;

      scrollContainer.scrollTo({
        left: i * slideWidth,
        behavior: "smooth",
      });

      clearInterval(this.timeinterval);
      this.changescrollbytime();
    },
    changescrollbytime: function () {
      this.$nextTick(() => {
        this.timeinterval = setInterval(() => {
          const scrollContainer = this.$refs.sliderparent;
          if (scrollContainer instanceof Element) {
            const containerWidth = scrollContainer.clientWidth;
            const slideWidth = containerWidth + 8;

            const totalSlides = this.banner.length;
            const currentSlideIndex = Math.round(
              scrollContainer.scrollLeft / slideWidth
            );
            let nextLocation;

            if (currentSlideIndex === totalSlides - 1) {
              nextLocation = 0;
            } else {
              nextLocation = currentSlideIndex + 1;
            }

            scrollContainer.scrollTo({
              left: nextLocation * slideWidth,
              behavior: "smooth",
            });
          }
        }, 8000);
      });
    },

    goto: function (loc) {
      location.href = `${loc}`;
    },
    checkScreenSize: function () {
      clearInterval(this.timeinterval);

      this.responsive = window.matchMedia("(max-width: 768px)").matches;
      if (this.responsive) {
        this.banner = this.data.resbanner;
      } else {
        this.banner = this.data.banner;
      }
      const scrollContainer = this.$refs.sliderparent;
      if (scrollContainer) {
        this.$nextTick(() => {
          scrollContainer.scrollTo({
            left: 0,
            behavior: "smooth",
          });
          this.changescrollbytime();
        });
      }
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
#parent {
  margin-top: 5% !important;
}
.img-parent {
  max-width: 860px;
  position: relative;
  height: 308px;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  padding-bottom: 320px !important;
}

.slider-img {
  height: 308px;
  min-width: 100% !important;
  cursor: pointer;
  margin-bottom: 5px;
}
.img-parent::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.016);
  cursor: pointer;
}
.parent-box {
  z-index: 100;
  position: absolute;
  top: 0;
  right: 8%;
  height: 100%;
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.circle-box {
  z-index: 100;
  width: 10px;
  height: 10px;
  background-color: #d0d0fb;
}

.swiper-child {
  width: 140px;
}
.swiper-child p {
  color: var(--main-black);
  font-weight: bold;
  margin-bottom: 0 !important;
  font-size: 18px;
}
.swiper-child span {
  font-size: 12px;
  text-transform: capitalize;
}
.swiper-img {
  width: 90px !important;
  height: 90px !important;
  object-fit: cover;
}

.img-topcollactions {
  height: 115px !important;
  width: 115px !important;
  position: relative;
}

.img-parent::-webkit-scrollbar {
  width: 0;
}

.img-parent::-webkit-scrollbar-track {
  background-color: transparent;
}

.img-parent::-webkit-scrollbar-thumb {
  background-color: transparent;
  border-radius: 10px;
}

.trim-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 110px;
}
.topartists img {
    width: 90px;
    height: 90px;
  }

@media screen and (max-width: 767px) {
  .slider {
    padding: 2px 8px !important;
    margin: 0 !important;
  }
  .parent-box {
    right: 6%;
  }
  .topartists {
    margin-top: 10px !important;
  }

  .topartists img {
    width: 60px;
    height: 60px;
  }
  .topartists p {
    font-size: 16px !important;
  }
  .topartists .swiper-child {
    margin-left: 5px !important ;
  }
  .trim-text {
    max-width: 90px;
  }
  .togenreandtopplaylists-parent {
    flex-direction: column !important;
  }

  .topcollactions-parent,
  .topgenre-parent {
    width: 100% !important;
  }
  .topgenre-parent span {
    margin-left: 24px;
  }

  #parent {
    margin-bottom: 66px;
  }
}
</style>
