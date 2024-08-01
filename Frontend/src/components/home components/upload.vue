<template>
  <div id="parent" class="container-sm mt-5 px-3 position-relative">
    <section>
      <div class="d-flex justify-content-between">
        <span class="text-uppercase color-blue fw-semibold">upload</span>
      </div>
      <div class="mt-4">
        <p class="text-black fs-5 fw-bold">Details</p>
        <div class="d-flex gap-3 detail-box">
          <input
            type="text"
            name=""
            class="form-control w-75"
            maxlength="25"
            id=""
            placeholder="Name"
            ref="nameinput"
            @keydown="checkname($event.target.value)"
          />

          <select
            name=""
            id=""
            class="form-select w-25"
            ref="typeselect"
            @change="typeselect = $event.target.value"
          >
            <option value="music" :selected="typeselect == 'music'">
              Music
            </option>
            <option value="podcast" :selected="typeselect == 'podcast'">
              podcast
            </option>
            <option value="album" :selected="typeselect == 'album'">
              Album
            </option>
          </select>
          <select
            name=""
            class="form-select w-25 text-capitalize"
            ref="genreselect"
            id=""
          >
            <option
              v-for="(x, i) in base.genres"
              :key="x"
              :value="x.name.toLowerCase()"
              class="text-capitalize"
              :selected="i === 0 ? true : false"
            >
              {{ x.name }}
            </option>
          </select>
        </div>
        <div class="mt-1 alert-div" v-show="verifyname.show">
          <div
            class="pb-1 d-flex align-items-center gap-2 py-1 rounded-3 mx-2 ps-2"
            v-if="verifyname.value"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15px"
              height="15px"
              viewBox="0 0 1024 1024"
            >
              <path
                fill="#4db051"
                d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512c282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0m0 961.008c-247.024 0-448-201.984-448-449.01c0-247.024 200.976-448 448-448s448 200.977 448 448s-200.976 449.01-448 449.01m204.336-636.352L415.935 626.944l-135.28-135.28c-12.496-12.496-32.752-12.496-45.264 0c-12.496 12.496-12.496 32.752 0 45.248l158.384 158.4c12.496 12.48 32.752 12.48 45.264 0c1.44-1.44 2.673-3.009 3.793-4.64l318.784-320.753c12.48-12.496 12.48-32.752 0-45.263c-12.512-12.496-32.768-12.496-45.28 0"
              />
            </svg>
            <span class="alert-txt text-capitalize">You can use this name</span>
          </div>
          <div
            class="pb-1 d-flex align-items-center gap-2 py-1 rounded-3 mx-2 ps-2"
            v-else
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
            >
              <path
                fill="#db0a0a"
                d="M12 21a9 9 0 1 1 9-9a9 9 0 0 1-9 9m0-16.5a7.5 7.5 0 1 0 7.5 7.5A7.5 7.5 0 0 0 12 4.5"
              />
              <path
                fill="#db0a0a"
                d="M12 13a.76.76 0 0 1-.75-.75v-3.5a.75.75 0 0 1 1.5 0v3.5A.76.76 0 0 1 12 13m0 3a.76.76 0 0 1-.75-.75v-.5a.75.75 0 0 1 1.5 0v.5A.76.76 0 0 1 12 16"
              />
            </svg>

            <span class="alert-txt text-capitalize"
              >You can't use this name</span
            >
          </div>
        </div>
        <div class="mt-2">
          <textarea
            name=""
            id=""
            cols="20"
            rows="5"
            class="form-control text-capitalize"
            placeholder="description"
            ref="descinput"
            maxlength="400"
          ></textarea>
        </div>
      </div>

      <div class="mt-4">
        <p class="text-black fs-5 fw-bold">Status</p>
        <select
          name=""
          id=""
          class="text-capitalize form-select"
          ref="statusinput"
        >
          <option value="Private" class="text-capitalize">Private</option>
          <option value="Public" class="text-capitalize">Public</option>
        </select>
      </div>
      <div class="mt-4" v-if="typeselect == 'music' || typeselect == 'podcast'">
        <p class="text-black fs-5 fw-bold">Files</p>
        <div class="d-flex justify-content-center gap-4 files-box">
          <div class="wrapper">
            <form action="#">
              <input
                @change="changetrack"
                class="file-input"
                id="track"
                type="file"
                name="file"
                ref="trackinput"
                hidden
                accept="audio/mp3"
              />

              <label
                class="d-flex flex-column align-items-center pointer"
                for="track"
              >
                <i class="fas fa-cloud-upload-alt"></i>
                <p class="mt-0 text-capitalize">
                  Browse File to Upload files
                </p></label
              >
            </form>
            <section class="uploaded-area" v-if="detailshower.track">
              <li class="rows d-flex">
                <div class="content upload">
                  <i class="fas fa-file-alt"></i>
                  <div class="details">
                    <span
                      ref="trackname"
                      class="name text-capitalize fw-bold color-black"
                      >name</span
                    >
                    <span class="size" ref="tracksize">224Kb</span>
                  </div>
                </div>
                <i class="fas fa-check"></i>
              </li>
            </section>
          </div>
          <div class="bar my-2 rounded-top-5 rounded-bottom-5"></div>
          <div class="wrapper">
            <form action="#">
              <input
                class="file-input"
                @change="changetumbnail"
                accept=".png, .jpg, .jpeg"
                id="tracks"
                type="file"
                name="file"
                ref="tumbnailinput"
                hidden
              />
              <label
                class="d-flex flex-column align-items-center pointer"
                for="tracks"
              >
                <i class="fas fa-cloud-upload-alt"></i>
                <p class="mt-0 text-capitalize">
                  Browse File to Upload tumbnail
                </p></label
              >
            </form>
            <section class="uploaded-area" v-if="detailshower.tumbnail">
              <li class="rows d-flex">
                <div class="content upload">
                  <i class="fas fa-file-alt"></i>
                  <div class="details">
                    <span
                      class="name text-capitalize fw-bold color-black"
                      ref="tumbnailname"
                      >name</span
                    >
                    <span class="size" ref="tumbnailsize">224Kb</span>
                  </div>
                </div>
                <i class="fas fa-check"></i>
              </li>
            </section>
          </div>
        </div>
        <div class="d-flex justify-content-center gap-4 mt-3 files-box">
          <div class="wrapper">
            <form
              action="#"
              class="d-flex flex-column align-items-center justify-content-center gap-1"
            >
              <div
                class="search-parent d-flex rounded-3 px-2 py-1 justify-content-between mt-1 ms-3 align-items-center"
              >
                <input
                  type="text"
                  class="search-input"
                  maxlength="43"
                  placeholder="Search ..."
                  ref="searchinput"
                />
                <svg
                  @click="search($refs.searchinput.value)"
                  class="search-icon pointer"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 19L13.8571 13.8571M8.71429 16.4286C4.4538 16.4286 1 12.9748 1 8.71429C1 4.4538 4.4538 1 8.71429 1C12.9748 1 16.4286 4.4538 16.4286 8.71429C16.4286 12.9748 12.9748 16.4286 8.71429 16.4286Z"
                    stroke="#B3B3BC"
                    stroke-width="2"
                  />
                </svg>
              </div>
              <div class="profileshower p-1 d-flex flex-wrap gap-1 rounded-3">
                <div v-for="x in searchresault" :key="x">
                  <img
                    v-if="x.profile"
                    :src="x.profile"
                    class="img-fluid rounded-circle"
                    alt=""
                    @click="feats.push(x)"
                  />
                  <img
                    v-else
                    src="../../assets/img/icon.jpg"
                    class="img-fluid rounded-circle"
                    alt=""
                    @click="feats.push(x)"
                  />
                </div>
              </div>
            </form>
            <section class="uploaded-area" v-if="detailshower.feat">
              <li class="rows d-flex" v-for="(x, i) in feats" :key="x">
                <div class="content upload">
                  <img
                    v-if="x.profile"
                    :src="x.profile"
                    class="img-fluid rounded-circle"
                    alt=""
                  />
                  <img
                    v-else
                    src="../../assets/img/icon.jpg"
                    class="img-fluid rounded-circle"
                    alt=""
                  />
                  <div class="details">
                    <span class="name text-capitalize fw-bold color-black"
                      ><x class="name"></x>{{ x.username }}</span
                    >
                    <span class="size">{{ x.subscribe.length }} followers</span>
                  </div>
                </div>
                <i
                  class="fas fa-close text-danger"
                  @click="feats.splice(i, 1)"
                ></i>
              </li>
            </section>
          </div>
          <div class="bar my-2 rounded-top-5 rounded-bottom-5"></div>
          <div class="wrapper">
            <form action="#" class="p-2 d-flex flex-column">
              <textarea
                name=""
                ref="lyricsinput"
                class="form-control text-capitalize mt-2"
                placeholder="Write or Paste lyric"
                id=""
                cols="30"
                rows="10"
              ></textarea>
            </form>
          </div>
        </div>
      </div>
      <div class="mt-4" v-if="typeselect == 'album'">
        <p class="text-black fs-5 fw-bold">Files</p>
        <div class="d-flex justify-content-center gap-4">
          <div class="wrapper">
            <form action="#">
              <input
                class="file-input"
                id="tumbnail"
                type="file"
                name="file"
                accept=".png, .jpg, .jpeg"
                ref="tumbnailinput"
                @change="changetumbnail"
                hidden
              />
              <label
                class="d-flex flex-column align-items-center pointer"
                for="tumbnail"
              >
                <i class="fas fa-cloud-upload-alt"></i>
                <p class="mt-0 text-capitalize">
                  Browse File to Upload tumbnail
                </p></label
              >
            </form>
            <section class="uploaded-area" v-if="detailshower.tumbnail">
              <li class="rows d-flex">
                <div class="content upload">
                  <i class="fas fa-file-alt"></i>
                  <div class="details">
                    <span
                      class="name text-capitalize fw-bold color-black"
                      ref="tumbnailname"
                      >name</span
                    >
                    <span class="size" ref="tumbnailsize">224Kb</span>
                  </div>
                </div>
                <i class="fas fa-check"></i>
              </li>
            </section>
          </div>
        </div>
        <div
          class="mt-4 album-track-wrapper p-2 rounded-3 d-flex flex-column gap-2"
        >
          <button
            @click="popups.albumpopup = true"
            class="w-100 btn-add px-3 py-2 mt-1 rounded-3"
          >
            Add Track
          </button>
          <div class="album-tracks-body">
            <section class="uploaded-area" v-if="detailshower.albumtrack">
              <li class="rows d-flex" v-for="(x, i) in tracks" :key="x">
                <div class="content upload">
                  <i class="fas fa-file-alt"></i>
                  <div class="details">
                    <span class="name text-capitalize fw-bold color-black">{{
                      x.name
                    }}</span>
                  </div>
                </div>
                <i
                  class="fas fa-close text-danger fs-5 pointer"
                  @click="tracks.splice(i, 1)"
                ></i>
              </li>
            </section>
          </div>
        </div>
      </div>
      <div class="w-100 mt-3 d-flex gap-4 btn-box">
        <button
          @click="typeselect == 'album' ? savealbum() : savetrack()"
          class="btn fw-bold btn-save px-3 py-2 w-75 fs-5 text-center text-capitalize"
        >
          Save
        </button>
        <button
          @click="clear"
          class="btn fw-bold bg-danger text-white fs-5 px-3 py-2 w-25 text-center text-capitalize"
        >
          reset
        </button>
      </div>
    </section>
    <uploadpopup
      v-if="popups.albumpopup"
      @close="popups.albumpopup = false"
      :user="user"
      :tracks="tracks"
      @addtrack="addtrack"
    />
    <loader v-if="popups.loader" />
  </div>
