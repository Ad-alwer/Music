<template>
  <div id="parent" class="container mt-5 px-3 position-relative">
    <loader v-if="popups.loader" />
    <section>
      <div>
        <div class="d-flex justify-content-between">
          <span class="text-uppercase color-blue fw-semibold fs-5">{{
            type
          }}</span>
        </div>
        <div v-if="data.length > 0" class="track-parent">
          <div
            v-for="(x, i) in data"
            :key="x._id"
            class="d-flex align-items-center px-3 gap-4 mt-3 position-relative"
          >
            <img
              :src="x.cover.url"
              class="tumbnail img-fluid rounded-4"
              alt=""
            />
            <div class="d-flex flex-column text-div gap-2 track-namebox">
              <span
                @click="play(x._id)"
                class="text-capitalize color-black fw-bold fs-5 trim-text pointer username"
                >{{ x.name }}</span
              >
              <span class="text-capitalize color-gray status">{{
                x.status
              }}</span>
            </div>
            <span class="color-gray track-duration text-center">{{
              formattime(x.track.duration)
            }}</span>
            <span class="color-gray text-capitalize track-plays text-center"
              >{{ formatview(x.plays) }} plays</span
            >
            <svg
              @click="openmore(i)"
              class="more"
              width="18"
              height="6"
              viewBox="0 0 18 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="3" cy="3" r="3" fill="#B3B3BC" />
              <circle cx="15" cy="3" r="3" fill="#B3B3BC" />
            </svg>
            <ul v-if="x.showmore" class="more-list rounded-3 bg-white">
              <li
                class="fw-semibold text-capitalize px-2 py-1 li-child"
                @click="play(x._id)"
              >
                listen
              </li>
              <li
                class="fw-semibold text-capitalize px-2 py-1 li-child"
                @click="editpopupopener(x)"
              >
                edit
              </li>
              <li
                class="fw-semibold text-capitalize px-2 py-1 li-child"
                @click="changestatus(x._id, x.status)"
              >
                Set to
                {{ x.status.toLowerCase() === "public" ? "private" : "public" }}
              </li>
              <li
                @click="deletetrack(x._id)"
                class="fw-semibold text-capitalize px-2 py-1 li-child border-bottom-0"
              >
                delete
              </li>
            </ul>
          </div>
        </div>
        <div
          class="d-flex justify-content-center align-items-center mt-5 pt-5"
          v-else
        >
          <img src="../../assets/img/empty.png" alt="" />
        </div>
      </div>
    </section>
    <editpopup
      @close="editpopucloser"
      v-if="popups.editpopup"
      :data="editdata"
    />
  </div>
</template>

<script>
import axios from "axios";
import info from "../../../default";
import Register from "../Register.vue";
import iziToast from "izitoast";

import loader from "../loader.vue";
import editpopup from "./edittrackpopup.vue";

export default {
  name: "PublishTrack",
  beforeMount() {
    this.getdata();
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
      editdata: null,
      popups: {
        editpopup: false,
        loader: true,
      },
    };
  },
  methods: {
    getdata: function () {
      axios
        .get(`${this.apiaddress}track/getusertrack`, {
          headers: {
            jwt: Register.methods.getcookies("jwt"),
          },
        })
        .then((res) => {
          if (res.data) {
            if (this.type === "music") {
              this.data = res.data.filter(
                (e) => e.type.toLowerCase() === "music"
              );
            } else {
              this.data = res.data.filter(
                (e) => e.type.toLowerCase() === "podcast"
              );
            }

            this.data.forEach((e) => {
              e.showmore = false;
            });
            this.popups.loader = false;
          }
        });
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
    formattime: function (seconds) {
      let minutes = Math.floor(seconds / 60);
      let remainingSeconds = seconds % 60;

      let formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      let formattedSeconds =
        remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

      return `${formattedMinutes}:${formattedSeconds}`;
    },
    openmore: function (i) {
      this.data.forEach((e) => {
        e.showmore = false;
      });
      this.data[i].showmore = true;
    },
    closeallmore: function () {
      this.data.forEach((e) => {
        e.showmore = false;
      });
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
    changestatus: function (id, status) {
      const newstatus =
        status.toLowerCase() === "public" ? "private" : "public";
      axios
        .put(`${this.apiaddress}track/changestatus/${id}&&${newstatus}`)
        .then((res) => {
          if (res.data) {
            this.getdata();
          }
        });
    },
    editpopupopener: function (data) {
      this.closeallmore();
      this.editdata = data;
      this.popups.editpopup = true;
    },
    editpopucloser: function () {
      this.popups.editpopup = false;
      this.editdata = null;
    },
    deletetrack: function (id) {
      this.closeallmore();
      axios
        .delete(`${this.apiaddress}track/delete/${id}`, {
          headers: {
            jwt: Register.methods.getcookies("jwt"),
          },
        })
        .then((res) => {
          if (res.data.status) {
            iziToast.success({
              message: res.data.msg,
              position: "topRight",
            });

            this.getdata();
          } else {
            iziToast.error({
              title: "Please try again",
              position: "topRight",
            });
          }
        });
    },
  },
  components: { editpopup, loader },
  props: ["type"],
  watch: {
    type: function () {
      this.popups.loader = true;
      this.getdata();
    },
  },
};
</script>

<style scoped>
#parent {
  height: 80vh;
  overflow: hidden !important;
}
.tumbnail {
  width: 70px;
  height: 70px;
}
.text-div {
  width: 610px;
}
.more {
  transform: rotate(90deg);
  cursor: pointer;
}

.track-namebox {
  width: 700px;
}
.track-duration {
  width: 70px;
}

.track-plays {
  width: 100px;
}
.trim-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 450px;
}

.more-list {
  position: absolute;
  right: 10px;
  top: 50px;
  z-index: 5;
  border: 2px solid var(--blue-main);
}

.li-child {
  border-bottom: 2px solid var(--blue-main);
  margin-left: -30px;
  cursor: pointer;
}

@media screen and (max-width: 767px) {
  #parent {
    margin: 10px 5px 68px 5px !important;
    overflow: hidden;
    height: 79vh;
  }
  .track-parent{
    height: 74vh;
    padding-bottom: 8px !important;
    overflow: auto !important;
  }
  .tumbnail {
    width: 60px;
    height: 60px;
    border-radius: 8px !important;
  }
  .username {
    font-size: 18px !important;
  }
  .status {
    font-size: 15px !important;
    margin-top: -6px;
  }
  .track-namebox {
    gap: 4px !important;
    width: 45% !important;
  }
  .track-duration {
    width: 50px;
    font-size: 15px !important;
  }
  .track-plays {
    width: 70px;
    font-size: 15px !important;
  }
  .more-list {
    right: 2%;
    top: 50px;
  }
  .li-child {
    font-size: 15px !important;
  }
}
</style>
