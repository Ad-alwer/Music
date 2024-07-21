<template>
  <loader v-if="loader" />
  <section v-else class="parent px-3">
    <h4 class="text-capitalize fw-bold title mt-5">Top tracks</h4>
    <div class="mt-4">
      <div
        class="monthly-box d-flex gap-4 align-items-center justify-content-between mt-3"
        v-for="(x, i) in data"
        :key="x"
      >
     
        <div class="d-flex gap-4 align-items-center" @click="play(x._id)">
            <div
            class="monthly-num d-flex justify-content-center align-items-center"
          >
            <span class="color-gray fs-3">{{ formatNumber(i + 1) }}</span>
          </div>
          <img
            class="monthly-img img-fluid rounded-3"
            :src="x.cover.url"
            alt=""
          />
          <div class="d-flex flex-column monthly-text">
            <p class="text-capitalize fs-5 fw-bold m-0 p-0 color-dark pointer">
              {{ x.name }}
            </p>
          </div>
        </div>
        <div class="d-flex gap-4 align-items-center position-relative jusc">
          <span class="me-3 text-capitalize monthly-time text-center"
            >{{ formattime(x.duration ? x.duration : x.track.duration) }}
          </span>
          <span class="me-3 text-capitalize monthly-play text-center"
            >{{ formatview(x.plays) }} plays</span
          >
          <div>
            <img
              class="pointer opacity-25 bg-red"
              v-if="x.artist.toLowerCase() === user.username.toLowerCase()"
              src="../../assets/icons/like.png"
              alt=""
            />
            <img
              class="pointer"
              v-else-if="x.checklike"
              src="../../assets/icons/like.png"
              alt=""
              @click="like(x.checklike, x._id)"
            />
            <img
              class="pointer"
              v-else
              src="../../assets/icons/unlike.png"
              alt=""
              @click="like(x.checklike, x._id)"
            />
          </div>
          <svg
            class="pointer svg-more"
            width="18"
            height="6"
            viewBox="0 0 18 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            @click.prevent="openmore(i)"
          >
            <circle cx="3" cy="3" r="3" fill="#B3B3BC" />
            <circle cx="15" cy="3" r="3" fill="#B3B3BC" />
          </svg>
          <ul v-if="x.showmore" class="more-list rounded-3 bg-white">
            <li
              @click="play(x._id)"
              class="fw-semibold text-capitalize px-2 py-2 li-child"
            >
              play
            </li>

            <li
              v-if="x.artist.toLowerCase() !== user.username.toLowerCase()"
              @click="save(x.checksave, x._id)"
              class="fw-semibold text-capitalize px-2 py-1 li-child"
            >
              {{ x.checksave ? "Unsave" : "save" }}
            </li>

            <li
              v-if="x.artist.toLowerCase() !== user.username.toLowerCase()"
              class="fw-semibold text-capitalize px-2 py-1 li-child"
              @click="like(x.checklike, x._id)"
            >
              {{ x.checklike ? "Unlike" : "like" }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div></div>
  </section>
</template>

<script>
import axios from "axios";
import info from "../../../default";
import Register from "../Register.vue";
import iziToast from "izitoast";

import loader from "../loader.vue";
export default {
  name: "toptracks",
  beforeMount() {
    this.getuser();
  },
  mounted() {
    document.addEventListener("click", (e) => {
      e.target.classList.contains("li-child") ||
      e.target.classList.contains("more")
        ? null
        : this.closeallmore();
    });
  },
  data() {
    return {
      apiaddress: info.Api_ADDRESS,
      data: [],
      user: [],
      loader: true,
    };
  },
  methods: {
    getuser: function () {
      axios
        .get(`${this.apiaddress}users/user`, {
          headers: {
            jwt: Register.methods.getcookies("jwt"),
          },
        })
        .then((res) => {
          this.user = res.data;
          axios.get(`${this.apiaddress}users/toptracks`).then((res) => {
            if (res.data) {
              this.data = res.data;
              this.checklike();
              this.checksave();
              this.loader = false;
            }
          });
        });
    },
    formatNumber: function (num) {
      return num < 10 ? "0" + num : num.toString();
    },
    formattime: function (seconds) {
      let minutes = Math.floor(seconds / 60);
      let remainingSeconds = seconds % 60;

      let formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      let formattedSeconds =
        remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

      return `${formattedMinutes}:${formattedSeconds}`;
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
    openmore: function (i) {
      this.data.forEach((e) => {
        e.showmore = false;
      });
      !this.selecteddata
        ? (this.data[i].showmore = true)
        : (this.selecteddata.tracks[i].showmore = true);
    },
    closeallmore: function () {
      this.data.forEach((e) => {
        e.showmore = false;
      });

      this.detail
        ? this.selecteddata.tracks.forEach((e) => (e.showmore = false))
        : null;
    },
    play: function (id) {
      this.closeallmore();
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
    checklike: function () {
      let search;
      this.data.forEach((e) => {
        search = this.user.likes.find((track) => {
          return e._id == track;
        });
        e.checklike = search ? true : false;
      });
    },
    checksave: function () {
      this.data.forEach((e) => {
        let search = this.user.saveTracks.find((track) => {
          return e._id === track;
        });
        e.checksave = search ? true : false;
      });
    },
    like: function (check, id) {
      this.closeallmore();
      if (check) {
        axios
          .put(
            `${this.apiaddress}track/unlike/${id}`,
            {},
            {
              headers: {
                jwt: Register.methods.getcookies("jwt"),
              },
            }
          )
          .then((res) => {
            if (res.data) {
              this.getuser();
              this.$emit("check", {
                type: "like",
                id,
              });
            }
          });
      } else {
        axios
          .put(
            `${this.apiaddress}track/like/${id}`,
            {},
            {
              headers: {
                jwt: Register.methods.getcookies("jwt"),
              },
            }
          )
          .then((res) => {
            if (res.data) {
              this.getuser();
              this.$emit("check", {
                type: "like",
                id,
              });
            }
          });
      }
    },
    save: function (check, id) {
      this.closeallmore();

      if (check) {
        axios
          .put(
            `${this.apiaddress}track/removesavetrack/${id}`,
            {},
            {
              headers: {
                jwt: Register.methods.getcookies("jwt"),
              },
            }
          )
          .then((res) => {
            this.getuser();
            if (res.data) {
              this.$emit("check", {
                type: "save",
                id,
              });
              iziToast.success({
                title: "Unsave Successfully",
                position: "topRight",
              });
            }
          });
      } else {
        axios
          .put(
            `${this.apiaddress}track/savetrack/${id}`,
            {},
            {
              headers: {
                jwt: Register.methods.getcookies("jwt"),
              },
            }
          )
          .then((res) => {
            if (res.data) {
              this.$emit("check", {
                type: "save",
                id,
              });
              iziToast.success({
                title: "Save Successfully",
                position: "topRight",
              });
            }
            this.getuser();
          });
      }
    },
  },
  components: { loader },
  props: ["check"],
  watch: {
    check: function () {
      this.getuser();
    },
  },
};
</script>

<style scoped>
.parent {
  height: 90vh;
  overflow-y: auto;
}
.monthly-img {
  width: 50px;
  height: 50px;
}
.monthly-num {
  width: 35px;
  height: 45px;
}
.monthly-text {
  width: 220px;
  text-align: left !important;
}
.monthly-play {
  width: 120px;
}
.monthly-time {
  width: 50px;
}

.svg-more {
  transform: rotate(90deg);
  width: 50px;
}

.more-list {
  position: absolute;
  right: 45px;
  top: -12px;
  z-index: 500;
  border: 2px solid var(--blue-main);
}
.li-child {
  border-bottom: 2px solid var(--blue-main);
  margin-left: -30px;
  cursor: pointer;
}
.li-child:last-child {
  border-bottom: none !important;
}
.title {
  color: var(--blue-main);
}
</style>
