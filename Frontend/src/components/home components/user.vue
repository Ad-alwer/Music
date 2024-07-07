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
            <div v-else class="d-flex justify-content-center w-100">
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
        <div v-if="detail" class="px-4">
          <section>
            <div
              class="monthly-box d-flex gap-4 align-items-center justify-content-between mt-3"
            >
              <i
                class="fa fa-arrow-left text-danger fs-5 pointer"
                @click="closetracklist"
              ></i>
              <div
                class="d-flex gap-5 align-items-center"
                @click="play(selecteddata._id)"
              >
                <img
                  class="monthly-img img-fluid rounded-3"
                  :src="selecteddata.cover.url"
                  alt=""
                />
                <div class="d-flex flex-column monthly-text">
                  <p
                    class="text-capitalize fs-5 fw-bold m-0 p-0 color-dark pointer"
                  >
                    {{ selecteddata.name }}
                  </p>
                </div>
              </div>
              <div class="d-flex gap-4 align-items-center position-relative">
                <span class="me-3 text-capitalize monthly-time"
                  >{{ formattime(selecteddata.duration) }}
                </span>
                <span class="me-3 text-capitalize monthly-play"
                  >{{ formatview(selecteddata.plays) }} plays</span
                >
                <svg
                  class="pointer svg-more"
                  width="18"
                  height="6"
                  viewBox="0 0 18 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  @click.prevent="selecteddata.showmore = true"
                >
                  <circle cx="3" cy="3" r="3" fill="#B3B3BC" />
                  <circle cx="15" cy="3" r="3" fill="#B3B3BC" />
                </svg>
                <ul
                  v-if="selecteddata.showmore"
                  class="more-list rounded-3 bg-white"
                >
                  <li
                    @click="play(selecteddata._id)"
                    class="fw-semibold text-capitalize px-2 py-2 li-child"
                  >
                    play
                  </li>

                  <li
                    v-if="otheruser._id !== thisuser._id"
                    @click="save(selecteddata.checksave, selecteddata._id)"
                    class="fw-semibold text-capitalize px-2 py-1 li-child"
                  >
                    {{ selecteddata.checksave ? "Unsave" : "save" }}
                  </li>

                  <li
                    v-if="otheruser._id !== thisuser._id"
                    class="fw-semibold text-capitalize px-2 py-1 li-child"
                    @click="like(selecteddata.checklike, selecteddata._id)"
                  >
                    {{ selecteddata.checklike ? "Unlike" : "like" }}
                  </li>
                </ul>
              </div>
            </div>
          </section>
          <hr class="bar" />
          <section class="data-parent">
            <div
              class="monthly-box d-flex gap-4 align-items-center justify-content-between mt-3"
              v-for="(x, i) in selecteddata.tracks"
              :key="x"
            >
              <div
                class="d-flex gap-5 align-items-center"
                @click="playdetail(x._id, selecteddata._id)"
              >
                <img
                  class="monthly-img img-fluid rounded-3"
                  :src="x.cover.url"
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
              <div class="d-flex gap-4 align-items-center position-relative">
                <span class="me-3 text-capitalize monthly-time"
                  >{{ formattime(x.duration) }}
                </span>
                <span class="me-3 text-capitalize monthly-play"
                  >{{ formatview(x.plays) }} plays</span
                >
                <svg
                  class="pointer svg-more-detail svg-more"
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
                    @click="playdetail(x._id, selecteddata._id)"
                    class="fw-semibold text-capitalize px-2 py-2 li-child"
                  >
                    play
                  </li>

                  <li
                    v-if="otheruser._id !== thisuser._id"
                    @click="save(x.checksave, x._id)"
                    class="fw-semibold text-capitalize px-2 py-1 li-child"
                  >
                    {{ x.checksave ? "Unsave" : "save" }}
                  </li>

                  <li
                    v-if="otheruser._id !== thisuser._id"
                    class="fw-semibold text-capitalize px-2 py-1 li-child"
                    @click="like(x.checklike, x._id)"
                  >
                    {{ x.checklike ? "Unlike" : "like" }}
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
        <div
          v-else-if="
            !detail && (component == 'following' || component == 'follower')
          "
          class="d-flex flex-column gap-2 data-parent"
        >
          <div v-if="data.length > 0" class="">
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
        <div v-else class="data-parent">
          <div v-if="data.length > 0">
            <div
              class="monthly-box d-flex gap-4 align-items-center justify-content-between mt-3"
              v-for="(x, i) in data"
              :key="x"
            >
              <div class="d-flex gap-5 align-items-center" @click="play(x._id)">
                <img
                  class="monthly-img img-fluid rounded-3"
                  :src="x.cover.url"
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
              <div class="d-flex gap-4 align-items-center position-relative">
                <span class="me-3 text-capitalize monthly-time"
                  >{{ formattime(x.duration) }}
                </span>
                <span class="me-3 text-capitalize monthly-play"
                  >{{ formatview(x.plays) }} plays</span
                >
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
                    v-if="otheruser._id !== thisuser._id"
                    @click="save(x.checksave, x._id)"
                    class="fw-semibold text-capitalize px-2 py-1 li-child"
                  >
                    {{ x.checksave ? "Unsave" : "save" }}
                  </li>

                  <li
                    v-if="
                      (component == 'music' || component == 'podcast') &&
                      otheruser._id !== thisuser._id
                    "
                    class="fw-semibold text-capitalize px-2 py-1 li-child"
                    @click="like(x.checklike, x._id)"
                  >
                    {{ x.checklike ? "Unlike" : "like" }}
                  </li>
                  <li
                    v-if="component == 'album' || component == 'playlist'"
                    @click="opentracklist(x)"
                    class="fw-semibold text-capitalize px-2 py-1 li-child"
                  >
                    tracklist
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div v-else class="d-flex justify-content-center">
            <img src="../../assets/img/empty.png" class="img-empty" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="w-25 px-1 aside">
      <section>
        <p class="fw-bold fs-5 text-capitalize mt-4 mb- pe-3">Social media</p>
        <ul class="" v-if="otheruser.socialmedia.length > 0">
          <li
            v-for="x in otheruser.socialmedia"
            @click="goto(x.link)"
            :key="x"
            class="d-flex gap-3 align-items-center justify-content-start socialmedia-li mt-2"
          >
            <img :src="x.iconlink" class="img-fluid img-socialmedia" alt="" />
            <span class="text-capitalize pointer socilamedia-title">{{
              x.title
            }}</span>
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
      <section>
        <p class="fw-bold fs-5 text-capitalize mt-4 mb-0 pe-3">recomended</p>
        <ul
          class="d-flex flex-column gap-3 mt-2"
          v-if="otheruser.recommendUser.length > 0"
        >
          <li
            v-for="x in otheruser.recommendUser"
            @click="gotouser(x.username)"
            :key="x"
            class="d-flex gap-3 align-items-center"
          >
            <img
              src="../../assets/img/icon.jpg"
              class="img-fluid recomended-img rounded-circle"
              alt=""
            />
            <span class="text-capitalize pointer recomeded-title fs-5">{{
              x.username
            }}</span>
          </li>
        </ul>
        <div v-else class="d-flex justify-content-center align-items-center">
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
import iziToast from "izitoast";

