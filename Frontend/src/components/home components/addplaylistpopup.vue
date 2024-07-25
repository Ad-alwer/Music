<template>
  <div id="popup">
    <div class="popup-inner gap-2 rounded-4">
      <loader v-if="loader" />
      <section>
        <div>
          <i
            @click="close"
            class="fas fa-sloid fa-close fs-4 text-capitalize text-danger pointer"
          ></i>
          <h4 class="fw-bold text-capitalize mt-2 text-center">
            Add playlists
          </h4>
        </div>
        <form action="" class="mt-1">
          <div class="d-flex justify-content-center">
            <img
              class="img-fluid tumbnail rounded border-secondary p-1"
              src="../../assets/icons/idk.png"
              alt=""
              ref="tumbnail"
            />
          </div>
          <div
            class="d-flex input-parent rounded-3 align-items-center justify-content-between mt-1 pe-2"
          >
            <input
              type="text"
              class="form-control border-0 text-capitalize"
              maxlength="15"
              placeholder="name"
              ref="nameinput"
              @keyup="namecheker($event.target.value)"
            />

            <svg
              v-if="!namecheck"
              class=""
              xmlns="http://www.w3.org/2000/svg"
              width="23px"
              height="23px"
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

            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              class=""
              height="20px"
              viewBox="0 0 1024 1024"
            >
              <path
                fill="#4db051"
                d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512c282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0m0 961.008c-247.024 0-448-201.984-448-449.01c0-247.024 200.976-448 448-448s448 200.977 448 448s-200.976 449.01-448 449.01m204.336-636.352L415.935 626.944l-135.28-135.28c-12.496-12.496-32.752-12.496-45.264 0c-12.496 12.496-12.496 32.752 0 45.248l158.384 158.4c12.496 12.48 32.752 12.48 45.264 0c1.44-1.44 2.673-3.009 3.793-4.64l318.784-320.753c12.48-12.496 12.48-32.752 0-45.263c-12.512-12.496-32.768-12.496-45.28 0"
              />
            </svg>
          </div>
          <div class="input-parent mt-1 rounded-3">
            <select
              class="text-capitalize form-select"
              ref="status"
              name=""
              id=""
            >
              <option selected class="text-capitalize" value="private">
                private
              </option>
              <option class="text-capitalize" value="public">public</option>
            </select>
          </div>
          <div class="input-parent mt-1 rounded-3">
            <input
              type="file"
              id="tumbnail"
              hidden
              ref="tumbnailselector"
              @change="chagetumbnail"
            />
            <label for="tumbnail" class="py-1 px-2 pointer w-100"
              >Click to select tumbnail</label
            >
          </div>
          <div>
            <div
              class="input-parent rounded-3 py-2 pe-2 mt-1 d-flex flex-column align-items-center gap-2"
            >
              <div
                class="d-flex gap-3 align-items-center w-75 border-2 border-secondary border pe-2 rounded-3"
              >
                <input
                  type="text"
                  class="form-control border-0 text-capitalize"
                  maxlength="15"
                  placeholder="search"
                  ref="searchinput"
                />

                <svg
                  @click="searchtrack($refs.searchinput.value)"
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
              <div
                v-if="searchresault.length > 0"
                class="search-resualt w-100 px-4 mt-1 d-flex flex-column gap-2"
              >
                <div
                  v-for="x in searchresault"
                  :key="x"
                  class="search-child d-flex justify-content-between w-100 align-items-center gap-3"
                >
                  <img :src="x.cover.url" class="img-fluid rounded-3 img-select" alt="" />
                  <div class="d-flex flex-column detail-box">
                    <span class="text-capitalize fw-semibold trim-text fs-5">{{
                      x.name
                    }}</span>
                  </div>
                  <div>
                    <span class="text-secondary text-capitalize"
                      >{{ formatview(x.plays) }} palys</span
                    >
                  </div>
                  <div class="d-flex justify-content-center btn-parent">
                    <button class="btn btn-add" @click.prevent="addtrack(x)">
                      Add
                    </button>
                  </div>
                </div>
              </div>
              <div v-else-if="search">
                <img src="../../assets/img/empty.png" alt="" />
              </div>
            </div>

            <div
              class="tracks mt-1 input-parent px-2 py-1 rounded-3"
              v-if="selectedtracks.length > 0"
            >
              <div class="d-flex justify-content-center my-1">
                <span class="text-center fw-bold fs-5">Selected Traks</span>
              </div>
              <div class="d-flex flex-column select-parent gap-1">
                <div
                  v-for="(x, i) in selectedtracks"
                  :key="x"
                  class="d-flex justify-content-between w-100 align-items-center gap-3"
                >
                  <img :src="x.cover.url" class="img-fluid rounded-3 img-select" alt="" />
                  <div class="d-flex flex-column detail-box">
                    <span class="text-capitalize fw-semibold trim-text fs-5">{{
                      x.name
                    }}</span>
                  </div>
                  <div>
                    <span class="text-secondary text-capitalize"
                      >{{ formatview(x.plays) }} palys</span
                    >
                  </div>
                  <div class="d-flex justify-content-center btn-parent">
                    <button
                      class="btn btn-remove bg-danger me-1"
                      @click="removetrack(i)"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-2 mb-1 d-flex justify-content-center gap-4">
            <button
              class="btn btn-add px-3 fw-semibold"
              @click.prevent="data ? editplaylist() : save()"
            >
              Save
            </button>
            <button
              class="btn btn-remove bg-danger px-3 fw-semibold"
              @click.prevent="close"
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
import info from "../../../default";
import axios from "axios";
import iziToast from "izitoast";

