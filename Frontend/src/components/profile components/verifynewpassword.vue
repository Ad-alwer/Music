<template>
  <div class="container mt-5">
    <main class="border border-2 rounded-4 p-3">
      <h1 class="text-center fw-bold text-capitalize">
        Your password has been changed
      </h1>
      <p class="text-center">You can click on bottom button and go to home</p>
      <div class="d-flex justify-content-center">
        <button @click="gotohome" class="btn px-3 py-2">Home</button>
      </div>
    </main>
  </div>
</template>

<script>
//   import axios from "axios";
import info from "../../../default";

export default {
  name: "verify",
  beforeMount() {
    // const code = location.pathname.split("/VP/")[1];
  },
  data() {
    return {
      apiaddress: info.Api_ADDRESS,
    };
  },
  methods: {
    gotohome: function () {
      location.href = "/";
    },
  },
};
</script>

<style scoped>
main {
  border-color: #4343ef !important;
}
button,
button:hover {
  background-color: #4343ef;
  color: white;
}
</style>
