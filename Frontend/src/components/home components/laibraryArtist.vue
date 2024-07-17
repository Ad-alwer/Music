<template>
  <div id="parent" class="container mt-5 px-3 position-relative">
    <loader v-if="loader" />
    <section v-else>
      <div>
        <div class="d-flex justify-content-between p">
          <span class="text-uppercase color-blue fw-semibold">following</span>
        </div>
        <div class="d-flex mt-4 gap-3">
          <section class="d-flex flex-column artist-body py-2 gap-2">
            <div
              v-for="(x, i) in data"
              @click="select = i"
              :key="x._id"
              :class="
                select === i
                  ? 'd-flex align-items-start gap-2 flex-column artist-box pointer me-2 pe-2 selected'
                  : 'd-flex align-items-start gap-2 flex-column artist-box pointer me-2 pe-2 '
              "
            >
              <div
                class="d-flex justify-content-start align-items-center gap-3"
              >
                <img
                  :src="
                    x.profile ? x.profile : require('../../assets/img/icon.jpg')
                  "
                  class="img-profile rounded-circle"
                  alt=""
                />
                <span class="color-black fw-semibold text-capitalize fs-5">{{
                  x.username
                }}</span>
              </div>
            </div>
          </section>
          <div class="d-flex flex-column">
            <div class="d-flex flex-column align-items-start">
              <p
                @click="gotoartist(data[select].username)"
                class="fw-bold fs-5 color-black text-capitalize mb-1 pointer"
              >
                {{ data[select].username }}
              </p>
              <span class="color-gray text-capitalize"
                >{{ data[select].albums.length }} Albums ,
                {{ data[select].tracklibrary.length }} Tracks</span
              >
            </div>
            <div
              class="d-flex mt-3 flex-wrap gap-3 tracks-parent justify-content-start align-items-start pointer"
            >
              <div
                v-for="y in data[select].tracklibrary"
                :key="y"
                class="d-flex flex-column align-items-center"
              >
                <img :src="y.cover.url" class="img-detail rounded-4" alt="" />
                <span
                  @click="play(y._id)"
                  class="text-capitalize color-black fw-bold fs-5 pointer"
                  >{{ y.name }}</span
                >
                <span class="text-capitalize color-gray"
                  >{{ formatview(y.plays) }} plays</span
                >
              </div>
            </div>
            <p
              @click="gotoartist(data[select].username)"
              class="text-center color-blue pointer fw-bold mt-2 text-capitalize"
            >
              See More by {{ data[select].username }}
            </p>
          </div>
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
  name: "libraryArtist",
  beforeMount() {
    axios
      .get(`${this.apiaddress}users/artist`, {
        headers: {
          jwt: Register.methods.getcookies("jwt"),
        },
      })
      .then((res) => {
        if (res.data) {
          this.data = res.data;
          this.data.forEach((e) => {
            e.select = false;

            let library = e.tracks.filter(
              (track) => track.status.toLowerCase() === "public"
            );
            e.albums.forEach((album) => {
              if (album.status.toLowerCase() === "public") {
                album.tracks.forEach((track) => {
                  if (track.status.toLowerCase() === "public") {
                    track.cover = album.cover;
                    library.push(track);
                  }
                });
              }
            });

            library.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            e.tracklibrary = library.slice(0, 6);
          });
          this.loader = false;
        }
      });
  },
  data() {
    return {
      apiaddress: info.Api_ADDRESS,
      data: [],
      select: 0,
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
    gotoartist: function (username) {
      location.href = `/user/${username}`;
    },
    play: function (id) {
      let data = {
        type: "track",
        id,
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
            this.$emit("changemusic", id);
          }
        });
    },
  },
  components: { loader },
};
</script>

<style scoped>
#parent {
  height: 84vh;
  overflow: hidden !important;
}
.img-profile {
  width: 60px;
  height: 60px;
}
.artist-box {
  width: 22vw;
  /* height: 38vw; */
}
.img-detail {
  width: 140px;
  height: 140px;
}
.tracks-parent {
  width: 480px;
}

.artist-body {
  height: 600px;
  overflow-y: auto !important;
  overflow-x: hidden !important;
}
.selected {
  border-right: 4px solid var(--blue-main);
  border-radius: 2px;
}
</style>
