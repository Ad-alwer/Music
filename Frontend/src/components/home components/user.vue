<template>
  <div id="parent" class="container mt-4 mx-3 d-flex">
    <div class="w-75 px-2 main">
      <div class="info d-flex gap-3">
        <div class="profile-parent d-flex gap-3 align-items-center">
          <div class="">
            <img
              src="../../assets/img/test/eminem.jpg"
              class="img-thumbnail rounded-circle"
              alt=""
            />
          </div>
        </div>
        <div
          class="mt-2 d-flex align-center py-4 flex-column align-items-center gap-2"
        >
          <span class="fw-semibold fs-5">Eminem</span>
          <div class="d-flex gap-4 follow-parent">
            <span class="color-gray text-capitalize fw-bold pointer"
              >23 followers</span
            >
            <span class="color-gray text-capitalize fw-bold pointer"
              >26 following</span
            >
          </div>
        </div>
      </div>
      <p class="mt-2 color-gray bio">hi,there i am eminem</p>
      <div class="px-2">
        <div class="d-flex justify-content-between">
          <span
            :class="
              component == 'music'
                ? 'text-capitalize p-2 pointer fw-semibold active'
                : 'text-capitalize p-2 pointer fw-semibold'
            "
            >Music</span
          >
          <span
            :class="
              component == 'podcast'
                ? 'text-capitalize p-2 pointer fw-semibold active'
                : 'text-capitalize p-2 pointer fw-semibold'
            "
            >podcast</span
          >
          <span
            :class="
              component == 'album'
                ? 'text-capitalize p-2 pointer fw-semibold active'
                : 'text-capitalize p-2 pointer fw-semibold'
            "
            >album</span
          >
          <span
            :class="
              component == 'playlist'
                ? 'text-capitalize p-2 pointer fw-semibold active'
                : 'text-capitalize p-2 pointer fw-semibold'
            "
            >playlist</span
          >
        </div>
        <div v-if="!podcast && !album" class="px-4">
          <div
            class="monthly-box d-flex gap-4 align-items-center justify-content-between mt-3"
          >
            <div class="d-flex gap-5 align-items-center">
              <img
                class="monthly-img img-fluid rounded-3"
                src="../../assets/img/test/eminem.jpg"
                alt=""
              />
              <div class="d-flex flex-column monthly-text">
                <p
                  class="text-capitalize fs-5 fw-bold m-0 p-0 color-dark pointer"
                >
                  track
                </p>
              </div>
            </div>
            <div class="d-flex gap-4 align-items-center">
              <span class="me-3 text-capitalize">3:15 </span>
              <span class="me-3 text-capitalize">25k plays</span>
              <img
                v-if="component == 'podcast' || component == 'album'"
                src="../../assets/icons/greater-than.png"
                class="img-fluid img-greater-than pointer"
                alt=""
              />
              <svg
                class="pointer svg-more"
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
          <div
            class="monthly-box d-flex gap-4 align-items-center justify-content-between mt-3"
          >
            <div class="d-flex gap-5 align-items-center">
              <img
                class="monthly-img img-fluid rounded-3"
                src="../../assets/img/test/eminem.jpg"
                alt=""
              />
              <div class="d-flex flex-column monthly-text">
                <p
                  class="text-capitalize fs-5 fw-bold m-0 p-0 color-dark pointer"
                >
                  track
                </p>
              </div>
            </div>
            <div class="d-flex gap-4 align-items-center">
              <span class="me-3 text-capitalize">3:15 </span>
              <span class="me-3 text-capitalize">25k plays</span>
              <img
                v-if="component == 'podcast' || component == 'album'"
                src="../../assets/icons/greater-than.png"
                class="img-fluid img-greater-than pointer"
                alt=""
              />

              <svg
                class="pointer svg-more"
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
        <div v-if="podcast || album">
          <div
            class="monthly-box d-flex gap-4 align-items-center justify-content-between mt-3"
          >
            <div class="d-flex gap-5 align-items-center">
              <img
                class="monthly-img img-fluid rounded-3"
                src="../../assets/img/test/eminem.jpg"
                alt=""
              />
              <div class="d-flex flex-column monthly-text">
                <p
                  class="text-capitalize fs-5 fw-bold m-0 p-0 color-dark pointer"
                >
                  track
                </p>
              </div>
            </div>
            <div class="d-flex gap-4 align-items-center">
              <span class="me-3 text-capitalize">3:15 </span>
              <span class="me-3 text-capitalize">25k plays</span>
              <svg
                class="pointer svg-more"
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
    </div>
    <div class="w-25 px-2 aside">
      <section>
        <p class="fw-bold fs-5 text-capitalize mt-4 mb-0">Social media</p>
        <ul class="d-flex flex-column gap-1 mt-2">
          <li class="d-flex gap-3 align-items-center">
            <img src="../../assets/icons/github.png" alt="" />
            <span class="text-capitalize pointer socilamedia-title"
              >My github</span
            >
          </li>
          <li class="d-flex gap-3 align-items-center">
            <img src="../../assets/icons/github.png" alt="" />
            <span class="text-capitalize pointer socilamedia-title"
              >My github</span
            >
          </li>
          <li class="d-flex gap-3 align-items-center">
            <img src="../../assets/icons/github.png" alt="" />
            <span class="text-capitalize pointer socilamedia-title"
              >My github</span
            >
          </li>
          <li class="d-flex gap-3 align-items-center">
            <img src="../../assets/icons/github.png" alt="" />
            <span class="text-capitalize pointer socilamedia-title"
              >My github</span
            >
          </li>
          <li class="d-flex gap-3 align-items-center">
            <img src="../../assets/icons/github.png" alt="" />
            <span class="text-capitalize pointer socilamedia-title"
              >My github</span
            >
          </li>
          <li class="d-flex gap-3 align-items-center">
            <img src="../../assets/icons/github.png" alt="" />
            <span class="text-capitalize pointer socilamedia-title"
              >My github</span
            >
          </li>
        </ul>
      </section>
      <section>
        <p class="fw-bold fs-5 text-capitalize mt-4 mb-0">recomended</p>
        <ul class="d-flex flex-column gap-3 mt-2">
          <li class="d-flex gap-3 align-items-center">
            <img
              src="../../assets/img/test/eminem.jpg"
              class="img-fluid recomended-img rounded-circle"
              alt=""
            />
            <span class="text-capitalize pointer recomeded-title fs-5"
              >eminem</span
            >
          </li>
          <li class="d-flex gap-3 align-items-center">
            <img
              src="../../assets/img/test/eminem.jpg"
              class="img-fluid recomended-img rounded-circle"
              alt=""
            />
            <span class="text-capitalize pointer recomeded-title fs-5"
              >eminem</span
            >
          </li>
          <li class="d-flex gap-3 align-items-center">
            <img
              src="../../assets/img/test/eminem.jpg"
              class="img-fluid recomended-img rounded-circle"
              alt=""
            />
            <span class="text-capitalize pointer recomeded-title fs-5"
              >eminem</span
            >
          </li>
          <li class="d-flex gap-3 align-items-center">
            <img
              src="../../assets/img/test/eminem.jpg"
              class="img-fluid recomended-img rounded-circle"
              alt=""
            />
            <span class="text-capitalize pointer recomeded-title fs-5"
              >eminem</span
            >
          </li>
          <li class="d-flex gap-3 align-items-center">
            <img
              src="../../assets/img/test/eminem.jpg"
              class="img-fluid recomended-img rounded-circle"
              alt=""
            />
            <span class="text-capitalize pointer recomeded-title fs-5"
              >eminem</span
            >
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "user",
  data() {
    return {
      component: "podcast",
      podcast: true,
      album: false,
    };
  },
};
</script>

<style scoped>

.profile-parent img {
  width: 110px;
  height: 110px;
  cursor: pointer;
}

.follow-parent span {
  font-size: 14px !important;
  height: 22px;
}
.follow-parent span:hover {
  border-bottom: 1px solid var(--blue-main) !important;
}
.bio {
  width: 400px;
}
.socilamedia-title:hover,
.recomeded-title:hover {
  text-decoration: underline;
  font-weight: bold;
}

.recomended-img {
  width: 50px;
}
.main {
  overflow: auto;
  height: 650px;
}
.aside {
  overflow: hidden;
}
.active {
  border-bottom: 2px solid var(--blue-main);
}
.monthly-img {
  width: 50px;
  height: 50px;
}
.monthly-text {
  width: 250px;
  text-align: left !important;
}

.monthly-text p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
}

.svg-more {
  transform: rotate(90deg);
}
.img-greater-than{
  width: 20px;
  opacity: 0.8;
}
</style>
