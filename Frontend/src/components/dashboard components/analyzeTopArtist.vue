<template>
  <div id="parent" class="container mt-4 px-4">
    <section v-if="!loader" class="d-flex justify-content-between">
      <span class="text-uppercase color-blue fw-semibold fs-5"
        >Top Artists</span
      >
    </section>
    <section v-if="!loader">
      <div
        v-if="data.length > 0"
        class="mt-4 d-flex gap-3 justify-content-between flex-wrap"
      >
        <div
          @click="gotouser(x.username)"
          v-for="(x, i) in data"
          :key="x"
          class="monthly-box d-flex gap-3 align-items-center col-5"
        >
          <div
            class="monthly-num d-flex justify-content-center align-items-center"
          >
            <span class="color-gray fs-1">{{ formatNumber(i + 1) }}</span>
          </div>
          <img
            class="monthly-img img-fluid rounded-circle"
            :src="x.profile ? x.profile : require('../../assets/img/icon.jpg')"
            alt=""
          />
          <div class="d-flex flex-column monthly-text">
            <p class="text-capitalize fs-5 fw-bold m-0 p-0 color-dark pointer">
              {{ x.username }}
            </p>
            <span class="text-capitalize color-gray pointer"
              >{{ formatview(x.subscribe.length) }} followers</span
            >
          </div>
        </div>
      </div>
      <div
        v-else
        class="d-flex justify-content-center align-items-center mt-5 pt-5"
      >
        <img src="../../assets/img/empty.png" alt="" />
      </div>
    </section>
    <loader v-else />
  </div>
</template>

<script>
import axios from "axios";
import info from "../../../default";

import loader from "../loader.vue";
export default {
  name: "analyzeTopArtist",
  beforeMount() {
    axios.get(`${this.apiaddress}users/topartist`).then((res) => {
      if (res.data) {
        this.data = res.data;
        this.loader = false;
      }
    });
  },
  data() {
    return {
      apiaddress: info.Api_ADDRESS,
      data: [],
      loader: true,
    };
  },
  methods: {
    gotouser: function (username) {
      location.href = `/user/${username}`;
    },
    formatNumber: function (num) {
      return num < 10 ? "0" + num : num.toString();
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
  },
  components: {
    loader,
  },
};
</script>

<style scoped>
.monthly-img {
  width: 70px;
  height: 70px;
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

@media screen and (max-width: 767px) {
  #parent {
    margin-bottom: 68px;
  }
  .monthly-box {
    width: 100%;
    font-size: 16px !important;
  }
  .monthly-img {
  width: 50px;
  height: 50px;
}
 
}
</style>
