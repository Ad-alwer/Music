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
          class="monthly-box d-flex gap-4 align-items-center justify-content-between"
          v-for="(x, i) in data"
          :key="x"
        >
          <div class="d-flex gap-5 align-items-center detail-parent">
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
                @click="
                  gotottrack(
                    x.artist ? x.artist : x.tracks[0].artist.username,
                    x.name
                  )
                "
                class="text-capitalize fs-5 fw-bold m-0 p-0 color-dark pointer trackname"
              >
                {{ x.name }}
              </p>
              <span
                @click="
                  gotouser(x.artist ? x.artist : x.tracks[0].artist.username)
                "
                class="text-capitalize color-gray pointer username"
                >{{ x.artist ? x.artist : x.tracks[0].artist.username }}</span
              >
            </div>
          </div>
          <div class="d-flex gap-4 align-items-center">
            <span class="text-capitalize trackshow-span"
              >{{ x.tracks.length }} Tracks</span
            >
            <span v-if="type === 'album'" class="text-capitalize monthplay-span"
              >{{ formatview(x.lastmonth.view) }} plays in
              {{ x.lastmonth.name }}</span
            >

            <span class="text-capitalize plays-span"
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
  name: "analyzeTopAlbum",
  beforeMount() {
    this.getdata();
  },
  data() {
    return {
      apiaddress: info.Api_ADDRESS,
      data: [],
      loader: true,
    };
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
      this.loader = true;
      if (this.type === "album") {
        axios.get(`${this.apiaddress}album/topalbum`).then((res) => {
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
            const date = new Date();
            let lastMonthNumber = date.getMonth();
            this.data.forEach((album) => {
              album.artist = album.tracks[0].artist.username
              let view = 0;
              album.tracks.forEach((track) => {
                const lastmonth =
                  track.monthlyListener[track.monthlyListener.length - 1];
                if (!lastmonth) {
                  album.lastmonth = {
                    name: monthNames[lastMonthNumber],
                    view: 0,
                  };
                  return;
                }
                const monthnum = lastmonth.date.split(" - ")[1];
                if (lastMonthNumber === Number(monthnum)) {
                  view += lastmonth.view;
                }
              });
              album.lastmonth = {
                name: monthNames[lastMonthNumber],
                view,
              };
            });
            this.loader = false; 
          }
        });
      } else {
        axios
          .get(`${this.apiaddress}playlist/topplaylist`)
          .then(async (res) => {
            if (res.data) {
              this.data = res.data;
              await Promise.all(
                this.data.map(async (e) => {
                  const response = await axios.get(
                    `${this.apiaddress}users/getusername/${e.creator}`
                  );
                  if (response.data) {
                    e.artist = response.data;
                  }
                })
              );
              this.loader = false;
            }
          });
      }
    },
  },
  props: ["type"],
  watch: {
    type: function () {
      this.loader = true;
      this.getdata();
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
  width: 220px;
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
.trackshow-span {
  width: 75px;
}
.monthplay-span {
  width: 150px;
}
.plays-span {
  width: 80px;
}

@media screen and (max-width: 767px) {
  #parent {
    margin: 5px 10px 68px 10px !important;
  }
  .monthly-num {
    width: 25px;
    height: 35px;
  }
  .monthly-num span {
    font-size: 24px !important;
  }
  .monthly-img {
    width: 50px;
    height: 50px;
  }
  .trackname {
    font-size: 16px !important;
  }
  .username {
    font-size: 14px !important;
  }
  .monthplay-span {
    font-size: 14px !important;
    width: 130px;
  }
  .plays-span {
    font-size: 14px !important;
    width: 70px;
  }
  .detail-parent {
    gap: 16px !important;
  }

  .monthly-box {
    gap: 8px !important;
  }
  .monthly-text {
    width: 140px;
  }
  .trackshow-span {
    font-size: 14px !important;
    width: 75px;
  }
}
</style>
