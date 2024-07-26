<template>
  <div class="container mt-4 px-4" id="parent">
    <section class="d-flex justify-content-between">
      <span class="text-uppercase color-blue fw-semibold fs-5">requests</span>
    </section>
    <section class="mt-4">
      <loader v-if="popups.loader" />
      <table class="table" v-else-if="!popups.loader && requests.length > 0">
        <tr class="table-header align-middle">
          <th class="text-center text-capitalize fw-bold fs-5">username</th>
          <th class="text-center text-capitalize fw-bold fs-5">name</th>
          <th class="text-center text-capitalize fw-bold fs-5">type</th>
          <th class="text-center text-capitalize fw-bold fs-5">detail</th>
        </tr>
        <tr class="align-middle" v-for="x in requests" :key="x.name">
          <th class="text-center text-capitalize p-2">
            {{ x.artist.username }}
          </th>
          <th class="text-center text-capitalize p-2">{{ x.name }}</th>
          <th class="text-center text-capitalize p-2">{{ x.type }}</th>

          <th class="text-center text-capitalize p-2">
            <i
              class="fa-solid fa-circle-info pointer text-secondary"
              @click="showdetail(x)"
            ></i>
          </th>
        </tr>
      </table>
      <div
        v-else-if="!popups.loader && requests.length < 1"
        class="d-flex justify-content-center align-items-center"
      >
        <img src="../../assets/img/empty.png" class="img-fluid" alt="" />
      </div>
    </section>
    <popuprequest
      :data="requestdetail"
      v-if="popups.detail"
      @close="closedetail"
      @compelet="compelet"
    />
  </div>
</template>

<script>
import axios from "axios";
import info from "../../../default";
import iziToast from "izitoast";
import loader from "../loader.vue";
import popuprequest from "./requestpopup.vue";
export default {
  name: "users",

  beforeMount() {
    this.getdata();
  },
  data() {
    return {
      apiaddress: info.Api_ADDRESS,
      requests: [],
      popups: {
        loader: true,
        detail: false,
      },
      requestdetail: null,
    };
  },
  methods: {
    getdata: function () {
      axios.get(`${this.apiaddress}users/getrequests`).then((res) => {
        this.requests = res.data;
        this.popups.loader = false;
      });
    },
    showdetail: function (x) {
      this.requestdetail = x;
      this.popups.detail = true;
    },
    closedetail: function (e) {
      this.requestdetail = null;
      this.popups.detail = false;
      if (e) {
        this.getdata();
      }
    },
    compelet: function (e) {
      this.popups.detail = false;
      if (e) {
        iziToast.success({
          message: "Your Answer Saved Successfully",
          position: "topRight",
        });
        this.getdata();
      } else {
        iziToast.error({
          title: "Please Try Again",
          position: "topRight",
        });
      }
    },
  },
  components: {
    loader,
    popuprequest,
  },
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

@media screen and (max-width: 767px) {
  #parent {
    margin-bottom: 68px;
  }
}
table th {
  font-size: 15px !important ;
}
</style>
