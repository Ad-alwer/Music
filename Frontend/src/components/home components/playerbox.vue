<template>
  <div id="parent">
    <loader v-if="loader" />
    <section v-else class="">
      <section v-show="!show.lyricsshow">
        <div class="d-flex flex-column align-items-center px-4 parent-box">
          <h4 class="text-center text-uppercase fw-semibold">now playing</h4>
          <img
            class="tumbnail rounded-4 img-fluid mt-1"
            :src="show.img"
            alt=""
          />
          <div class="d-flex flex-column text-box align-items-center">
            <span
              class="text-capitalize color-dark mt-2 fs-5 fw-semibold trackname"
              ref="name"
              >{{ show.name }}</span
            >
            <span
              v-if="show.artist"
              class="text-capitalize color-gray artistname pointer"
              >{{ show.artist }}</span
            >
          </div>
          <div class="w-100 timeline">
            <audio
              :src="show.audio"
              ref="audio"
              @play="play"
              @pause="pause"
              @ended="lasttrack"
            >
              <source />
            </audio>
            <input
              type="range"
              class="input-range"
              ref="range"
              min="0"
              :max="show.duration"
              value="0"
              @change="timechange"
            />
          </div>
          <div class="d-flex justify-content-between w-100 dutraion-box">
            <span class="color-gray">{{ converttime(show.currentTime) }}</span>
            <span class="color-gray px-1 d-none duration-slash">/</span>

            <span class="color-gray">{{ converttime(show.duration) }}</span>
          </div>
          <div class="d-flex align-items-center gap-5 mt-1" v-if="show.artist">
            <div class="pointer like-imgs">
              <img
                class="pointer opacity-25"
                v-if="show.artist.toLowerCase() === user.username.toLowerCase()"
                src="../../assets/icons/like.png"
                alt=""
              />
              <img
                v-else-if="show.liked"
                src="../../assets/icons/like.png"
                @click="like"
                alt=""
              />
              <img
                v-else
                src="../../assets/icons/unlike.png"
                @click="like"
                alt=""
              />
            </div>
            <div class="d-flex align-items-center gap-4 playicon-box">
              <svg
                width="13"
                height="18"
                viewBox="0 0 13 18"
                fill="none"
                @click="lasttrack"
                xmlns="http://www.w3.org/2000/svg"
                class="backandskip"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.2353 -1.06964e-06C11.813 -1.03272e-06 11.4706 0.34237 11.4706 0.764705L11.4706 7.7456L0.929225 1.58413C0.835145 1.52915 0.728383 1.50014 0.619676 1.50004C0.510969 1.49993 0.404151 1.52872 0.309965 1.58352C0.215779 1.63832 0.137545 1.71719 0.0831332 1.8122C0.0287211 1.90722 4.87926e-05 2.01502 1.85753e-07 2.12477L1.38784e-06 15.875C1.40233e-06 16.0408 0.0652248 16.1998 0.181323 16.317C0.297421 16.4342 0.454884 16.5 0.619072 16.5C0.728017 16.5 0.835018 16.4709 0.929226 16.4157L11.4706 10.2542L11.4706 17.2353C11.4706 17.6576 11.813 18 12.2353 18C12.6576 18 13 17.6576 13 17.2353L13 9.00145C13 9.00093 13 9.00041 13 8.9999C13 8.99938 13 8.99886 13 8.99835L13 0.764706C13 0.34237 12.6576 -1.10656e-06 12.2353 -1.06964e-06Z"
                  fill="#4343EF"
                />
              </svg>
              <div
                class="playandpause rounded-circle d-flex justify-content-center align-items-center"
              >
                <img
                  v-if="!show.isPlay"
                  src="../../assets/icons/play.png"
                  class="play-icon img-fluid"
                  alt=""
                  @click="$refs.audio.play()"
                />
                <svg
                  v-else
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  @click="$refs.audio.pause()"
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
              <svg
                @click="nexttrack"
                class="backandskip"
                width="13"
                height="18"
                viewBox="0 0 13 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.764644 18C1.18698 18 1.52935 17.6576 1.52935 17.2353L1.52935 10.2544L12.0708 16.4159C12.1649 16.4709 12.2716 16.4999 12.3803 16.5C12.489 16.5001 12.5958 16.4713 12.69 16.4165C12.7842 16.3617 12.8625 16.2828 12.9169 16.1878C12.9713 16.0928 13 15.985 13 15.8752L13 2.12499C13 1.95922 12.9348 1.80025 12.8187 1.68304C12.7026 1.56582 12.5451 1.49997 12.3809 1.49997C12.272 1.5 12.165 1.52911 12.0708 1.58435L1.52935 7.74585L1.52935 0.764705C1.52935 0.34237 1.18698 -8.74621e-07 0.764642 -8.377e-07C0.342306 -8.00778e-07 -6.44862e-05 0.342368 -6.44493e-05 0.764705L-6.30094e-05 17.2353C-6.29724e-05 17.6576 0.342308 18 0.764644 18Z"
                  fill="#4343EF"
                />
              </svg>
            </div>
            <div class="pointer bookmark-imgs">
              <img
                class="pointer opacity-25"
                v-if="show.artist.toLowerCase() === user.username.toLowerCase()"
                src="../../assets/icons/bookmark.png"
                alt=""
              />
              <img
                v-else-if="show.booked"
                src="../../assets/icons/bookmark.png"
                @click="booked"
                alt=""
              />
              <img
                v-else
                src="../../assets/icons/unbookmark.png"
                @click="booked"
                alt=""
              />
            </div>
          </div>
          <div
            class="mt-3 d-flex justify-content-center align-items-center flex-column gap-2 pointer lyric-box"
            @click="show.lyric ? (show.lyricsshow = true) : null"
          >
            <svg
              width="18"
              height="8"
              viewBox="0 0 18 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.7125 7.5C16.4122 7.50049 16.1212 7.41339 15.89 7.25383L9.00126 2.45896L2.09968 7.08259C1.96822 7.17149 1.81696 7.23788 1.65458 7.27795C1.49221 7.31801 1.32193 7.33095 1.15353 7.31603C0.985134 7.30111 0.821936 7.25863 0.673318 7.19101C0.524701 7.1234 0.393595 7.03199 0.287536 6.92204C0.180778 6.81257 0.101055 6.6866 0.0529475 6.55138C0.00483982 6.41616 -0.0107033 6.27436 0.0072115 6.13412C0.0251263 5.99388 0.0761457 5.85798 0.157337 5.73421C0.238529 5.61045 0.348292 5.50127 0.480317 5.41295L8.19158 0.243477C8.42155 0.0860575 8.71 0 9.00769 0C9.30538 0 9.59383 0.0860575 9.8238 0.243477L17.5351 5.59489C17.6652 5.68474 17.7728 5.79509 17.8516 5.91961C17.9305 6.04414 17.9791 6.18039 17.9946 6.32058C18.0101 6.46076 17.9923 6.60211 17.9421 6.73654C17.8919 6.87098 17.8104 6.99584 17.7021 7.10399C17.5825 7.22677 17.4318 7.32596 17.2607 7.39443C17.0896 7.4629 16.9024 7.49895 16.7125 7.5Z"
                fill="#B3B3BC"
              />
            </svg>

            <p class="text-capitalize color-gray tex-center fw-semibold">
              lyrics
            </p>
          </div>

          <div
            v-if="show.artist"
            class="responsive-icons d-none align-items-center justify-content-center ms-5 ps-1"
          >
            <div class="pointer like-imgs">
              <img
                class="pointer opacity-25"
                v-if="show.artist.toLowerCase() === user.username.toLowerCase()"
                src="../../assets/icons/like.png"
                alt=""
              />
              <img
                v-else-if="show.liked"
                src="../../assets/icons/like.png"
                @click="like"
                alt=""
              />
              <img
                v-else
                src="../../assets/icons/unlike.png"
                @click="like"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
      <div v-if="show.lyricsshow">
        <h4 class="text-capitalize fw-bold xolor-black text-center">
          {{ show.name }}
        </h4>
        <p class="px-4 lyric color-gray">
          {{ show.lyric }}
        </p>
        <div class="d-flex justify-content-center align-items-center">
          <svg
            width="18"
            height="8"
            viewBox="0 0 18 8"
            class="closer"
            fill="none"
            @click="show.lyricsshow = false"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.7125 7.5C16.4122 7.50049 16.1212 7.41339 15.89 7.25383L9.00126 2.45896L2.09968 7.08259C1.96822 7.17149 1.81696 7.23788 1.65458 7.27795C1.49221 7.31801 1.32193 7.33095 1.15353 7.31603C0.985134 7.30111 0.821936 7.25863 0.673318 7.19101C0.524701 7.1234 0.393595 7.03199 0.287536 6.92204C0.180778 6.81257 0.101055 6.6866 0.0529475 6.55138C0.00483982 6.41616 -0.0107033 6.27436 0.0072115 6.13412C0.0251263 5.99388 0.0761457 5.85798 0.157337 5.73421C0.238529 5.61045 0.348292 5.50127 0.480317 5.41295L8.19158 0.243477C8.42155 0.0860575 8.71 0 9.00769 0C9.30538 0 9.59383 0.0860575 9.8238 0.243477L17.5351 5.59489C17.6652 5.68474 17.7728 5.79509 17.8516 5.91961C17.9305 6.04414 17.9791 6.18039 17.9946 6.32058C18.0101 6.46076 17.9923 6.60211 17.9421 6.73654C17.8919 6.87098 17.8104 6.99584 17.7021 7.10399C17.5825 7.22677 17.4318 7.32596 17.2607 7.39443C17.0896 7.4629 16.9024 7.49895 16.7125 7.5Z"
              fill="#B3B3BC"
            />
          </svg>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

