<template>
  <div id="popup" >
    <div class="popup-inner gap-2 rounded-4">
      <h4 class="fw-semibold text-uppercase text-secondary">Reject message</h4>
      <p class="text-center text-capitalize fs-5 mt-3">{{ message }}</p>
      <div class="d-flex justify-content-center">
        <button class="btn px-3 py-2 w-100 fs-5 mt-3 text-capitalize" @click="close">close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "messagepopup",

  mounted() {
    document.addEventListener("keydown", this.esc);
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
  },

  props: ["message"],
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

button,button:hover{
    background-color: var(--blue-main);
    color: white;
}
</style>
