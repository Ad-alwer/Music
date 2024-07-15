<template>
  <div id="parent" class="d-flex flex-column mt-1">
    <section class="px-3">
      <div class="d-flex justify-content-between align-items-center">
        <span class="text-uppercase color-black fs-5 fw-semibold"
          >Top 100 Monthly</span
        >
        <span class="text-capitalize color-gray pointer">More List</span>
      </div>
      <div class="mt-2">
        <div class="monthly-box d-flex gap-3 align-items-center">
          <div
            class="monthly-num d-flex justify-content-center align-items-center"
          >
            <span class="color-gray fs-3">01</span>
          </div>
          <img
            class="monthly-img img-fluid rounded-3"
            src="../../assets/img/test/eminem.jpg"
            alt=""
          />
          <div class="d-flex flex-column monthly-text">
            <p class="text-capitalize fs-5 fw-bold m-0 p-0 color-dark pointer">
              Track
            </p>
            <span class="text-capitalize color-gray pointer">eminem</span>
          </div>
          <span class="me-3">03:15</span>
          <svg
            width="18"
            height="6"
            viewBox="0 0 18 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="3" cy="3" r="3" fill="#B3B3BC" />
            <circle cx="15" cy="3" r="3" fill="#B3B3BC" />
          </svg>
        </div>
        <div class="monthly-box d-flex gap-3 align-items-center">
          <div
            class="monthly-num d-flex justify-content-center align-items-center"
          >
            <span class="color-gray fs-3">02</span>
          </div>
          <img
            class="monthly-img img-fluid rounded-3"
            src="../../assets/img/test/eminem.jpg"
            alt=""
          />
          <div class="d-flex flex-column monthly-text">
            <p class="text-capitalize fs-5 fw-bold m-0 p-0 color-dark pointer">
              Track
            </p>
            <span class="text-capitalize color-gray pointer">eminem</span>
          </div>
          <span class="me-3">03:15</span>
          <svg
            width="18"
            height="6"
            viewBox="0 0 18 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="3" cy="3" r="3" fill="#B3B3BC" />
            <circle cx="15" cy="3" r="3" fill="#B3B3BC" />
          </svg>
        </div>
        <div class="monthly-box d-flex gap-3 align-items-center">
          <div
            class="monthly-num d-flex justify-content-center align-items-center"
          >
            <span class="color-gray fs-3">03</span>
          </div>
          <img
            class="monthly-img img-fluid rounded-3"
            src="../../assets/img/test/eminem.jpg"
            alt=""
          />
          <div class="d-flex flex-column monthly-text">
            <p class="text-capitalize fs-5 fw-bold m-0 p-0 color-dark pointer">
              Track
            </p>
            <span class="text-capitalize color-gray pointer">eminem</span>
          </div>
          <span class="me-3">03:15</span>
          <svg
            width="18"
            height="6"
            viewBox="0 0 18 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="3" cy="3" r="3" fill="#B3B3BC" />
            <circle cx="15" cy="3" r="3" fill="#B3B3BC" />
          </svg>
        </div>
      </div>
    </section>
    <hr class="mx-5" />
    <playerbox @check="checkfollowandsave" :data="data" :check="check" />
  </div>
</template>

<script>
import playerbox from "./playerbox.vue";

export default {
  name: "player",
  data() {
    return {};
  },
  components: {
    playerbox,
  },
  methods: {
    checkfollowandsave: function (e) {
      this.$emit('check', e);
    },
  },
  mounted() {},
  props: ["data", "check"],
};
</script>

<style scoped>
* {
  overflow: hidden;
}
.monthly-box {
  height: 75px;
}
.monthly-img {
  width: 50px;
  height: 50px;
}
.monthly-text {
  width: 140px;
  text-align: left !important;
}

.monthly-text p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
}
.monthly-num {
  width: 35px;
  height: 45px;
}
.tumbnail {
  width: 80px;
  height: 80px;
}
</style>
