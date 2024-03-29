<template>
  <div id="parent ">
    <header class="d-flex align-items-center gap-1 mt-3">
      <hmheader />
    </header>
    <main class="d-flex">
      <aside class="menu">
        <hmmenu />
      </aside>
      <section class="content">
        <div class="d-flex justify-content-between mt-4 mx-5">
          <span class="text-uppercase color-blue fw-semibold fs-5"
            >requests</span
          >
        </div>
        <div class="px-4">
            <table class="table table-borderless mt-4">
              <tr>
                <th class="text-center text-capitalize fw-semibold">name</th>
                <th class="text-center text-capitalize fw-semibold">status</th>
                <th class="text-center text-capitalize fw-semibold">message</th>
                <th class="text-center text-capitalize fw-semibold">more</th>
              </tr>
              <tr>
                <th class="text-center text-capitalize">track1</th>
                <th class="text-center text-capitalize">
                  <div>
                    <img src="../../assets/icons/check.png" alt="" />
                    <!-- <img src="../assets/icons/uncheck.png" alt=""> -->
                  </div>
                </th>
                <th class="text-center text-capitalize">
                  <!-- <img src="../assets/icons/message.png" alt="" /> -->
                  <img src="../../assets/icons/nomessage.png" alt="" />
                </th>
                <th class="text-center text-capitalize">
                  <svg
                    class="pointer ms-2"
                    width="18"
                    height="6"
                    viewBox="0 0 18 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="3" cy="3" r="3" fill="#B3B3BC" />
                    <circle cx="15" cy="3" r="3" fill="#B3B3BC" />
                  </svg>
                </th>
              </tr>
             
            </table>
        </div>

      </section>
      <aside class="player">
        <player />
      </aside>
    </main>
  </div>
</template>

<script>
import hmheader from "../home components/header";
import hmmenu from "../home components/menu";
import player from "../home components/Player.vue";

export default {
  name: "home",
  data() {
    return {
      component: "settings",
    };
  },
  methods: {},
  components: {
    hmheader,
    hmmenu,
    player,
  },
};
</script>

<style scoped>
* {
  overflow: hidden;
}
.content {
  width: 62%;
  overflow-y: scroll !important;
  max-height: 90vh;
}
aside.menu {
  width: 240px;
  height: 92vh;
}
aside.player {
  width: 25%;
  /* background-color: aqua; */
}
tr {
  border-bottom: 2px solid #4343ef;
}
</style>
