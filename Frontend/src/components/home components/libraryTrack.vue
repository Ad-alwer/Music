<template>
  <div id="parent" class="container mt-5 px-3 position-relative">
    <section>
      <div>
        <div class="d-flex justify-content-between p">
          <span class="text-uppercase color-blue fw-semibold fs-5"
            >Saved tracks</span
          >
        </div>
        <div class="d-flex justify-content-start mt-4 gap-3 flex-wrap">
          <div class="track-body d-flex">
            <img
              src="../../assets/img/test/eminem.jpg"
              class="img-fluid rounded-4"
              alt=""
            />
            <div class="track-body-text-parent d-flex justify-content-center">
              <p class="text-center">Eminem</p>
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
  name: "libraryTrack",
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
  width: 160px;
  height: 160px;
}
.track-body-text-parent {
  position: absolute;
  bottom: -5%;
  font-weight: bold;
  width: 100%;
}
.track-body-text-parent p {
  color: white;

  z-index: 5;
}

.pagination {
  position: absolute;
  bottom:0%;
  display: flex;
  justify-content: center;
  
}
</style>
