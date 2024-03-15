<template>
  <div id="parent" class="mt-4 container">
    <section class="slider d-flex px-5 ms-3 position-relative">
      <div class="img-parent rounded-4">
        <img
          class="slider-img rounded-4"
          src="../../assets/img/test/pinterestdownloader.com-1710335413.293773.jpg"
          alt=""
        />
      </div>

      <div class="parent-box">
        <div class="circle-box rounded-circle pointer"></div>
      </div>
    </section>
    <section class="mt-4 topartists px-5">
      <div class="d-flex justify-content-between">
        <span class="text-uppercase color-black fs-5 fw-semibold"
          >top artists</span
        >
        <span class="text-capitalize color-gray pointer">more list</span>
      </div>
      <Swiper
        class="py-4"
        :modules="modules"
        :slides-per-view="4"
        :space-between="10"
        :scrollbar="{ draggable: true }"
        loop="true"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        :autoplay="autoplay"
        centerInsufficientSlides="true"
        center-insufficient-slides="true"
        centered-slides-bounds="true"
        centered-slides="true"
      >
        <swiper-slide
          data-swiper-autoplay="2000"
          class="swiper-child d-flex justify-content-center align-items-center flex-column pointer"
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
          class="swiper-child d-flex justify-content-center align-items-center flex-column pointer"
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
          class="swiper-child d-flex justify-content-center align-items-center flex-column pointer"
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
          class="swiper-child d-flex justify-content-center align-items-center flex-column pointer"
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
          class="swiper-child d-flex justify-content-center align-items-center flex-column pointer"
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
    <section class="d-flex gap-5 w-100 mt-3">
      <div class="w-50">
        <div class="mt-4 topcollactions d-flex justify-content-between">
          <span class="text-uppercase color-black px-5 fs-5 fw-semibold"
            >Top Collection</span
          >
          <span class="text-capitalize color-gray pointer">More List</span>
        </div>
        <div class="mt-4  d-flex gap-4 px-5">
          <img
            src="../../assets/img/test/eminem.jpg"
            alt=""
            class="img-topcollactions rounded-4 col-4"
          />
          <img
            src="../../assets/img/test/eminem.jpg"
            alt=""
            class="img-topcollactions rounded-4 col-4"
          />
          <img
            src="../../assets/img/test/eminem.jpg"
            alt=""
            class="img-topcollactions rounded-4 col-4"
          />
        </div>
      </div>
      <div class="w-50 ">
        <div class="mt-4 topcollactions d-flex justify-content-between">
          <span class="text-uppercase color-black  fs-5 fw-semibold"
            >Top Genre</span
          >
          <span class="text-capitalize color-gray pointer">More List</span>
        </div>
        <div class="d-flex  mt-4 flex-wrap justify-content-evenly">
          <div
            class="d-flex justify-content-center align-items-center "
          >
            <p
              class="text-white p-3 text-capitalize rounded-3 bg-danger fs-5 rounded-3"
            >
              hiphop
            </p>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <p class="text-white p-3 text-capitalize rounded-3 bg-danger fs-5">
              hiphop
            </p>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <p class="text-white p-3 text-capitalize rounded-3 bg-danger fs-5">
              rock
            </p>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <p class="text-white p-3 text-capitalize rounded-3 bg-danger fs-5">
              hiphop
            </p>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <p class="text-white p-3 text-capitalize rounded-3 bg-danger fs-5">
              hiphop
            </p>
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

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/grid";
export default {
  name: "Content",

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
#parent {
  margin-top: 5% !important;
}
.img-parent {
  width: 724px;
  height: 308px;
  background-color: brown;
}
.slider-img {
  width: 800px;
  height: 308px;

  cursor: pointer;
}
.img-parent::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.006);
  cursor: pointer;
}
.parent-box {
  z-index: 999;
  position: absolute;
  top: 0;
  right: 14%;
  height: 100%;
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.circle-box {
  z-index: 999;
  width: 10px;
  height: 10px;
  background-color: #d0d0fb;
}
.swiper-child {
  width: 120px;
  /* background-color: aqua; */
}
.swiper-child p {
  color: var(--main-blavk);
  font-weight: bold;
  margin-bottom: 0 !important;
  font-size: 18px;
}
.swiper-child span {
  font-size: 12px;
}
.swiper-img {
  width: 160px !important;
  height: 160px !important;
  object-fit: cover;
}

.topcollactions {
  overflow-y: auto;
}
.img-topcollactions {
  /* width: 110px; */
  /* height: 110px; */
  position: relative;
}

/*  */
</style>
