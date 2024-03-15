<template>
  <div id="parent ">
    <header class="d-flex align-items-center gap-3 mt-3">
      <hmheader />
    </header>
    <main class="d-flex">
      <aside class="menu">
        <hmmenu />
      </aside>
      <section class="content">
        <discover />
      </section>
      <aside class="player"></aside>
    </main>
  </div>
</template>

<script>
import hmheader from "./home components/header";
import hmmenu from "./home components/menu";
import discover from "./home components/discover.vue";
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
  },
};
</script>

<style scoped>
* {
  overflow: hidden;
}
.content {
  width: 62%;
}
aside.menu {
  width: 270px;
}
aside.player {
  width: 20%;
}
</style>
