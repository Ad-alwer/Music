<template>
  <div id="popup">
    <div class="popup-inner gap-2 rounded-4">
      <i class="fas fa-solid fa-x fs-5 text-danger ms-2 pointer" @click="close"></i>
      <form action="" class="mt-3 d-flex flex-column gap-3 py-3">
        <div class="d-flex gap-4 flex">
          <div
            class="d-flex align-items-center justify-content-between px-3 input-parent rounded-3 w-75"
          >
            <input
              ref="socialmedialink"
              type="text"
              name=""
              class="form-control text-capitalize"
              maxlength="25"
              id=""
              :value="data.link"
            />
          </div>
          <div
            class="d-flex align-items-center justify-content-between px-3 input-parent rounded-3"
          >
            <input
              type="text"
              ref="socialmediatitle"
              name=""
              class="form-control text-capitalize"
              maxlength="25"
              id=""
              :value="data.title"
            />
          </div>
        </div>
        <div
          class="select-parent rounded-3 d-flex align-items-center justify-content-center"
        >
          <select class="form-select text-capitalize" ref="socialmediaicon">
            <option class="text-capitalize text-center">select icon</option>
            <option
              class="text-capitalize text-center"
              v-for="x in base.socialicon"
              :selected="data.icon === x.name ? true : false"
              :key="x"
              :value="x.name"
            >
              {{ x.name }}
            </option>
          </select>
        </div>
        <div class="d-flex justify-content-center">
          <button
            @click.prevent="save"
            class="btn px-3 w-100 py-2 btn-save text-white fw-semibold fs-6 text-capitalize"
          >
            Edit social media
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import info from "../../../default";
import axios from "axios";

export default {
  name: "messagepopup",
  beforeMount() {
    axios.get(`${this.apiaddress}base/`).then((data) => {
      this.base = data.data;
    });
  },
  mounted() {
    document.addEventListener("keydown", this.esc);
  },
  data() {
    return {
      apiaddress: info.Api_ADDRESS,
      base: [],
    };
  },
  methods: {
    close: function () {
      this.$emit("close", "close");
    },
    esc(event) {
      if (event.key === "Escape") {
        this.close();
      }
    },
    save: function () {
        let newdata = this.data
      newdata.link != this.$refs.socialmedialink.value
        ? (newdata.link = this.$refs.socialmedialink.value)
        : null;

        newdata.title != this.$refs.socialmediatitle.value
        ? (newdata.title = this.$refs.socialmediatitle.value)
        : null;

        newdata.icon != this.$refs.socialmediaicon.value
        ? (newdata.icon = this.$refs.socialmediaicon.value)
        : null;

        this.$emit('save',newdata)
        this.close()
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
  padding: 15px;
}
.input-parent {
  border: 2px solid var(--blue-main);
  width: 450px;
}
.btn-save,
.btn-add {
  background-color: var(--blue-main);
}
.select-parent select {
  border: 2px solid var(--blue-main);
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
.form-control:focus,
.form-select:focus {
  outline: none;
  box-shadow: none;
}
</style>
