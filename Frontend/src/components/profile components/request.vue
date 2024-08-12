<template>
  <loader v-if="popups.loader" />
  <section v-else class="content w-100 mx-3">
    <div class="d-flex justify-content-between mt-4 mx-5">
      <span class="text-uppercase color-blue fw-semibold fs-5">requests</span>
    </div>
    <div class="px-4">
      <table class="table table-borderless mt-4">
        <tr>
          <th class="text-center text-capitalize fw-semibold">name</th>
          <th class="text-center text-capitalize fw-semibold">status</th>
          <th class="text-center text-capitalize fw-semibold">message</th>
        </tr>
        <tr v-for="x in user.requests" :key="x">
          <th class="text-center text-capitalize text">{{ x.name }}</th>
          <th class="text-center text-capitalize">
            <div>
              <img
                v-if="x.status == 'accept'"
                src="../../assets/icons/check.png"
                alt=""
              />
              <img
                v-else-if="x.status == 'reject'"
                src="../../assets/icons/uncheck.png"
                alt=""
              />
              <img v-else src="../../assets/icons/pending.png" alt="" />
            </div>
          </th>
          <th class="text-center text-capitalize">
            <img
              v-if="x.status == 'reject'"
              class="pointer"
              @click="messageshowopener(x.msg)"
              src="../../assets/icons/message.png"
              alt=""
            />
            <img v-else src="../../assets/icons/nomessage.png" alt="" />
          </th>
        </tr>
      </table>
    </div>
    <messageshowpopup
      @close="popups.messageshow = false"
      v-if="popups.messageshow"
      :message="rejectmessage"
    />
  </section>
</template>

<script>
import Register from "../Register.vue";
import axios from "axios";

import messageshowpopup from "../profile components/messageshowpopup.vue";
import loader from "../loader.vue";

export default {
  name: "request",
  beforeMount() {
    this.getdata();
  },
  data() {
    return {
      apiaddress: process.env.VUE_APP_Api_ADDRESS,
      user: [],

      popups: {
        loader: true,
        messageshow: false,
      },
      rejectmessage: null,
    };
  },
  methods: {
    getdata: function () {
      axios
        .get(`${this.apiaddress}users/user`, {
          headers: {
            jwt: Register.methods.getcookies("jwt"),
          },
        })
        .then((res) => {
          this.user = res.data;
          this.popups.loader = false;
        });
    },
    messageshowopener: function (e) {
      this.rejectmessage = e;
      this.popups.messageshow = true;
    },
  },
  components: {
    messageshowpopup,
    loader,
  },
};
</script>

<style scoped>
* {
  overflow: hidden;
}
.content {
  width: 62%;
  overflow-y: scroll !important;
  max-height: 90vh;
}
aside.menu {
  width: 240px;
  height: 92vh;
}
aside.player {
  width: 25%;
}
tr {
  border-bottom: 2px solid #4343ef;
}
@media screen and (max-width: 767px) {
  #parent {
    margin-bottom: 68px;
  }
  .text{
    font-size: 12px !important;
  }
}
</style>
