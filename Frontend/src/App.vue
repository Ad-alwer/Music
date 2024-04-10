<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@import "../node_modules/izitoast/dist/css/iziToast.min.css";

:root {
  --blue-main: #4343ef;
  --gray-main: #787887;
  --black-main: #24242e;
}

/* CSS reset */

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

ul,
ol {
  list-style: none;
}

body {
  margin: 0;
  padding: 0;
  font-size: 16px;
  line-height: 1.5;
}

button,
input,
optgroup,
select,
textarea {
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  outline: none;
}

img {
  border-style: none;
  vertical-align: middle;
}

a {
  color: inherit;
  text-decoration: none;
}

/* Utilty class */

.pointer {
  cursor: pointer;
}

.color-gray {
  color: var(--gray-main);
}
.color-black {
  color: var(--black-main);
}
.color-blue {
  color: var(--blue-main);
}

/* Scroll*/

*::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}
*::-webkit-scrollbar-track {
  border-radius: 7px;
  background-color: #dfe9eb;
}

*::-webkit-scrollbar-track:hover {
  background-color: #b8c0c2;
}

*::-webkit-scrollbar-track:active {
  background-color: #b8c0c2;
}

*::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #4343ef;
}

*::-webkit-scrollbar-thumb:hover {
  background-color: #5d52ef;
}

*::-webkit-scrollbar-thumb:active {
  background-color: #676bef;
}

/* Other syle*/
* {
  font-family: "Montserrat";
}

.img-thumbnail {
  border-color: #78788762 !important;
}
</style>
