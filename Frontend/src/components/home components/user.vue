<template>
  <loader v-if="popups.loader" />
  <div v-else id="parent" class="container mt-4 mx-3 d-flex">
    <div class="w-75 px-2 main">
      <div class="info d-flex justify-content-center gap-5">
        <div class="profile-parent d-flex gap-3 align-items-center">
          <div class="">
            <img
              v-if="otheruser.profile"
              :src="otheruser.profile"
              class="img-fluid rounded-circle"
              alt=""
            />
            <div v-else class="d-flex justify-content-center w-100 bg-danger">
              <img
                src="../../assets/img/icon.jpg"
                class="img-fluid rounded-circle"
                alt=""
              />
            </div>
          </div>
        </div>
        <div
          class="mt-2 d-flex align-center py-4 flex-column align-items-center gap-2"
        >
          <span class="fw-semibold fs-5 text-capitalize">{{
            otheruser.username
          }}</span>
          <div class="d-flex gap-4 follow-parent">
            <span class="color-gray text-capitalize fw-bold pointer"
              >{{
                otheruser.subscribe ? otheruser.subscribe.length : 0
              }}
              followers</span
            >
            <span class="color-gray text-capitalize fw-bold pointer"
              >{{
                otheruser.artists ? otheruser.artists.length : 0
              }}
              following</span
            >
          </div>
        </div>
        <div
          class="d-flex align-items-center"
          v-if="otheruser._id !== thisuser._id"
        >
          <button
            :class="
              checkfollow() === 'unfollow'
                ? 'btn px-3 py-2  bg-gray text-capitalize'
                : 'btn px-3 py-2 bg-blue text-capitalize'
            "
            @click="follow(otheruser._id)"
          >
            {{ checkfollow() }}
          </button>
        </div>
      </div>
      <div class="d-flex justify-content-center ms-5">
        <p class="mt-2 color-gray bio">{{ otheruser.bio }}</p>
      </div>
      <div class="px-2">
        <div class="d-flex justify-content-between">
          <span
            @click="changecomponent('music')"
            :class="
              component == 'music'
                ? 'text-capitalize p-2 pointer fw-semibold active'
                : 'text-capitalize p-2 pointer fw-semibold'
            "
            >Music</span
          >
          <span
            @click="changecomponent('podcast')"
            :class="
              component == 'podcast'
                ? 'text-capitalize p-2 pointer fw-semibold active'
                : 'text-capitalize p-2 pointer fw-semibold'
            "
            >podcast</span
          >
          <span
            @click="changecomponent('album')"
            :class="
              component == 'album'
                ? 'text-capitalize p-2 pointer fw-semibold active'
                : 'text-capitalize p-2 pointer fw-semibold'
            "
            >album</span
          >
          <span
            @click="changecomponent('playlist')"
            :class="
              component == 'playlist'
                ? 'text-capitalize p-2 pointer fw-semibold active'
                : 'text-capitalize p-2 pointer fw-semibold'
            "
            >playlist</span
          >
          <span
            @click="changecomponent('following')"
            :class="
              component == 'following'
                ? 'text-capitalize p-2 pointer fw-semibold active'
                : 'text-capitalize p-2 pointer fw-semibold'
            "
            >following</span
          >
          <span
            @click="changecomponent('follower')"
            :class="
              component == 'follower'
                ? 'text-capitalize p-2 pointer fw-semibold active'
                : 'text-capitalize p-2 pointer fw-semibold'
            "
            >followers</span
          >
        </div>
        <div v-if="!detail" class="px-4">
          <div
            class="monthly-box d-flex gap-4 align-items-center justify-content-between mt-3"
          >
            <div class="d-flex gap-5 align-items-center">
              <img
                class="monthly-img img-fluid rounded-3"
                src="../../assets/img/test/eminem.jpg"
                alt=""
              />
              <div
                :class="
                  detail
                    ? 'd-flex flex-column album-monthly-text'
                    : 'd-flex flex-column monthly-text'
                "
              >
                <p
                  class="text-capitalize fs-5 fw-bold m-0 p-0 color-dark pointer"
                >
                  track4
                </p>
              </div>
            </div>
            <div class="d-flex gap-3 align-items-center">
              <span class="me-3 text-capitalize">3:15 </span>
              <span class="me-3 text-capitalize">25k plays</span>
              <span class="me-3 text-capitalize">2k likes</span>

              <img
                v-if="detail"
                src="../../assets/icons/greater-than.png"
                class="img-fluid img-greater-than pointer"
                alt=""
              />
              <svg
                class="pointer svg-more"
                width="18"
                height="6"
                viewBox="0 0 18 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="3" cy="3" r="3" fill="#B3B3BC" />
                <circle cx="15" cy="3" r="3" fill="#B3B3BC" />
              </svg>
            </div>
          </div>
          <div
            class="monthly-box d-flex gap-4 align-items-center justify-content-between mt-3"
          >
            <div class="d-flex gap-5 align-items-center">
              <img
                class="monthly-img img-fluid rounded-3"
                src="../../assets/img/test/eminem.jpg"
                alt=""
              />
              <div
                :class="
                  detail
                    ? 'd-flex flex-column album-monthly-text'
                    : 'd-flex flex-column monthly-text'
                "
              >
                <p
                  class="text-capitalize fs-5 fw-bold m-0 p-0 color-dark pointer"
                >
                  track
                </p>
              </div>
            </div>
            <div class="d-flex gap-3 align-items-center">
              <span class="me-3 text-capitalize">3:15 </span>
              <span class="me-3 text-capitalize">25k plays</span>
              <span class="me-3 text-capitalize">2k likes</span>

              <img
                v-if="detail"
                src="../../assets/icons/greater-than.png"
                class="img-fluid img-greater-than pointer"
                alt=""
              />
              <svg
                class="pointer svg-more"
                width="18"
                height="6"
                viewBox="0 0 18 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="3" cy="3" r="3" fill="#B3B3BC" />
                <circle cx="15" cy="3" r="3" fill="#B3B3BC" />
              </svg>
            </div>
          </div>
        </div>
        <div
          v-else-if="
            detail && (component == 'following' || component == 'follower')
          "
          class="d-flex flex-column gap-2"
        >
          <div v-if="data.length > 0">
            <div
              v-for="x in data"
              :key="x"
              class="mt-2 px-4 d-flex justify-content-between mx-4 align-items-center"
            >
              <div class="d-flex gap-4 align-items-center">
                <img
                  v-if="x.profile"
                  :src="x.profile"
                  class="img-fluid rounded-circle img-follow"
                  alt=""
                />
                <img
                  v-else
                  src="../../assets/img/icon.jpg"
                  class="img-fluid rounded-circle img-follow"
                  alt=""
                />

                <span
                  @click="whatchprofile(x.username)"
                  class="text-capitalize fw-bold fs-5 pointer"
                  >{{ x.username }}</span
                >
              </div>
              <div
                class="d-flex justify-content-center"
                v-if="x._id !== thisuser._id"
              >
                <button
                  v-if="component === 'follower'"
                  :class="
                    checkfollow() === 'unfollow'
                      ? 'btn px-3 py-2  bg-gray text-capitalize'
                      : 'btn px-3 py-2 bg-blue text-capitalize'
                  "
                  @click="follow(otheruser._id)"
                >
                  {{ checkfollow() }}
                </button>
                <button
                  v-else
                  class="btn px-3 py-2 bg-gray text-capitalize"
                  @click="unfollow(x._id)"
                >
                  unfollow
                </button>
              </div>
            </div>
          </div>
          <div v-else class="d-flex justify-content-center">
            <img
              src="../../assets/img/empty.png"
              class="img-fluid img-empty"
              alt=""
            />
          </div>
        </div>
        <div v-else>
          <div v-if="data.length > 0">
            <div
              class="monthly-box d-flex gap-4 align-items-center justify-content-between mt-3"
              v-for="x in data"
              :key="x"
            >
              <div class="d-flex gap-5 align-items-center">
                <img
                  class="monthly-img img-fluid rounded-3"
                  src="../../assets/img/test/eminem.jpg"
                  alt=""
                />
                <div class="d-flex flex-column monthly-text">
                  <p
                    class="text-capitalize fs-5 fw-bold m-0 p-0 color-dark pointer"
                  >
                    {{ x.name }}
                  </p>
                </div>
              </div>
              <div class="d-flex gap-4 align-items-center">
                <span class="me-3 text-capitalize"
                  >{{ formattime(x.duration) }}
                </span>
                <span class="me-3 text-capitalize"
                  >{{ formatview(x.plays) }} plays</span
                >
                <svg
                  class="pointer svg-more"
                  width="18"
                  height="6"
                  viewBox="0 0 18 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="3" cy="3" r="3" fill="#B3B3BC" />
                  <circle cx="15" cy="3" r="3" fill="#B3B3BC" />
                </svg>
              </div>
            </div>
          </div>
          <div v-else class="d-flex justify-content-center">
            <img src="../../assets/img/empty.png" class="img-empty" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="w-25 px-2 aside">
      <section>
        <p class="fw-bold fs-5 text-capitalize mt-4 mb-0">Social media</p>
        <ul
          class="d-flex flex-column gap-1 mt-2"
          v-if="otheruser.socialmedia.length > 0"
        >
          <li class="d-flex gap-3 align-items-center">
            <img src="../../assets/icons/github.png" alt="" />
            <span class="text-capitalize pointer socilamedia-title"
              >My github</span
            >
          </li>
          //TODO AFTER Finish dashbord home
        </ul>
        <div v-else class="d-flex justify-content-center">
          <img
            src="../../assets/img/empty.png"
            class="img-fluid img-aside"
            alt=""
          />
        </div>
      </section>
      <section>
        <p class="fw-bold fs-5 text-capitalize mt-4 mb-0">recomended</p>
        <ul
          class="d-flex flex-column gap-3 mt-2"
          v-if="otheruser.recommendUser.length > 0"
        >
          <li class="d-flex gap-3 align-items-center">
            <img
              src="../../assets/img/test/eminem.jpg"
              class="img-fluid recomended-img rounded-circle"
              alt=""
            />
            <span class="text-capitalize pointer recomeded-title fs-5"
              >eminem</span
            >
          </li>
        </ul>
        <div v-else class="d-flex justify-content-center">
          <img
            src="../../assets/img/empty.png"
            class="img-fluid img-aside"
            alt=""
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import loader from "../loader.vue";
import info from "../../../default";
import Register from "../Register.vue";
export default {
  name: "user",
  beforeMount() {
    if (this.otheruser) {
      setTimeout(() => {
        this.popups.loader = false;

        this.data = this.otheruser.tracks.filter((e) => {
          return e.type === "music" && e.status === "public";
        });
        this.data.map((e) => {
          e.duration = e.track.duration;
        });

        this.otheruser.albums.forEach((album) => {
          album.tracks.forEach((track) => {
            if (track.status === "public") {
              track.createdAt = album.createdAt;
              this.data.push(track);
            }
          });
        });

        this.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        this.checkfollow();
      }, 500);
    }
  },
  data() {
    return {
      component: "music",
      apiaddress: info.Api_ADDRESS,
      detail: true,
      popups: {
        loader: true,
      },
      data: [],
    };
  },
  methods: {
    changecomponent: function (e) {
      this.component = e;
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
        return number.toString();
      }
    },
    follow: function (id) {
      if (this.checkfollow() === "unfollow") {
        axios
          .get(`${this.apiaddress}users/unsubscribe/${id}`, {
            headers: {
              jwt: Register.methods.getcookies("jwt"),
            },
          })
          .then((res) => {
            if (res.data) {
              this.$emit("reload", "reload");
            }
          });
      } else {
        axios
          .get(`${this.apiaddress}users/subscribe/${id}`, {
            headers: {
              jwt: Register.methods.getcookies("jwt"),
            },
          })
          .then((res) => {
            if (res.data) {
              this.$emit("reload", "reload");
            }
          });
      }
    },
    checkfollow: function () {
      let library = [];
      this.otheruser.subscribe.forEach((e) => {
        library.push(e._id);
      });
      const check = library.includes(this.thisuser._id);

      return check ? "unfollow" : "follow";
    },
    unfollow: function (id) {
      axios
        .get(`${this.apiaddress}users/unsubscribe/${id}`, {
          headers: {
            jwt: Register.methods.getcookies("jwt"),
          },
        })
        .then((res) => {
          if (res.data) {
            this.$emit("reload", "reload");
          }
        });
    },

    whatchprofile: function (username) {
      location.href = `/user/${username}`;
    },
    checkcomponent: function () {
      if (this.otheruser) {
        if (this.component === "podcast") {
          this.data = this.otheruser.tracks.filter((e) => {
            return e.type == "podcast" && e.status == "public";
          });
        } else if (this.component === "music") {
          this.data = this.otheruser.tracks.filter((e) => {
            return e.type === "music" && e.status === "public";
          });
          this.otheruser.albums.forEach((album) => {
            album.tracks.forEach((track) => {
              if (track.status === "public") {
                track.createdAt = album.createdAt;
                this.data.push(track);
              }
            });
          });

          this.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
        } else if (this.component === "album") {
          this.data = this.otheruser.albums.filter((album) => {
            return album.status == "public";
          });
          this.data.forEach((album) => {
            album.duration = 0;
            album.tracks.forEach((track) => {
              album.duration += track.duration;
            });
          });
        } else if (this.component === "playlist") {
          this.data = this.otheruser.playlists.filter((playlist) => {
            return playlist.status == "public";
          });
          this.data.forEach((playlist) => {
            playlist.duration = 0;
            playlist.tracks.forEach((track) => {
              playlist.duration += track.duration;
            });
          });
        } else if (this.component === "follower") {
          this.data = this.otheruser.subscribe;
          this.data.map((e) => {
            if (e._id === this.thisuser._id) {
              e.followcheck = true;
            } else {
              e.followcheck = false;
            }
          });

          const index = this.data.findIndex(
            (item) => item._id === this.thisuser._id
          );
          if (index !== -1) {
            const item = this.data.splice(index, 1)[0];
            this.data.sort((a, b) => {
              if (a.followcheck && !b.followcheck) {
                return -1;
              } else if (!a.followcheck && b.followcheck) {
                return 1;
              } else {
                return 0;
              }
            });

            this.data.unshift(item);
          }
        } else if (this.component === "following") {
          this.data = this.otheruser.artists;
          this.data.map((e) => {
            if (e._id === this.thisuser._id) {
              e.followcheck = true;
            } else {
              e.followcheck = false;
            }
          });

          const index = this.data.findIndex(
            (item) => item._id === this.thisuser._id
          );
          if (index !== -1) {
            const item = this.data.splice(index, 1)[0];
            this.data.sort((a, b) => {
              if (a.followcheck && !b.followcheck) {
                return -1;
              } else if (!a.followcheck && b.followcheck) {
                return 1;
              } else {
                return 0;
              }
            });

            this.data.unshift(item);
          }
        }
      }
    },
  },
  watch: {
    component: function () {
      this.checkcomponent();
    },
  },
  props: ["otheruser", "thisuser"],
  components: {
    loader,
  },
};
</script>

