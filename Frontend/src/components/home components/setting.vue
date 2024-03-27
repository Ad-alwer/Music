<template>
  <div id="parent" class="container mt-5 px-3">
    <section class="">
      <span class="text-uppercase color-blue fw-semibold fs-5">Settings</span>
      <div class="mt-4 d-flex justify-content-evenly gap-5">
        <span class="text-black fw-bold fs-5 text-capitalize"> username </span>
        <span class="text-black fw-bold fs-5 text-capitalize"> password </span>
      </div>
    </section>
    <section class="mt-5 px-5 d-flex flex-column align-items-center gap-3">
       <div class="d-flex align-items-center justify-content-between px-3 input-parent rounded-3 ">
        <input
            type="text"
            name=""
            class="form-control w-75 text-capitalize"
            maxlength="25"
            id=""
            placeholder="Name"
            disabled
          />
          <i class="fas fa-circle-check text-success"></i>
       </div>
         <div class="d-flex align-items-center justify-content-between px-3 input-parent rounded-3 ">
        <input
            type="text"
            name=""
            class="form-control w-75 text-capitalize"
            maxlength="25"
            id=""
            placeholder="enter your new username"
            
          />
          
       </div>
       <div>
        <button class="px-3 py-2 btn btn-change">Change username</button>
       </div>
    </section>
    <!-- <section class="d-flex justify-content-center mt-4">
      <button class="btn px-3 py-2 btn-change">
        Click on this button to send change password link to your email adress
      </button>
    </section> -->

    <section class="mt-5 d-flex align-items-center gap-3 justify-content-center">
        <i class="fas fa-circle-info text-info">
            
        </i>
        <span class="fw-bold text-capitalize color-black">You can't change your email address</span>
    </section>
  </div>
</template>

<script>
export default {
  name: "settings",
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap");
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
input:disabled {
  background-color: #fff;
}

.btn-change {
  background-color: var(--blue-main);
  color: white;
  text-transform: capitalize;
}
</style>
