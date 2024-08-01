<template>
  <div class="container mt-5">
    <main class="border border-2 rounded-4 p-3">
      <section v-if="resualt">
        <h1 class="text-center fw-bold text-capitalize">
          {{ resualt.msg }}
        </h1>
        <p v-if="!jwt" class="text-center">
          You can click on bottom button and go to login page
        </p>
        <p v-else class="text-center">
          You can click on bottom button and go to home page
        </p>
        <div class="d-flex justify-content-center">
          <button
            v-if="!jwt"
            @click.prevent="goto('/login')"
            class="btn px-3 py-2 text-capitalize"
          >
            Login
          </button>
          <button
            v-else
            @click.prevent="goto('/')"
            class="btn px-3 py-2 text-capitalize"
          >
            home
          </button>
        </div>
      </section>
      <section
        v-else
        class="d-flex justify-content-center flex-column align-items-center gap-2"
      >
        <h1 class="text-center fw-bold text-capitalize mb-5 mt-1">
          Please fill inputs to change your password
        </h1>
        <div
          class="d-flex align-items-center justify-content-between px-3 input-parent rounded-3 position-relative"
        >
          <input
            @keyup.prevent="checkpasword($event.target.value)"
            :type="eyeshow.password ? 'text' : 'password'"
            ref="newpassword"
            name=""
            class="form-control w-75 text-capitalize"
            maxlength="25"
            id=""
            placeholder="enter your new password"
          />
          <div
            class="position-absolute end-0 me-2 position-absolute end-0 me-2 d-flex align-items-center gap-2 flex-row-reverse"
          >
            <div>
              <svg
                v-if="!verify.password"
                class=""
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
                class=""
                height="20px"
                viewBox="0 0 1024 1024"
              >
                <path
                  fill="#4db051"
                  d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512c282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0m0 961.008c-247.024 0-448-201.984-448-449.01c0-247.024 200.976-448 448-448s448 200.977 448 448s-200.976 449.01-448 449.01m204.336-636.352L415.935 626.944l-135.28-135.28c-12.496-12.496-32.752-12.496-45.264 0c-12.496 12.496-12.496 32.752 0 45.248l158.384 158.4c12.496 12.48 32.752 12.48 45.264 0c1.44-1.44 2.673-3.009 3.793-4.64l318.784-320.753c12.48-12.496 12.48-32.752 0-45.263c-12.512-12.496-32.768-12.496-45.28 0"
                />
              </svg>
            </div>
            <div class="mb-2 pointer">
              <svg
                v-if="eyeshow.password"
                class="svg-eye mt-2"
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                @click="eyeshow.password = false"
              >
                <path
                  fill="currentColor"
                  d="M12 9a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-4.5c5 0 9.27 3.11 11 7.5c-1.73 4.39-6 7.5-11 7.5S2.73 16.39 1 12c1.73-4.39 6-7.5 11-7.5M3.18 12a9.821 9.821 0 0 0 17.64 0a9.821 9.821 0 0 0-17.64 0"
                />
              </svg>
              <svg
                class="svg-eye mt-2"
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                @click="eyeshow.password = true"
              >
                <path
                  fill="currentColor"
                  d="M2 5.27L3.28 4L20 20.72L18.73 22l-3.08-3.08c-1.15.38-2.37.58-3.65.58c-5 0-9.27-3.11-11-7.5c.69-1.76 1.79-3.31 3.19-4.54zM12 9a3 3 0 0 1 3 3a3 3 0 0 1-.17 1L11 9.17A3 3 0 0 1 12 9m0-4.5c5 0 9.27 3.11 11 7.5a11.79 11.79 0 0 1-4 5.19l-1.42-1.43A9.862 9.862 0 0 0 20.82 12A9.821 9.821 0 0 0 12 6.5c-1.09 0-2.16.18-3.16.5L7.3 5.47c1.44-.62 3.03-.97 4.7-.97M3.18 12A9.821 9.821 0 0 0 12 17.5c.69 0 1.37-.07 2-.21L11.72 15A3.064 3.064 0 0 1 9 12.28L5.6 8.87c-.99.85-1.82 1.91-2.42 3.13"
                />
              </svg>
            </div>
          </div>
          <i class="fas fa-solid fa-circle-x text-danger"></i>
        </div>
        <div
          class="d-flex align-items-center justify-content-between px-3 input-parent rounded-3 position-relative"
        >
          <input
            @keyup.prevent="checkpasswordagain($event.target.value)"
            :type="eyeshow.passwordagain ? 'text' : 'password'"
            ref="newpasswordagain"
            name=""
            class="form-control w-75 text-capitalize"
            maxlength="25"
            id=""
            placeholder="repeat your new password"
          />
          <div
            class="position-absolute end-0 me-2 position-absolute end-0 me-2 d-flex align-items-center gap-2 flex-row-reverse"
          >
            <div>
              <svg
                v-if="!verify.passwordagain"
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
                height="20px"
                viewBox="0 0 1024 1024"
              >
                <path
                  fill="#4db051"
                  d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512c282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0m0 961.008c-247.024 0-448-201.984-448-449.01c0-247.024 200.976-448 448-448s448 200.977 448 448s-200.976 449.01-448 449.01m204.336-636.352L415.935 626.944l-135.28-135.28c-12.496-12.496-32.752-12.496-45.264 0c-12.496 12.496-12.496 32.752 0 45.248l158.384 158.4c12.496 12.48 32.752 12.48 45.264 0c1.44-1.44 2.673-3.009 3.793-4.64l318.784-320.753c12.48-12.496 12.48-32.752 0-45.263c-12.512-12.496-32.768-12.496-45.28 0"
                />
              </svg>
            </div>
            <div class="mb-2 pointer">
              <svg
                v-if="eyeshow.passwordagain"
                class="svg-eye mt-2"
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                @click="eyeshow.passwordagain = false"
              >
                <path
                  fill="currentColor"
                  d="M12 9a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-4.5c5 0 9.27 3.11 11 7.5c-1.73 4.39-6 7.5-11 7.5S2.73 16.39 1 12c1.73-4.39 6-7.5 11-7.5M3.18 12a9.821 9.821 0 0 0 17.64 0a9.821 9.821 0 0 0-17.64 0"
                />
              </svg>
              <svg
                class="svg-eye mt-2"
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                @click="eyeshow.passwordagain = true"
              >
                <path
                  fill="currentColor"
                  d="M2 5.27L3.28 4L20 20.72L18.73 22l-3.08-3.08c-1.15.38-2.37.58-3.65.58c-5 0-9.27-3.11-11-7.5c.69-1.76 1.79-3.31 3.19-4.54zM12 9a3 3 0 0 1 3 3a3 3 0 0 1-.17 1L11 9.17A3 3 0 0 1 12 9m0-4.5c5 0 9.27 3.11 11 7.5a11.79 11.79 0 0 1-4 5.19l-1.42-1.43A9.862 9.862 0 0 0 20.82 12A9.821 9.821 0 0 0 12 6.5c-1.09 0-2.16.18-3.16.5L7.3 5.47c1.44-.62 3.03-.97 4.7-.97M3.18 12A9.821 9.821 0 0 0 12 17.5c.69 0 1.37-.07 2-.21L11.72 15A3.064 3.064 0 0 1 9 12.28L5.6 8.87c-.99.85-1.82 1.91-2.42 3.13"
                />
              </svg>
            </div>
          </div>
          <i class="fas fa-solid fa-circle-x text-danger"></i>
        </div>
        <div class="d-flex justify-content-center">
          <button @click="changepassword" class="btn px-3 py-2">
            Change password
          </button>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import iziToast from "izitoast";
