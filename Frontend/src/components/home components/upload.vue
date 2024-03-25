<template>
  <div id="parent" class="container mt-5 px-3 position-relative">
    <section>
      <div class="d-flex justify-content-between">
        <span class="text-uppercase color-blue fw-semibold">upload</span>
      </div>
      <div class="mt-4">
        <p class="text-black fs-5 fw-bold">Details</p>
        <div class="d-flex gap-3">
          <input
            type="text"
            name=""
            class="form-control w-75"
            maxlength="25"
            id=""
            placeholder="Name"
          />
          <select name="" id="" class="form-select w-25">
            <option value="music" selected>Music</option>
            <option value="poadcast">Poadcast</option>
            <option value="album">Album</option>
          </select>
          <select name="" class="form-select w-25 text-capitalize" id="">
            <option value="music" class="text-capitalize" selected>
              hiphop
            </option>
            <option value="poadcast" class="text-capitalize">rock</option>
            <option value="album" class="text-capitalize">pop</option>
          </select>
        </div>
        <div class="mt-2">
          <textarea
            name=""
            id=""
            cols="20"
            rows="5"
            class="form-control text-capitalize"
            placeholder="description"
            maxlength="400"
          ></textarea>
        </div>
      </div>

      <div class="mt-4">
        <p class="text-black fs-5 fw-bold">Status</p>
        <select name="" id="" class="text-capitalize form-select">
          <option value="Private" class="text-capitalize">Private</option>
          <option value="Public" class="text-capitalize">Public</option>
        </select>
      </div>
      <div class="mt-4">
        <p class="text-black fs-5 fw-bold">Files</p>
        <div class="d-flex justify-content-center gap-4">
          <div class="wrapper">
            <form action="#">
              <input
                class="file-input"
                id="tumbnail"
                type="file"
                name="file"
                hidden
              />
              <label
                class="d-flex flex-column align-items-center pointer"
                for="tumbnail"
              >
                <i class="fas fa-cloud-upload-alt"></i>
                <p class="mt-0 text-capitalize">
                  Browse File to Upload files
                </p></label
              >
            </form>
            <section class="uploaded-area">
              <li class="rows d-flex">
                <div class="content upload">
                  <i class="fas fa-file-alt"></i>
                  <div class="details">
                    <span class="name text-capitalize fw-bold color-black"
                      >name</span
                    >
                    <span class="size">224Kb</span>
                  </div>
                </div>
                <i class="fas fa-check"></i>
              </li>
            </section>
          </div>
          <div class="bar my-2 rounded-top-5 rounded-bottom-5"></div>
          <div class="wrapper">
            <form action="#">
              <input
                class="file-input"
                id="tracks"
                type="file"
                name="file"
                hidden
              />
              <label
                class="d-flex flex-column align-items-center pointer"
                for="tracks"
              >
                <i class="fas fa-cloud-upload-alt"></i>
                <p class="mt-0 text-capitalize">
                  Browse File to Upload tumbnail
                </p></label
              >
            </form>
            <section class="uploaded-area">
              <li class="rows d-flex">
                <div class="content upload">
                  <i class="fas fa-file-alt"></i>
                  <div class="details">
                    <span class="name text-capitalize fw-bold color-black"
                      >name</span
                    >
                    <span class="size">224Kb</span>
                  </div>
                </div>
                <i class="fas fa-check"></i>
              </li>
            </section>
          </div>
        </div>
        <div class="d-flex justify-content-center gap-4 mt-3">
          <div class="wrapper">
            <form
              action="#"
              class="d-flex flex-column align-items-center justify-content-center gap-3"
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
              <div class="profileshower p-1 d-flex flex-wrap gap-1">
                <img
                  src="../../assets/img/test/eminem.jpg"
                  class="img-fluid rounded-circle"
                  alt=""
                />
              </div>
            </form>
            <section class="uploaded-area">
              <li class="rows d-flex">
                <div class="content upload">
                  <img
                  src="../../assets/img/test/eminem.jpg"
                  class="img-fluid rounded-circle"
                  alt=""
                />
                  <div class="details">
                    <span class="name text-capitalize fw-bold color-black"
                      >name</span
                    >
                    <span class="size ">20k follower</span>
                  </div>
                </div>
                <i class="fas fa-close text-danger"></i>
              </li>
            </section>
          </div>
          <div class="bar my-2 rounded-top-5 rounded-bottom-5"></div>
          <div class="wrapper">
            <form action="#" class="p-2 d-flex flex-column">
              <select class="form-select" name="" id="">
                <option value="" selected>Track1</option>
              </select>
              <textarea
                name=""
                class="form-control text-capitalize mt-2"
                placeholder="Write or Paste lyric"
                id=""
                cols="30"
                rows="10"
              ></textarea>
            </form>
            <section class="uploaded-area">
              <li class="rows d-flex">
                <div class="content upload">
                  <i class="fas fa-file-alt"></i>
                  <div class="details">
                    <span class="name text-capitalize fw-bold color-black"
                      >name</span
                    >
                    <span class="size">225 word</span>
                  </div>
                </div>
                <i class="fas fa-close text-danger"></i>
              </li>
            </section>
          </div>
        </div>
      </div>
      <div class="w-100 mt-3 d-flex gap-4 ">
        <button class="btn fw-bold  btn-save px-3 py-2 w-75 fs-5 text-center text-capitalize">Save</button>
        <button class="btn  fw-bold bg-danger text-white fs-5 px-3 py-2 w-25 text-center text-capitalize">cancel</button>

      </div>
    </section>
  </div>
