<template>
  <div>
    <ul>
      <TodoItem
        v-for="(todo, idx) of todos"
        :index="idx"
        :todo="todo"
        :key="idx"
      />
    </ul>
  </div>
</template>

<script>

import TodoItem from '@/components/TodoItem.vue'

export default {
  name: 'TodoList',
  components: { TodoItem },
  props: ['todos'],
  methods: {
  }
}

</script>

<style scoped lang="scss">
li {
  list-style: none;
}
ul {
  padding-right: 24px;
}
</style>
