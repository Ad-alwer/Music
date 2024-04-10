<template>
  <div class="container mt-4 px-4" id="parent">
    <section class="d-flex justify-content-between">
      <span class="text-uppercase color-blue fw-semibold fs-5">users</span>
    </section>
    <section class="d-flex justify-content-center mt-3">
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
          @click="search(this.$refs.searchinput.value)"
          class="search-icon pointer"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 19L13.8571 13.8571M8.71429 16.4286C4.4538 16.4286 1 12.9748 1 8.71429C1 4.4538 4.4538 1 8.71429 1C12.9748 1 16.4286 4.4538 16.4286 8.71429C16.4286 12.9748 12.9748 16.4286 8.71429 16.4286Z"
            stroke="#B3B3BC"
            stroke-width="2"
          />
        </svg>
      </div>
    </section>
    <section class="mt-4">
      <table class="table" v-if="users.length > 0">
        <tr class="table-header align-middle">
          <th class="text-center text-capitalize fw-bold fs-5">username</th>
          <th class="text-center text-capitalize fw-bold fs-5">email</th>
          <th class="text-center text-capitalize fw-bold fs-5">admin</th>
          <th class="text-center text-capitalize fw-bold fs-5">ban upload</th>
          <th class="text-center text-capitalize fw-bold fs-5">verify</th>
          <th class="text-center text-capitalize fw-bold fs-5">profile</th>
        </tr>
        <tr v-for="x in users" class="align-middle" :key="x._id">
          <th class="text-center text-capitalize p-2">{{ x.username }}</th>
          <th class="text-center text-capitalize p-2">{{ x.email }}</th>
          <th class="text-center text-capitalize p-2">
            <input
              type="checkbox"
              class="offscreen"
              name="x.username"
              id="input"
              :checked="x.isadmin"
              :disabled="!user.ismaster"
              @click="changeadmin(x._id)"
            />
            <label class="switch" for="input"></label>
          </th>
          <th class="text-center text-capitalize p-2">
            <input
              type="checkbox"
              class="offscreen"
              name="x.username"
              id="input2"
              :checked="x.banupload"
              @click="changebanupload(x._id)"
            />
            <label class="switch" for="input2"></label>
          </th>
          <th class="text-center text-capitalize p-2">
            <input
              type="checkbox"
              class="offscreen"
              name="x.username"
              id="input3"
              :checked="x.isverify"
              @click.prevent="changeverify(x._id)"
            />
            <label class="switch" for="input3"></label>
          </th>
          <th class="text-center text-capitalize p-2">
            <i
              class="fa-solid fa-address-card text-secondary pointer"
              @click="openprofilepopup(x)"
            ></i>
          </th>
        </tr>
      </table>
      <div
        class="d-flex justify-content-center align-items-center"
        v-if="users.length < 1"
      >
        <img src="../../assets/img/empty.png" class="img-fluid" alt="" />
      </div>
    </section>
    <profilepopup
      v-if="popups.profile"
      @close="closeprofilepopup"
      :user="selectuser"
    />
  </div>
</template>

<script>
import axios from "axios";
import info from "../../../default";

import profilepopup from "./profilepopup.vue";
export default {
  name: "users",
  beforeMount() {
    this.getdata();
  },
  data() {
    return {
      apiaddress: info.Api_ADDRESS,
      users: [],
      selectuser: null,
      popups: {
        profile: false,
      },
    };
  },
  methods: {
    getdata: function () {
      axios.get(`${this.apiaddress}users/users`).then((res) => {
        this.users = res.data;
        const index = this.users.findIndex((e) => {
          return e._id == this.user._id;
        });
        index >= 0 ? this.users.splice(index, 1) : null;
      });
    },
    openprofilepopup: function (e) {
      this.selectuser = e;
      this.popups.profile = true;
    },
    closeprofilepopup: function () {
      this.popups.profile = false;

      this.selectuser = null;
    },
    changeverify: function (id) {
      axios
        .get(`${this.apiaddress}users/changeverify/${id}`)
        .then((res) => (res.data ? this.getdata() : null));
    },
    changebanupload: function (id) {
      axios
        .get(`${this.apiaddress}users/changebanupload/${id}`)
        .then((res) => (res.data ? this.getdata() : null));
    },
    changeadmin: function (id) {
      axios
        .get(`${this.apiaddress}users/changeadmin/${id}`)
        .then((res) => (res.data ? this.getdata() : null));
    },
    search: function (value) {
      axios
        .get(`${this.apiaddress}users/search/${value.trim()}`)
        .then((res) => {
          this.users = res.data;
          const index = this.users.findIndex((e) => {
            return e._id == this.user._id;
          });
          index >= 0 ? this.users.splice(index, 1) : null;
        });
    },
  },

  props: ["user"],
  components: {
    profilepopup,
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap");

.table-header th {
  background-color: #4343ef !important;
  color: white;
}
.table-header th:first-child {
  border-top-left-radius: 15px;
}
.table-header th:last-child {
  border-top-right-radius: 15px;
}

tr {
  border-bottom: 2px solid #4343ef;
}

.switch {
  margin-bottom: -4px;
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  background: red;
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: all 0.3s;
  border-radius: 20px;
  cursor: pointer;
}
.switch::after {
  content: "";
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 18px;
  /* background-color: rgba(0, 0, 0, 0.25); */
  background: var(--blue-main);

  top: 1px;
  left: 1px;
  transition: all 0.3s;
}
input[type="checkbox"]:checked + .switch::after {
  transform: translateX(20px);
}

input[type="checkbox"]:checked + .switch {
  background: #5c52ef85;
}
.offscreen {
  display: none;
}
.fa-address-card {
  font-size: 22px;
}
img {
  width: 350px;
}
.search-icon {
  width: 18px;
  height: 18px;
}
.search-input {
  caret-color: var(--blue-main);
  width: 350px;

  color: var(--gray-main);
}
.search-parent {
  width: 500px;
  height: 33px;
  border: 1px solid var(--gray-main);
}
</style>