</template>

<script>
import "@fortawesome/fontawesome-free/css/all.css";
export default {};
</script>

<style scoped>
* {
  overflow: hidden;
}
.form-control,
.form-select {
  border: 2px solid var(--blue-main);
}
.form-control:focus,
.form-select:focus {
  outline: none;
  box-shadow: none;
}

/* Uploader */

@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap");

::selection {
  color: #fff;
  background: #6990f2;
}
.wrapper {
  width: 430px;
  background: #fff;
  cursor: pointer;
  border-radius: 5px;
  /* padding: 30px; */
  box-shadow: 7px 7px 12px rgba(0, 0, 0, 0.05);
}

.wrapper form {
  cursor: pointer;
  height: 167px;
  display: flex;
  cursor: pointer;
  /* margin: 30px 0; */
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 5px;
  border: 2px dashed #6990f2;
}
form :where(i, p) {
  color: #6990f2;
}
form i {
  font-size: 50px;
}

section .rows {
  margin-bottom: 10px;
  background: #e9f0ff;
  list-style: none;
  padding: 15px 20px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
section .rows i {
  color: #6990f2;
  font-size: 30px;
}
section .details span {
  font-size: 14px;
}
.progress-area .rows .content {
  width: 100%;
  margin-left: 15px;
}
.progress-area .details {
  display: flex;
  align-items: center;
  margin-bottom: 7px;
  justify-content: space-between;
}
.progress-area .content .progress-bar {
  height: 6px;
  width: 100%;
  margin-bottom: 4px;
  background: #fff;
  border-radius: 30px;
}
.content .progress-bar .progress {
  height: 100%;
  width: 0%;
  background: #6990f2;
  border-radius: inherit;
}
.uploaded-area {
  max-height: 232px;
  overflow-y: scroll;
}
.uploaded-area.onprogress {
  max-height: 150px;
}
.uploaded-area::-webkit-scrollbar {
  width: 0px;
}
.uploaded-area .rows .content {
  display: flex;
  align-items: center;
}
.uploaded-area .rows .details {
  display: flex;
  margin-left: 15px;
  flex-direction: column;
}
.uploaded-area .rows .details .size {
  color: #404040;
  font-size: 11px;
  text-transform: capitalize;
}
.uploaded-area i.fa-check {
  font-size: 16px;
}
/*  */

div.bar {
  width: 7px;

  background: var(--blue-main);
  opacity: 0.6;
}
textarea {
  resize: none;
}

.search-icon {
  width: 18px;
  height: 18px;
}
.search-input {
  caret-color: var(--blue-main);
  /* width: 350px; */

  color: var(--gray-main);
}
.search-parent {
  width: 410px;
  height: 33px;
  border: 1px solid var(--gray-main);
  position: relative;
  left: -7px;
}
.profileshower {
  height: 100px !important;
  width: 95%;
  border: 1px solid var(--blue-main);
  overflow-y: auto;
}
.profileshower img,.content img {
  width: 40px;
  height: 40px;
}
.btn-save{
  background-color: var(--blue-main);
  color: white;
}
</style>

//TODO fix progress
