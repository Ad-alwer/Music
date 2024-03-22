<template>
  <section class="peganation">
    <a href="" class="prev">
      <img src="../../assets/icons/next.png" class="img-prev" alt="" />
    </a>

    <a href="">1</a>
    <a href="">2</a>
    <a href="">3</a>
    <a href="">4</a>
    <a href="">5</a>

    <a href="" class="next">
      <img src="../../assets/icons/next.png" class="img-next" alt="" />
    </a>
  </section>
</template>

<script>
export default {
  name: "pagination",
};
</script>

<style scoped>
.img-next {
  transform: rotate(180deg);
}
.peganation {
  text-align: center;
}
.peganation a {
  margin: 6px 1px;
  display: inline-block;
  width: 40px;
  line-height: 40px;
  height: 40px;
  color: #fff;
  background-color: #2c3e50;
  text-decoration: none;
  transition: 0.3s;
}
.peganation img {
  height: 25px;
}
.peganation a:hover {
  color: #5d52ef;
}
.peganation .prev {
  border-radius: 30px 0 0 30px;
}

.peganation .next {
  border-radius: 0 30px 30px 0;
}
</style>
