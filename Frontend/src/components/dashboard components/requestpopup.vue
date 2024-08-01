<template>
  <div id="popup">
    <div class="popup-inner rounded-4">
      <i class="fas fa-close text-danger fs-4 pointer" @click="close('')"></i>
      <p class="text-center text-capitalize color-gray">
        {{ data.artist.username }}
      </p>
      <section
        class="mt-2 d-flex flex-column justify-content-center align-items-center"
      >
        <div class="profile-parent d-flex gap-5 align-items-center">
          <input type="file" hidden id="profile" />
          <label for="profile">
            <img
              :src="
                data.artist.profile
                  ? data.artist.profile
                  : require('../../assets/img/icon.jpg')
              "
              class="img-thumbnail rounded-circle"
              alt=""
          /></label>
        </div>
        <div class="mt-2 d-flex gap-5 follow-parent">
          <span class="color-gray text-capitalize fw-bold pointer"
            >{{ data.artist.subscribe.length }} followers</span
          >
          <span class="color-gray text-capitalize fw-bold pointer"
            >{{ data.artist.artists.length }} following</span
          >
        </div>
      </section>
      <p class="mt-3 text-center fw-semibold fs-5 text-capitalize">
        {{ data.name }}
      </p>
      <section v-if="data.type == 'music' || data.type == 'podcast'">
        <div class="tumbnail d-flex justify-content-center">
          <img :src="data.cover.url" class="img-fluid rounded-4" alt="" />
        </div>
        <div class="w-100 timeline mt-2">
          <audio
            :src="data.track.url"
            ref="audio"
            controls
            @play="playmusic"
            @pause="isplay = false"
            @loadedmetadata="audioloaded"
            hidden
          ></audio>

          <input
            type="range"
            class="input-range"
            ref="range"
            min="0"
            :max="timeline.max"
            value="0"
            @change="timechange"
          />
        </div>
        <div class="d-flex justify-content-between w-100">
          <span class="color-gray">{{ timeline.now }}</span>
          <span class="color-gray">{{ timeline.duaration }}</span>
        </div>
        <div class="d-flex justify-content-center">
          <div
            class="playandpause rounded-circle d-flex justify-content-center align-items-center"
          >
            <img
              v-if="!isplay"
              src="../../assets/icons/play.png"
              class="play-icon img-fluid"
              alt=""
              @click="$refs.audio.play()"
            />
            <svg
              v-else
              @click="$refs.audio.pause()"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="6" height="18" rx="1.71429" fill="white" />
              <rect x="12" width="6" height="18" rx="1.71429" fill="white" />
            </svg>
          </div>
        </div>
        <div v-if="data.feat">
          <p class="text-capitalize text-center mt-3 fs-5 fw-semibold">Feats</p>
          <div
            class="feats d-flex align-items-center gap-5 mx-3 py-2"
            v-for="x in data.feat"
            :key="x"
          >
            <img
              src="../../assets/img/test/eminem.jpg"
              class="img-fluid rounded-circle"
              alt=""
            />
            <div class="d-flex gap-3">
              <span class="text-capitalize fw-semibold color-gray">{{
                x.username
              }}</span>
              <span class="text-capitalize fw-semibold color-gray"
                >{{ x.subscribe.length }} followers</span
              >
              <span class="text-capitalize fw-semibold color-gray"
                >{{ x.artists.length }} following</span
              >
            </div>
          </div>
        </div>
      </section>
      <section v-if="data.type == 'album'">
        <div class="tumbnail d-flex justify-content-center">
          <img :src="data.cover.url" class="img-fluid rounded-4" alt="" />
        </div>
        <div class="mt-3" v-for="(x, i) in tracksshow" :key="x">
          <div
            class="d-flex align-items-center justify-content-between mx-3 p-2 back-blue rounded-3"
          >
            <span>{{ x.name }}</span>
            <svg
              @click="showtraks(i, tracksshow[i].show)"
              :class="tracksshow[i].show ? 'pointer rotate' : 'pointer'"
              width="14"
              height="8"
              viewBox="0 0 14 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L7 7L13 1"
                stroke="#B3B3BC"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div v-if="tracksshow[i].show">
            <div class="w-100 timeline mt-2">
              <audio
                :src="tracksshow[i].url"
                ref="audio"
                controls
                @play="playmusic"
                @pause="isplay = false"
                @loadedmetadata="audioloaded"
                hidden
              ></audio>

              <input
                type="range"
                class="input-range"
                ref="range"
                min="0"
                :max="timeline.max"
                value="0"
                @change="timechange"
              />
            </div>
            <div class="d-flex justify-content-between w-100">
              <span class="color-gray">{{ timeline.now }}</span>
              <span class="color-gray">{{ timeline.duaration }}</span>
            </div>
            <div class="d-flex justify-content-center">
              <div
                class="playandpause rounded-circle d-flex justify-content-center align-items-center"
              >
                <img
                  v-if="!isplay"
                  src="../../assets/icons/play.png"
                  class="play-icon img-fluid"
                  alt=""
                  @click="$refs.audio[0].play()"
                />
                <svg
                  v-else
                  @click="$refs.audio[0].pause()"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="6" height="18" rx="1.71429" fill="white" />
                  <rect
                    x="12"
                    width="6"
                    height="18"
                    rx="1.71429"
                    fill="white"
                  />
                </svg>
              </div>
            </div>

            <div v-if="x.feat.length > 0">
              <p class="text-capitalize text-center mt-3 fs-5 fw-semibold">
                Feats
              </p>
              <div
                class="feats d-flex align-items-center gap-5 mx-3 py-2"
                v-for="y in x.feat"
                :key="y"
              >
                <img
                  src="../../assets/img/test/eminem.jpg"
                  class="img-fluid rounded-circle"
                  alt=""
                />
                <div class="d-flex gap-3">
                  <span class="text-capitalize fw-semibold color-gray">{{
                    x.username
                  }}</span>
                  <span class="text-capitalize fw-semibold color-gray"
                    >{{ y.subscribe.length }} followers</span
                  >
                  <span class="text-capitalize fw-semibold color-gray"
                    >{{ y.artists.length }} following</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="d-flex flex-column align-items-center mt-3">
        <textarea
          class="form-control text-capitalize"
          name=""
          id=""
          cols="50"
          rows="5"
          placeholder="Enter your message if you reject that request"
          maxlength="50"
          ref="msg"
        ></textarea>
        <div class="mt-2 d-flex justify-content-center gap-5">
          <button
            @click="data.type === 'album' ? acceptalbum() : acceptmusic()"
            class="btn px-3 py-2 fw-bold text-capitalize btn-accept text-white"
          >
            Accept
          </button>
          <button
            @click="data.type === 'album' ? rejectalbum() : rejectmusic()"
            class="btn px-3 py-2 fw-bold text-capitalize btn-danger text-white"
          >
            reject
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Register from "../Register.vue";
import iziToast from "izitoast";

