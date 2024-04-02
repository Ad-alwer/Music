<template>
  <div class="container mt-4 px-4" id="parent">
    <section class="d-flex justify-content-between">
      <span class="text-uppercase color-blue fw-semibold fs-5"
        >users</span
      >
    </section>
    <section class="mt-4">
      <table class="table">
        <tr class="table-header align-middle">
          <th class="text-center text-capitalize fw-bold fs-5">username</th>
          <th class="text-center text-capitalize fw-bold fs-5">email</th>
          <th class="text-center text-capitalize fw-bold fs-5">admin</th>
          <th class="text-center text-capitalize fw-bold fs-5">ban upload</th>
          <th class="text-center text-capitalize fw-bold fs-5">verify</th>
          <th class="text-center text-capitalize fw-bold fs-5">profile</th>
        </tr>
        <tr class="align-middle">
          <th class="text-center text-capitalize p-2 ">adalwer</th>
          <th class="text-center text-capitalize p-2 ">
            amiin.minoo@gmail.com
          </th>
          <th class="text-center text-capitalize p-2">
            <input
              type="checkbox"
              class="offscreen"
              name="x.username"
              id="input"
              checked="false"
            />
            <label class="switch" for="input"></label>
          </th>
          <th class="text-center text-capitalize p-2">
            <input
              type="checkbox"
              class="offscreen"
              name="x.username"
              id="input2"
              checked="false"
            />
            <label class="switch" for="input2"></label>
          </th>
          <th class="text-center text-capitalize p-2">
            <input
              type="checkbox"
              class="offscreen"
              name="x.username"
              id="input3"
            />
            <label class="switch" for="input3"></label>
          </th>
          <th class="text-center text-capitalize p-2">
            <i class="fa-solid fa-address-card text-secondary pointer"></i>
          </th>
        </tr>
      </table>
    </section>
  </div>
</template>

<script>
export default {
  name: "users",
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap");

.table-header th {
  background-color: #4343ef !important;
  color: white;
}
.table-header th:first-child {
    border-top-left-radius: 15px;
  }
  .table-header th:last-child {
    border-top-right-radius: 15px;
  }

tr {
  border-bottom: 2px solid #4343ef;
}

.switch {
    margin-bottom: -4px;
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  background: red;
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: all 0.3s;
  border-radius: 20px;
  cursor: pointer;
  
}
.switch::after {
  content: "";
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 18px;
  /* background-color: rgba(0, 0, 0, 0.25); */
  background: var(--blue-main);

  top: 1px;
  left: 1px;
  transition: all 0.3s;
}
input[type="checkbox"]:checked + .switch::after {
  transform: translateX(20px);
}

input[type="checkbox"]:checked + .switch {
  background: #5c52ef85;
}
.offscreen {
  display: none;
}
.fa-address-card{
    font-size: 22px;
}
</style>
