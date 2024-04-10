<!-- eslint-disable vue/require-v-for-key -->
<template>
    <div id="popup">
        <div class="popup-inner rounded-4 d-flex flex-column justify-content-start align-items-start">
            <i class="fas fa-close text-danger fs-3" @click="close"></i>
            <profile user="user"  class="profile" />
        </div>
    </div>
  </template>
  
  <script>
  import profile from "../home components/user.vue"
  export default {
    name: "notificationpopup",
    mounted() {
      document.addEventListener("keydown", this.esc);
    },
    methods: {
      close: function () {
        this.$emit("close", "closed");
      },
      esc(event) {
        console.log('x');
        if (event.key === "Escape") {
          this.close();
        }
      },
    },
    components:{
        profile
    },
    props:['user']
  };
  </script>
  
  <style scoped>
  #popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
  
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .popup-inner {
    position: absolute;
    background-color: white;
    color: black;
    position: relative;
    padding: 10px;
    
  }
 .fas{
    position: absolute;
    left: 3%;
    cursor: pointer;
 }
 .profile{
    position: relative;
    width: 1200px;
    
 }
  </style>
  