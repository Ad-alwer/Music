<template>
  <div id="parent" class="container mt-5 px-3 position-relative">
    <section>
      <div>
        <div class="d-flex justify-content-between">
          <span class="text-uppercase color-blue fw-semibold fs-5"
            >Saved tracks</span
          >
        </div>
        <div>
          <div class="d-flex align-items-center px-3 gap-4 mt-3">
            <img
              src="../../assets/img/test/eminem.jpg"
              class="tumbnail img-fluid rounded-4"
              alt=""
            />
            <div class="d-flex flex-column text-div gap-2 ">
              <span class="text-capitalize color-black fw-bold fs-5"
                >Track</span
              >
              <span class="text-capitalize color-gray">Artist</span>
            </div>
            <span class="color-gray">3:17</span>
            <div>
              <img src="../../assets/icons/like.png"  alt="">
              <!-- <img src="../../assets/icons/unlike.png"  alt=""> -->


              
            </div>
            <svg
            class="more"
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
          <div class="d-flex align-items-center px-3 gap-4 mt-3">
            <img
              src="../../assets/img/test/eminem.jpg"
              class="tumbnail img-fluid rounded-4"
              alt=""
            />
            <div class="d-flex flex-column text-div gap-2 ">
              <span class="text-capitalize color-black fw-bold fs-5"
                >Track</span
              >
              <span class="text-capitalize color-gray">Artist</span>
            </div>
            <span class="color-gray">3:17</span>
            <div>
              <!-- <img src="../../assets/icons/like.png"  alt=""> -->
              <img src="../../assets/icons/unlike.png"  alt="">


              
            </div>
            <svg
            class="more"
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
.tumbnail {
  width: 70px;
  height: 70px;
}
.text-div {
  width: 700px;
}
.more{
  transform: rotate(90deg);
  cursor: pointer;
}

.pagination {
  position: absolute;
  bottom: 0%;
  display: flex;
  justify-content: center;
}
</style>
