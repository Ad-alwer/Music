<template>
  <div id="parent ">
    <header class="d-flex align-items-center gap-1 mt-3">
      <hmheader />
    </header>
    <main class="d-flex">
      <aside class="menu">
        <hmmenu />
      </aside>
      <section class="content container px-5 mt-4">
        <section class="d-flex justify-content-between">
          <span class="text-uppercase color-blue fw-semibold fs-5"
            >profile</span
          >
        </section>
        <section
          class="mt-4 d-flex flex-column justify-content-center align-items-center"
        >
          <div class="profile-parent d-flex gap-5 align-items-center">
            <input type="file" hidden id="profile" />
            <label for="profile">
              <img
                src="../assets/img/test/eminem.jpg"
                class="img-thumbnail rounded-circle"
                alt=""
            /></label>
          </div>
          <div class="mt-2 d-flex align-center follow-parent">
            <span class="color-gray text-capitalize fw-bold pointer"
              >23 followers</span
            >
            <span class="color-gray text-capitalize fw-bold pointer"
              >26 following</span
            >
          </div>
        </section>
        <section class="d-flex justify-content-center mt-4">
          <table class="table table-bordered w-75">
            <tr class="">
              <th
                class="text-uppercase text-center d-flex justify-content-start align-items-center gap-5"
              >
                <img
                  src="../assets/icons/usernameinput.png"
                  class="img-fluid pointer"
                  alt=""
                />
                <span>username</span>
              </th>
              <th class="text-capitalize fw-semibold color-black text-center">
                <span class="me-3">alwer</span>
                <img
                  src="../assets/icons/change.png"
                  class="img-fluid pointer"
                  alt=""
                />
              </th>
            </tr>
            <tr>
              <th
                class="text-uppercase text-center d-flex justify-content-start align-items-center gap-5"
              >
                <img src="../assets/icons/emailinput.png" alt="" />
                <span>email</span>
              </th>
              <th class="text-capitalize fw-semibold color-black text-center">
                <span> alwer@gmail.com </span>
              </th>
            </tr>
            <tr>
              <th
                class="text-uppercase text-center d-flex justify-content-start align-items-center gap-5"
              >
                <img src="../assets/icons/verifyinput .png" alt="" />
                <span>verify</span>
              </th>
              <th class="text-capitalize fw-semibold color-black text-center">
                <!-- <img src="../assets/icons/verify.png" alt=""> -->
                <img src="../assets/icons/unverify.png" alt="" />
              </th>
            </tr>
            <tr>
              <th
                class="text-uppercase text-center d-flex justify-content-start align-items-center gap-5"
              >
                <img src="../assets/icons/banupload.png" alt="" />
                <span>upload status</span>
              </th>
              <th class="text-capitalize fw-semibold color-black text-center">
                <img src="../assets/icons/check.png" alt="" />
                <!-- <img src="../assets/icons/uncheck.png" alt=""> -->
              </th>
            </tr>
            <tr class="">
              <th
                class="text-uppercase text-center d-flex justify-content-start align-items-center gap-5 favouritegenre-label"
              >
                <img src="../assets/icons/favourite.png" alt="" />
                <span>favourite genre</span>
              </th>
              <th class="">
                <select
                  name=""
                  id=""
                  class="form-select genre-select text-capitalize fw-semibold color-black text-center"
                >
                  <option class="text-capitalize" selected>
                    not Different
                  </option>
                  <option class="text-capitalize" value="1">One</option>
                  <option class="text-capitalize" value="2">Two</option>
                  <option class="text-capitalize" value="3">Three</option>
                </select>
              </th>
            </tr>
          </table>
        </section>
        <section class="mt-4">
          <div class="d-flex justify-content-center gap-5">
            <span
              :class="
                whichcomponent == 'request'
                  ? 'fw-bold text-capitalize pointer active-box p-1'
                  : 'fw-bold text-capitalize pointer p-1 '
              "
              >request</span
            >
            <span
              :class="
                whichcomponent == 'monthlylistener'
                  ? 'fw-bold text-capitalize pointer active-box p-1'
                  : 'fw-bold text-capitalize pointer p-1 '
              "
              >monthly listener</span
            >
            <span
              :class="
                whichcomponent == 'socialmedia'
                  ? 'fw-bold text-capitalize pointer active-box p-1'
                  : 'fw-bold text-capitalize pointer p-1 '
              "
              >social media</span
            >
            <span
              :class="
                whichcomponent == 'recommenduser'
                  ? 'fw-bold text-capitalize pointer active-box p-1'
                  : 'fw-bold text-capitalize pointer p-1 '
              "
              >recommend user</span
            >
            <span
              :class="
                whichcomponent == 'detail'
                  ? 'fw-bold text-capitalize pointer active-box p-1'
                  : 'fw-bold text-capitalize pointer p-1 '
              "
              >detail</span
            >
          </div>
          <div v-if="whichcomponent == 'request'">
            <table class="table table-borderless mt-4">
              <tr>
                <th class="text-center text-capitalize fw-semibold">name</th>
                <th class="text-center text-capitalize fw-semibold">status</th>
                <th class="text-center text-capitalize fw-semibold">message</th>
                <th class="text-center text-capitalize fw-semibold">more</th>
              </tr>
              <tr>
                <th class="text-center text-capitalize">track1</th>
                <th class="text-center text-capitalize">
                  <div>
                    <img src="../assets/icons/check.png" alt="" />
                    <!-- <img src="../assets/icons/uncheck.png" alt=""> -->
                  </div>
                </th>
                <th class="text-center text-capitalize">
                  <!-- <img src="../assets/icons/message.png" alt="" /> -->
                  <img src="../assets/icons/nomessage.png" alt="" />
                </th>
                <th class="text-center text-capitalize">
                  <svg
                    class="pointer ms-2"
                    width="18"
                    height="6"
                    viewBox="0 0 18 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="3" cy="3" r="3" fill="#B3B3BC" />
                    <circle cx="15" cy="3" r="3" fill="#B3B3BC" />
                  </svg>
                </th>
              </tr>
              <tr class="pointer">
                <th
                  class="text-center text-capitalize fw-semibold request-table-footer"
                  colspan="4"
                >
                  <div
                    class="d-flex justify-content-center align-items-center gap-1"
                  >
                    <span>see more</span>
                    <svg
                      class="pointer ms-2 mt-1"
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
                </th>
              </tr>
            </table>
          </div>
          <div
            v-else-if="whichcomponent == 'monthlylistener'"
            class="mt-4 d-flex gap-3 flex-wrap"
          >
            <div class="monthly-child rounded-3">
              <div
                class="w-100 h-100 bg-success opacity-2 py-1 d-flex justify-content-center align-items-center flex-column gap-1 position-relative opacity-5"
              >
                <div
                  class="d-flex flex-column align-items-center monthly-content"
                >
                  <span
                    class="text-white text-center text-capitalize fs-4 fw-semibold"
                    >Jan</span
                  >
                  <span
                    class="text-white text-center text-capitalize monthly-substring"
                    >2032</span
                  >
                </div>
                <div class="d-flex justify-content-center gap-2">
                  <img src="../assets/icons/listener.png" alt="" />
                  <span class="text-white text-center text-capitalize"
                    >2500</span
                  >
                </div>
                <div
                  class="monthly-info d-flex justify-content-end align-items-sm-center rounded-4 gap-1"
                >
                  <img src="../assets/icons/info-light.png" alt="" />
                  <span class="text-capitalize text-white monthly-info-text"
                    >more</span
                  >
                </div>
              </div>
            </div>
            <div class="monthly-child rounded-3">
              <div
                class="w-100 h-100 bg-success opacity-2 py-1 d-flex justify-content-center align-items-center flex-column gap-1 position-relative"
              >
                <div
                  class="d-flex flex-column align-items-center monthly-content"
                >
                  <span
                    class="text-white text-center text-capitalize fs-4 fw-semibold"
                    >Jan</span
                  >
                  <span
                    class="text-white text-center text-capitalize monthly-substring"
                    >2024</span
                  >
                </div>
                <div class="d-flex justify-content-center gap-2">
                  <img src="../assets/icons/listener.png" alt="" />
                  <span class="text-white text-center text-capitalize"
                    >2500</span
                  >
                </div>
                <div
                  class="monthly-info d-flex justify-content-end align-items-sm-center rounded-4 gap-1"
                >
                  <img src="../assets/icons/info-light.png" alt="" />
                  <span class="text-capitalize text-white monthly-info-text"
                    >more</span
                  >
                </div>
              </div>
            </div>
            <div class="monthly-child rounded-3">
              <div
                class="w-100 h-100 bg-success opacity-2 py-1 d-flex justify-content-center align-items-center flex-column gap-1 position-relative"
              >
                <div
                  class="d-flex flex-column align-items-center monthly-content"
                >
                  <span
                    class="text-white text-center text-capitalize fs-4 fw-semibold"
                    >Jan</span
                  >
                  <span
                    class="text-white text-center text-capitalize monthly-substring"
                    >2024</span
                  >
                </div>
                <div class="d-flex justify-content-center gap-2">
                  <img src="../assets/icons/listener.png" alt="" />
                  <span class="text-white text-center text-capitalize"
                    >2500</span
                  >
                </div>
                <div
                  class="monthly-info d-flex justify-content-end align-items-sm-center rounded-4 gap-1"
                >
                  <img src="../assets/icons/info-light.png" alt="" />
                  <span class="text-capitalize text-white monthly-info-text"
                    >more</span
                  >
                </div>
              </div>
            </div>
            <div class="monthly-child rounded-3">
              <div
                class="w-100 h-100 bg-success opacity-2 py-1 d-flex justify-content-center align-items-center flex-column gap-1 position-relative"
              >
                <div
                  class="d-flex flex-column align-items-center monthly-content"
                >
                  <span
                    class="text-white text-center text-capitalize fs-4 fw-semibold"
                    >Jan</span
                  >
                  <span
                    class="text-white text-center text-capitalize monthly-substring"
                    >2024</span
                  >
                </div>
                <div class="d-flex justify-content-center gap-2">
                  <img src="../assets/icons/listener.png" alt="" />
                  <span class="text-white text-center text-capitalize"
                    >2500</span
                  >
                </div>
                <div
                  class="monthly-info d-flex justify-content-end align-items-sm-center rounded-4 gap-1"
                >
                  <img src="../assets/icons/info-light.png" alt="" />
                  <span class="text-capitalize text-white monthly-info-text"
                    >more</span
                  >
                </div>
              </div>
            </div>
            <div class="monthly-child rounded-3">
              <div
                class="w-100 h-100 bg-success opacity-2 py-1 d-flex justify-content-center align-items-center flex-column gap-1 position-relative"
              >
                <div
                  class="d-flex flex-column align-items-center monthly-content"
                >
                  <span
                    class="text-white text-center text-capitalize fs-4 fw-semibold"
                    >Jan</span
                  >
                  <span
                    class="text-white text-center text-capitalize monthly-substring"
                    >2024</span
                  >
                </div>
                <div class="d-flex justify-content-center gap-2">
                  <img src="../assets/icons/listener.png" alt="" />
                  <span class="text-white text-center text-capitalize"
                    >2500</span
                  >
                </div>
                <div
                  class="monthly-info d-flex justify-content-end align-items-sm-center rounded-4 gap-1"
                >
                  <img src="../assets/icons/info-light.png" alt="" />
                  <span class="text-capitalize text-white monthly-info-text"
                    >more</span
                  >
                </div>
              </div>
            </div>
            <div
              class="monthly-child rounded-3 d-flex justify-content-center align-items-center bg-black pointer"
            >
              <span class="fs-3 fw-bold text-white">More</span>
              <svg
                class="pointer ms-2 mt-3"
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
          <div v-else-if="whichcomponent == 'socialmedia'" class="mt-4">
            <div>
              <table class="table">
                <tr>
                  <th class="text-center text-capitalize fw-bold fs-5">icon</th>
                  <th class="text-center text-capitalize fw-bold fs-5">link</th>
                  <th class="text-center text-capitalize fw-bold fs-5">
                    title
                  </th>
                  <th class="text-center text-capitalize fw-bold fs-5">edit</th>
                </tr>
                <tr class="align-middle">
                  <th class="text-center text-capitalize">
                    <img
                      src="../assets/icons/instagram.png"
                      class="socialmedia-icon"
                      alt=""
                    />
                  </th>
                  <th class="text-center text-capitalize socialmedia-link">
                    https://yun.ir/Alwer-Instagram
                  </th>
                  <th class="text-center text-capitalize socialmedia-title">
                    my instagram
                  </th>
                  <th class="text-center text-capitalize">
                    <img src="../assets/icons/edit.png" class="pointer" />
                  </th>
                </tr>
                <tr class="align-middle">
                  <th class="text-center text-capitalize">
                    <img
                      src="../assets/icons/github.png"
                      class="socialmedia-icon"
                      alt=""
                    />
                  </th>
                  <th class="text-center text-capitalize socialmedia-link">
                    https://github.com/Ad-alwer
                  </th>
                  <th class="text-center text-capitalize socialmedia-title">
                    my github
                  </th>
                  <th class="text-center text-capitalize">
                    <img src="../assets/icons/edit.png" class="pointer" />
                  </th>
                </tr>
                <tr class="align-middle">
                  <th class="text-center text-capitalize">
                    <img
                      src="../assets/icons/github.png"
                      class="socialmedia-icon"
                      alt=""
                    />
                  </th>
                  <th class="text-center text-capitalize socialmedia-link">
                    https://github.com/Ad-alwer
                  </th>
                  <th class="text-center text-capitalize socialmedia-title">
                    my github
                  </th>
                  <th class="text-center text-capitalize">
                    <img src="../assets/icons/edit.png" class="pointer" />
                  </th>
                </tr>
                <tr class="pointer">
                  <th
                    class="text-center text-capitalize fw-semibold request-table-footer"
                    colspan="4"
                  >
                    <div
                      class="d-flex justify-content-center align-items-center gap-1"
                    >
                      <span>see more</span>
                      <svg
                        class="pointer ms-2 mt-1"
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
                  </th>
                </tr>
              </table>
            </div>
            <form action="" class="mt-3 d-flex flex-column gap-3 py-3">
              <div class="d-flex gap-4 flex">
                <div
                  class="d-flex align-items-center justify-content-between px-3 input-parent rounded-3 w-75"
                >
                  <input
                    type="text"
                    name=""
                    class="form-control text-capitalize"
                    maxlength="25"
                    id=""
                    placeholder="enter link"
                  />
                </div>
                <div
                  class="d-flex align-items-center justify-content-between px-3 input-parent rounded-3"
                >
                  <input
                    type="text"
                    name=""
                    class="form-control text-capitalize"
                    maxlength="25"
                    id=""
                    placeholder="enter title"
                  />
                </div>
              </div>
              <div
                class="select-parent rounded-3 d-flex align-items-center justify-content-center"
              >
                <select class="form-select text-capitalize">
                  <option class="text-capitalize text-center" value="instagram">
                    select icon
                  </option>
                  <option class="text-capitalize text-center" value="instagram">
                    instagram
                  </option>
                  <option class="text-capitalize text-center" value="instagram">
                    github
                  </option>
                  <option class="text-capitalize text-center" value="instagram">
                    telegram
                  </option>
                </select>
              </div>
              <div class="d-flex justify-content-center">
                <button
                  class="btn px-3 w-100 py-2 btn-save text-white fw-semibold fs-6 text-capitalize"
                >
                  Add social media
                </button>
              </div>
            </form>
          </div>
          <div
            v-else-if="whichcomponent == 'recommenduser'"
            class="mt-4 d-flex justify-content-center align-items-center flex-column gap-1"
          >
            <div
              class="search-parent d-flex rounded-3 px-2 py-1 justify-content-between mt-1 ms-3 align-items-center"
            >
              <input
                type="text"
                class="search-input"
                maxlength="43"
                placeholder="Search ..."
              />
              <svg
                class="search-icon pointer"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 19L13.8571 13.8571M8.71429 16.4286C4.4538 16.4286 1 12.9748 1 8.71429C1 4.4538 4.4538 1 8.71429 1C12.9748 1 16.4286 4.4538 16.4286 8.71429C16.4286 12.9748 12.9748 16.4286 8.71429 16.4286Z"
                  stroke="#B3B3BC"
                  stroke-width="2"
                />
              </svg>
            </div>
            <div class="rounded-3 search-resault p-2">
              <div
                class="search-resault-child p-1 px-3 d-flex justify-content-between"
              >
                <div class="d-flex gap-4">
                  <img
                    src="../assets/img/test/eminem.jpg"
                    class="img-fluid rounded-circle"
                    alt=""
                  />
                  <div class="d-flex flex-column align-items-center">
                    <span class="text-capitalize fw-semibold">eminem</span>
                    <span class="text-capitalize color-gray">22k follower</span>
                  </div>
                </div>
                <button class="px-3 py-2 text-white btn-add rounded-3">
                  Add
                </button>
              </div>
              <div
                class="search-resault-child p-1 px-3 d-flex justify-content-between"
              >
                <div class="d-flex gap-4">
                  <img
                    src="../assets/img/test/eminem.jpg"
                    class="img-fluid rounded-circle"
                    alt=""
                  />
                  <div class="d-flex flex-column align-items-center">
                    <span class="text-capitalize fw-semibold">eminem</span>
                    <span class="text-capitalize color-gray">22k follower</span>
                  </div>
                </div>
                <button class="px-3 py-2 text-white btn-add rounded-3">
                  Add
                </button>
              </div>
              <div
                class="search-resault-child p-1 px-3 d-flex justify-content-between"
              >
                <div class="d-flex gap-4">
                  <img
                    src="../assets/img/test/eminem.jpg"
                    class="img-fluid rounded-circle"
                    alt=""
                  />
                  <div class="d-flex flex-column align-items-center">
                    <span class="text-capitalize fw-semibold">eminem</span>
                    <span class="text-capitalize color-gray">22k follower</span>
                  </div>
                </div>
                <button class="px-3 py-2 text-white btn-add rounded-3">
                  Add
                </button>
              </div>
              <div
                class="search-resault-child p-1 px-3 d-flex justify-content-between"
              >
                <div class="d-flex gap-4">
                  <img
                    src="../assets/img/test/eminem.jpg"
                    class="img-fluid rounded-circle"
                    alt=""
                  />
                  <div class="d-flex flex-column align-items-center">
                    <span class="text-capitalize fw-semibold">eminem</span>
                    <span class="text-capitalize color-gray">22k follower</span>
                  </div>
                </div>
                <button class="px-3 py-2 text-white btn-add rounded-3">
                  Add
                </button>
              </div>
              <div
                class="search-resault-child p-1 px-3 d-flex justify-content-between"
              >
                <div class="d-flex gap-4">
                  <img
                    src="../assets/img/test/eminem.jpg"
                    class="img-fluid rounded-circle"
                    alt=""
                  />
                  <div class="d-flex flex-column align-items-center">
                    <span class="text-capitalize fw-semibold">eminem</span>
                    <span class="text-capitalize color-gray">22k follower</span>
                  </div>
                </div>
                <button class="px-3 py-2 text-white btn-add rounded-3">
                  Add
                </button>
              </div>
            </div>
            <div
              class="mt-3 d-flex justify-content-center align-items-center recommend"
            >
              <div
                class="recommend-child w-100 p-1 px-3 d-flex justify-content-between"
              >
                <div class="d-flex gap-4">
                  <img
                    src="../assets/img/test/eminem.jpg"
                    class="img-fluid rounded-circle"
                    alt=""
                  />
                  <div class="d-flex flex-column align-items-center">
                    <span class="text-capitalize fw-semibold">eminem</span>
                    <span class="text-capitalize color-gray">22k follower</span>
                  </div>
                </div>
                <button
                  class="px-3 py-2 text-white btn-add rounded-3 text-capitalize"
                >
                  remove
                </button>
              </div>
            </div>
          </div>
          <div
            v-else
            class="mt-4 d-flex justify-content-center align-items-center"
          >
            <table class="table table-bordered w-75">
              <tr class="">
                <th
                  class="text-uppercase text-center d-flex justify-content-start align-items-center gap-5"
                >
                  <span>total view</span>
                </th>
                <th class="text-capitalize fw-semibold color-black text-center">
                  <span class="me-3">2850</span>
                </th>
              </tr>
              <tr class="">
                <th
                  class="text-uppercase text-center d-flex justify-content-start align-items-center gap-5"
                >
                  <span>best month</span>
                </th>
                <th class="text-capitalize fw-semibold color-black text-center">
                  <span class="me-3">jan 2021</span>
                </th>
              </tr>
              <tr>
                <th
                  class="text-uppercase text-center d-flex justify-content-start align-items-center gap-5"
                >
                  <span>albums</span>
                </th>
                <th class="text-capitalize fw-semibold color-black text-center">
                  <span> 2</span>
                </th>
              </tr>
              <tr>
                <th
                  class="text-uppercase text-center d-flex justify-content-start align-items-center gap-5"
                >
                  <span>musics</span>
                </th>
                <th class="text-capitalize fw-semibold color-black text-center">
                  5
                </th>
              </tr>
              <tr>
                <th
                  class="text-uppercase text-center d-flex justify-content-start align-items-center gap-5"
                >
                  <span>podcast</span>
                </th>
                <th class="text-capitalize fw-semibold color-black text-center">
                  8
                </th>
              </tr>
              <tr>
                <th
                  class="text-uppercase text-center d-flex justify-content-start align-items-center gap-5"
                >
                  <span>playlist</span>
                </th>
                <th class="text-capitalize fw-semibold color-black text-center">
                  8
                </th>
              </tr>
              <tr>
                <th
                  class="text-uppercase text-center d-flex justify-content-start align-items-center gap-5"
                >
                  <span>best music</span>
                </th>
                <th class="text-capitalize fw-semibold color-black text-center">
                  track 25
                </th>
              </tr>
              <tr>
                <th
                  class="text-uppercase text-center d-flex justify-content-start align-items-center gap-5"
                >
                  <span>best album</span>
                </th>
                <th class="text-capitalize fw-semibold color-black text-center">
                  album 6
                </th>
              </tr>
              <tr>
                <th
                  class="text-uppercase text-center d-flex justify-content-start align-items-center gap-5"
                >
                  <span>best podcast</span>
                </th>
                <th class="text-capitalize fw-semibold color-black text-center">
                  podcast 4
                </th>
              </tr>
              <tr>
                <th
                  class="text-uppercase text-center d-flex justify-content-start align-items-center gap-5"
                >
                 
                  <span>best playlist</span>
                </th>
                <th class="text-capitalize fw-semibold color-black text-center">
                  playlist 2
                </th>
              </tr>
            </table>
          </div>
        </section>
      </section>
      <aside class="player">
        <player />
      </aside>
    </main>
  </div>