export default {
  name: "requestpopup",
  data() {
    return {
      apiaddress: process.env.VUE_APP_Api_ADDRESS,
      isplay: false,
      timeline: {
        max: 100,
        duaration: "00:00",
        now: "00:00",
      },
      tracksshow: [],
    };
  },
  mounted() {
    document.addEventListener("keydown", this.esc);
    if (this.data.type == "album") {
      this.data.tracks.forEach((e) => {
        this.tracksshow.push({ ...e, show: false });
      });
    }
  },
  methods: {
    close: function (e) {
      this.$emit("close", e);
    },
    esc(event) {
      if (event.key === "Escape") {
        this.close();
      }
    },
    audioloaded: function () {
      if (this.data.type === "album") {
        this.timeline.max = Math.round(this.$refs.audio[0].duration);
      } else {
        this.timeline.max = Math.round(this.$refs.audio.duration);
      }
      let minutes = Math.floor(this.timeline.max / 60);
      let seconds = Math.floor(this.timeline.max % 60);
      this.timeline.duaration = `${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      this.timechange();
    },
    timechange: function () {
      if (this.data.type === "album") {
        let minutes = Math.floor(this.$refs.range[0].value / 60);
        let seconds = Math.floor(this.$refs.range[0].value % 60);
        this.timeline.now = `${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`;
        this.$refs.audio[0].currentTime = this.$refs.range[0].value;
      } else {
        let minutes = Math.floor(this.$refs.range.value / 60);
        let seconds = Math.floor(this.$refs.range.value % 60);
        this.timeline.now = `${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`;
        this.$refs.audio.currentTime = this.$refs.range.value;
      }
    },
    nowcheck: function () {
      if (this.data.type === "album") {
        let minutes = Math.floor(this.$refs.audio[0].currentTime / 60);
        let seconds = Math.floor(this.$refs.audio[0].currentTime % 60);
        this.timeline.now = `${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`;
        this.$refs.range[0].value = this.$refs.audio[0].currentTime;
      } else {
        let minutes = Math.floor(this.$refs.audio.currentTime / 60);
        let seconds = Math.floor(this.$refs.audio.currentTime % 60);
        this.timeline.now = `${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`;
        this.$refs.range.value = this.$refs.audio.currentTime;
      }
    },
    playmusic: function () {
      this.isplay = true;
      setInterval(() => {
        this.nowcheck();
      }, 500);
    },
    acceptmusic: function () {
      axios
        .put(
          `${this.apiaddress}users/verifytrack/${this.data.artistid}/${this.data.name}`
        )
        .then((res) => {
          this.$emit("compelet", res.data);
        });
    },
    rejectmusic: function () {
      if (this.$refs.msg.value) {
        axios
          .put(
            `${this.apiaddress}users/rejectrack/${this.data.artistid}/${this.data.name}`,
            {
              msg: this.$refs.msg.value,
            }
          )
          .then((res) => {
            this.$emit("compelet", res.data);
          });
      } else {
        iziToast.error({
          title: "Please write message",
          position: "topRight",
        });
      }
    },
    showtraks: function (i, val) {
      this.isplay = false;
      this.tracksshow.forEach((e) => {
        e.show = false;
      });
      !val ? (this.tracksshow[i].show = true) : null;
    },
    acceptalbum: function () {
      axios
        .put(
          `${this.apiaddress}users/verifyalbum/${this.data.artistid}/${this.data.name}`
        )
        .then((res) => {
          this.$emit("compelet", res.data);
        });
    },
    rejectalbum: function () {
      const jwt = Register.methods.getcookies("jwt");

      if (this.$refs.msg.value) {
        axios
          .put(
            `${this.apiaddress}users/rejectalbum/${this.data.artistid}/${this.data.name}`,
            {
              msg: this.$refs.msg.value,
            },
            {
              headers: {
                jwt,
              },
            }
          )
          .then((res) => {
            this.$emit("compelet", res.data);
          });
      } else {
        iziToast.error({
          title: "Please write message",
          position: "topRight",
        });
      }
    },
  },
  props: ["data"],
};
</script>

<style scoped>
#popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;

  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}
.popup-inner {
  position: absolute;
  background-color: white;
  color: black;
  position: relative;
  padding: 15px;
  width: 450px;
  height: 650px;
  overflow: auto;
}
.profile-parent img {
  width: 110px;
  height: 110px;
  cursor: pointer;
}

input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
  height: 12px;
  background: rgba(67, 67, 239, 0.5);
  overflow: hidden;
  border-radius: 5px;
  cursor: pointer;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--blue-main);

  box-shadow: -408px 0 0 400px var(--blue-main);
  cursor: pointer;
}

.playandpause {
  width: 42px;
  height: 42px;
  background-color: var(--blue-main);
  cursor: pointer;
}
.play-icon {
  width: 28px;
  height: 28px;
  position: relative;
  left: 2px;
}
.feats:not(:last-child) {
  border-bottom: 2px solid var(--blue-main);
}
.feats img {
  width: 50px;
  height: 50px;
}
textarea {
  resize: none;
  border: 2px solid var(--blue-main);
}
.btn-accept {
  background-color: var(--blue-main);
}
.tumbnail img {
  width: 130px;
}
.back-blue {
  background-color: var(--blue-main);
  color: white;
}
.rotate {
  transform: rotate(180deg);
}
</style>
