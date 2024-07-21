<template>
  <div id="parent">
    <loader v-if="loader"/>
    <section v-else class="content container px-5 mt-4">
      <section class="d-flex justify-content-between">
        <span class="text-uppercase color-blue fw-semibold fs-5"
          >notification</span
        >
      </section>
      <section class="mt-4 mx-3">
        <div
          v-for="x in data"
          :key="x"
          class="d-flex align-items-center gap-4 pointer notification-child p-2"
        >
          <img
            :src="
              x.img === 'follow'
                ? require('../../assets/icons/follow.png')
                : x.img === 'welcome'
                ? require('../../assets/icons/welcome.png')
                : x.img === 'accept'
                ? require('../../assets/icons/checknotif.png')
                : x.img === 'reject'
                ? require('../../assets/icons/X.png')
                : x.img === 'like'
                ? require('../../assets/icons/like-light.png')
                : require('../../assets/icons/change-light.png')
            "
            alt=""
          />
          <a
            class="text-capitalize fw-semibold text-decoration-none fs-5 color-black"
            >{{ x.text }}</a
          >
        </div>
        <!-- <div
          class="d-flex align-items-center gap-4 pointer notification-child p-2"
        >
          <img src="../../assets/icons/like-light.png" alt="" />
          <a
            class="text-capitalize fw-semibold text-decoration-none fs-5 color-black"
            >matin56 liked your music</a
          >
        </div>
        <div
          class="d-flex align-items-center gap-4 pointer notification-child p-2"
        >
          <img src="../../assets/icons/welcome.png" alt="" />
          <a
            class="text-capitalize fw-semibold text-decoration-none fs-5 color-black"
            >welcome to our site</a
          >
        </div>
        <div
          class="d-flex align-items-center gap-4 pointer notification-child p-2"
        >
          <img src="../../assets/icons/change-light.png" alt="" />
          <a
            class="text-capitalize fw-semibold text-decoration-none fs-5 color-black"
            >your username was chaged to abdf34</a
          >
        </div> -->
      </section>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import info from "../../../default";
import Register from "../Register.vue";
import loader from "../loader.vue";

export default {
  beforeMount() {
    axios
      .get(`${this.apiaddress}users/notification`, {
        headers: {
          jwt: Register.methods.getcookies("jwt"),
        },
      })
      .then((res) => {
        if (res.data) {
          this.data = res.data;
          this.loader = false;
        }
      });
  },
  name: "notification",
  components: {loader},
  data() {
    return {
      apiaddress: info.Api_ADDRESS,
      data: [],
      loader: true,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap");
* {
  overflow: hidden;
}

.notification-child {
  border-bottom: 2px solid var(--blue-main);
}
</style>
