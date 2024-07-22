<template>
  <div id="parent" class="container mt-5 px-3 position-relative">
    <loader v-if="loader" />
    <section v-else >
      <div>
        <div class="d-flex justify-content-between p">
          <span class="text-uppercase color-blue fw-semibold fs-5"
            >Saved playlist</span
          >
        </div>
        <div
          v-if="data.length > 0"
          class="d-flex justify-content-start mt-4 gap-3 flex-wrap"
        >
          <div
            v-for="x in data"
            :key="x._id"
            class="track-body position-relative"
          >
            <img
              :src="x.cover.url"
              class="img-fluid rounded-4 tumbnail"
              alt=""
            />
            <div class="info-btn pointer">
              <img
                src="../../assets/icons/info-light.png"
                class="img-fluid img-info pointer"
                alt=""
              />
            </div>

            <div
              class="tracklist rounded-4 d-flex justify-content-center align-items-center flex-column w-100 h-100"
            >
              <span
                class="text-white p-2 text-capitalize px-3 fs-5 border-bottom pointer info-box"
                >{{ x.tracks.length }} tracks</span
              >
              <span
                class="text-white p-2 text-capitalize px-3 fs-5 border-bottom info-box"
                >{{ formatview(x.plays) }} plays</span
              >
              <span
                @click="gototracklist(x.creator, x.name)"
                class="text-white p-2 text-capitalize px-3 fs-5 border-bottom info-box text-center pointer"
                >{{ x.name }}</span
              >
            </div>
          </div>
        </div>
        <div
          class="d-flex justify-content-center align-items-center mt-5 pt-5"
          v-else
        >
          <img src="../../assets/img/empty.png" alt="" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import info from "../../../default";
import Register from "../Register.vue";
import loader from "../loader.vue";

export default {
  name: "libraryplaylist",
  beforeMount() {
    axios
      .get(`${this.apiaddress}users/savedplaylist`, {
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
  data() {
    return {
      apiaddress: info.Api_ADDRESS,
      data: [],
      loader: true,
    };
  },
  methods: {
    formatview: function (number) {
      if (number >= 1e6) {
        return (number / 1e6).toFixed(0) + "M";
      } else if (number >= 1e3) {
        return (number / 1e3).toFixed(0) + "K";
      } else {
        return number;
      }
    },
    gototracklist: function (username, albumname) {
      location.href = `/user/${username}/playlist/${albumname}`;
    },
  },
  components: {
    loader,
  },
};
</script>

<style scoped>
#parent {
  height: 80vh;
  overflow: hidden !important;
}
.track-body {
  position: relative;
  width: 180px;
  height: 180px;
}
.pagination {
  position: absolute;
  bottom: 0%;
  display: flex;
  justify-content: center;
}
.tracklist {
  background-color: rgba(0, 0, 0, 0.5);
  font-weight: bold;
  color: white;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  transition: all 1s;
  opacity: 0;
}
.track-body:hover .tracklist {
  opacity: 0.9;
}
.info-btn .img-info {
  width: 18px;
  height: 18px;
  position: absolute;
  bottom: 5px;
  right: 5px;
  cursor: pointer;
  z-index: 20;
}

.tumbnail {
  width: 180px;
  height: 180px;
}

.info-box {
  width: 120px;
}
</style>


