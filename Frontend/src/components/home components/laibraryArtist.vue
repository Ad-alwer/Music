<template>
  <div id="parent" class="container mt-5 px-3 position-relative">
    <section>
      <div>
        <div class="d-flex justify-content-between p">
          <span class="text-uppercase color-blue fw-semibold"
            >following</span
          >
        </div>
        <div class="d-flex mt-4 gap-3">
          <div class="d-flex align-items-start gap-2 flex-column artist-box">
            <div class="d-flex justify-content-start align-items-center gap-3">
              <img
                src="../../assets/img/test/eminem.jpg"
                class="img-profile rounded-circle"
                alt=""
              />
              <span class="color-black fw-bold">Eminem</span>
            </div>
          </div>
          <div class="d-flex flex-column">
            <div class="d-flex flex-column align-items-start">
              <p class="fw-bold fs-5 color-black text-capitalize mb-1">
                Eminem
              </p>
              <span class="color-gray text-capitalize"
                >2 Albums , 10 Tracks</span
              >
            </div>
            <div
              class="d-flex mt-3 flex-wrap gap-3 tracks-parent justify-content-start align-items-start"
            >
              <div class="d-flex flex-column align-items-center">
                <img
                  src="../../assets/img/test/eminem.jpg"
                  class="img-detail rounded-4"
                  alt=""
                />
                <span class="text-capitalize color-black fw-bold fs-5"
                  >Eminem</span
                >
                <span class="text-capitalize color-gray">2k plays</span>
              </div>
            </div>
            <p class="text-center color-blue pointer fw-bold mt-2">
              See More by Ed Sheeran
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "libraryAlbum",
};
</script>

<style scoped>
#parent {
  height: 84vh;
  overflow: hidden !important;
}
.img-profile {
  width: 60px;
  height: 60px;
}
.artist-box {
  width: 22vw;
  height: 38vw;
  overflow-y: auto;
}
.img-detail {
  width: 140px;
  height: 140px;
}
.tracks-parent {
  width: 480px;
}

.pagination {
  position: absolute;
  bottom: 0%;
  display: flex;
  justify-content: center;
}
</style>
