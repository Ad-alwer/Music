<template>
  <div id="popup" v-if="!popups.loader">
    <div class="popup-inner gap-2 rounded-4">
      <section v-if="!popups.loader && type == 'genre'">
        <i
          class="fas fa-solid fa-close text-danger fs-5 fw-bold pointer"
          @click="close"
        ></i>
        <section>
          <input
            type="text"
            class="form-control input-name"
            placeholder="Enter your genre name ..."
            ref="name"
          />
          <input type="color" class="form-control mt-3" ref="color" />
        </section>
        <section class="mt-3 d-flex gap-4 justify-content-center">
          <button
            @click="savegenre"
            class="btn fw-bold btn-save px-3 py-2 fs-5 text-center text-capitalize"
          >
            Save
          </button>
          <button
            @click="close"
            class="btn fw-bold bg-danger text-white fs-5 px-3 py-2 text-center text-capitalize"
          >
            Close
          </button>
        </section>
      </section>

      <section v-else-if="!popups.loader && type == 'icon'">
        <i
          class="fas fa-solid fa-close text-danger fs-5 fw-bold pointer"
          @click="close"
        ></i>
        <input
          type="text"
          class="form-control input-name"
          placeholder="Enter your genre name ..."
          ref="name"
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
              v-show="showfile"
              ref="img"
              src=""
              class="img-fluid rounded img-icons"
            />
          </div>
        </div>
        <section class="mt-2 d-flex gap-4 justify-content-center">
          <button
            @click="type === 'genre' ? savegenre() : saveicon()"
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
      <loader v-else-if="popups.loader" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import info from "../../../default";
import iziToast from "izitoast";

import loader from "../loader.vue";

export default {
  components: { loader },
  name: "sliderpopup",
  data() {
    return {
      apiaddress: info.Api_ADDRESS,
      showfile: false,
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
    savegenre: function () {
      if (this.$refs.name.value) {
        this.popups.loader = true;
        axios
          .put(`${this.apiaddress}base/addgenre`, {
            name: this.$refs.name.value,
            color: this.$refs.color.value,
          })
          .then((res) => {
            this.popups.loader = false;
            if (res.data) {
              iziToast.success({
                title: res.data.msg,
                position: "topRight",
              });
              this.$emit("reload", "reload");
              this.close();
            } else {
              iziToast.success({
                title: res.data.msg,
                position: "topRight",
              });
            }
          });
      } else {
        iziToast.error({
          title: "Please Try Again",
          position: "topRight",
        });
      }
    },
    changefile: function () {
      if (this.$refs.input.files.length === 1) {
        this.$refs.img.onload = () => {
          this.showfile = true;
        };
        this.$refs.img.src = URL.createObjectURL(this.$refs.input.files[0]);
      }
    },
    saveicon: function () {
      if (this.$refs.name.value && this.showfile) {
        this.popups.loader = true;
        const formData = new FormData();
        formData.append("objectKey", this.$refs.input.files[0]);
        formData.append("name", this.$refs.name.value);

        axios
          .put(`${this.apiaddress}upload/addsocial`, formData)
          .then((res) => {
            this.popups.loader = false;

            if (res.data) {
              iziToast.success({
                title: res.data.msg,
                position: "topRight",
              });
              this.$emit("reload", "reload");
              this.close();
            } else {
              iziToast.success({
                title: res.data.msg,
                position: "topRight",
              });
            }
          });
      } else {
        iziToast.error({
          title: "Please Try Again",
          position: "topRight",
        });
      }
    },
  },
  props: ["type"],
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

input[type="color"] {
  height: 35px;
}
.form-control {
  border: 2px solid var(--blue-main);
}
.img-icons {
  width: 80px;
  height: 80px;
}
</style>
