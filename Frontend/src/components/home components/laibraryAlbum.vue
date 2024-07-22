<template>
  <div id="parent" class="container mt-5 px-3 position-relative">
    <loader v-if="loader"/>
    <section v-else>
      <div>
        <div class="d-flex justify-content-between p">
          <span class="text-uppercase color-blue fw-semibold fs-5"
            >Saved albums</span
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

            <div
              class="track-body-text-parent d-flex flex-column justify-content-center align-items-center"
            >
              <p
                @click="play(x._id)"
                class="text-capitalize color-black fw-bold fs-5 pointer"
              >
                {{ x.name }}
              </p>
              <span
                @click="gototracklist(x.tracks[0].artistid, x.name)"
                class="text-capitalize color-gray pointer"
                >{{ x.tracks.length }} Tracks</span
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
  name: "libraryAlbum",

  beforeMount() {
    axios
      .get(`${this.apiaddress}users/savedalbum`, {
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
    gototracklist: function (username, albumname) {
      location.href = `/user/${username}/album/${albumname}`;
    },
    play: function (albumid) {
      let data = {
        type: "album",
        albumid,
        time: 0,
      };

      axios
        .put(
          `${this.apiaddress}users/lastplay`,
          {
            data,
          },
          {
            headers: {
              jwt: Register.methods.getcookies("jwt"),
            },
          }
        )
        .then((res) => {
          if (res.data) {
            this.$emit("changemusic", albumid);
          }
        });
    },
  },
  components: {loader},
};
</script>

<style scoped>
#parent {
  height: 80vh;
  overflow: hidden !important;
}
.track-body {
  position: relative;
  width: 160px;
  height: 160px;
}
.track-body-text-parent {
  font-weight: bold;
  width: 100%;
}
.track-body-text-parent p {
  color: var(--main-blavk);
  font-weight: bold;
  margin-bottom: 0 !important;
  font-size: 18px;
}
.track-body-text-parent span {
  font-size: 12px;
  text-transform: capitalize;
}

.pagination {
  position: absolute;
  bottom: 0%;
  display: flex;
  justify-content: center;
}

.tracklist li {
  position: relative;
  left: -32px;
  width: 160px !important;
}
.track-body:hover .tracklist {
  opacity: 0.9;
}
.tumbnail {
  width: 150px;
  height: 150px;
}
</style>
