<template>
  <div id="parent" class="container mt-4 px-4">
    <section class="d-flex justify-content-between">
      <span class="text-uppercase color-blue fw-semibold fs-5">home</span>
    </section>
    <section
      class="mt-4 d-flex justify-content-center flex-column align-items-start gap-4"
    >
      <h3 class="text-center fw-semibold">Slider</h3>

      <div class="d-flex gap-3 justify-content-start flex-wrap px-4">
        <button
          class="btn-add btn px-3 py-2 text-capitalize"
          @click="openslider('normal')"
        >
          Add slide
        </button>
        <div v-for="x in data.banners" :key="x">
          <img
            :src="x.banner.url"
            class="slider-show rounded-2 img-fluid pointer"
            alt=""
            @dblclick="removebanner(x._id)"
          />
        </div>
      </div>
      <div class="d-flex justify-content-center gap-2 align-items-center ms-5">
        <i class="fas fa-circle-info text-info"></i>
        <span class="text-capitalize fw-semibold"
          >You can remove banner with double click on it</span
        >
      </div>
    </section>
    <hr class="px-5" />
    <section
      class="mt-4 d-flex justify-content-center flex-column align-items-start gap-4"
    >
      <h3 class="text-center fw-semibold">Responsive Slider</h3>

      <div class="d-flex gap-3 justify-content-start flex-wrap px-4">
        <button
          class="btn-add btn px-3 py-2 text-capitalize"
          @click="openslider('responsive')"
        >
          Add slide
        </button>
        <div v-for="x in data.responsivebanners" :key="x">
          <img
            :src="x.banner.url"
            class="slider-show rounded-2 img-fluid pointer"
            alt=""
            @dblclick="removeresbanner(x._id)"
          />
        </div>
      </div>
      <div class="d-flex justify-content-center gap-2 align-items-center ms-5">
        <i class="fas fa-circle-info text-info"></i>
        <span class="text-capitalize fw-semibold"
          >You can remove banner with double click on it</span
        >
      </div>
    </section>
    <hr class="mx-5" />

    <section
      class="mt-4 d-flex justify-content-center flex-column align-items-start gap-4"
    >
      <h3 class="text-center fw-semibold text-capitalize">genres</h3>

      <div class="d-flex text-align justify-content-start gap-4 flex-wrap">
        <button
          class="btn-add btn px-3 py-2 text-capitalize ms-4"
          @click="openselect('genre')"
        >
          Add genre
        </button>
        <div
          v-for="x in data.genres"
          :key="x"
          class="px-3 py-2 rounded gap-2 d-flex justify-content-center align-items-center"
          :style="{ backgroundColor: x.color }"
        >
          <span class="text-capitalize text-white">{{ x.name }}</span>
          <i
            class="fas fa-close text-white pointer"
            @click="removegenre(x._id)"
          ></i>
        </div>
      </div>
    </section>
    <hr class="mx-5" />
    <section
      class="mt-4 d-flex justify-content-center flex-column align-items-start gap-4"
    >
      <h3 class="text-center fw-semibold text-capitalize">icons</h3>

      <div class="d-flex gap-4 flex-wrap">
        <button
          class="btn-add btn px-3 py-2 text-capitalize ms-4"
          @click="openselect('icon')"
        >
          Add icons
        </button>
        <div
          v-for="x in data.socialicon"
          :key="x"
          class="px-3 py-2 rounded gap-2 d-flex justify-content-center align-items-center icon-parent pointer"
        >
          <img :src="x.file.url" alt="" class="img-fluid img-social" />
          <span class="text-capitalize fw-semibold color-black">{{
            x.name
          }}</span>
          <i
            class="fa fas fa-close text-danger pointer"
            @click="removeicons(x._id)"
          ></i>
        </div>
      </div>
    </section>
    <hr class="mx-5" />
    <section
      class="mt-4 d-flex justify-content-center flex-column align-items-start gap-4"
    >
      <h3 class="text-center fw-semibold text-capitalize">show</h3>
      <div class="d-flex flex-wrap showparent ms-4">
        <div class="col-4 d-flex mt-2 align-items-center gap-2">
          <span class="text-capitalize fw-semibold fs-5">new music</span>
          <input
            type="checkbox"
            class="offscreen"
            name="x.username"
            id="newmusic"
            :checked="data.newMusic"
            @change="changeval('newMusic', $event.target.checked)"
          />
          <label class="switch" for="newmusic"></label>
        </div>
        <div class="col-4 d-flex mt-2 align-items-center gap-2">
          <span class="text-capitalize fw-semibold fs-5">trend music</span>
          <input
            type="checkbox"
            class="offscreen"
            name="x.username"
            id="trendmusic"
            :checked="data.trendMusic"
            @change="changeval('trendMusic', $event.target.checked)"
          />
          <label class="switch" for="trendmusic"></label>
        </div>
        <div class="col-4 d-flex mt-2 align-items-center gap-2">
          <span class="text-capitalize fw-semibold fs-5">trend podcast</span>
          <input
            type="checkbox"
            class="offscreen"
            name="x.username"
            id="trendpodcast"
            :checked="data.trendpodcast"
            @change="changeval('trendpodcast', $event.target.checked)"
          />
          <label class="switch" for="trendpodcast"></label>
        </div>
        <div class="col-4 d-flex mt-2 align-items-center gap-2">
          <span class="text-capitalize fw-semibold fs-5">top Artists</span>
          <input
            type="checkbox"
            class="offscreen"
            name="x.username"
            id="topArtists"
            :checked="data.topArtists"
            @change="changeval('topArtists', $event.target.checked)"
          />
          <label class="switch" for="topArtists"></label>
        </div>
        <div class="col-4 d-flex mt-2 align-items-center gap-3">
          <span class="text-capitalize fw-semibold fs-5">top Playlist</span>
          <input
            type="checkbox"
            class="offscreen"
            name="x.username"
            id="topPlaylist"
            :checked="data.topPlaylist"
            @change="changeval('topPlaylist', $event.target.checked)"
          />
          <label class="switch" for="topPlaylist"></label>
        </div>
      </div>
    </section>
    <hr class="mx-5" />
  
    <sliderPopups
      v-if="popups.slider"
      @close="popupcloser"
      :type="type"
      @reload="getdata()"
    />
    <selectPopup
      v-if="popups.select"
      @close="popupcloser"
      :type="type"
      @reload="getdata()"
    />
  </div>
