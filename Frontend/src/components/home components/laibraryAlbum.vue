<template>
  <div id="parent" class="container mt-5 px-3 position-relative">
    <section>
      <div>
        <div class="d-flex justify-content-between p">
          <span class="text-uppercase color-blue fw-semibold"
            >Saved albums</span
          >
        </div>
        <div class="d-flex justify-content-start mt-4 gap-3 flex-wrap">
          <div class="track-body position-relative">
            <img
              src="../../assets/img/test/eminem.jpg"
              class="img-fluid rounded-4"
              alt=""
            />

            <ul
              class="w-100 tracklist w-100 h-100 rounded-4 d-flex flex-column"
            >
              <li class="text-center p-1 border-bottom pointer text-capitalize">
                Track1
              </li>
              <li class="text-center p-1 border-bottom pointer text-capitalize">
                Track2
              </li>
              <li class="text-center p-1 border-bottom pointer text-capitalize">
                Track3
              </li>
              <li class="text-center p-1 border-bottom pointer text-capitalize">
                Track4
              </li>

              <li class="text-center p-1 pointer other text-capitalize">
                more
              </li>
            </ul>

            <div
              class="track-body-text-parent d-flex flex-column justify-content-center align-items-center"
            >
              <p class="color-black">Eminem</p>
              <span>25 Tracks</span>
            </div>
          </div>
          <div class="track-body position-relative">
            <img
              src="../../assets/img/test/eminem.jpg"
              class="img-fluid rounded-4"
              alt=""
            />

            <ul
              class="w-100 tracklist w-100 h-100 rounded-4 d-flex flex-column"
            >
              <li class="text-center p-1 border-bottom pointer text-capitalize">
                Track1
              </li>
              <li class="text-center p-1 border-bottom pointer text-capitalize">
                Track2
              </li>
              <li class="text-center p-1 border-bottom pointer text-capitalize">
                Track3
              </li>
              <li class="text-center p-1 border-bottom pointer text-capitalize">
                Track4
              </li>

              <li class="text-center p-1 pointer other text-capitalize">
                more
              </li>
            </ul>

            <div
              class="track-body-text-parent d-flex flex-column justify-content-center align-items-center"
            >
              <p class="color-black">Eminem</p>
              <span>25 Tracks</span>
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
  width: 160px;
  height: 160px;
}
.track-body-text-parent {
  /* position: absolute;
  bottom: -5%; */
  font-weight: bold;
  width: 100%;
}
.track-body-text-parent p {
  color: var(--main-blavk);
  font-weight: bold;
  margin-bottom: 0 !important;
  font-size: 18px;
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
.tracklist {
  background-color: rgba(0, 0, 0, 0.5);
  font-weight: bold;
  color: white;
  /* width: 160px;
    height: 160px; */
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  transition: all 1s;
  opacity: 0;
}
.tracklist li {
  position: relative;
  left: -32px;
  width: 160px !important;
}
.track-body:hover .tracklist {
  opacity: 0.9;
}
</style>
