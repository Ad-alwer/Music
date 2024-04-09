<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div id="popup">
    <div class="popup-inner rounded-4">
      <i
        class="fas fa-solid fa-close text-danger fs-5 ms-2 pointer"
        @click="close"
      ></i>
      <div
        class="d-flex align-items-center gap-4 pointer notification-child p-1"
      >
        <img src="../../assets/icons/follow.png" alt="" />
        <a
          class="text-capitalize fw-semibold text-decoration-none fs-6 color-black"
          >matin57 started follwing you</a
        >
      </div>
      <div
        class="d-flex align-items-center gap-4 pointer notification-child p-1"
      >
        <img src="../../assets/icons/like-light.png" alt="" />
        <a
          class="text-capitalize fw-semibold text-decoration-none fs-6 color-black"
          >matin56 liked your music</a
        >
      </div>
      <div
        class="d-flex align-items-center gap-4 pointer notification-child p-1"
      >
        <img src="../../assets/icons/welcome.png" alt="" />
        <a
          class="text-capitalize fw-semibold text-decoration-none fs-6 color-black"
          >welcome to our site</a
        >
      </div>
      <div
        @click="goto('/notification')"
        class="d-flex align-items-center gap-4 justify-content-center pointer notification-child more-parent"
      >
        <a
          class="text-capitalize fw-semibold text-decoration-none fs-6 color-blue"
          >more</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "notificationpopup",
  mounted() {
    document.addEventListener("keydown", this.esc);
  },
  methods: {
    goto: function (e) {
      location.href = e;
      this.close();
    },
    close: function () {
      this.$emit("close", "closed");
    },
    esc(event) {
      console.log('x');
      if (event.key === "Escape") {
        this.close();
      }
    },
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
  top: -30%;
  right: -34%;
  background-color: white;
  color: black;
  position: relative;
  padding: 10px;
  max-height: 720px;
}
.popup-inner div:not(:nth-child(5)) {
  border-bottom: 2px solid var(--blue-main);
}
.more-parent a {
  position: relative;
  top: 4px;
}
img {
  width: 24px;
}
</style>
