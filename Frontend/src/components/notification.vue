<template>
  <div id="parent">
    <header class="d-flex align-items-center gap-1 mt-3">
      <hmheader />
    </header>
    <main class="d-flex">
      <aside class="menu">
        <hmmenu />
      </aside>
      <section class="content container px-5 mt-4">
        <section class="d-flex justify-content-between">
          <span class="text-uppercase color-blue fw-semibold fs-5"
            >notification</span
          >
        </section>
        <section class="mt-4 mx-3">
          <div class="d-flex align-items-center gap-4 pointer notification-child p-2">
            <img src="../assets/icons/follow.png" alt="" />
            <a class="text-capitalize fw-semibold text-decoration-none fs-5 color-black"
              >matin57 started follwing you</a
            >
            
          </div>
          <div class="d-flex align-items-center gap-4 pointer notification-child p-2">
            <img src="../assets/icons/like-light.png" alt="" />
            <a class="text-capitalize fw-semibold text-decoration-none fs-5 color-black"
              >matin56 liked your music</a
            >
            
          </div>
          <div class="d-flex align-items-center gap-4 pointer notification-child p-2">
            <img src="../assets/icons/welcome.png" alt="" />
            <a class="text-capitalize fw-semibold text-decoration-none fs-5 color-black"
              >welcome to our site</a
            >
            
          </div>
          <div class="d-flex align-items-center gap-4 pointer notification-child p-2">
            <img src="../assets/icons/change-light.png" alt="" />
            <a class="text-capitalize fw-semibold text-decoration-none fs-5 color-black"
              >your username was chaged to abdf34</a
            >
            
          </div>
        </section>
      </section>
      <section></section>
      <aside class="player">
        <player />
      </aside>
    </main>
  </div>
</template>

<script>
import hmheader from "./home components/header";
import hmmenu from "./home components/menu";
import player from "./home components/Player.vue";
export default {
  name: "notification",
  components: {
    hmheader,
    hmmenu,
    player,
  },
  data() {
    return {
      whichcomponent: "monthlylistener",
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap");
* {
  overflow: hidden;
}
.content {
  width: 62%;
  overflow-y: scroll !important;
  max-height: 89vh;
}
aside.menu {
  width: 240px;
  height: 92vh;
}
aside.player {
  width: 25%;
  /* background-color: aqua; */
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

.notification-child{
    border-bottom: 2px solid var(--blue-main);
}
</style>
