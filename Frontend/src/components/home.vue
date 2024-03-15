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
        <discover />
      </section>
      <aside class="player">
        <player />
      </aside>
    </main>
  </div>
</template>

<script>
import hmheader from "./home components/header";
import hmmenu from "./home components/menu";
import discover from "./home components/discover.vue";
import player from "./home components/Player.vue"
export default {
  name: "home",
  data() {
    return {};
  },
  methods: {},
  components: {
    hmheader,
    hmmenu,
    discover,
    player
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
</style>