export default {
  name: "user",
  beforeMount() {
    this.getuser();
  },
  mounted() {
    document.addEventListener("click", (e) => {
      e.target.classList.contains("li-child") ||
      e.target.classList.contains("svg-more")
        ? null
        : this.closeallmore();
    });
  },
  data() {
    return {
      component: "music",
      apiaddress: info.Api_ADDRESS,
      detail: false,
      popups: {
        loader: true,
      },
      data: [],
      playdata: null,
      otheruser: {},
      thisuser: {},
      selecteddata: null,
      selectindex: null,
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
          this.thisuser = res.data;
          const id = location.pathname.split("/")[2];
          axios
            .get(`${this.apiaddress}users/getuserbyidorusername/${id}`)
            .then((res) => {
              if (res.data) {
                this.otheruser = res.data;
                this.checkcomponent();
                this.checkfollow();
                this.routing();
                this.popups.loader = false;
              } else {
                location.href = "/notfound";
              }
            });
        });
    },
    changecomponent: function (e) {
      this.component = e;
      this.closetracklist();
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
              this.getuser();
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
              this.getuser();
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
            this.getuser();
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
          this.checksave();
          this.checklike();
        } else if (this.component === "music") {
          this.data = [];
          this.otheruser.tracks.length > 0
            ? this.otheruser.tracks.forEach((track) => {
                if (track.status == "public") {
                  track.duration = track.track.duration;

                  this.data.push(track);
                }
              })
            : null;

          this.otheruser.albums.forEach((album) => {
            album.tracks.forEach((track) => {
              track.cover = album.cover;
              track.createdAt = album.createdAt;
              this.data.push(track);
            });
          });

          this.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );

          this.checksave();
          this.checklike();
          this.data.forEach((e) => (e.shoemore = false));
        } else if (this.component === "album") {
          this.data = [];
          this.otheruser.albums.forEach((album) => {
            if (album.status.toLowerCase() === "public") {
              album.showmore = false;
              album.duration = album.totalduaration;
              album.tracks = album.tracks.filter(
                (e) => e.status.toLowerCase() === "public"
              );
              this.data.push(album);
            }
          });
          this.checksave();
          this.detail ? this.checklike() : null;
        } else if (this.component === "playlist") {
          this.data = this.otheruser.playlists.filter((playlist) => {
            return playlist.visibility.toLowerCase() == "public";
          });

          this.data.forEach((playlist) => {
            playlist.duration = 0;
            playlist.tracks = playlist.tracks.filter(
              (e) => e.status.toLowerCase() === "public"
            );
            playlist.tracks.forEach((track) => {
              playlist.showmore = false;

              if (track.duration) {
                playlist.duration = playlist.duration + Number(track.duration);
              } else {
                playlist.duration =
                  playlist.duration + Number(track.track.duration);
              }
            });
          });
          this.checksave();
          this.detail ? this.checklike() : null;
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
    play: function (id) {
      this.closeallmore();
      let data;
      if (this.component === "music" || this.component === "podcast") {
        data = {
          type: "track",
          id,
          time: 0,
        };
      } else if (this.component === "album") {
        data = {
          type: "album",
          albumid: id,
          time: 0,
        };
      } else {
        data = {
          type: "playlist",
          playlistid: id,
          time: 0,
        };
      }

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
    checksave: function () {
      let search;
      if (this.detail) {
        this.selecteddata.tracks.forEach((e) => {
          search = this.thisuser.saveTracks.find((track) => {
            return e._id == track;
          });
          e.checksave = search ? true : false;
        });
      } else {
        if (this.component === "music" || this.component === "podcast") {
          this.data.forEach((e) => {
            search = this.thisuser.saveTracks.find((track) => {
              return e._id == track;
            });
            e.checksave = search ? true : false;
          });
        } else if (this.component === "album") {
          this.data.forEach((e) => {
            search = this.thisuser.saveAlbums.find((track) => {
              return e._id == track;
            });
            e.checksave = search ? true : false;
          });
        } else {
          this.data.forEach((e) => {
            search = this.thisuser.savePlaylists.find((track) => {
              return e._id == track;
            });
            e.checksave = search ? true : false;
          });
        }
      }
    },
    checklike: function () {
      let search;
      if (this.detail) {
        this.selecteddata.tracks.forEach((e) => {
          search = this.thisuser.likes.find((track) => {
            return e._id == track;
          });
          e.checklike = search ? true : false;
        });
      } else {
        this.data.forEach((e) => {
          search = this.thisuser.likes.find((track) => {
            return e._id == track;
          });
          e.checklike = search ? true : false;
        });
      }
    },
    save: function (check, id) {
      this.closeallmore();

      if (this.detail) {
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
                iziToast.success({
                  title: "Save Successfully",
                  position: "topRight",
                });
              }
              this.getuser();
            });
        }
      } else {
        if (this.component === "music" || this.component === "podcast") {
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
                  iziToast.success({
                    title: "Save Successfully",
                    position: "topRight",
                  });
                }
                this.getuser();
              });
          }
        } else if (this.component === "album") {
          if (check) {
            axios
              .put(
                `${this.apiaddress}users/removesavealbum/${id}`,
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
                  iziToast.success({
                    title: "Unsave Successfully",
                    position: "topRight",
                  });
                }
              });
          } else {
            axios
              .put(
                `${this.apiaddress}users/savealbum/${id}`,
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
                  iziToast.success({
                    title: "Save Successfully",
                    position: "topRight",
                  });
                }
              });
          }
        } else {
          if (check) {
            axios
              .put(
                `${this.apiaddress}users/removesaveplaylist/${id}`,
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
                  iziToast.success({
                    title: "Unsave Successfully",
                    position: "topRight",
                  });
                }
              });
          } else {
            axios
              .put(
                `${this.apiaddress}users/saveplaylist/${id}`,
                {},
                {
                  headers: {
                    jwt: Register.methods.getcookies("jwt"),
                  },
                }
              )
              .then((res) => {
                if (res.data) {
                  iziToast.success({
                    title: "Save Successfully",
                    position: "topRight",
                  });
                }
                this.getuser();
              });
          }
        }
      }
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
            this.getuser();
            if (res.data) {
              iziToast.success({
                title: "Unlike Successfully",
                position: "topRight",
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
            this.getuser();
            if (res.data) {
              iziToast.success({
                title: "Like Successfully",
                position: "topRight",
              });
            }
          });
      }
    },
    opentracklist: function (x, i) {
      this.closeallmore();

      this.selecteddata = x;
      this.selectindex = i;

      if (this.component == "playlist") {
        this.selecteddata.tracks.forEach((e) => {
          if (!e.duration) {
            e.duration = e.track.duration;
          }

          e.showmore = false;
        });
      }

      this.detail = true;

      this.checksave();
      this.checklike();
    },
    closetracklist: function () {
      this.closeallmore();

      this.detail = false;
      this.selecteddata = null;
      this.selectindex = null;
    },
    playdetail: function (id, colectionid) {
      this.closeallmore();
      let data;
      if (this.component === "album") {
        data = {
          type: "album",
          albumid: colectionid,
          id,
          time: 0,
        };
      } else {
        data = {
          type: "playlist",
          playlistid: colectionid,
          id,
          time: 0,
        };
      }

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
    goto: function (x) {
      location.href = `https://${x}`;
    },
    gotouser: function (username) {
      location.href = `${info.Url}user/${username}`;
    },
    routing: function () {
      const component = location.pathname.split("/")[3];

      if (component) {
        let components = [
          "music",
          "album",
          "playlist",
          "podcast",
          "follower",
          "following",
        ];
        let search = components.find((e) => {
          return component == e;
        });

        if (search) {
          this.component = search;
          this.checkcomponent();
        } else {
          location.href = "/notfound";
        }

        const selectdata = location.pathname.split("/")[4];
        if (selectdata) {
          if (component === "album" || component === "playlist") {
            let index;
            if (selectdata.length == 24) {
              index = this.data.findIndex((e) => {
                return e._id == selectdata;
              });
            } else {
              index = this.data.findIndex((e) => {
                return e.name == selectdata.toLowerCase();
              });
            }
            index >= 0
              ? this.opentracklist(this.data[index], index)
              : (location.href = "/notfound");
          } else if (component === "music" || component === "podcast") {
            let index;
            if (selectdata.length == 24) {
              index = this.data.findIndex((e) => {
                return e._id == selectdata.toLowerCase();
              });
            } else {
              index = this.data.findIndex((e) => {
                return e.name == selectdata.toLowerCase();
              });
            }
            index >= 0
              ? this.play(this.data[index]._id)
              : (location.href = "/notfound");
          }
        }

        const selectsecondata = location.pathname.split("/")[5];
        if (selectsecondata) {
          let index;

          if (selectsecondata.length == 24) {
            index = this.selecteddata.tracks.findIndex((e) => {
              console.log(e._id);
              return e._id == selectsecondata;
            });
          } else {
            index = this.selecteddata.tracks.findIndex((e) => {
              return e.name == selectsecondata.toLowerCase();
            });
          }
          this.playdetail(
            this.selecteddata.tracks[index]._id,
            this.selecteddata._id
          );
        }
      }
    },
  },
  watch: {
    component: function () {
      this.checkcomponent();
    },
  },
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
.monthly-play {
  width: 120px;
}
.monthly-time {
  width: 50px;
}

.album-.monthly-text {
  width: 200px;
  text-align: left !important;
}

.svg-more {
  transform: rotate(90deg);
  width: 50px;
}
.svg-more-detail {
  margin-left: 43px !important;
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
  margin-top: 10% !important;
  width: 100px;
}
.img-aside {
  margin-top: 10% !important;
  width: 40px;
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

.bar {
  border: 2px solid var(--blue-main);
  border-radius: 5%;
}

.data-parent {
  height: 460px;
  overflow-y: auto;
  padding-bottom: 20px;
}

.img-socialmedia {
  width: 25px;
  height: 25px;
}

.socialmedia-li {
  margin-left: -25px;
}
</style>
