<template>
  <div id="parent" class="container mt-4 px-4">
    <section v-if="!loader" class="d-flex justify-content-between">
      <span class="text-uppercase color-blue fw-semibold fs-5"
        >Top {{ type }}</span
      >
    </section>
    <section v-if="!loader" class="mt-4 d-flex flex-column gap-3">
      <div v-if="data.length > 0" class="d-flex flex-column gap-3">
        <div
          v-for="(x, i) in data"
          :key="x"
          class="monthly-box d-flex gap-4 align-items-center justify-content-between"
        >
          <div class="d-flex gap-5 align-items-center">
            <div
              class="monthly-num d-flex justify-content-center align-items-center"
            >
              <span class="color-gray fs-1">{{ formatNumber(i + 1) }}</span>
            </div>
            <img
              class="monthly-img img-fluid rounded-3"
              :src="x.cover.url"
              alt=""
            />
            <div class="d-flex flex-column monthly-text">
              <p
                class="text-capitalize fs-5 fw-bold m-0 p-0 color-dark pointer"
                @click="gotottrack(x.artist.username, x.name)"
              >
                {{ x.name }}
              </p>
              <span
                @click="gotouser(x.artist.username)"
                class="text-capitalize color-gray pointer"
                >{{ x.artist.username }}</span
              >
            </div>
          </div>
          <div class="d-flex gap-4 align-items-center">
            <span class="me-3 text-capitalize monthplay-box"
              >{{ x.lastmonth.view }} plays in {{ x.lastmonth.name }}</span
            >

            <span class="me-3 text-capitalize plays-box"
              >{{ formatview(x.plays) }} plays</span
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
  name: "analyzeTopMusic",
  data() {
    return {
      apiaddress: info.Api_ADDRESS,
      data: [],
      loader: true,
    };
  },
  beforeMount() {
    this.getdata();
  },
  methods: {
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
    gotouser: function (username) {
      location.href = `/user/${username}`;
    },
    gotottrack: function (username, trackname) {
      location.href = `/user/${username}/${this.type}/${trackname}`;
    },
    getdata: function () {
      axios
        .get(`${this.apiaddress}track/toptracks/${this.type}`)
        .then((res) => {
          if (res.data) {
            this.data = res.data;
            const monthNames = [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ];
            this.data.forEach((e) => {
              const date = new Date();
              let lastMonthNumber = date.getMonth();

              if (e.monthlyListener.length > 0) {
                const lastmonth =
                  e.monthlyListener[e.monthlyListener.length - 1];
                const monthnum = lastmonth.date.split(" - ")[1];
                let view = 0;
                if (lastMonthNumber === Number(monthnum)) {
                  view = lastmonth.view;
                }
                const monthname = monthNames[lastMonthNumber];
                e.lastmonth = {
                  name: monthname,
                  view,
                };
              } else {
                e.lastmonth = {
                  name: monthNames[lastMonthNumber],
                  view: 0,
                };
              }
            });
            this.loader = false;
          }
        });
    },
  },
  props: ["type"],
  components: { loader },
  watch: {
    type: function () {
      this.loader = true;
      this.getdata();
    },
  },
};
</script>

<style scoped>
.monthly-img {
  width: 70px;
  height: 70px;
}
.monthly-text {
  width: 250px;
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
.plays-box {
  width: 100px;
}
.monthplay-box {
  width: 150px;
}
</style>
