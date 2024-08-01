<template>
  <div id="popup">
    <div class="popup-inner gap-2 rounded-4">
      <h5 class="mt-2 fw-bold text-uppercase color-bold text-center fw-bold">
        add track
      </h5>
      <section>
        <input
          type="text"
          name=""
          class="form-control"
          maxlength="25"
          id=""
          placeholder="Name"
          ref="nameinput"
        />
      </section>
      <section class="d-flex gap-3 mt-4 uploadandfeet-box">
        <div class="wrapper">
          <form action="#">
            <input
              class="file-input"
              id="track"
              type="file"
              name="file"
              hidden
              accept="audio/mp3"
              ref="trackinput"
              @change="changetrack"
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
                  ></span>
                  <span class="size" ref="tracksize"></span>
                </div>
              </div>
              <i class="fas fa-check"></i>
            </li>
          </section>
        </div>
        <div class="bar my-2 rounded-top-5 rounded-bottom-5"></div>
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
                class="search-icon pointer"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                @click="search($refs.searchinput.value)"
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
                <img v-if="x.profile"
                    :src="x.profile"
                    class="img-fluid rounded-circle"
                    alt=""
                  />
                  <img v-else
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
      </section>
      <section>
        <div class="wrapper-lyric">
          <form action="#" class="p-2 d-flex flex-column">
            <textarea
              name=""
              class="form-control text-capitalize mt-2"
              placeholder="Write or Paste lyric"
              id=""
              cols="30"
              rows="10"
              ref="lyricsinput"
            ></textarea>
          </form>
        </div>
      </section>
      <section class="w-100 mt-3 d-flex gap-4 btn-box">
        <button
          @click="save"
          class="btn fw-bold btn-save px-3 py-2 w-75 fs-5 text-center text-capitalize"
        >
          Save
        </button>
        <button
          @click="close"
          class="btn fw-bold bg-danger text-white fs-5 px-3 py-2 w-25 text-center text-capitalize"
        >
          cancel
        </button>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import iziToast from "izitoast";

export default {
  name: "uploadpopup",
  data() {
    return {
      arr: [],
      apiaddress: process.env.VUE_APP_Api_ADDRESS,
      detailshower: {
        feat: false,
        track: false,
      },
      searchresault: [],
      feats: [],
    };
  },
  mounted() {
    document.addEventListener("keydown", this.esc);
  },
  methods: {
    close: function () {
      this.$emit("close", "closed");
    },
    esc(event) {
      if (event.key === "Escape") {
        this.close();
      }
    },
    save: function () {
      if (
        this.$refs.nameinput.value &&
        this.$refs.lyricsinput.value &&
        this.$refs.trackinput.files.length > 0
      ) {
        let data = {
          name: this.$refs.nameinput.value,
          track: this.$refs.trackinput.files[0],
          feat: this.feats,
          lyrics: this.$refs.lyricsinput.value,
          trackname:this.$refs.trackinput.files[0].name
        };
       this.$emit('addtrack',data)
       this.close()
      }else{
        iziToast.error({
          title: "Please Fill All Inputs",
          position: "topRight",
        });
      }
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
  },
  props: ["user",'tracks'],
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
}
.form-control,
.form-select {
  border: 2px solid var(--blue-main);
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
.form-control:focus,
.form-select:focus {
  outline: none;
  box-shadow: none;
}
.btn-save {
  background-color: var(--blue-main);
  color: white;
}

@media screen and (max-width: 767px) {
  
  
  .popup-inner {
    padding: 6px;
    max-width: 90%;
    margin-bottom: 66px !important;
    height: 90vh;
    overflow-y: auto ;
    max-height: 90%;
  }
  .uploadandfeet-box{
    flex-direction: column;
    gap: 8px !important;
  }
  .btn-box{
  scale: 0.9;
  }
 
 
}

</style>
