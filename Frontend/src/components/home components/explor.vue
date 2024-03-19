<template>
  <div id="parent" class="container px-5">
    <h4 class="text-capitalize fw-bold title mt-5">explore</h4>
    <section>
      <div class="d-flex justify-content-between pt-4">
        <span class="text-uppercase color-black fw-semibold"
          >Featured Playlists</span
        >
        <span class="text-capitalize color-gray pointer color-blue"
          >See All</span
        >
      </div>
      <Swiper
        class="py-4"
        :modules="modules"
        :slides-per-view="3"
        :space-between="20"
        :scrollbar="{ draggable: true }"
        loop="true"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        :autoplay="autoplay"
      >
        <swiper-slide
          data-swiper-autoplay="5000"
          class="swiper-playlist-child d-flex justify-content-center align-items-center flex-column pointer position-relative"
        >
          <img
            src="../../assets/img/test/eminem.jpg"
            class="img-fluid swiper-img rounded-4 w-100 h-100"
            alt=""
          />
          <div
            class="swiper-playlist-text d-flex flex-column align-items-center"
          >
            <p class="color-black text-capitalize">Name</p>
            <span class="text-capitalize">artist</span>
          </div>
        </swiper-slide>
        <swiper-slide
          data-swiper-autoplay="5000"
          class="swiper-playlist-child d-flex justify-content-center align-items-center flex-column pointer position-relative"
        >
          <img
            src="../../assets/img/test/eminem.jpg"
            class="img-fluid swiper-img rounded-4 w-100 h-100"
            alt=""
          />
          <div
            class="swiper-playlist-text d-flex flex-column align-items-center"
          >
            <p class="color-black text-capitalize">Name</p>
            <span class="text-capitalize">artist</span>
          </div>
        </swiper-slide>
        <swiper-slide
          data-swiper-autoplay="5000"
          class="swiper-playlist-child d-flex justify-content-center align-items-center flex-column pointer position-relative"
        >
          <img
            src="../../assets/img/test/eminem.jpg"
            class="img-fluid swiper-img rounded-4 w-100 h-100"
            alt=""
          />
          <div
            class="swiper-playlist-text d-flex flex-column align-items-center"
          >
            <p class="color-black text-capitalize">Name</p>
            <span class="text-capitalize">artist</span>
          </div>
        </swiper-slide>
        <swiper-slide
          data-swiper-autoplay="5000"
          class="swiper-playlist-child d-flex justify-content-center align-items-center flex-column pointer position-relative"
        >
          <img
            src="../../assets/img/test/eminem.jpg"
            class="img-fluid swiper-img rounded-4 w-100 h-100"
            alt=""
          />
          <div
            class="swiper-playlist-text d-flex flex-column align-items-center"
          >
            <p class="color-black text-capitalize">Name</p>
            <span class="text-capitalize">artist</span>
          </div>
        </swiper-slide>
        <swiper-slide
          data-swiper-autoplay="5000"
          class="swiper-playlist-child d-flex justify-content-center align-items-center flex-column pointer position-relative"
        >
          <img
            src="../../assets/img/test/eminem.jpg"
            class="img-fluid swiper-img rounded-4 w-100 h-100"
            alt=""
          />
          <div
            class="swiper-playlist-text d-flex flex-column align-items-center"
          >
            <p class="color-black text-capitalize">Name</p>
            <span class="text-capitalize">artist</span>
          </div>
        </swiper-slide>
        <swiper-slide
          data-swiper-autoplay="5000"
          class="swiper-playlist-child d-flex justify-content-center align-items-center flex-column pointer position-relative"
        >
          <img
            src="../../assets/img/test/eminem.jpg"
            class="img-fluid swiper-img rounded-4 w-100 h-100"
            alt=""
          />
          <div
            class="swiper-playlist-text d-flex flex-column align-items-center"
          >
            <p class="color-black text-capitalize">Name</p>
            <span class="text-capitalize">artist</span>
          </div>
        </swiper-slide>
      </Swiper>
    </section>
    <section>
      <div class="d-flex justify-content-between pt-5">
        <span class="text-uppercase color-black fw-semibold">new music</span>
        <span class="text-capitalize color-gray pointer color-blue"
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
          data-swiper-autoplay="2000"
          class="swiper-newmusic-child d-flex justify-content-center align-items-center flex-column pointer"
        >
          <img
            src="../../assets/img/test/eminem.jpg"
            class="img-fluid swiper-img rounded-4"
            alt=""
          />
          <p class="color-black">Eminem</p>
          <span>23M palys</span>
        </swiper-slide>
        <swiper-slide
          data-swiper-autoplay="5000"
          class="swiper-newmusic-child d-flex justify-content-center align-items-center flex-column pointer"
        >
          <img
            src="../../assets/img/test/eminem.jpg"
            class="img-fluid swiper-img rounded-4"
            alt=""
          />
          <p class="color-black">Eminem</p>
          <span>23M palys</span>
        </swiper-slide>
        <swiper-slide
          data-swiper-autoplay="2000"
          class="swiper-newmusic-child d-flex justify-content-center align-items-center flex-column pointer"
        >
          <img
            src="../../assets/img/test/eminem.jpg"
            class="img-fluid swiper-img rounded-4"
            alt=""
          />
          <p class="color-black">Eminem</p>
          <span>23M palys</span>
        </swiper-slide>
        <swiper-slide
          data-swiper-autoplay="2000"
          class="swiper-newmusic-child d-flex justify-content-center align-items-center flex-column pointer"
        >
          <img
            src="../../assets/img/test/eminem.jpg"
            class="img-fluid swiper-img rounded-4"
            alt=""
          />
          <p class="color-black">Eminem</p>
          <span>23M palys</span>
        </swiper-slide>
        <swiper-slide
          data-swiper-autoplay="2000"
          class="swiper-newmusic-child d-flex justify-content-center align-items-center flex-column pointer"
        >
          <img
            src="../../assets/img/test/eminem.jpg"
            class="img-fluid swiper-img rounded-4"
            alt=""
          />
          <p class="color-black">Eminem</p>
          <span>23M palys</span>
        </swiper-slide>
      </Swiper>
    </section>
    <section>
      <div class="d-flex justify-content-between pt-5">
        <span class="text-uppercase color-black fw-semibold"
          >Playlist You Need</span
        >
        <span class="text-capitalize color-gray pointer color-blue"
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
          data-swiper-autoplay="5000"
          class="swiper-playlist-child d-flex justify-content-center align-items-center flex-column pointer position-relative"
        >
          <img
            src="../../assets/img/test/eminem.jpg"
            class="img-fluid swiper-img rounded-4 w-100 h-100"
            alt=""
          />
          <div
            class="swiper-playlist-text d-flex flex-column align-items-center"
          >
            <p class="color-black text-capitalize">Name</p>
          </div>
        </swiper-slide>
        <swiper-slide
          data-swiper-autoplay="5000"
          class="swiper-playlist-child d-flex justify-content-center align-items-center flex-column pointer position-relative"
        >
          <img
            src="../../assets/img/test/eminem.jpg"
            class="img-fluid swiper-img rounded-4 w-100 h-100"
            alt=""
          />
          <div
            class="swiper-playlist-text d-flex flex-column align-items-center"
          >
            <p class="color-black text-capitalize">Name</p>
          </div>
        </swiper-slide> <swiper-slide
          data-swiper-autoplay="5000"
          class="swiper-playlist-child d-flex justify-content-center align-items-center flex-column pointer position-relative"
        >
          <img
            src="../../assets/img/test/eminem.jpg"
            class="img-fluid swiper-img rounded-4 w-100 h-100"
            alt=""
          />
          <div
            class="swiper-playlist-text d-flex flex-column align-items-center"
          >
            <p class="color-black text-capitalize">Name</p>
          </div>
        </swiper-slide> <swiper-slide
          data-swiper-autoplay="5000"
          class="swiper-playlist-child d-flex justify-content-center align-items-center flex-column pointer position-relative"
        >
          <img
            src="../../assets/img/test/eminem.jpg"
            class="img-fluid swiper-img rounded-4 w-100 h-100"
            alt=""
          />
          <div
            class="swiper-playlist-text d-flex flex-column align-items-center"
          >
            <p class="color-black text-capitalize">Name</p>
          </div>
        </swiper-slide> <swiper-slide
          data-swiper-autoplay="5000"
          class="swiper-playlist-child d-flex justify-content-center align-items-center flex-column pointer position-relative"
        >
          <img
            src="../../assets/img/test/eminem.jpg"
            class="img-fluid swiper-img rounded-4 w-100 h-100"
            alt=""
          />
          <div
            class="swiper-playlist-text d-flex flex-column align-items-center"
          >
            <p class="color-black text-capitalize">Name</p>
          </div>
        </swiper-slide> <swiper-slide
          data-swiper-autoplay="5000"
          class="swiper-playlist-child d-flex justify-content-center align-items-center flex-column pointer position-relative"
        >
          <img
            src="../../assets/img/test/eminem.jpg"
            class="img-fluid swiper-img rounded-4 w-100 h-100"
            alt=""
          />
          <div
            class="swiper-playlist-text d-flex flex-column align-items-center"
          >
            <p class="color-black text-capitalize">Name</p>
          </div>
        </swiper-slide> <swiper-slide
          data-swiper-autoplay="5000"
          class="swiper-playlist-child d-flex justify-content-center align-items-center flex-column pointer position-relative"
        >
          <img
            src="../../assets/img/test/eminem.jpg"
            class="img-fluid swiper-img rounded-4 w-100 h-100"
            alt=""
          />
          <div
            class="swiper-playlist-text d-flex flex-column align-items-center"
          >
            <p class="color-black text-capitalize">Name</p>
          </div>
        </swiper-slide> <swiper-slide
          data-swiper-autoplay="5000"
          class="swiper-playlist-child d-flex justify-content-center align-items-center flex-column pointer position-relative"
        >
          <img
            src="../../assets/img/test/eminem.jpg"
            class="img-fluid swiper-img rounded-4 w-100 h-100"
            alt=""
          />
          <div
            class="swiper-playlist-text d-flex flex-column align-items-center"
          >
            <p class="color-black text-capitalize">Name</p>
          </div>
        </swiper-slide> <swiper-slide
          data-swiper-autoplay="5000"
          class="swiper-playlist-child d-flex justify-content-center align-items-center flex-column pointer position-relative"
        >
          <img
            src="../../assets/img/test/eminem.jpg"
            class="img-fluid swiper-img rounded-4 w-100 h-100"
            alt=""
          />
          <div
            class="swiper-playlist-text d-flex flex-column align-items-center"
          >
            <p class="color-black text-capitalize">Name</p>
          </div>
        </swiper-slide>
      </Swiper>
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

export default {
  name: "explore",
  data() {
    return {
      pagination: true,
      draggable: true,

      autoplay: {
        delay: 5000,
      },
      arr: [],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
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
/* .swiper-img {
  width: 180px !important;
  height: 180px !important;
  object-fit: cover;
} */

.swiper-newmusic-child span {
  font-size: 12px;
}
.swiper-newmusic-child p {
  color: var(-black-main);
  font-weight: bold;
  margin-bottom: 0 !important;
  font-size: 18px;
}
</style>
