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
        />
        <svg
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
    <section>
      <div class="d-flex justify-content-between pt-2 mt-4">
        <span class="text-uppercase color-black fw-semibold">Members</span>
        <span class="text-capitalize color-gray pointer color-blue"
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
          data-swiper-autoplay="2000"
          class="swiper-members-child d-flex justify-content-center align-items-center flex-column pointer"
        >
          <img
            src="../../assets/img/test/eminem.jpg"
            class="img-thumbnail swiper-img rounded-circle"
            alt=""
          />
          <p class="color-black">Eminem</p>
        </swiper-slide>
      </Swiper>
    </section>
    <section>
      <div class="d-flex justify-content-between pt-4">
        <span class="text-uppercase color-black fw-semibold">Tracks</span>
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
          data-swiper-autoplay="2000"
          class="swiper-tracks-child d-flex justify-content-center align-items-center flex-column pointer"
        >
          <img
            src="../../assets/img/test/eminem.jpg"
            class="img-fluid swiper-img rounded-4"
            alt=""
          />
          <p class="color-black">Trackname</p>
          <span>Eminem</span>
        </swiper-slide>
      </Swiper>
    </section>
    <section>
      <div class="d-flex justify-content-between pt-2">
        <span class="text-uppercase color-black fw-semibold">Albums</span>
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
          class="swiper-albums-child d-flex justify-content-center align-items-center flex-column pointer"
        >
          <img
            src="../../assets/img/test/eminem.jpg"
            class="img-fluid swiper-img rounded-4"
            alt=""
          />
          <div class="swiper-albums-text d-flex flex-column align-items-center">
            <p class="text-capitalize">Name</p>
            <span class="text-capitalize">Artist</span>
          </div>
        </swiper-slide>
      </Swiper>
    </section>
    <section>
      <div class="d-flex justify-content-between pt-2">
        <span class="text-uppercase color-black fw-semibold">Playlist</span>
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
          class="swiper-albums-child d-flex justify-content-center align-items-center flex-column pointer"
        >
          <img
            src="../../assets/img/test/eminem.jpg"
            class="img-fluid swiper-img rounded-4"
            alt=""
          />
          <div class="swiper-albums-text d-flex flex-column align-items-center">
            <p class="text-capitalize">Name</p>
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
  name: "search",
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
</style>
