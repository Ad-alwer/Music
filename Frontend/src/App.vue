<template>
   <router-view></router-view>
</template>

<script>


export default {
  name: 'App',
 
}
</script>

<style>

:root{
  --blue-main:#4343EF,
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

/*  */

*{
  font-family: 'Montserrat'
}

.pointer{
  cursor: pointer;
}





</style>
