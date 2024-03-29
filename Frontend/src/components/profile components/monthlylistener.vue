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
            >monthly listener</span
          >
        </div>
        <div class="px-4 mt-5 d-flex flex-wrap gap-4">
          <div class="monthly-child rounded-3">
            <div
              class="w-100 h-100 bg-success opacity-2 py-1 d-flex justify-content-center align-items-center flex-column gap-1 position-relative opacity-5"
            >
              <div
                class="d-flex flex-column align-items-center monthly-content"
              >
                <span
                  class="text-white text-center text-capitalize fs-4 fw-semibold"
                  >Jan</span
                >
                <span
                  class="text-white text-center text-capitalize monthly-substring"
                  >2032</span
                >
              </div>
              <div class="d-flex justify-content-center gap-2">
                <img src="../../assets/icons/listener.png" alt="" />
                <span class="text-white text-center text-capitalize">2500</span>
              </div>
              <div
                class="monthly-info d-flex justify-content-end align-items-sm-center rounded-4 gap-1"
              >
                <img src="../../assets/icons/info-light.png" alt="" />
                <span class="text-capitalize text-white monthly-info-text"
                  >more</span
                >
              </div>
            </div>
          </div>
          <div class="monthly-child rounded-3">
            <div
              class="w-100 h-100 bg-success opacity-2 py-1 d-flex justify-content-center align-items-center flex-column gap-1 position-relative opacity-5"
            >
              <div
                class="d-flex flex-column align-items-center monthly-content"
              >
                <span
                  class="text-white text-center text-capitalize fs-4 fw-semibold"
                  >Jan</span
                >
                <span
                  class="text-white text-center text-capitalize monthly-substring"
                  >2032</span
                >
              </div>
              <div class="d-flex justify-content-center gap-2">
                <img src="../../assets/icons/listener.png" alt="" />
                <span class="text-white text-center text-capitalize">2500</span>
              </div>
              <div
                class="monthly-info d-flex justify-content-end align-items-sm-center rounded-4 gap-1"
              >
                <img src="../../assets/icons/info-light.png" alt="" />
                <span class="text-capitalize text-white monthly-info-text"
                  >more</span
                >
              </div>
            </div>
          </div> <div class="monthly-child rounded-3">
            <div
              class="w-100 h-100 bg-success opacity-2 py-1 d-flex justify-content-center align-items-center flex-column gap-1 position-relative opacity-5"
            >
              <div
                class="d-flex flex-column align-items-center monthly-content"
              >
                <span
                  class="text-white text-center text-capitalize fs-4 fw-semibold"
                  >Jan</span
                >
                <span
                  class="text-white text-center text-capitalize monthly-substring"
                  >2032</span
                >
              </div>
              <div class="d-flex justify-content-center gap-2">
                <img src="../../assets/icons/listener.png" alt="" />
                <span class="text-white text-center text-capitalize">2500</span>
              </div>
              <div
                class="monthly-info d-flex justify-content-end align-items-sm-center rounded-4 gap-1"
              >
                <img src="../../assets/icons/info-light.png" alt="" />
                <span class="text-capitalize text-white monthly-info-text"
                  >more</span
                >
              </div>
            </div>
          </div> <div class="monthly-child rounded-3">
            <div
              class="w-100 h-100 bg-success opacity-2 py-1 d-flex justify-content-center align-items-center flex-column gap-1 position-relative opacity-5"
            >
              <div
                class="d-flex flex-column align-items-center monthly-content"
              >
                <span
                  class="text-white text-center text-capitalize fs-4 fw-semibold"
                  >Jan</span
                >
                <span
                  class="text-white text-center text-capitalize monthly-substring"
                  >2032</span
                >
              </div>
              <div class="d-flex justify-content-center gap-2">
                <img src="../../assets/icons/listener.png" alt="" />
                <span class="text-white text-center text-capitalize">2500</span>
              </div>
              <div
                class="monthly-info d-flex justify-content-end align-items-sm-center rounded-4 gap-1"
              >
                <img src="../../assets/icons/info-light.png" alt="" />
                <span class="text-capitalize text-white monthly-info-text"
                  >more</span
                >
              </div>
            </div>
          </div> <div class="monthly-child rounded-3">
            <div
              class="w-100 h-100 bg-success opacity-2 py-1 d-flex justify-content-center align-items-center flex-column gap-1 position-relative opacity-5"
            >
              <div
                class="d-flex flex-column align-items-center monthly-content"
              >
                <span
                  class="text-white text-center text-capitalize fs-4 fw-semibold"
                  >Jan</span
                >
                <span
                  class="text-white text-center text-capitalize monthly-substring"
                  >2032</span
                >
              </div>
              <div class="d-flex justify-content-center gap-2">
                <img src="../../assets/icons/listener.png" alt="" />
                <span class="text-white text-center text-capitalize">2500</span>
              </div>
              <div
                class="monthly-info d-flex justify-content-end align-items-sm-center rounded-4 gap-1"
              >
                <img src="../../assets/icons/info-light.png" alt="" />
                <span class="text-capitalize text-white monthly-info-text"
                  >more</span
                >
              </div>
            </div>
          </div>
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

monthly-child {
  width: 130px;
  height: 130px;
  background-color: var(--gray-main);
  cursor: pointer;
}
.opacity-1 {
  opacity: 1;
}
.opacity-2 {
  opacity: 0.75;
}
.opacity-3 {
  opacity: 0.7;
}
.opacity-4 {
  opacity: 0.6;
}
.opacity-5 {
  opacity: 0.45;
}
.opacity-6 {
  opacity: 0.35;
}
.opacity-7 {
  opacity: 0.25;
}
.monthly-substring {
  position: relative;
  top: -5px;
  font-size: 12px;
}

.monthly-info {
  position: absolute;
  padding: 2px;
  bottom: 2%;
  right: 2%;
  background-color: rgba(0, 0, 0, 0.342);
  cursor: pointer;
}

.monthly-info img {
  width: 18px;
}
.monthly-info-text {
  font-size: 12px;
  display: none;
}
.monthly-info:hover {
  padding: 2px 5px 2px 3px;
}
.monthly-content {
  margin-top: -20px;
}

.monthly-info:hover .monthly-info-text {
  display: block;
}
.monthly-child {
  width: 130px;
  height: 130px;
  background-color: var(--gray-main);
  cursor: pointer;
}
</style>
