<template>
  <div id="parent" class="container mt-5 px-3 position-relative">
    <section>
      <div>
        <div class="d-flex justify-content-between p">
          <span class="text-uppercase color-blue fw-semibold"
            >Saved artists</span
          >
        </div>
        <div class="d-flex justify-content-start mt-4 gap-3 flex-wrap">
          <div class="track-body position-relative">
            <img
              src="../../assets/img/test/eminem.jpg"
              class="img-fluid rounded-circle"
              alt=""
            />

          
            <div
              class="track-body-text-parent d-flex flex-column justify-content-center align-items-center"
            >
              <p class="color-black">Eminem</p>
              <span>2k followers</span>
            </div>
          </div>
          <div class="track-body position-relative">
            <img
              src="../../assets/img/test/eminem.jpg"
              class="img-fluid rounded-circle"
              alt=""
            />

          
            <div
              class="track-body-text-parent d-flex flex-column justify-content-center align-items-center"
            >
              <p class="color-black">Eminem</p>
              <span>2k followers</span>
            </div>
          </div>
          
        </div>
      </div>
    </section>
    <section class="pagination w-100"><pagination class="" /></section>
  </div>
</template>

<script>
import pagination from "./pagination.vue";
export default {
  name: "libraryAlbum",
  components: {
    pagination,
  },
};
</script>

<style scoped>
#parent {
  height: 80vh;
  overflow: hidden !important;
}
.track-body {
  position: relative;
  width: 140px;
  height: 140px;
}
.track-body-text-parent {
  font-weight: bold;
  width: 100%;
}
.track-body-text-parent p {
  color: var(--main-blavk);
  font-weight: bold;
  margin-bottom: 0 !important;
  font-size: 16px;
}
.track-body-text-parent span {
  font-size: 12px;
  text-transform: capitalize;
}

.pagination {
  position: absolute;
  bottom: 0%;
  display: flex;
  justify-content: center;
}

</style>