import Register from "./Register.vue";

export default {
  name: "verify",
  beforeMount() {
    this.jwt = Register.methods.getcookies("jwt");
    this.code = location.pathname.split("/f/")[1];
    axios
      .get(`${this.apiaddress}users/verifyforgetlink`, {
        headers: {
          token: this.code,
        },
      })
      .then((res) => {
        res.data ? (this.id = res.data) : null;
      });
  },
  data() {
    return {
      apiaddress: process.env.VUE_APP_Api_ADDRESS,
      resualt: false,
      verify: {
        password: true,
        passwordagain: true,
      },
      eyeshow: {
        password: false,
        passwordagain: false,
      },
      passwordregex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      code: null,
      id: null,
      jwt: null,
    };
  },
  methods: {
    goto: function (e) {
      location.href = e;
    },
    checkpasword: function (e) {
      this.verify.password = this.passwordregex.test(e) ? true : false;

      this.$refs.newpasswordagain.value
        ? this.checkpasswordagain(this.$refs.newpasswordagain.value)
        : null;
    },
    checkpasswordagain: function (e) {
      if (this.passwordregex.test(e) && this.$refs.newpassword.value == e) {
        this.verify.passwordagain = true;
      } else {
        this.verify.passwordagain = false;
      }
    },
    changepassword: function () {
      if (this.verify.password && this.verify.passwordagain) {
        axios
          .put(`${this.apiaddress}users/changepasswordbylink`, {
            id: this.id,
            password: this.$refs.newpassword.value,
          })
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
            this.resualt = res.data;
          });
      }
    },
  },
};
</script>

<style scoped>
main {
  border-color: #4343ef !important;
}
button,
button:hover {
  background-color: #4343ef;
  color: white;
}
.input-parent {
  border: 2px solid var(--blue-main);
  width: 450px;
}
.form-control:focus,
.form-select:focus {
  outline: none;
  box-shadow: none;
}
.form-control,
.form-select {
  border: none;
}
</style>
