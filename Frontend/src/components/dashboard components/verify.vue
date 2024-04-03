<template>
  <div class="container mt-4 px-4" id="parent">
    <section class="d-flex justify-content-between">
      <span class="text-uppercase color-blue fw-semibold fs-5">verify</span>
    </section>
    <section class="d-flex justify-content-center">
      <div
        class="search-parent d-flex rounded-3 px-2 py-1 justify-content-between mt-1 align-items-center mt-4"
      >
        <input
          type="text"
          class="search-input"
          maxlength="69"
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
    </section>
    <section class="mt-4">
      <table class="table">
        <tr class="table-header align-middle">
          <th class="text-center text-capitalize fw-bold fs-5">username</th>
          <th class="text-center text-capitalize fw-bold fs-5">verify</th>
        </tr>
        <tr class="align-middle">
          <th class="text-center text-capitalize p-2">adalwer</th>
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
.fa-address-card {
  font-size: 22px;
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
.search-icon {
  width: 18px;
  height: 18px;
}
.search-input {
  caret-color: var(--blue-main);
  width: 750px;

  color: var(--gray-main);
}
.search-parent {
  width: 800px;
  height: 45px;
  border: 1px solid var(--gray-main);
}
</style>
