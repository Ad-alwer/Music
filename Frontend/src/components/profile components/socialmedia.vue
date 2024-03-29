<template>
    <div id="parent ">
      <header class="d-flex align-items-center gap-1 mt-3">
        <hmheader />
      </header>
      <main class="d-flex">
        <aside class="menu">
          <hmmenu />
        </aside>
        <section class="content">
          <div class="d-flex justify-content-between mt-4 mx-5">
            <span class="text-uppercase color-blue fw-semibold fs-5"
              >social media</span
            >
          </div>
          <div class="px-4 mt-3">
           
            <form action="" class="mt-1 d-flex flex-column gap-3 py-3">
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
            
            <div class="mt-3">
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
                      src="../../assets/icons/instagram.png"
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
                    <img src="../../assets/icons/edit.png" class="pointer" />
                  </th>
                </tr>
                <tr class="align-middle">
                  <th class="text-center text-capitalize">
                    <img
                      src="../../assets/icons/github.png"
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
                    <img src="../../assets/icons/edit.png" class="pointer" />
                  </th>
                </tr>
                <tr class="align-middle">
                  <th class="text-center text-capitalize">
                    <img
                      src="../../assets/icons/github.png"
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
                    <img src="../../assets/icons/edit.png" class="pointer" />
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
          </div>
  
        </section>
        <aside class="player">
          <player />
        </aside>
      </main>
    </div>
  </template>
  
  <script>
  import hmheader from "../home components/header";
  import hmmenu from "../home components/menu";
  import player from "../home components/Player.vue";
  
  export default {
    name: "home",
    data() {
      return {
        component: "settings",
      };
    },
    methods: {},
    components: {
      hmheader,
      hmmenu,
      player,
    },
  };
  </script>
  
  <style scoped>
  * {
    overflow: hidden;
  }
  .content {
    width: 62%;
    overflow-y: scroll !important;
    max-height: 90vh;
  }
  aside.menu {
    width: 240px;
    height: 92vh;
  }
  aside.player {
    width: 25%;
    /* background-color: aqua; */
  }
  tr {
    border-bottom: 2px solid #4343ef;
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

  </style>
  