<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div id="popup">
    <div class="popup-inner rounded-4">
      <i
        class="fas fa-solid fa-close text-danger fs-5 ms-2 pointer"
        @click="close"
      ></i>
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
          class="text-capitalize fw-semibold text-decoration-none fs-5 color-black trim"
          >{{ x.text }}</a
        >
      </div>
      <div
        @click="changecomponent('notification')"
        class="d-flex align-items-center gap-4 justify-content-center pointer notification-child more-parent border-0"
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
import axios from "axios";
import Register from "../Register.vue";

export default {
  name: "notificationpopup",
  beforeMount() {
    axios
      .get(`${this.apiaddress}users/notification`, {
        headers: {
          jwt: Register.methods.getcookies("jwt"),
        },
      })
      .then((res) => {
        if (res.data) {
          res.data.forEach((e) => {
            if (!e.seen) {
              this.unread = true;
              this.$emit("read", this.unread);
            }
          });
          this.data = res.data.reverse().slice(0, 3);
        }
      });
  },
  mounted() {
    document.addEventListener("keydown", this.esc);
  },
  data() {
    return {
      apiaddress: process.env.VUE_APP_Api_ADDRESS,
      url: process.env.VUE_APP_Url,
      data: [],
      unread: false,
    };
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
    changecomponent: function (e) {
      const urllocation = location.pathname;
      if (urllocation.includes("dashboard")) {
        location.href = `${this.url}notification`;
      } else {
        this.$emit("changecomponent", e);
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

.trim {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 260px;
}

@media screen and (max-width: 767px) {
  #popup {
    z-index: 500;
  }
  .popup-inner {
    right: -18%;
    top: -30%;
  }
  li {
    gap: 8px !important;
  }
  .notification-child {
    gap: 8px !important;
  }
  img {
    width: 18px;
  }
  .trim {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 180px;
    font-size: 13px !important;
  }
}
</style>
