<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div id="popup">
    <div class="popup-inner rounded-4">
      <ul class="ps-0">
        <li>
          <i
            class="fas fa-solid fa-close text-danger fs-5 ms-1 pointer"
            @click="close"
          ></i>
        </li>
        <li class="d-flex align-items-center justify-content-start gap-3 p-1">
          <i class="fas fa-user-circle text-secondary"></i>
          <a
            class="text-capitalize text-decoration-none color-black"
            href="/profile"
            >profile</a
          >
        </li>
        <li class="d-flex align-items-center justify-content-start gap-3 p-1">
          <img
            src="../../assets/icons/upload.png"
            class="img-fluid upload-img"
            alt=""
          />
          <a
            class="text-capitalize text-decoration-none color-black"
            href="/upload"
            >upload</a
          >
        </li>
        <li class="d-flex align-items-center justify-content-start gap-3 p-1">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 0.592676V10.9568C16.0011 11.5523 15.7872 12.131 15.3923 12.6009C14.9973 13.0709 14.444 13.405 13.8204 13.5504C13.1967 13.6957 12.5385 13.6437 11.9504 13.4028C11.3623 13.1619 10.878 12.7459 10.5747 12.2209C10.2713 11.6958 10.1662 11.0919 10.2761 10.5052C10.3859 9.91853 10.7045 9.38268 11.1811 8.9829C11.6577 8.58312 12.265 8.34235 12.9064 8.29888C13.5477 8.25542 14.1864 8.41175 14.7208 8.74301V4.31206L5.76634 6.38488V13.3257C5.76746 13.9212 5.55354 14.4999 5.1586 14.9698C4.76366 15.4398 4.21038 15.774 3.58673 15.9193C2.96308 16.0646 2.30487 16.0127 1.71676 15.7718C1.12865 15.5309 0.644396 15.1148 0.34101 14.5898C0.0376244 14.0648 -0.0674803 13.4609 0.0424085 12.8742C0.152297 12.2875 0.470871 11.7516 0.947473 11.3518C1.42408 10.9521 2.03134 10.7113 2.67272 10.6678C3.31409 10.6244 3.95275 10.7807 4.48714 11.112V2.96162C4.48717 2.82954 4.53489 2.70126 4.62273 2.59719C4.71057 2.49312 4.83347 2.41924 4.97188 2.3873L15.2055 0.0183566C15.2997 -0.00402868 15.3982 -0.00596793 15.4933 0.0126901C15.5884 0.0313482 15.6776 0.0700992 15.7539 0.125921C15.8305 0.18135 15.8924 0.252176 15.935 0.333041C15.9777 0.413906 15.9999 0.50269 16 0.592676Z"
              fill="#787887"
            />
          </svg>
          <a
            class="text-capitalize text-decoration-none color-black"
            href="/publishmusic"
            >my music</a
          >
        </li>
        <li class="d-flex align-items-center justify-content-start gap-3 p-1">
          <img
            class="podcast-img"
            src="../../assets/icons/podcast.png"
            alt=""
          />
          <a
            class="text-capitalize text-decoration-none color-black"
            href="/publishpodcast"
            >my poddast</a
          >
        </li>
        <li class="d-flex align-items-center justify-content-start gap-3 p-1">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.8 0H3.4C2.4352 0 1 0.6392 1 2.4V13.6C1 15.3608 2.4352 16 3.4 16H15.4V14.4H3.4096C3.04 14.3904 2.6 14.2448 2.6 13.6C2.6 13.5192 2.6072 13.4472 2.6192 13.3816C2.7088 12.9208 3.0864 12.808 3.4096 12.8H15.4V1.6C15.4 1.17565 15.2314 0.768687 14.9314 0.468629C14.6313 0.168571 14.2243 0 13.8 0ZM13.8 7.2L12.2 6.4L10.6 7.2V1.6H13.8V7.2Z"
              fill="#787887"
            />
          </svg>
          <a
            class="text-capitalize text-decoration-none color-black"
            href="/publishalbum"
            >my album</a
          >
        </li>
        <li class="d-flex align-items-center justify-content-start gap-3 p-1">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
          >
            <path
              d="M0 0 C15.18 0 30.36 0 46 0 C46 10.56 46 21.12 46 32 C30.82 32 15.64 32 0 32 C0 21.44 0 10.88 0 0 Z M19 11 C19 14.3 19 17.6 19 21 C21.64 19.68 24.28 18.36 27 17 C27 16.34 27 15.68 27 15 C24.36 13.68 21.72 12.36 19 11 Z "
              fill="#787887"
              transform="translate(2,13)"
            />
            <path
              d="M0 0 C12.21 0 24.42 0 37 0 C37 0.66 37 1.32 37 2 C24.79 2 12.58 2 0 2 C0 1.34 0 0.68 0 0 Z "
              fill="#787887"
              transform="translate(6,9)"
            />
            <path
              d="M0 0 C8.91 0 17.82 0 27 0 C27 0.66 27 1.32 27 2 C18.09 2 9.18 2 0 2 C0 1.34 0 0.68 0 0 Z "
              fill="#787887"
              transform="translate(11,5)"
            />
          </svg>
          <a
            class="text-capitalize text-decoration-none color-black"
            href="/publishplaylist"
            >my playlist</a
          >
        </li>

        <li
          class="d-flex align-items-center justify-content-start gap-3 p-1"
          v-if="admin"
        >
          <i class="fa-solid fa-key text-secondary"></i>
          <a
            class="text-capitalize text-decoration-none color-black"
            href="/dashboard"
            >dashboard</a
          >
        </li>
      </ul>
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
      if (event.key === "Escape") {
        this.close();
      }
    },
  },
  props: ["admin"],
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
  position: relative;
  top: -26%;
  right: -44%;
  background-color: white;
  color: black;
  padding: 10px;
  padding-bottom: 0px;
  padding-top: 0px;
}

ul {
  position: relative;
  top: 7px;
}
svg {
  width: 16px;
  height: 16px;
}


</style>
