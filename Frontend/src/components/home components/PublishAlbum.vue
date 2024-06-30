<template>
  <div id="parent" class="container mt-5 px-3 position-relative">
    <section v-if="type == 'playlists'">
      <div>
        <div class="d-flex justify-content-between p">
          <span class="text-uppercase color-blue fw-semibold fs-5">{{
            type
          }}</span>
        </div>
        <div class="d-flex justify-content-start mt-4 gap-3 flex-wrap">
          <div class="track-body position-relative pointer">
            <img
              src="../../assets/icons/addplaylist.png"
              class="img-fluid rounded-4 border border-2 border-secondary"
              alt=""
              @click="popups.addpopups = true"
            />
          </div>
          <div
            v-for="(x, i) in data"
            :key="x"
            class="track-body position-relative"
          >
            <img
              :src="x.cover.url"
              class="img-fluid rounded-4 h-100 w-100"
              alt=""
            />

            <div
              class="d-flex align-items-center gap-1 px-2 cursor position-relative"
            >
              <div
                class="track-body-text-parent d-flex flex-column justify-content-center align-items-center pt-1"
              >
                <p class="color-black text-capitalize fw-semibold trim-text">
                  {{ x.name }}
                </p>
                <span class="text-secondary">{{ x.tracks.length }} Tracks</span>
              </div>
              <svg
                class="more pointer"
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
                  @click="listenPlaylist(x._id)"
                >
                  listen
                </li>
                <li
                  class="fw-semibold text-capitalize px-2 py-1 li-child"
                  @click="editplaylist(x)"
                >
                  Edit
                </li>
                <li
                  @click="changestatus(x._id, x.visibility)"
                  class="fw-semibold text-capitalize px-2 py-1 li-child"
                >
                  set to {{ x.visibility == "public" ? "private" : "public" }}
                </li>
                <li
                  @click="deleteplaylist(x._id)"
                  class="fw-semibold text-capitalize px-2 py-1 li-child"
                >
                  delete
                </li>
                <li
                  @click="tracklist(x.name)"
                  class="fw-semibold text-capitalize px-2 py-1 li-child border-bottom-0"
                >
                  tracklist
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <addopups
      v-if="popups.addpopups"
      @close="closeaddpopup"
      :data="editdata"
      @update="getalbums"
    />
  </div>
</template>

<script>
import addopups from "./addplaylistpopup.vue";

import Register from "../Register.vue";
import axios from "axios";
import info from "../../../default";
import iziToast from "izitoast";

export default {
  name: "libraryAlbum",
  beforeMount() {
    if (this.type === "playlists") {
      this.getalbums();
    }
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
      popups: {
        addpopups: false,
      },
      data: [],
      editdata: null,
      user: {},
    };
  },
  components: { addopups },
  methods: {
    closeaddpopup: function () {
      this.popups.addpopups = false;
      this.editdata = null;
    },
    getalbums: function () {
      axios
        .get(`${this.apiaddress}playlist/getplaylists`, {
          headers: {
            jwt: Register.methods.getcookies("jwt"),
          },
        })
        .then((res) => {
          this.data = res.data;
          this.data.forEach((e) => {
            e.showmore = false;
          });
        });
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
    editplaylist: function (e) {
      this.editdata = e;
      this.closeallmore();
      this.popups.addpopups = true;
    },
    changestatus: function (id, visibility) {
      const status = visibility == "public" ? "private" : "public";
      axios
        .put(`${this.apiaddress}playlist/changeplayliststatus/${id}&&${status}`)
        .then((res) => {
          if (res.data.status) {
            iziToast.success({
              title: " res.data.msg",
              position: "topRight",
            });
            this.getalbums();
          } else {
            iziToast.error({
              title: res.data.msg,
              position: "topRight",
            });
          }
        });
    },
    deleteplaylist: function (id) {
      axios
        .delete(`${this.apiaddress}playlist/delete/${id}`, {
          headers: {
            jwt: Register.methods.getcookies("jwt"),
          },
        })
        .then((res) => {
          if (res.data) {
            iziToast.success({
              title: res.data.msg,
              position: "topRight",
            });
            this.getalbums();
          } else {
            iziToast.error({
              title: res.data.msg,
              position: "topRight",
            });
          }
        });
    },
    tracklist: function (playlistname) {
      location.href = `user${this.user.username}/playlist/${playlistname}`;
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
        });
    },
    listenPlaylist: function (playlistid) {
      const data = {
        playlistid,
        type: "playlist",
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
            this.$emit("changemusic", playlistid);
          }
        });
    },
  },
  props: ["type"],
};
</script>

<style scoped>
#parent {
  height: 80vh;
  overflow: hidden !important;
}
.track-body {
  position: relative;
  width: 160px;
  height: 160px;
}
.track-body-text-parent {
  /* position: absolute;
  bottom: -5%; */
  font-weight: bold;
  width: 100%;
}
.track-body-text-parent p {
  color: var(--main-blavk);
  font-weight: bold;
  margin-bottom: 0 !important;
  font-size: 18px;
}
.track-body-text-parent span {
  font-size: 12px;
  text-transform: capitalize;
}

.trim-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 110px;
}

.more-list {
  position: absolute;
  right: -80px;
  top: 10px;
  z-index: 5;
  border: 2px solid var(--blue-main);
}

.li-child {
  border-bottom: 2px solid var(--blue-main);
  margin-left: -30px;
  cursor: pointer;
}
</style>
