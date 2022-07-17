<template>
<v-container>
  <v-row justify="center">
      <div class="logo">
        <img src="../assets/wolf.jpg" alt="wolf">
      </div>
  </v-row>
</v-container>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped lang="scss">
.logo {
  width: 400px;
  height: 400px;
  background-image: url("../assets/wolfred.jpg");
  background-size: 400px 400px;
}
img {
  width: 400px;
  height: 400px;
  transition: opacity .2s;
  &:hover {
    opacity: 0;
  }
}
</style>
