<template>
  <div id="popup">
    <div class="popup-inner gap-2 rounded-4">
      <section>
        <i
          @click="close"
          class="fas fa-solid fa-close text-danger fs-5 pointer"
        ></i>
        <div class="mt-1">
          <p class="text-black fs-5 fw-bold">Details</p>
          <div class="d-flex gap-1 flex-column">
            <input
              type="text"
              name=""
              class="form-control"
              maxlength="25"
              id=""
              placeholder="Name"
              ref="nameinput"
              @keydown="checkname($event.target.value)"
            />
            <div class="alert-div" v-show="verifyname.show">
              <div
                class="d-flex align-items-center gap-1 py-1 rounded-3 mx-2 ps-2"
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
                <span class="alert-txt text-capitalize"
                  >You can use this name</span
                >
              </div>
              <div
                class="d-flex align-items-center gap-2 rounded-3 mx-2 ps-2"
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

            <select
              name=""
              class="form-select text-capitalize"
              ref="genreselect"
              id=""
            >
              <option
                v-for="x in base.genres"
                :key="x"
                :value="x.name.toLowerCase()"
                class="text-capitalize"
                :selected="x.name.toLowerCase() === data.genre ? true : false"
              >
                {{ x.name }}
              </option>
            </select>
          </div>

          <div class="mt-1">
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

        <div class="mt-1">
          <p class="text-black fs-5 fw-bold">Status</p>
          <select
            name=""
            id=""
            class="text-capitalize form-select"
            ref="statusinput"
          >
            <option value="private" class="text-capitalize">Private</option>
            <option value="public" class="text-capitalize">Public</option>
          </select>
        </div>

        <div class="mt-1">
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
                  <i class="fas fa-cloud-upload-alt overflow-hidden"></i>
                  <p class="mt-0 text-capitalize">
                    Browse File to Upload tumbnail
                  </p></label
                >
              </form>
              <section class="uploaded-area" v-if="detailshower.tumbnail">
                <li class="rows d-flex">
                  <div class="content upload">
                    <i class="fas fa-file-alt w-25"></i>
                    <div class="details">
                      <span
                        class="name text-capitalize fw-bold color-black trim-text"
                        ref="tumbnailname"
                        >name</span
                      >
                      <span class="size" ref="tumbnailsize">224Kb</span>
                    </div>
                  </div>
                </li>
              </section>
            </div>
          </div>
          <div
            class="mt-2 album-track-wrapper p-1 rounded-3 d-flex flex-column gap-2"
          >
            <button
              @click="popups.albumpopup = true"
              class="w-100 btn-add px-3 py-2 mt-1 rounded-3 overflow-hidden"
            >
              Add Track
            </button>
            <div class="album-tracks-body p-1">
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
                    @click="removetrack(x, i)"
                  ></i>
                </li>
              </section>
            </div>
          </div>
        </div>
        <div class="w-100 mt-2 d-flex gap-4">
          <button
            @click="save"
            class="btn fw-bold btn-save px-3 py-2 w-75 fs-5 text-center text-capitalize"
          >
            Save
          </button>
          <button
            @click="reset"
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
  </div>
</template>

<script>
import info from "../../../default";
import axios from "axios";
import iziToast from "izitoast";

import loader from "../loader.vue";
import Register from "../Register.vue";
import uploadpopup from "./uploadpopup.vue";

export default {
  name: "popupaddplaylist",
  beforeMount() {
    this.getuser();
    this.getbase();
  },
  mounted() {
    document.addEventListener("keydown", this.esc);

    if (this.data) {
      this.$refs.nameinput.value = this.data.name;
      this.$refs.descinput.value = this.data.description;
      this.$refs.statusinput.value = this.data.status;

      this.detailshower.tumbnail = true;
      this.$refs.tumbnailsize.innerText = `300 Kb`;
      this.$refs.tumbnailname.innerText =
        this.data.cover.name.split("covers/")[1];

      this.detailshower.albumtrack = true;
      this.data.tracks.forEach((e) => {
        this.tracks.push(e);
        this.lasttracks.push(e);
      });
    }
  },
  data() {
    return {
      apiaddress: info.Api_ADDRESS,
      typeselect: "album",
      tracks: [],
      popups: {
        loader: false,
        albumpopup: false,
      },
      detailshower: {
        tumbnail: true,
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
      base: [],
      lasttracks: [],
      user: {},
    };
  },
  components: {
    uploadpopup,
    loader,
  },
  methods: {
    close: function () {
      this.clear();
      this.$emit("close", "closed");
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
    esc: function (event) {
      if (event.key === "Escape") {
        this.close();
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
    reset: function () {
      this.$refs.nameinput.value = this.data.name;
      this.$refs.descinput.value = this.data.description;
      this.$refs.statusinput.value = this.data.status;

      this.detailshower.tumbnail = true;
      this.$refs.tumbnailsize.innerText = `300 Kb`;
      this.$refs.tumbnailname.innerText =
        this.data.cover.name.split("covers/")[1];

      this.detailshower.albumtrack = true;
      this.tracks = [];
      this.lattracks = [];
      this.data.tracks.forEach((e) => {
        this.tracks.push(e);
        this.lasttracks.push(e);
      });
    },
    checkname: function (e) {
      if (e.length > 1) {
        axios
          .get(
            `${this.apiaddress}users/checktrackandalbumname/${e}&&${this.data.name}`
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
                message: res.data.msg,
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
      });
    },
    removetrack: function (data, i) {
      this.tracks.splice(i, 1);

      const index = this.lasttracks.findIndex((e) => {
        return e.name == data.name;
      });
      index >= 0 ? this.lasttracks.splice(index, 1) : null;
    },
    save: function () {
      if (
        this.$refs.nameinput.value &&
        this.$refs.descinput.value &&
        this.tracks.length > 0
      ) {
        this.popups.loader = true;
        const formData = new FormData();

        let track = this.tracks.filter(
          (item) => !this.lasttracks.includes(item)
        );

        formData.append("name", this.$refs.nameinput.value);
        formData.append("id", this.data._id);
        formData.append("description", this.$refs.descinput.value);
        formData.append("genre", this.$refs.genreselect.value);
        formData.append("visibility", this.$refs.statusinput.value);
        formData.append("trackdetail", JSON.stringify(this.tracks));
        formData.append("objectKey", this.$refs.tumbnailinput.files[0]);
        formData.append("lasttracks", JSON.stringify(this.lasttracks));
        track.forEach((e) => {
          formData.append("objectKey", e.track);
        });

        axios
          .put(`${this.apiaddress}upload/updatealbum`, formData)
          .then((res) => {
            this.popups.loader = false;
            if (res.data.status) {
              iziToast.success({
                message: res.data.msg,
                position: "topRight",
              });
              this.clear();
              this.$emit("update", "update");
              this.close();
            } else {
              iziToast.error({
                title: "Please try again",
                position: "topRight",
              });
            }
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
  padding: 20px;
  padding-bottom: 10px;
  padding-top: 10px;

  overflow: auto;
  max-height: 800px;
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
  width: 400px;
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
.proe-2fileshower img,
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
* {
  overflow-x: hidden;
}
.album-track-wrapper {
  border: 2px dashed var(--blue-main);
  max-height: 300px;
  overflow: auto !important ;
}

.trim-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 380px;
}

.alert-div {
  max-height: 50px;
}
@media screen and (max-width: 767px) {
  #popup {
    margin-bottom: 68px;
  }
  .popup-inner {
    max-height: 95%;
  }
}
</style>
