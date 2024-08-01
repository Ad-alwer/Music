<template>
  <div id="popup">
    <div class="popup-inner gap-2 rounded-4">
      <section v-if="!popups.loader">
        <i
          class="fas fa-solid fa-close text-danger fs-5 fw-bold pointer"
          @click="close"
        ></i>
        <section>
          <p class="fw-semibold fs-5 text-capitalize text-center">
            {{ type }} slider
          </p>
          <input
            type="text"
            class="form-control input-link"
            placeholder="Enter your link ..."
            ref="link"
          />
          <div class="d-flex flex-column mt-2">
            <input
              type="file"
              id="inputfile"
              class="form-control"
              accept=".png, .jpg, .jpeg"
              ref="input"
              @change="changefile"
              hidden
            />
            <label
              for="inputfile"
              class="form-label d-flex justify-content-center"
            >
              <p
                class="px-3 py-2 text-capitalize fw-semibold bg-blue rounded-4 pointer"
              >
                Select your slide
              </p>
            </label>
            <div class="d-flex justify-content-center">
              <img
                v-show="fileshow"
                ref="img"
                src="../../assets/img/test/pinterestdownloader.com-1710335413.293773.jpg"
                :class="
                  type === 'normal'
                    ? 'img-fluid rounded img-normal'
                    : 'img-fluid rounded img-res '
                "
                alt=""
              />
            </div>
          </div>
        </section>
        <section class="mt-2 d-flex gap-4 justify-content-center">
          <button
            @click="save"
            class="btn fw-bold btn-save px-3 py-2 fs-5 text-center text-capitalize"
          >
            Save
          </button>
          <button
            @click="close"
            class="btn fw-bold bg-danger text-white fs-5 px-3 py-2 text-center text-capitalize"
          >
            close
          </button>
        </section>
      </section>
      <loader v-else />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import iziToast from "izitoast";
import loader from "../loader.vue";

export default {
  name: "sliderpopup",
  data() {
    return {
      apiaddress: process.env.VUE_APP_Api_ADDRESS,
      fileshow: false,
      popups: {
        loader: false,
      },
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
    changefile: function () {
      if (this.$refs.input.files.length === 1) {
        this.fileshow = true;
        this.$refs.img.src = URL.createObjectURL(this.$refs.input.files[0]);
      }
    },
    save: function () {
      const linkRegex = /^(http(s)?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/;
      if (
        linkRegex.test(this.$refs.link.value) &&
        this.$refs.input.files.length === 1
      ) {
        this.popups.loader = true;
        const formData = new FormData();
        formData.append("objectKey", this.$refs.input.files[0]);
        formData.append("link", this.$refs.link.value);
        if (this.type === "normal") {
          axios
            .put(`${this.apiaddress}upload/addbanner`, formData)
            .then((res) => {
              if (res.data) {
                this.popups.loader = false;
                iziToast.success({
                  title: res.data.msg,
                  position: "topRight",
                });
                this.$emit("reload", "reload");
                this.close();
              } else {
                this.popups.loader = false;
                iziToast.success({
                  title: res.data.msg,
                  position: "topRight",
                });
              }
            });
        } else {
          axios
            .put(`${this.apiaddress}upload/addresbanner`, formData)
            .then((res) => {
              if (res.data) {
                this.popups.loader = false;
                iziToast.success({
                  title: res.data.msg,
                  position: "topRight",
                });
                this.$emit("reload", "reload");
                this.close();
              } else {
                this.popups.loader = false;
                iziToast.success({
                  title: res.data.msg,
                  position: "topRight",
                });
              }
            });
        }
      } else {
        iziToast.error({
          title: "Please Try Again",
          position: "topRight",
        });
      }
    },
  },
  props: ["type"],
  components: {
    loader,
  },
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

.form-control:focus,
.form-select:focus {
  outline: none;
  box-shadow: none;
}
.btn-save {
  background-color: var(--blue-main);
  color: white;
  width: 400px;
}
.bg-blue {
  background-color: var(--blue-main);
  color: white;
}
.img-normal {
  height: 220px;
  width: 600px;
}
.img-res {
  height: 400px;
  width: 400px;
}
.input-link {
  border: 2px solid var(--blue-main);
}
</style>
