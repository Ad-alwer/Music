<template>
  <loader v-if="popups.loader" />
  <section v-else class="content w-100">
    <div class="d-flex justify-content-between mt-4 mx-5">
      <span class="text-uppercase color-blue fw-semibold fs-5"
        >social media</span
      >
    </div>
    <div class="px-4 mt-3">
      <form action="" class="mt-1 d-flex flex-column gap-3 py-3">
        <div class="d-flex gap-4 flex">
          <div
            class="d-flex align-items-center justify-content-between px-3 input-parent rounded-3 w-75"
          >
            <input
              type="text"
              ref="socialmedialink"
              name=""
              class="form-control text-capitalize"
              maxlength="25"
              id=""
              placeholder="enter link"
            />
          </div>
          <div
            class="d-flex align-items-center justify-content-between px-3 input-parent rounded-3"
          >
            <input
              type="text"
              name=""
              ref="socialmediatitle"
              class="form-control text-capitalize"
              maxlength="25"
              id=""
              placeholder="enter title"
            />
          </div>
        </div>
        <div
          class="select-parent rounded-3 d-flex align-items-center justify-content-center"
        >
          <select class="form-select text-capitalize" ref="socialmediaicon">
            <option class="text-capitalize text-center">select icon</option>
            <option
              class="text-capitalize text-center"
              v-for="x in base.socialicon"
              :key="x"
              :value="x.name"
            >
              {{ x.name }}
            </option>
          </select>
        </div>
        <div class="d-flex justify-content-center">
          <button
            class="btn px-3 w-100 py-2 btn-save text-white fw-semibold fs-6 text-capitalize"
            @click.prevent="savenewsocial"
          >
            Add social media
          </button>
        </div>
      </form>
      <editsocialmediapopup
        :data="editsociladata"
        v-if="popups.editsocialmedia"
        @close="popups.editsocialmedia = false"
        @save="editsocialmedia"
      />

      <div class="mt-3">
        <table class="table">
          <tr>
            <th class="text-center text-capitalize fw-bold fs-5">icon</th>
            <th class="text-center text-capitalize fw-bold fs-5">link</th>
            <th class="text-center text-capitalize fw-bold fs-5">title</th>
            <th class="text-center text-capitalize fw-bold fs-5">edit</th>
            <th class="text-center text-capitalize fw-bold fs-5">Delete</th>
          </tr>

          <tr class="align-middle" v-for="(x, i) in user.socialmedia" :key="x">
            <th class="text-center text-capitalize">
              <img
                :src="
                  x.iconlink
                    ? x.iconlink
                    : require('../../assets/icons/earth.png')
                "
                class="socialmedia-icon"
                alt=""
              />
            </th>
            <th class="text-center text-capitalize socialmedia-link">
              {{ x.link }}
            </th>
            <th class="text-center text-capitalize socialmedia-title">
              {{ x.title }}
            </th>
            <th
              class="text-center text-capitalize"
              @click="editsocialmediaopener(x, i)"
            >
              <img src="../../assets/icons/edit.png" class="pointer" />
            </th>
            <th
              class="text-center text-capitalize socialmedia-delete align-items-center"
            >
              <i
                @click="deletesocialmedia(x.title)"
                class="pt-3 fa fa-solid fa-trash text-danger pointer trash-icon fs-5"
              ></i>
            </th>
          </tr>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import Register from "../Register.vue";
import axios from "axios";
import iziToast from "izitoast";

import editsocialmediapopup from "../profile components/editsocialmediapopup.vue";
import loader from "../loader.vue";

export default {
  name: "home",
  beforeMount() {
    this.getdata();
  },
  data() {
    return {
      apiaddress:process.env.VUE_APP_Api_ADDRESS,
      popups: {
        editsocialmedia: false,
        loader: true,
      },
      user: [],
      base: [],
      editsociladata: null,
      editsocialcount: null,
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
    savenewsocial: function () {
      if (
        this.$refs.socialmedialink.value &&
        this.$refs.socialmediaicon.value &&
        this.$refs.socialmediatitle.value
      ) {
        axios
          .put(
            `${this.apiaddress}users/addsocial`,
            {
              link: this.$refs.socialmedialink.value,
              icon: this.$refs.socialmediaicon.value,
              title: this.$refs.socialmediatitle.value,
            },
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
              this.clearsocialinputs();
              this.getdata();
            } else {
              iziToast.error({
                title: res.data.msg,
                position: "topRight",
              });
            }
          });
      }
    },
    clearsocialinputs: function () {
      this.$refs.socialmedialink.value = null;
      this.$refs.socialmediaicon.value = null;
      this.$refs.socialmediatitle.value = null;
    },
    editsocialmediaopener: function (data, count) {
      this.editsocialcount = count;
      this.editsociladata = data;
      this.popups.editsocialmedia = true;
    },
    editsocialmedia: function (data) {
      this.user.socialmedia[this.editsocialcount] = data;
      axios
        .put(
          `${this.apiaddress}users/editsocial`,
          {
            data: this.user.socialmedia,
          },
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
            this.getdata();
          } else {
            iziToast.error({
              title: res.data.msg,
              position: "topRight",
            });
          }
        });
    },
    deletesocialmedia: function (name) {
      axios
        .delete(`${this.apiaddress}users/deletesocial/${name}`, {
          headers: {
            jwt: Register.methods.getcookies("jwt"),
          },
        })
        .then((res) => {
          if (res.data) {
            iziToast.success({
              title: res.data.msg,
              position: "topRight",
            });
            this.getdata();
          } else {
            iziToast.error({
              title: res.data.msg,
              position: "topRight",
            });
          }
        });
    },
  },
  components: {
    editsocialmediapopup,
    loader,
  },
};
</script>

<style scoped>
* {
  overflow: hidden;
}

tr {
  border-bottom: 2px solid #4343ef;
}
.socialmedia-icon {
  width: 32px;
  width: 32px;
}
.socialmedia-link {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
}
.socialmedia-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 80px;
}

.form-control,
.form-select {
  border: none;
}
.form-control:focus,
.form-select:focus {
  outline: none;
  box-shadow: none;
}
.form-control:focus,
.form-select:focus {
  outline: none;
  box-shadow: none;
}

.input-parent {
  border: 2px solid var(--blue-main);
  width: 450px;
}
.select-parent select {
  border: 2px solid var(--blue-main);
}
.select-parent span {
  border-bottom: 2px solid var(--blue-main);
}
.btn-save,
.btn-add {
  background-color: var(--blue-main);
}
.socialmedia-delete {
  width: 40px;
}
.socialmedia-icon {
  width: 45px;
}


@media screen and (max-width: 767px) {
  #parent {
    margin-bottom: 68px;
  }

  table{
    margin: 5px 8px !important;
  }
  table th {
    font-size: 14px !important;
  }
  
}
</style>
