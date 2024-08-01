<template>
  <div id="parent">
    <loader v-if="loader" />
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
      </section>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import Register from "../Register.vue";
import loader from "../loader.vue";

export default {
  beforeMount() {
    axios
      .get(`${this.apiaddress}users/readnotification`, {
        headers: {
          jwt: Register.methods.getcookies("jwt"),
        },
      })
      .then((res) => {
        if (res.data) {
          this.data = res.data.reverse();
          this.loader = false;
        }
      });
  },
  name: "notification",
  components: { loader },
  data() {
    return {
      apiaddress: process.env.VUE_APP_Api_ADDRESS,
      data: [],
      loader: true,
    };
  },
};
</script>

<style scoped>
* {
  overflow: hidden;
}

.notification-child {
  border-bottom: 2px solid var(--blue-main);
}

@media screen and (max-width: 767px) {
  #parent {
    margin-bottom: 68px;
  }

  .notification-child img {
    width: 28px;
    height: 28px;
  }
  .notification-child a {
    font-size: 15px !important;
  }
  .content {
    padding: 10px 15px !important ;
  }
}
</style>