</template>

<script>
import "@fortawesome/fontawesome-free/css/all.css";
import uploadpopup from "./uploadpopup.vue";
import iziToast from "izitoast";
import loader from "../loader.vue";

import axios from "axios";
import Register from "../Register.vue";

export default {
  name: "uplaod",
  beforeMount() {
    this.getbase();
  },
  data() {
    return {
      apiaddress: process.env.VUE_APP_Api_ADDRESS,
      typeselect: "album",
      tracks: [],
      popups: {
        loader: true,
        albumpopup: false,
      },
      detailshower: {
        tumbnail: false,
        track: false,
        feat: false,
        albumtrack: false,
      },
      searchresault: [],
      feats: [],
      verifyname: {
        value: false,
        show: false,
      },
      base: {},
    };
  },
  components: {
    uploadpopup,
    loader,
  },
  methods: {
    savetrack: function () {
      if (
        this.$refs.nameinput.value &&
        this.$refs.descinput.value &&
        this.$refs.tumbnailinput.files.length > 0 &&
        this.$refs.trackinput.files.length > 0
      ) {
        this.popups.loader = true;
        const formData = new FormData();
        formData.append("name", this.$refs.nameinput.value);
        formData.append("description", this.$refs.descinput.value);
        formData.append("genre", this.$refs.genreselect.value);
        formData.append("type", this.typeselect);
        formData.append("lyrics", this.$refs.lyricsinput.value);
        formData.append("visibility", this.$refs.statusinput.value);
        formData.append("objectKey", this.$refs.tumbnailinput.files[0]);
        formData.append("objectKey", this.$refs.trackinput.files[0]);

        formData.append("feat", JSON.stringify(this.feats));

        axios
          .post(`${this.apiaddress}upload/track`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              jwt: Register.methods.getcookies("jwt"),
            },
          })
          .then((res) => {
            this.popups.loader = false;
            if (res.data.status === "success") {
              iziToast.success({
                message: "Files uploaded",
                position: "topRight",
              });
              this.clear();
            } else {
              iziToast.error({
                title: "Please try again",
                position: "topRight",
              });
            }
          });
      } else {
        iziToast.error({
          title: "Please Fill All Inputs",
          position: "topRight",
        });
      }
    },
    changetumbnail: function () {
      this.detailshower.tumbnail = true;
      setTimeout(() => {
        const fileSize = Math.ceil(
          this.$refs.tumbnailinput.files[0].size / 1024
        );
        this.$refs.tumbnailsize.innerText = `${fileSize} Kb`;
        this.$refs.tumbnailname.innerText =
          this.$refs.tumbnailinput.files[0].name;
      }, 50);
    },
    changetrack: function () {
      this.detailshower.track = true;
      setTimeout(() => {
        const fileSize = Math.ceil(this.$refs.trackinput.files[0].size / 1024);
        fileSize > 1024
          ? (this.$refs.tracksize.innerText = `${Math.ceil(
              fileSize / 1024
            )} Mb`)
          : (this.$refs.tracksize.innerText = `${fileSize} Kb`);
        this.$refs.trackname.innerText = this.$refs.trackinput.files[0].name;
      }, 50);
    },
    search: function (e) {
      axios.get(`${this.apiaddress}users/search/${e.trim()}`).then((res) => {
        this.searchresault = res.data;
        const index = this.searchresault.findIndex((e) => {
          return e._id == this.user._id;
        });
        index >= 0 ? this.searchresault.splice(index, 1) : null;
        this.detailshower.feat = true;
      });
    },
    clear: function () {
      this.$refs.nameinput.value = null;
      this.$refs.descinput.value = null;
      this.$refs.tumbnailinput = this.$refs.tumbnailinput.defaultValue;
      this.$refs.trackinput
        ? (this.$refs.trackinput.value = this.$refs.trackinput.defaultValue)
        : null;
      this.typeselect = "music";
      this.tracks = [];
      this.detailshower.tumbnail = false;
      this.detailshower.track = false;
      this.detailshower.trackalbum = false;
      this.detailshower.feat = false;
      this.searchresault = false;
      this.feats = [];
      this.$refs.lyricsinput ? (this.$refs.lyricsinput.value = "") : null;
      this.$refs.searchinput ? (this.$refs.searchinput.value = null) : null;
    },
    checkname: function (e) {
      if (e.length > 2) {
        axios
          .get(
            `${
              this.apiaddress
            }users/checktrackandalbumname/${e.toLowerCase()}&&null`,
            {
              headers: {
                jwt: Register.methods.getcookies("jwt"),
              },
            }
          )
          .then((res) => {
            if (res.data) {
              this.verifyname.value = true;
              this.verifyname.show = true;
            } else {
              this.verifyname.value = false;
              this.verifyname.show = true;
            }
          });
      } else {
        this.verifyname.value = false;
        this.verifyname.show = true;
      }
    },
    addtrack: function (e) {
      this.detailshower.albumtrack = true;
      this.tracks.push(e);
    },
    savealbum: function () {
      if (
        this.$refs.nameinput.value &&
        this.$refs.descinput.value &&
        this.$refs.tumbnailinput.files.length > 0 &&
        this.tracks.length > 0
      ) {
        this.popups.loader = true;
        const formData = new FormData();
        formData.append("name", this.$refs.nameinput.value);
        formData.append("description", this.$refs.descinput.value);
        formData.append("genre", this.$refs.genreselect.value);
        formData.append("type", this.typeselect);
        formData.append("visibility", this.$refs.statusinput.value);
        formData.append("trackdetail", JSON.stringify(this.tracks));
        formData.append("objectKey", this.$refs.tumbnailinput.files[0]);

        this.tracks.forEach((e) => {
          formData.append("objectKey", e.track);
        });

        axios
          .post(`${this.apiaddress}upload/album`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              jwt: Register.methods.getcookies("jwt"),
            },
          })
          .then((res) => {
            this.popups.loader = false;
            if (res.data.status === "success") {
              iziToast.success({
                message: "Files uploaded",
                position: "topRight",
              });
              this.clear();
            } else {
              iziToast.error({
                title: "Please try again",
                position: "topRight",
              });
            }
          });
      } else {
        iziToast.error({
          title: "Please Fill All Inputs",
          position: "topRight",
        });
      }
    },
    getbase: function () {
      axios.get(`${this.apiaddress}base/`).then((data) => {
        this.base = data.data;
        this.popups.loader = false;
      });
    },
  },
  props: ["user"],
};
</script>