<style scoped>
.profile-parent img {
  width: 110px;
  height: 110px;
  cursor: pointer;
}

.follow-parent span {
  font-size: 14px !important;
  height: 22px;
}
.follow-parent span:hover {
  border-bottom: 1px solid var(--blue-main) !important;
}
.bio {
  width: 400px;
}
.socilamedia-title:hover,
.recomeded-title:hover {
  text-decoration: underline;
  font-weight: bold;
}

.recomended-img {
  width: 50px;
}
.main {
  overflow: auto;
  height: 650px;
}
.aside {
  overflow: hidden;
}
.active {
  border-bottom: 2px solid var(--blue-main);
}
.monthly-img {
  width: 50px;
  height: 50px;
}
.monthly-text {
  width: 220px;
  text-align: left !important;
}

.album-.monthly-text {
  width: 200px;
  text-align: left !important;
}

.svg-more {
  transform: rotate(90deg);
}
.img-greater-than {
  width: 20px;
  opacity: 0.8;
}
.img-follow {
  width: 60px;
}
.btn-follow {
  max-height: 40px;
  background-color: var(--blue-main);
}
.bg-blue {
  background-color: var(--blue-main);
  color: white;
  width: 120px;
}
.bg-gray {
  background-color: var(--gray-main);
  color: white;
  width: 120px;
}

.img-empty {
  width: 350px;
}
.img-aside {
  width: 250px;
}
</style>
