<template>
  <div id="parent" class="container mt-4 px-4">
    <section class="d-flex justify-content-between">
      <span class="text-uppercase color-blue fw-semibold fs-5">Top Artists</span>
    </section>
    <section class="mt-4 d-flex gap-3  justify-content-between flex-wrap ">
        <div class="monthly-box d-flex gap-3 align-items-center col-5">
          <div
            class="monthly-num d-flex justify-content-center align-items-center"
          >
            <span class="color-gray fs-1">01</span>
          </div>
          <img
            class="monthly-img img-fluid rounded-circle"
            src="../../assets/img/test/eminem.jpg"
            alt=""
          />
          <div class="d-flex flex-column monthly-text">
            <p class="text-capitalize fs-5 fw-bold m-0 p-0 color-dark pointer">
              eminem
            </p>
            <span class="text-capitalize color-gray pointer">22k followers</span>
          </div>
          <span class="me-3 text-capitalize">2500 plays</span>
          <svg
            width="18"
            height="6"
            viewBox="0 0 18 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="3" cy="3" r="3" fill="#B3B3BC" />
            <circle cx="15" cy="3" r="3" fill="#B3B3BC" />
          </svg>
        </div>
        <div class="monthly-box d-flex gap-3 align-items-center col-5">
          <div
            class="monthly-num d-flex justify-content-center align-items-center"
          >
            <span class="color-gray fs-1">01</span>
          </div>
          <img
            class="monthly-img img-fluid rounded-circle"
            src="../../assets/img/test/eminem.jpg"
            alt=""
          />
          <div class="d-flex flex-column monthly-text">
            <p class="text-capitalize fs-5 fw-bold m-0 p-0 color-dark pointer">
              eminem
            </p>
            <span class="text-capitalize color-gray pointer">22k followers</span>
          </div>
          <span class="me-3 text-capitalize">2500 plays</span>
          <svg
            width="18"
            height="6"
            viewBox="0 0 18 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="3" cy="3" r="3" fill="#B3B3BC" />
            <circle cx="15" cy="3" r="3" fill="#B3B3BC" />
          </svg>
        </div>
        <div class="monthly-box d-flex gap-3 align-items-center col-5">
          <div
            class="monthly-num d-flex justify-content-center align-items-center"
          >
            <span class="color-gray fs-1">01</span>
          </div>
          <img
            class="monthly-img img-fluid rounded-circle"
            src="../../assets/img/test/eminem.jpg"
            alt=""
          />
          <div class="d-flex flex-column monthly-text">
            <p class="text-capitalize fs-5 fw-bold m-0 p-0 color-dark pointer">
              eminem
            </p>
            <span class="text-capitalize color-gray pointer">22k followers</span>
          </div>
          <span class="me-3 text-capitalize">2500 plays</span>
          <svg
            width="18"
            height="6"
            viewBox="0 0 18 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="3" cy="3" r="3" fill="#B3B3BC" />
            <circle cx="15" cy="3" r="3" fill="#B3B3BC" />
          </svg>
        </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "analyzeTopArtist",
};
</script>

<style scoped>

.monthly-img {
  width: 70px;
  height: 70px;
}
.monthly-text {
  width: 140px;
  text-align: left !important;
}

.monthly-text p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
}
.monthly-num {
  width: 35px;
  height: 45px;
}
</style>
