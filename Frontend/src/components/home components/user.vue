<template>
  <div id="parent" class="container mt-4 mx-3 d-flex">
    <div class="w-75 px-2 main">
      <div class="info d-flex justify-content-center gap-5">
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
      <div class="d-flex justify-content-center ms-5">
        <p class="mt-2 color-gray bio">hi,there i am eminem</p>
      </div>
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
          <span
            :class="
              component == 'following'
                ? 'text-capitalize p-2 pointer fw-semibold active'
                : 'text-capitalize p-2 pointer fw-semibold'
            "
            >following</span
          >
          <span
            :class="
              component == 'followers'
                ? 'text-capitalize p-2 pointer fw-semibold active'
                : 'text-capitalize p-2 pointer fw-semibold'
            "
            >followers</span
          >
        </div>
        <div v-if="!detail" class="px-4">
          <div
            class="monthly-box d-flex gap-4 align-items-center justify-content-between mt-3"
          >
            <div class="d-flex gap-5 align-items-center">
              <img
                class="monthly-img img-fluid rounded-3"
                src="../../assets/img/test/eminem.jpg"
                alt=""
              />
              <div
                :class="
                  detail
                    ? 'd-flex flex-column album-monthly-text'
                    : 'd-flex flex-column monthly-text'
                "
              >
                <p
                  class="text-capitalize fs-5 fw-bold m-0 p-0 color-dark pointer"
                >
                  track
                </p>
              </div>
            </div>
            <div class="d-flex gap-3 align-items-center">
              <span class="me-3 text-capitalize">3:15 </span>
              <span class="me-3 text-capitalize">25k plays</span>
              <span class="me-3 text-capitalize">2k likes</span>

              <img
                v-if="detail"
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
              <div
                :class="
                  detail
                    ? 'd-flex flex-column album-monthly-text'
                    : 'd-flex flex-column monthly-text'
                "
              >
                <p
                  class="text-capitalize fs-5 fw-bold m-0 p-0 color-dark pointer"
                >
                  track
                </p>
              </div>
            </div>
            <div class="d-flex gap-3 align-items-center">
              <span class="me-3 text-capitalize">3:15 </span>
              <span class="me-3 text-capitalize">25k plays</span>
              <span class="me-3 text-capitalize">2k likes</span>

              <img
                v-if="detail"
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
        <div
          v-else-if="
            detail && (component == 'following' || component == 'followers')
          "
          class="d-flex flex-column gap-2"
        >
          <div class="mt-2 px-4 d-flex justify-content-between mx-4 align-items-center">
            <div class="d-flex gap-4 align-items-center">
              <img
                src="../../assets/img/test/eminem.jpg"
                alt=""
                class="img-fluid img-follow rounded-circle"
              />
              <span class="text-capitalize fw-bold fs-5">eminem</span>
            </div>
            <div class="d-flex justify-content-center">
              <button class="btn px-3 py-2 btn-follow text-white fw-semibold text- text-capitalize">follow</button>
              <!-- <button class="btn px-3 py-2 bg-danger  text-white fw-semibold text- text-capitalize">unfollow</button> -->
            </div>
          </div>
          <div class="mt-2 px-4 d-flex justify-content-between mx-4 align-items-center">
            <div class="d-flex gap-4 align-items-center">
              <img
                src="../../assets/img/test/eminem.jpg"
                alt=""
                class="img-fluid img-follow rounded-circle"
              />
              <span class="text-capitalize fw-bold fs-5">eminem</span>
            </div>
            <div class="d-flex justify-content-center">
              <button class="btn px-3 py-2 btn-follow text-white fw-semibold text- text-capitalize">follow</button>
              <!-- <button class="btn px-3 py-2 bg-danger  text-white fw-semibold text- text-capitalize">unfollow</button> -->
            </div>
          </div>
        </div>
        <div v-else>
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
      component: "followers",
      detail: true,
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
  width: 220px;
  text-align: left !important;
}

.album-.monthly-text {
  width: 200px;
  text-align: left !important;
}

.svg-more {
  transform: rotate(90deg);
}
.img-greater-than {
  width: 20px;
  opacity: 0.8;
}
.img-follow {
  width: 60px;
}
.btn-follow{
  max-height: 40px;
  background-color: var(--blue-main);
}
</style>
