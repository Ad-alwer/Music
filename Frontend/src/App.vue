<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
:root {
  --blue-main: #4343ef;
  --gray-main: #b3b3bc;
  --black-main: #24242E;

}



/* CSS rese */

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
.color-black{
  color: var(--black-main);
}

/* Scroll*/ 

*::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}
*::-webkit-scrollbar-track {
  border-radius: 7px;
  background-color: #DFE9EB;
}

*::-webkit-scrollbar-track:hover {
  background-color: #B8C0C2;
}

*::-webkit-scrollbar-track:active {
  background-color: #B8C0C2;
}

*::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #4343EF;
}

*::-webkit-scrollbar-thumb:hover {
  background-color: #5D52EF;
}

*::-webkit-scrollbar-thumb:active {
  background-color: #676BEF;
}


/* Other syle*/
* {
  font-family: "Montserrat";
}
</style>
