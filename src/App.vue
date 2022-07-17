<template>
  <v-app>
    <v-app-bar app flat color="orange lighten-3">
      <v-btn to="/" :ripple="false" plain>Home</v-btn>
      <v-btn to="/costs" :ripple="false" plain>Personal costs</v-btn>
      <v-btn to="/todos" :ripple="false" plain>Todos</v-btn>
      <v-btn to="/calc" :ripple="false" plain>Calculator</v-btn>
      <v-btn to="/about" :ripple="false" plain>About</v-btn>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  })
}
</script>