</template>

<script>
import hmheader from "./home components/header";
import hmmenu from "./home components/menu";
import player from "./home components/Player.vue";
export default {
  name: "profile",
  components: {
    hmheader,
    hmmenu,
    player,
  },
  data() {
    return {
      whichcomponent: "detail",
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap");
* {
  overflow: hidden;
}
.content {
  width: 62%;
  overflow-y: scroll !important;
  max-height: 89vh;
}
aside.menu {
  width: 240px;
  height: 92vh;
}
aside.player {
  width: 25%;
  /* background-color: aqua; */
}

.profile-parent img {
  width: 110px;
  height: 110px;
  cursor: pointer;
}

tr {
  border-bottom: 2px solid #4343ef;
}
.follow-parent {
  gap: 85px;
}
.follow-parent span {
  font-size: 14px !important;
  height: 22px;
}
.follow-parent span:hover {
  border-bottom: 1px solid var(--blue-main) !important;
}

.favouritegenre-label {
  margin-top: 10px;
}

.request-table-footer {
  background-color: var(--blue-main);
  color: white;
}
.active-box {
  border-bottom: 2px solid var(--blue-main) !important;
}
.monthly-child {
  width: 130px;
  height: 130px;
  background-color: var(--gray-main);
  cursor: pointer;
}
.opacity-1 {
  opacity: 1;
}
.opacity-2 {
  opacity: 0.75;
}
.opacity-3 {
  opacity: 0.7;
}
.opacity-4 {
  opacity: 0.6;
}
.opacity-5 {
  opacity: 0.45;
}
.opacity-6 {
  opacity: 0.35;
}
.opacity-7 {
  opacity: 0.25;
}
.monthly-substring {
  position: relative;
  top: -5px;
  font-size: 12px;
}

.monthly-info {
  position: absolute;
  padding: 2px;
  bottom: 2%;
  right: 2%;
  background-color: rgba(0, 0, 0, 0.342);
  cursor: pointer;
}

.monthly-info img {
  width: 18px;
}
.monthly-info-text {
  font-size: 12px;
  display: none;
}
.monthly-info:hover {
  padding: 2px 5px 2px 3px;
}
.monthly-content {
  margin-top: -20px;
}

.monthly-info:hover .monthly-info-text {
  display: block;
}

.socialmedia-icon {
  width: 32px;
  width: 32px;
}
.socialmedia-link {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
}
.socialmedia-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 80px;
}

.form-control,
.form-select {
  border: none;
}
.form-control:focus,
.form-select:focus {
  outline: none;
  box-shadow: none;
}
.form-control:focus,
.form-select:focus {
  outline: none;
  box-shadow: none;
}

.input-parent {
  border: 2px solid var(--blue-main);
  width: 450px;
}
.select-parent select {
  border: 2px solid var(--blue-main);
}
.select-parent span {
  border-bottom: 2px solid var(--blue-main);
}
.btn-save,
.btn-add {
  background-color: var(--blue-main);
}

.search-parent {
  width: 600px;
  height: 33px;
  border: 1px solid var(--gray-main);
}

.search-resault {
  background-color: rgba(46, 46, 46, 0.28);
  margin-left: 15px;
  width: 600px;
  overflow: scroll;
  height: 200px;
}
.search-resault-child img,
.recommend img {
  width: 50px;
}
.recommend {
  width: 600px;
}
/* .search-resault-child{
  border-bottom: 2px solid var(--blue-main);
} */
</style>
