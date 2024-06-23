<template>
   <loader v-if="popups.loader" />
  <section v-else class="content w-100">
    <div class="d-flex justify-content-between mt-4 mx-5">
      <span class="text-uppercase color-blue fw-semibold fs-5"
        >recomend user</span
      >
    </div>
    <div
      class="mt-4 d-flex justify-content-center align-items-center flex-column gap-1"
    >
      <div
        class="search-parent d-flex rounded-3 px-2 py-1 justify-content-between mt-1 ms-3 align-items-center"
      >
        <input
          type="text"
          class="search-input"
          maxlength="43"
          placeholder="Search ..."
          ref="searchinput"
        />
        <svg
          class="search-icon pointer"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          @click="searchuser(this.$refs.searchinput)"
        >
          <path
            d="M19 19L13.8571 13.8571M8.71429 16.4286C4.4538 16.4286 1 12.9748 1 8.71429C1 4.4538 4.4538 1 8.71429 1C12.9748 1 16.4286 4.4538 16.4286 8.71429C16.4286 12.9748 12.9748 16.4286 8.71429 16.4286Z"
            stroke="#B3B3BC"
            stroke-width="2"
          />
        </svg>
      </div>
      <div
        class="rounded-3 search-resault  p-2"
        v-if="searchuserdata.length > 0"
      >
        <div
          v-for="x in searchuserdata"
          :key="x"
          class="search-resault-child p-1 px-3 d-flex justify-content-between"
        >
          <div class="d-flex gap-4">
            <img
              :src="
                x.profile ? x.profile : require('../../assets/img/icon.jpg')
              "
              class="img-fluid rounded-circle"
              alt=""
            />
            <div class="d-flex flex-column align-items-center">
              <span class="text-capitalize fw-semibold">{{ x.username }}</span>
              <span class="text-capitalize color-gray"
                >{{ formatview(x.subscribe.length) }} follower</span
              >
            </div>
          </div>
          <button
            @click="addrecommenduser(x._id)"
            class="px-3 py-2 text-white btn-add rounded-3"
          >
            Add
          </button>
        </div>
      </div>
      <div
        class="mt-3 d-flex justify-content-center align-items-center recommend flex-column"
      >
        <div
          v-for="x in user.recommendUser"
          :key="x"
          class="recommend-child w-100 p-1 px-3 d-flex justify-content-between"
        >
          <div class="d-flex gap-4">
            <img
              :src="
                x.profile ? x.profile : require('../../assets/img/icon.jpg')
              "
              class="img-fluid rounded-circle"
              alt=""
            />
            <div class="d-flex flex-column align-items-center">
              <span class="text-capitalize fw-semibold">{{ x.username }}</span>
              <span class="text-capitalize color-gray"
                >{{ formatview(x.subscribe.length) }} follower</span
              >
            </div>
          </div>
          <button
            @click="removerecommenduser(x._id)"
            class="px-3 py-2 text-white btn-add rounded-3 text-capitalize"
          >
            remove
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Register from "../Register.vue";
import axios from "axios";
import info from "../../../default";
import iziToast from "izitoast";


import loader from "../loader.vue";

export default {
  name: "recomenduser",
  beforeMount() {
    this.getdata();
  },
  data() {
    return {
      apiaddress: info.Api_ADDRESS,
      user: [],
      base: [],
      searchuserdata: [],
      popups: {
        loader: true,
      },
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

          axios.get(`${this.apiaddress}base/`).then((data) => {
            this.base = data.data;
            this.popups.loader = false;
          });
        });
    },
    searchuser: function (value) {
      axios.get(`${this.apiaddress}users/search/${value}`).then((res) => {
        if (res.data) {
          this.searchuserdata = res.data;

          const thisuserindex = this.searchuserdata.findIndex((e) => {
            return e.username === this.user.username;
          });

          thisuserindex >= 0
            ? this.searchuserdata.splice(thisuserindex, 1)
            : null;

          if (this.user.recommendUser.length > 0) {
            this.user.recommendUser.forEach((recommendUser) => {
              const recommendUserIndex = this.searchuserdata.findIndex(
                (e) => e.username === recommendUser.username
              );
              if (recommendUserIndex >= 0) {
                this.searchuserdata.splice(recommendUserIndex, 1);
              }
            });
          }
        }
      });
    },
    addrecommenduser: function (id) {
      if (this.user.recommendUser.length < 5) {
        axios
          .put(
            `${this.apiaddress}users/addrecommanduser/${id}`,
            {},
            {
              headers: {
                jwt: Register.methods.getcookies("jwt"),
              },
            }
          )
          .then((res) => {
            if (res.data) {
              iziToast.success({
                title: res.data.msg,
                position: "topRight",
              });
              this.$refs.searchinput.value = null;
              this.searchuserdata = [];
              this.getdata();
            } else {
              iziToast.error({
                title: res.data.msg,
                position: "topRight",
              });
            }
          });
      } else {
        iziToast.error({
          title: "You Reached limit",
          position: "topRight",
        });
      }
    },
    removerecommenduser: function (id) {
      axios
        .put(
          `${this.apiaddress}users/removerecommanduser/${id}`,
          {},
          {
            headers: {
              jwt: Register.methods.getcookies("jwt"),
            },
          }
        )
        .then((res) => {
          if (res.data) {
            iziToast.success({
              title: res.data.msg,
              position: "topRight",
            });
            this.$refs.searchinput.value = null;
            this.searchuserdata = [];
            this.getdata();
          } else {
            iziToast.error({
              title: res.data.msg,
              position: "topRight",
            });
          }
        });
    },
    formatview: function (number) {
      if (number >= 1e6) {
        return (number / 1e6).toFixed(0) + "M";
      } else if (number >= 1e3) {
        return (number / 1e3).toFixed(0) + "K";
      } else {
        return number;
      }
    },
  },
  components: {
    loader
  },
};
</script>

<style scoped>
* {
  overflow: hidden;
}

.btn-save,
.btn-add {
  background-color: var(--blue-main);
}

.search-parent {
  width: 60%;
  height: 33px;
  border: 1px solid var(--gray-main);
}

.search-resault {
  background-color: rgba(46, 46, 46, 0.20);
  margin-left: 15px;
  width: 60%;
  overflow: scroll;
  height: 200px;
  border-radius: 50px;
}
.search-resault-child img,
.recommend img {
  width: 50px;
}
.recommend {
  width: 600px;
}
.search-resault-child:not(:nth-last-child()) {
  border-bottom: 2px solid var(--blue-main);
}
</style>
