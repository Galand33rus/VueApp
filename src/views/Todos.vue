<template>
  <v-container>
    <div class="home">
      <img alt="Vue logo" src="../assets/logo.png">
      <TodoAddForm/>
      <TodoList v-if="todosList.length" :todos="todosList"/>
      <p v-else>Нет задач</p>
    </div>
  </v-container>
</template>

<script>
import TodoList from '../components/TodoList'
import TodoAddForm from '../components/TodoAddForm.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    TodoAddForm,
    TodoList
  },
  computed: {
    ...mapGetters(['getTodosList']),
    todosList () {
      return this.getTodosList
    }
  }
}
</script>

<style scoped>
.home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