import Register from "../Register.vue";
import loader from "../loader.vue";

export default {
  name: "popupaddplaylist",
  beforeMount() {
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
  mounted() {
    document.addEventListener("keydown", this.esc);

    if (this.data) {
      this.$refs.tumbnail.src = this.data.cover.url;
      this.$refs.nameinput.value = this.data.name;
      this.$refs.status.value = this.data.visibility;
      this.selectedtracks = this.data.tracks;
    }
  },
  data() {
    return {
      apiaddress: info.Api_ADDRESS,
      namecheck: true,
      searchresault: [],
      selectedtracks: [],
      search: false,
      user: {},
      loader: false,
    };
  },
  methods: {
    namecheker: function (e) {
      axios
        .get(`${this.apiaddress}playlist/checkname/${e}`)
        .then((res) => (this.namecheck = res.data));
    },
    chagetumbnail: function () {
      this.$refs.tumbnail.src = URL.createObjectURL(
        this.$refs.tumbnailselector.files[0]
      );
    },
    searchtrack: function (e) {
      axios.get(`${this.apiaddress}track/search/${e}`).then((res) => {
        if (res.data) {
          this.searchresault = [];
          this.searchresault = res.data;
          this.checksearch();
        }
        this.search = e;
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
    checksearch: function () {
      this.selectedtracks.forEach((selecttrack) => {
        const index = this.searchresault.findIndex((e) => {
          return e._id == selecttrack._id;
        });
        index >= 0 ? this.searchresault.splice(index, 1) : null;
      });
    },
    addtrack: function (e) {
      this.selectedtracks.push(e);
      this.checksearch();
    },
    removetrack: function (e) {
      this.selectedtracks.splice(e, 1);
      this.searchtrack(this.search);
    },
    save: function () {
      if (
        this.$refs.nameinput.value &&
        this.$refs.tumbnailselector.files.length > 0 &&
        this.selectedtracks.length > 0
      ) {
        let track = [];
        this.selectedtracks.forEach((e) => {
          track.push(e._id);
        });

        const formData = new FormData();
        formData.append("objectKey", this.$refs.tumbnailselector.files[0]);
        formData.append("name", this.$refs.nameinput.value);
        formData.append("status", this.$refs.status.value);
        formData.append("tracks", JSON.stringify(track));
        formData.append("creator", this.user._id);

        this.loader = true;

        axios
          .post(`${this.apiaddress}upload/playlist`, formData)
          .then((res) => {
            this.loader = false;
            if (res.data) {
              iziToast.success({
                title: res.data.msg,
                position: "topRight",
              });
              this.clear();
              this.close();
              this.$emit("update", "update");
            } else {
              iziToast.error({
                title: res.data.msg,
                position: "topRight",
              });
            }
          });
      } else {
        iziToast.error({
          title: "Please fill all inputs",
          position: "topRight",
        });
      }
    },
    close: function () {
      this.clear();
      this.$emit("close", "closed");
    },
    esc(event) {
      if (event.key === "Escape") {
        this.close();
      }
    },
    clear: function () {
      this.selectedtracks = [];
      this.$refs.nameinput.value = null;
      this.$refs.tumbnailselector.files = null;
    },
    editplaylist: function () {
      if (this.$refs.nameinput.value && this.selectedtracks.length > 0) {
        let track = [];
        this.selectedtracks.forEach((e) => {
          track.push(e._id);
        });

        const formData = new FormData();

        formData.append("objectKey", this.$refs.tumbnailselector.files[0]);
        formData.append("name", this.$refs.nameinput.value);
        formData.append("id", this.data._id);
        formData.append("status", this.$refs.status.value);
        formData.append("tracks", JSON.stringify(track));
        formData.append("creator", this.user._id);

        this.loader = true;

        axios.put(`${this.apiaddress}upload/playlist`, formData).then((res) => {
          this.loader = false;
          if (res.data) {
            iziToast.success({
              title: res.data.msg,
              position: "topRight",
            });
            this.$emit("update", "update");
            this.clear();
            this.close();
          } else {
            iziToast.error({
              title: res.data.msg,
              position: "topRight",
            });
          }
        });
      } else {
        iziToast.error({
          title: "Please fill all inputs",
          position: "topRight",
        });
      }
    },
  },
  components: {
    loader,
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
.input-parent {
  border: 2px solid var(--blue-main);
}
.input-parent input {
  width: 450px;
}
.form-control,
.form-select {
  border: none;
}
.form-control:focus,
.form-select:focus {
  outline: none;
  box-shadow: none;
}
.tumbnail {
  width: 140px;
  height: 140px;
}

.search-resualt,
.select-parent {
  max-height: 140px;
  overflow-y: auto;
}

.search-child img,
.tracks img {
  height: 55px;
}
.btn-add,
.btn-remove {
  background-color: var(--blue-main);
  color: white;

  height: 40px;
}
.detail-box {
  width: 180px;
}

.trim-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 160px;
}

.img-select{
  width: 60px;
  height: 60px;
}
</style>