</template>

<script>
import sliderPopups from "./homeSliderPopups.vue";
import selectPopup from "./homeSelectPopup.vue";

import info from "../../../default";
import axios from "axios";
import iziToast from "izitoast";

export default {
  name: "dashhome",
  beforeMount() {
    this.getdata();
  },
  data() {
    return {
      apiaddress: info.Api_ADDRESS,
      popups: {
        slider: false,
        select: false,
      },
      type: null,
      data: [],
      showfile: false,
    };
  },
  components: {
    sliderPopups,
    selectPopup,
  },
  methods: {
    openslider: function (e) {
      this.type = e;
      this.popups.slider = true;
    },
    popupcloser: function () {
      this.popups.slider = false;
      this.popups.select = false;
    },
    openselect: function (e) {
      this.type = e;
      this.popups.select = true;
    },
    getdata: function () {
      axios.get(`${this.apiaddress}base/`).then((res) => {
        this.data = res.data;
      });
    },
    goto: function (e) {
      location.href = e;
    },
    removebanner: function (id) {
      axios.delete(`${this.apiaddress}base/banner/${id}`).then((res) => {
        if (res.data) {
          iziToast.success({
            title: res.data.msg,
            position: "topRight",
          });
          this.getdata();
        } else {
          iziToast.error({
            title: res.data.msg,
            position: "topRight",
          });
        }
      });
    },
    removeresbanner: function (id) {
      axios.delete(`${this.apiaddress}base/resbanner/${id}`).then((res) => {
        if (res.data) {
          iziToast.success({
            title: res.data.msg,
            position: "topRight",
          });
          this.getdata();
        } else {
          iziToast.error({
            title: res.data.msg,
            position: "topRight",
          });
        }
      });
    },
    removegenre: function (id) {
      axios.delete(`${this.apiaddress}base/genre/${id}`).then((res) => {
        if (res.data) {
          iziToast.success({
            title: res.data.msg,
            position: "topRight",
          });
          this.getdata();
        } else {
          iziToast.error({
            title: res.data.msg,
            position: "topRight",
          });
        }
      });
    },
    removeicons: function (id) {
      axios.delete(`${this.apiaddress}base/socialicon/${id}`).then((res) => {
        if (res.data) {
          iziToast.success({
            title: res.data.msg,
            position: "topRight",
          });
          this.getdata();
        } else {
          iziToast.error({
            title: res.data.msg,
            position: "topRight",
          });
        }
      });
    },
    changeval(field, val) {
      axios
        .put(`${this.apiaddress}base/change/${field}&&${val}`)
        .then((res) => {
          if (res.data) {
            iziToast.success({
              title: res.data.msg,
              position: "topRight",
            });
            this.getdata();
          } else {
            iziToast.error({
              title: res.data.msg,
              position: "topRight",
            });
          }
        });
    },
   
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap");
.btn-add {
  background-color: var(--blue-main);
  color: white;
}
.img-parent {
  width: 860px;
  height: 308px;
}
.slider-img {
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
.slider-show {
  width: 120px;
  height: 65px;
  border: 2px solid var(--blue-main);
}
.icon-parent {
  border: 2px solid var(--blue-main);
}

.switch {
  margin-bottom: -4px;
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  background: red;
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: all 0.3s;
  border-radius: 20px;
  cursor: pointer;
}
.switch::after {
  content: "";
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 18px;
  /* background-color: rgba(0, 0, 0, 0.25); */
  background: var(--blue-main);

  top: 1px;
  left: 1px;
  transition: all 0.3s;
}
input[type="checkbox"]:checked + .switch::after {
  transform: translateX(20px);
}

input[type="checkbox"]:checked + .switch {
  background: #5c52ef85;
}
.offscreen {
  display: none;
}
.showparent div:nth-child(4n) input {
  background: red;
  position: relative;
  left: 5px;
}

.img-social {
  width: 32px;
}
.btn-favicon {
  background-color: var(--blue-main);
  color: white;
  width: 450px;
}
.img-favicon {
  width: 32px;
}
</style>
