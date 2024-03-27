<template>
  <div id="parent" class="container mt-5 px-3 position-relative">
    <section>
      <div>
        <div class="d-flex justify-content-between p">
          <span class="text-uppercase color-blue fw-semibold">albums</span>
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

           <div class="d-flex align-items-center gap-1 px-2 cursor">
            <div
              class="track-body-text-parent d-flex flex-column justify-content-center align-items-center"
            >
              <p class="color-black">album1</p>
              <span>25 Tracks</span>
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

           <div class="d-flex align-items-center gap-1 px-2 cursor">
            <div
              class="track-body-text-parent d-flex flex-column justify-content-center align-items-center"
            >
              <p class="color-black">album1</p>
              <span>25 Tracks</span>
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
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "libraryAlbum",
  components: {},
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
.more {
  transform: rotate(90deg);
  cursor: pointer;
}
</style>
