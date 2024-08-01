<template>
  <div class="container mt-4 px-4" id="parent">
    <section class="d-flex justify-content-between">
      <span class="text-uppercase color-blue fw-semibold fs-5">verify</span>
    </section>
    <section class="d-flex justify-content-center">
      <div
        class="search-parent d-flex rounded-3 px-2 py-1 justify-content-between mt-1 align-items-center mt-4"
      >
        <input
          type="text"
          class="search-input"
          maxlength="69"
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
          @click="search($refs.searchinput.value)"
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
      <loader v-if="popups.loader" />
      <table v-else-if="!popups.loader && verify.length > 0" class="table">
        <tr class="table-header align-middle">
          <th class="text-center text-capitalize fw-bold fs-5">username</th>
          <th class="text-center text-capitalize fw-bold fs-5">verify</th>
        </tr>
        <tr class="align-middle" v-for="(x, i) in verify" :key="x._id">
          <th class="text-center text-capitalize p-2">{{ x.username }}</th>
          <th class="text-center text-capitalize p-2">
            <input
              type="checkbox"
              class="offscreen"
              name="x.username"
              :id="'input' + i"
              :checked="x.isverify"
              @click="changeverify(x._id)"
            />
            <label class="switch" :for="'input' + i"></label>
          </th>
        </tr>
      </table>
      <div
        v-else-if="!popups.loader && verify.length < 1"
        class="d-flex justify-content-center align-items-center"
      >
        <img src="../../assets/img/empty.png" class="img-fluid" alt="" />
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import iziToast from "izitoast";
import loader from "../loader.vue";

export default {
  name: "users",
  beforeMount() {
    this.getdata();
    setTimeout(() => {
      this.popups.loader = false;
    }, 300);
  },
  data() {
    return {
      apiaddress: process.env.VUE_APP_Api_ADDRESS,
      verify: [],
      popups: {
        loader: true,
      },
    };
  },
  methods: {
    getdata: function () {
      axios.get(`${this.apiaddress}users/verifyusers`).then((res) => {
        this.verify = res.data;
        const index = this.verify.findIndex((e) => {
          return e._id == this.user._id;
        });
        index >= 0 ? this.verify.splice(index, 1) : null;
      });
    },
    changeverify: function (id) {
      axios.get(`${this.apiaddress}users/changeverify/${id}`).then((res) => {
        if (res.data) {
          this.getdata();
          this.valuechanged();
          this.popups.loader = false;
        }
      });
    },
    valuechanged: function () {
      iziToast.success({
        message: "value changed successfully",
        position: "topRight",
      });
    },
    search: function (value) {
      this.popups.loader = true;
      axios
        .get(`${this.apiaddress}users/search/${value.trim()}`)
        .then((res) => {
          this.verify = res.data.filter((e) => {
            return e.isverify === true;
          });
          const index = this.verify.findIndex((e) => {
            return e._id == this.user._id;
          });
          index >= 0 ? this.verify.splice(index, 1) : null;
          this.popups.loader = false;
        });
    },
  },

  components: {
    loader,
  },
  props: ["user"],
};
</script>

<style scoped>
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
.search-icon {
  width: 18px;
  height: 18px;
}
.search-input {
  caret-color: var(--blue-main);
  width: 750px;

  color: var(--gray-main);
}
.search-parent {
  width: 800px;
  height: 45px;
  border: 1px solid var(--gray-main);
}

@media screen and (max-width: 767px) {
  #parent {
    margin-bottom: 68px;
  }
  
  table th {
    font-size: 15px !important;
  }
}
</style>
