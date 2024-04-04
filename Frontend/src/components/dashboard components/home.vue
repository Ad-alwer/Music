<template>
  <div id="parent" class="container mt-4 px-4">
    <section class="d-flex justify-content-between">
      <span class="text-uppercase color-blue fw-semibold fs-5">home</span>
    </section>
    <section
      class="mt-4 d-flex justify-content-center flex-column align-items-center gap-4"
    >
      <h3>Slider</h3>

      <div class="d-flex gap-3 justify-content-lg-start flex-wrap px-4">
        <button class="btn-add btn px-3 py-2 text-capitalize">Add slide</button>
        <div>
          <img
            src="../../assets/img/test/pinterestdownloader.com-1710335413.293773.jpg"
            class="slider-show rounded-2 img-fluid"
            alt=""
          />
        </div>
        <div>
          <img
            src="../../assets/img/test/pinterestdownloader.com-1710335413.293773.jpg"
            class="slider-show rounded-2 img-fluid"
            alt=""
          />
        </div>
        <div>
          <img
            src="../../assets/img/test/pinterestdownloader.com-1710335413.293773.jpg"
            class="slider-show rounded-2 img-fluid"
            alt=""
          />
        </div>
        <div>
          <img
            src="../../assets/img/test/pinterestdownloader.com-1710335413.293773.jpg"
            class="slider-show rounded-2 img-fluid"
            alt=""
          />
        </div>
        <div>
          <img
            src="../../assets/img/test/pinterestdownloader.com-1710335413.293773.jpg"
            class="slider-show rounded-2 img-fluid"
            alt=""
          />
        </div>
        <div>
          <img
            src="../../assets/img/test/pinterestdownloader.com-1710335413.293773.jpg"
            class="slider-show rounded-2 img-fluid"
            alt=""
          />
        </div>
        <div>
          <img
            src="../../assets/img/test/pinterestdownloader.com-1710335413.293773.jpg"
            class="slider-show rounded-2 img-fluid"
            alt=""
          />
        </div>
      </div>
    </section>
    <hr class="px-5" />
    <section
      class="mt-4 d-flex justify-content-center flex-column align-items-center gap-4"
    >
      <h3>Responsive Slider</h3>

      <div class="d-flex gap-3 justify-content-lg-start flex-wrap px-4">
        <button class="btn-add btn px-3 py-2 text-capitalize">Add slide</button>
        <div>
          <img
            src="../../assets/img/test/pinterestdownloader.com-1710335413.293773.jpg"
            class="slider-show rounded-2 img-fluid"
            alt=""
          />
        </div>
        <div>
          <img
            src="../../assets/img/test/pinterestdownloader.com-1710335413.293773.jpg"
            class="slider-show rounded-2 img-fluid"
            alt=""
          />
        </div>
        <div>
          <img
            src="../../assets/img/test/pinterestdownloader.com-1710335413.293773.jpg"
            class="slider-show rounded-2 img-fluid"
            alt=""
          />
        </div>
        <div>
          <img
            src="../../assets/img/test/pinterestdownloader.com-1710335413.293773.jpg"
            class="slider-show rounded-2 img-fluid"
            alt=""
          />
        </div>
        <div>
          <img
            src="../../assets/img/test/pinterestdownloader.com-1710335413.293773.jpg"
            class="slider-show rounded-2 img-fluid"
            alt=""
          />
        </div>
        <div>
          <img
            src="../../assets/img/test/pinterestdownloader.com-1710335413.293773.jpg"
            class="slider-show rounded-2 img-fluid"
            alt=""
          />
        </div>
        <div>
          <img
            src="../../assets/img/test/pinterestdownloader.com-1710335413.293773.jpg"
            class="slider-show rounded-2 img-fluid"
            alt=""
          />
        </div>
      </div>
    </section>
    <hr class="mx-5" />

    <section class="mt-4 px-4">
      <h3 class="text-capitalize text-center">genres</h3>

      <div class="d-flex gap-4 flex-wrap">
        <button class="btn-add btn px-3 py-2 text-capitalize">Add genre</button>
        <div
          class="bg-danger px-3 py-2 rounded gap-2 d-flex justify-content-center align-items-center"
        >
          <span class="text-capitalize text-white">Hiphop</span>
          <i class="fas fa-close text-white pointer"></i>
        </div>
      </div>
    </section>
    <hr class="mx-5" />
    <section class="mt-4 px-4">
      <h3 class="text-capitalize text-center">icons</h3>

      <div class="d-flex gap-4 flex-wrap">
        <button class="btn-add btn px-3 py-2 text-capitalize">Add icons</button>
        <div
          class=" px-3 py-2 rounded gap-2 d-flex justify-content-center align-items-center icon-parent pointer"
        >
        <img src="../../assets/icons/github.png" alt="">
        <span class="text-capitalize fw-semibold  color-black">github</span>
        

         
        </div>
      </div>
    </section>
    <hr class="mx-5" />
  </div>
</template>

<script>
export default {
  name: "dashhome",
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap");
.btn-add {
  background-color: var(--blue-main);
  color: white;
}
.img-parent {
  width: 860px;
  height: 308px;
}
.slider-img {
  height: 308px;

  cursor: pointer;
}
.img-parent::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.006);
  cursor: pointer;
}
.slider-show {
  width: 120px;
  height: 65px;
}
.icon-parent{
  border: 2px solid var(--blue-main);
}

</style>
