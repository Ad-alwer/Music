<template>
  <div id="parent" class="container mt-5 px-3 position-relative">
    <loader v-if="loader" />
    <section v-else>
      <div>
        <div class="d-flex justify-content-between">
          <span class="text-uppercase color-blue fw-semibold fs-5"
            >Saved tracks</span
          >
        </div>
        <div v-if="data.length > 0">
          <div>
            <div
              v-for="(x, i) in data"
              :key="x._id"
              class="d-flex align-items-center px-3 gap-4 mt-3 position-relative child"
            >
              <img
                :src="x.cover.url"
                class="tumbnail img-fluid rounded-4"
                alt=""
              />
              <div class="d-flex flex-column text-div gap-2">
                <span
                  @click="play(x._id)"
                  class="text-capitalize color-black fw-bold fs-5 pointer"
                  >{{ x.name }}</span
                >
                <span
                  @click="gotouser(x.artist.username)"
                  class="text-capitalize color-gray pointer"
                  >{{ x.artist.username }}</span
                >
              </div>
              <span class="color-gray">{{
                formattime(x.duration ? x.duration : x.track.duration)
              }}</span>
              <div>
                <img
                  class="pointer"
                  v-if="x.checklike"
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
                class="more"
                width="18"
                height="6"
                viewBox="0 0 18 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                @click="openmore(i)"
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
                  @click="unsave(x._id)"
                  class="fw-semibold text-capitalize px-2 py-1 li-child"
                >
                  Unsave
                </li>
                <li
                  @click="like(x.checklike, x._id)"
                  class="fw-semibold text-capitalize px-2 py-1 li-child border-bottom-0"
                >
                  {{ x.checklike ? "Unlike" : "like" }}
                </li>
              </ul>
            </div>
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
  </div>
</template>

<script>
import axios from "axios";
import info from "../../../default";
import Register from "../Register.vue";
import loader from "../loader.vue";

export default {
  name: "libraryTrack",
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
      user: [],
      loader: true,
    };
  },
  methods: {
    getdata: function () {
      axios
        .get(`${this.apiaddress}users/user`, {
          headers: {
            jwt: Register.methods.getcookies("jwt"),
          },
        })
        .then((res) => {
          if (res.data) {
            this.user = res.data;
            axios
              .get(`${this.apiaddress}users/savedtrack`, {
                headers: {
                  jwt: Register.methods.getcookies("jwt"),
                },
              })
              .then((res) => {
                if (res.data) {
                  this.data = res.data;
                  this.data.forEach((e) => (e.showmore = false));
                  this.checklike();
                  this.loader = false;
                }
              });
          }
        });
    },
    formattime: function (seconds) {
      let minutes = Math.floor(seconds / 60);
      let remainingSeconds = seconds % 60;

      let formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      let formattedSeconds =
        remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

      return `${formattedMinutes}:${formattedSeconds}`;
    },
    checklike: function () {
      this.data.forEach((e) => {
        let search = this.user.likes.find((track) => {
          return e._id == track;
        });
        e.checklike = search ? true : false;
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
              this.getdata();
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
              this.getdata();
              this.$emit("check", {
                type: "like",
                id,
              });
            }
          });
      }
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
    unsave: function (id) {
      this.closeallmore();

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
          // res.data ? this.getdata() : null;
          if (res.data) {
            this.getdata();
            this.$emit("check", {
              type: "save",
              id,
            });
          }
        });
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
    gotouser: function (username) {
      location.href = `/user/${username}`;
    },
  },
  components: { loader },
  props: ["check"],
  watch: {
    check: function (e) {
      if (e.type === "save") {
        this.getdata();
      } else {
        const resualt = this.data.findIndex(
          (data) => data.toString() === e.toString()
        );
        resualt ? this.getdata() : null;
      }
    },
  },
};
</script>

<style scoped>
#parent {
  height: 80vh;
  overflow: hidden !important;
}

.child {
  /* background: blue; */
}
.tumbnail {
  width: 70px;
  height: 70px;
}
.text-div {
  width: 700px;
}
.more {
  transform: rotate(90deg);
  cursor: pointer;
}

.more-list {
  position: absolute;
  right: 120px;
  top: 60px;
  z-index: 5;
  border: 2px solid var(--blue-main);
}

.li-child {
  border-bottom: 2px solid var(--blue-main);
  margin-left: -30px;
  cursor: pointer;
}
</style>
