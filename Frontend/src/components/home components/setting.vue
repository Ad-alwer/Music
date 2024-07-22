<template>
  <div id="parent" class="container mt-5 px-3">
    <section class="">
      <span class="text-uppercase color-blue fw-semibold fs-5">Settings</span>
      <div class="mt-4 d-flex justify-content-evenly gap-5">
        <span
          @click="which = 'username'"
          :class="
            which == 'username'
              ? 'text-black fw-bold fs-5 text-capitalize pointer px-3 py-1 active-box'
              : 'text-black fw-bold fs-5 text-capitalize pointer px-3 py-1'
          "
        >
          username
        </span>
        <span
          @click="which = 'password'"
          :class="
            which == 'password'
              ? 'text-black fw-bold fs-5 text-capitalize pointer px-3 py-1 active-box'
              : 'text-black fw-bold fs-5 text-capitalize pointer px-3 py-1'
          "
        >
          password
        </span>
      </div>
    </section>
    <section
      v-if="which == 'username'"
      class="mt-5 px-5 d-flex flex-column align-items-center gap-3"
    >
      <div
        class="d-flex align-items-center justify-content-between px-3 input-parent rounded-3"
      >
        <input
          type="text"
          :value="username"
          name=""
          class="form-control w-75 text-capitalize"
          maxlength="25"
          id=""
          disabled
        />
      </div>
      <div
        class="d-flex align-items-center justify-content-between px-3 input-parent rounded-3 position-relative"
      >
        <input
          @keyup.prevent="checkusername($event.target.value)"
          type="text"
          ref="newusername"
          name=""
          class="form-control w-75 text-capitalize"
          maxlength="25"
          id=""
          placeholder="enter your new username"
        />
        <svg
          v-if="!usernameflag"
          class="position-absolute end-0 me-2"
          xmlns="http://www.w3.org/2000/svg"
          width="23px"
          height="23px"
          viewBox="0 0 24 24"
        >
          <path
            fill="#db0a0a"
            d="M12 21a9 9 0 1 1 9-9a9 9 0 0 1-9 9m0-16.5a7.5 7.5 0 1 0 7.5 7.5A7.5 7.5 0 0 0 12 4.5"
          />
          <path
            fill="#db0a0a"
            d="M12 13a.76.76 0 0 1-.75-.75v-3.5a.75.75 0 0 1 1.5 0v3.5A.76.76 0 0 1 12 13m0 3a.76.76 0 0 1-.75-.75v-.5a.75.75 0 0 1 1.5 0v.5A.76.76 0 0 1 12 16"
          />
        </svg>

        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="20px"
          class="position-absolute end-0 me-2"
          height="20px"
          viewBox="0 0 1024 1024"
        >
          <path
            fill="#4db051"
            d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512c282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0m0 961.008c-247.024 0-448-201.984-448-449.01c0-247.024 200.976-448 448-448s448 200.977 448 448s-200.976 449.01-448 449.01m204.336-636.352L415.935 626.944l-135.28-135.28c-12.496-12.496-32.752-12.496-45.264 0c-12.496 12.496-12.496 32.752 0 45.248l158.384 158.4c12.496 12.48 32.752 12.48 45.264 0c1.44-1.44 2.673-3.009 3.793-4.64l318.784-320.753c12.48-12.496 12.48-32.752 0-45.263c-12.512-12.496-32.768-12.496-45.28 0"
          />
        </svg>
        <i class="fas fa-solid fa-circle-x text-danger"></i>
      </div>
      <div>
        <button
          class="px-3 py-2 btn btn-change"
          @click.prevent="changeusername($refs.newusername.value)"
        >
          Change username
        </button>
      </div>
    </section>
    <section v-else class="d-flex justify-content-center mt-4">
      <button class="btn px-3 py-2 btn-change" @click.prevent="changepassword">
        Click on this button to send change password link to your email adress
      </button>
    </section>

    <section
      class="mt-5 d-flex align-items-center gap-3 justify-content-center"
    >
      <i class="fas fa-circle-info text-info"> </i>
      <span class="fw-bold text-capitalize color-black"
        >You can't change your email address</span
      >
    </section>
  </div>
</template>

<script>
import Register from "../Register.vue";
import axios from "axios";
import info from "../../../default";
import iziToast from "izitoast";

export default {
  name: "settings",
  data() {
    return {
      apiaddress: info.Api_ADDRESS,
      which: "username",
      usernameflag: true,
    };
  },
  methods: {
    checkusername: function (e) {
      const regexusername =
        /^(?=.{4,12}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
      if (regexusername.test(e)) {
        axios
          .get(`${this.apiaddress}accountpending/checkusername/${e}`)
          .then((res) => {
            this.usernameflag = res.data.status;
          });
      } else {
        this.usernameflag = false;
      }
    },
    changeusername: function (e) {
      if (this.usernameflag) {
        axios
          .put(
            `${this.apiaddress}users/changeusername/${e}`,
            {},
            {
              headers: {
                jwt: Register.methods.getcookies("jwt"),
              },
            }
          )
          .then((res) => {
            if (res.data) {
              iziToast.success({
                title: res.data.msg,
                position: "topRight",
              });
              this.$refs.newusername.value = null;

              this.$emit("reload", "reloadheader");
            } else {
              iziToast.error({
                title: res.data.msg,
                position: "topRight",
              });
            }
          });
      }
    },
    changepassword: function () {
      axios
        .get(`${this.apiaddress}users/forgetpassword/${this.username}`)
        .then((res) => {
          if (res.data) {
            iziToast.success({
              title: res.data.msg,
              position: "topRight",
            });
          } else {
            iziToast.error({
              title: res.data.msg,
              position: "topRight",
            });
          }
        });
    },
  },
  props: ["username"],
};
</script>

<style scoped>

.form-control,
.form-select {
  border: none;
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
input:disabled {
  background-color: #fff;
}

.btn-change {
  background-color: var(--blue-main);
  color: white;
  text-transform: capitalize;
}
.active-box {
  border-bottom: 2px solid var(--blue-main) !important;
}
</style>