<style scoped>
* {
  overflow: hidden;
}
.form-control,
.form-select {
  border: 2px solid var(--blue-main);
}
.form-control:focus,
.form-select:focus {
  outline: none;
  box-shadow: none;
}

/* Uploader */

::selection {
  color: #fff;
  background: var(--blue-main);
}
.wrapper {
  width: 430px;
  background: #fff;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 7px 7px 12px rgba(0, 0, 0, 0.05);
}

.wrapper form {
  cursor: pointer;
  height: 167px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 5px;
  border: 2px dashed var(--blue-main);
}
form :where(i, p) {
  color: var(--blue-main);
}
form i {
  font-size: 50px;
}

section .rows {
  margin-bottom: 10px;
  margin-top: 5px !important;
  background: #a2bef3b7;
  list-style: none;
  padding: 15px 20px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
section .rows i {
  color: var(--blue-main);
  font-size: 30px;
}
section .details span {
  font-size: 14px;
}
.progress-area .rows .content {
  width: 100%;
  margin-left: 15px;
}
.progress-area .details {
  display: flex;
  align-items: center;
  margin-bottom: 7px;
  justify-content: space-between;
}
.progress-area .content .progress-bar {
  height: 6px;
  width: 100%;
  margin-bottom: 4px;
  background: #fff;
  border-radius: 30px;
}
.content .progress-bar .progress {
  height: 100%;
  width: 0%;
  background: var(--blue-main);
  border-radius: inherit;
}
.uploaded-area {
  max-height: 232px;
  overflow-y: scroll;
}
.uploaded-area.onprogress {
  max-height: 150px;
}
.uploaded-area::-webkit-scrollbar {
  width: 0px;
}
.uploaded-area .rows .content {
  display: flex;
  align-items: center;
}
.uploaded-area .rows .details {
  display: flex;
  margin-left: 15px;
  flex-direction: column;
}
.uploaded-area .rows .details .size {
  color: #404040;
  font-size: 11px;
  text-transform: capitalize;
}
.uploaded-area i.fa-check {
  font-size: 16px;
}
/*  */

div.bar {
  width: 7px;

  background: var(--blue-main);
  opacity: 0.6;
}
textarea {
  resize: none;
}

.search-icon {
  width: 18px;
  height: 18px;
}
.search-input {
  caret-color: var(--blue-main);
  color: var(--gray-main);
}
.search-parent {
  width: 410px;
  height: 33px;
  border: 1px solid var(--gray-main);
  position: relative;
  left: -7px;
}
.profileshower {
  height: 110px !important;
  width: 95%;
  border: 2px solid var(--blue-main);
  overflow-y: auto;
}
.profileshower img,
.content img {
  width: 40px;
  height: 40px;
}
.btn-save {
  background-color: var(--blue-main);
  color: white;
}
.btn-add {
  background-color: var(--blue-main);
  color: white;
}
.album-track-wrapper {
  border: 2px dashed var(--blue-main);
  min-height: 200px;
}

@media screen and (max-width: 767px) {
  #parent {
    margin: 10px 20px 68px 20px !important;
  }
  .detail-box {
    flex-direction: column !important;
  }
  select,
  input,
  textarea,
  .album-track-wrapper,
  .btn-box {
    width: 95% !important;
  }
  .files-box {
    flex-direction: column;
    gap: 8px !important;
    margin-top: 8px !important;
    align-items: center;
  }
  .bar{
    display: none  !important;
  }
}
</style>