import Register from "../Register.vue";
import loader from "../loader.vue";

export default {
  name: "playerbox",
  beforeMount() {
    this.getuser();
  },

  data() {
    return {
      apiaddress: process.env.VUE_APP_Api_ADDRESS,

      show: {
        name: null,
        artist: null,
        img: null,
        duration: 0,
        currentTime: 0,
        isPlay: false,
        lyric: null,
        audio: null,
        lyricsshow: false,
        liked: false,
        booked: false,
        id: null,
        artistid: null,
        album: null,
        last: [],
        type: null,
        lastindex: null,
      },
      timeouts: {
        nowchckinterval: null,
        changelastplayinterval: null,
      },
      user: [],
      music: [],
      library: [],
      loader: true,
      clickable: true,
    };
  },
  watch: {
    data: function () {
      this.getlastplay();
      this.getlibrary();
    },
    playmusic: function () {
      this.getlastplay();
    },
    check: function (val) {
      if (val.id.toString() === this.show.id.toString()) {
        val.type === "like"
          ? (this.show.liked = !this.show.liked)
          : (this.show.booked = !this.show.booked);
      }
    },
  },
  methods: {
    play: async function () {
      const check = this.getmusic(this.music);
      if (check) {
        this.show.isPlay = true;

        this.timeouts.nowchckinterval = setInterval(() => {
          this.nowcheck();
          if (this.show.currentTime == this.show.duration) {
            this.nexttrack();
          }
        }, 500);

        this.timeouts.changelastplayinterval = setInterval(() => {
          this.changelastplay();
        }, 5000);
        if (this.show.currentTime == 0) {
          if (this.show.album) {
            axios.put(
              `${this.apiaddress}album/play/${this.show.album._id}/${this.show.id}`
            );
          } else {
            axios.put(`${this.apiaddress}track/play/${this.show.id}`);
          }
          if (this.user.lastplay.type == "playlist") {
            axios.put(
              `${this.apiaddress}playlist/play/${this.user.lastplay.playlistid}`
            );
          }
        }
      }
    },
    pause: function () {
      let duaration = this.show.currentTime;
      if (this.$refs.audio) {
        this.$refs.audio.pause();
        this.show.isPlay = false;
        this.$refs.range.value = this.$refs.audio.currentTime;
        clearInterval(this.timeouts.nowchckinterval);
        clearInterval(this.timeouts.changelastplayinterval);
        this.changelastplay();
        this.user.lastplay.time = Number(duaration) + 1;
      }
    },
    timechange: function () {
      this.$refs.audio.pause();
      this.user.lastplay.time = this.$refs.range.value;
      this.show.currentTime = this.$refs.range.value;
      this.$refs.audio.play();
    },
    nowcheck: function () {
      this.show.currentTime = this.$refs.range.value;
      this.$refs.range.value = this.$refs.audio.currentTime;
    },
    changelastplay: function () {
      let data;
      if (this.user.lastplay.type == "track") {
        data = {
          id: this.show.id,
          type: "track",
          time: Number(this.$refs.range.value),
        };
      } else if (this.user.lastplay.type == "album") {
        data = {
          id: this.show.id,
          type: "album",
          time: Number(this.$refs.range.value),
          albumid: this.show.album._id,
        };
      } else {
        data = {
          id: this.show.id,
          type: "playlist",
          time: Number(this.$refs.range.value),
          playlistid: this.user.lastplay.playlistid,
        };
      }

      axios.put(
        `${this.apiaddress}users/lastplay`,
        {
          data,
        },
        {
          headers: {
            jwt: Register.methods.getcookies("jwt"),
          },
        }
      );
    },
    getmusic: function (music) {
      if (!music) {
        this.show.name = "Please select a track to listen";
        this.$refs.name.style.maxWidth = "500px";
        this.show.artist = null;
        this.show.img = require("../../assets/img/dontknow.png");
        this.show.currentTime = 0;
        this.show.duration = 0;
      } else {
        this.show.audio = music.url ? music.url : music.track.url;
        this.show.name = music.name;

        if (music.artist) {
          this.show.artist = music.artist.username;
          this.show.artistid = music.artist._id;
        }

        this.show.img = music.cover.url;
        this.show.duration = music.duration
          ? music.duration
          : music.track.duration;

        this.show.lyric = music.lyric;
        this.show.id = music._id;

        music.album ? (this.show.album = music.album) : null;
        this.show.type = music.type;

        this.$nextTick(() => {
          if (this.user.lastplay.id == this.show.id) {
            this.$refs.audio.currentTime = this.user.lastplay.time;

            this.show.currentTime = this.user.lastplay.time;
          } else {
            this.$refs.audio.currentTime = 0;
            this.show.currentTime = 0;
          }
          this.$refs.range.value = this.show.currentTime;
        });

        setTimeout(() => {
          this.checklike();
          this.checksave();
        }, 1000);
        return true;
      }
    },
    getuser: function () {
      axios
        .get(`${this.apiaddress}users/user`, {
          headers: {
            jwt: Register.methods.getcookies("jwt"),
          },
        })
        .then((res) => {
          this.user = res.data;
          this.getlastplay();
          this.getlibrary();
        });
    },
    like: function () {
      if (this.show.liked) {
        axios
          .put(
            `${this.apiaddress}track/unlike/${this.show.id}`,
            {},
            {
              headers: {
                jwt: Register.methods.getcookies("jwt"),
              },
            }
          )
          .then((res) => {
            if (res.data) {
              this.show.liked = false;
              this.$emit("check", { id: this.music.id, type: "like" });
            }
          });
      } else {
        axios
          .put(
            `${this.apiaddress}track/like/${this.show.id}`,
            {},
            {
              headers: {
                jwt: Register.methods.getcookies("jwt"),
              },
            }
          )
          .then((res) => {
            if (res.data) {
              this.show.liked = res.data;
              this.$emit("check", { id: this.music.id, type: "like" });
            }
          });
      }
    },
    booked: function () {
      if (this.show.booked) {
        axios
          .put(
            `${this.apiaddress}track/removesavetrack/${this.show.id}`,
            {},
            {
              headers: {
                jwt: Register.methods.getcookies("jwt"),
              },
            }
          )
          .then((res) => {
            if (res.data) {
              this.show.booked = false;
              this.$emit("check", { id: this.music.id, type: "save" });
            }
          });
      } else {
        axios
          .put(
            `${this.apiaddress}track/savetrack/${this.show.id}`,
            {},
            {
              headers: {
                jwt: Register.methods.getcookies("jwt"),
              },
            }
          )

          .then((res) => {
            if (res.data) {
              this.show.booked = res.data;
              this.$emit("check", { id: this.music.id, type: "save" });
            }
          });
      }
    },
    converttime: function (value) {
      let minutes = Math.floor(value / 60);
      let seconds = Math.floor(value % 60);
      const time = `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
      return time;
    },
    nexttrack: function () {
      if (this.clickable) {
        this.clickable = false;
        this.$refs.audio.pause();
        let index;
        index = this.library.findIndex((e) => {
          return e._id.toString() === this.music._id.toString();
        });
        this.show.last.push(this.music);

        if (this.library.length === index + 1) {
          this.music = this.library[0];
        } else {
          this.music = this.library[index + 1];
        }
        this.getmusic(this.music);
        this.$refs.audio.play();

        setTimeout(() => {
          this.clickable = true;
        }, 300);
      }
    },
    lasttrack: function () {
      if (this.clickable) {
        this.clickable = false;
        if (this.show.last.length > 0) {
          this.show.lastindex = this.show.lastindex
            ? this.show.lastindex - 1
            : (this.show.lastindex = this.show.last.length - 1);
          this.$refs.audio.pause();
          this.music = this.show.last[this.show.lastindex];
          this.getmusic(this.music);
          this.$refs.audio.play();
        } else {
          this.nexttrack();
        }
        setTimeout(() => {
          this.clickable = true;
        }, 300);
      }
    },
    getlastplay: function () {
      axios
        .get(`${this.apiaddress}users/lastplay`, {
          headers: {
            jwt: Register.methods.getcookies("jwt"),
          },
        })
        .then((res) => {
          this.music = res.data;
          this.loader = false;
          this.getmusic(this.music);
        });
    },
    getlibrary: function () {
      axios
        .get(`${this.apiaddress}users/getlibrary`, {
          headers: {
            jwt: Register.methods.getcookies("jwt"),
          },
        })
        .then((res) => (res.data ? (this.library = res.data) : null));
    },
    checklike: function () {
      this.user.likes.forEach((e) => {
        if (e == this.music._id) {
          this.show.liked = true;
        }
      });
    },
    checksave: function () {
      this.user.saveTracks.forEach((e) => {
        if (e == this.music._id) {
          this.show.booked = true;
        }
      });
    },
  },
  props: ["data", "check", "playmusic"],
  components: { loader },
};
</script>

<style scoped>
.tumbnail {
  width: 200px;
  height: 180px;
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
.backandskip {
  rotate: 180deg;
  cursor: pointer;
}
.play-icon {
  width: 28px;
  height: 28px;
  position: relative;
  left: 2px;
}
.lyric {
  height: 300px;
  overflow-y: auto;
}
.bookmark-imgs img {
  width: 21px !important;
  height: 21px !important;
  position: relative;
  top: 3px;
}
.closer {
  transform: rotate(180deg);
  cursor: pointer;
}

@media screen and (max-width: 767px) {
  h4,
  .input-range,
  .lyric-box,
  .like-imgs,
  .bookmark-imgs,
  .timeline {
    display: none !important;
  }
  .parent-box {
    display: flex;
    flex-direction: row !important;
    background: white;
    margin-top: 0 !important;
    padding: 5px !important;
    padding-left: 8px !important;
    width: 98vw;
    flex-wrap: nowrap !important;
    margin-top: -5px !important;
    gap: 0 !important;
    justify-content: space-between;
  }
  .tumbnail {
    width: 50px;
    height: 50px;
    border-radius: 5px !important;
  }
  .text-box {
    position: relative;
    top: -2px;
  }
  .trackname {
    font-size: 11px !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100px;
  }
  .artistname {
    font-size: 10px !important;
    margin-top: -3px;
  }
  .dutraion-box {
    font-size: 10px;
    margin-left: 0;
    width: 60px !important;
  }
  .duration-slash {
    display: block !important;
  }
  .playicon-box {
    margin-left: 10%;
    scale: 0.7;
  }

  .backandskip {
    scale: 1.2;
  }

  .responsive-icons {
    display: flex !important;
    scale: 0.9;
    margin-left: 1% !important;
    gap: 6px !important;
  }

  .responsive-icons .like-imgs,
  .responsive-icons .bookmark-imgs {
    display: block !important;
  }
}

.responsive-icons .like-imgs {
  margin-top: 5px !important;
}
</style>
