<template  >
    <div class="container pointer" @click="goto"  >
      <div class="d-flex justify-content-center w-100 h-100 parent">
          <img src="../assets/img/notfound.jpg" class="img-fluid" alt="">
      </div>
      
     
     
    </div>
  </template>
  
  <script>
  export default {
    methods:{
      goto:function(){
          location.href='/'
      }
    }
  };
  </script>
  
  <style scoped>
  .parent{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 99;
    
      
      display: flex;
      align-items: center;
      justify-content: center;
  }
  img{
    height: 100%;
  }
  
  </style>
    