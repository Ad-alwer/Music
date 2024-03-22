
<template>
  <div id="parent" class="container mt-5 px-3 position-relative">
    <section>
      <div>
        <div class="d-flex justify-content-between p">
          <span class="text-uppercase color-blue fw-semibold"
            >Saved playlist</span
          >
        </div>
        <div class="d-flex justify-content-start mt-4 gap-3 flex-wrap">
          <div class="track-body position-relative">
            <img
              src="../../assets/img/test/eminem.jpg"
              class="img-fluid rounded-4"
              alt=""
            />
            <div class="info-btn pointer">
              <img
                src="../../assets/icons/info-light.png"
                class="img-fluid img-info pointer"
                alt=""
              />
            </div>

            <div
              class="tracklist rounded-4 d-flex justify-content-center align-items-center flex-column w-100 h-100"
            >
              <span
                class="text-white p-2 text-capitalize px-3 fs-5 border-bottom"
                >24 tracks</span
              >
              <span
                class="text-white p-2 text-capitalize px-3 fs-5 border-bottom"
                >24k plays</span
              >
              <a
                class="text-white p-2 text-capitalize px-3 fs-5 border-bottom text-decoration-none pointer"
                >eminem</a
              >
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
  name: "libraryplaylist",
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
  width: 180px;
  height: 180px;
}
.pagination {
  position: absolute;
  bottom: 0%;
  display: flex;
  justify-content: center;
}
.tracklist {
  background-color: rgba(0, 0, 0, 0.5);
  font-weight: bold;
  color: white;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  transition: all 1s;
  opacity: 0;
}
.track-body:hover .tracklist {
  opacity: 0.9;
}
.info-btn .img-info {
  width: 18px;
  height: 18px;
  position: absolute;
  bottom: 5px;
  right: 5px;
  cursor: pointer;
  z-index: 20;
}
</style>

//TODO infobtn click ======= >>>>>>> c8489fbb68dbc5414760a2b773f42dc551cad48a
