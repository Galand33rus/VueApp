<template>
  <li>
    <div class="d-flex align-center justify-space-between">
      <div class="d-flex align-center v-alert__border--bottom">
        <v-checkbox
          v-model="checkbox"
          @change="toggle(index)"
          color="#42b883"></v-checkbox>
        <span :class="{done: todo.completed}">
          {{ index + 1 }}.
          {{ todo.title | toUpperCase }}
        </span>
      </div>
      <v-btn @click="remove(todo.id)" color="#42b883">
        <v-icon color="#35495e">
          mdi-delete
        </v-icon>
      </v-btn>
    </div>
  </li>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'TodoItem',
  data () {
    return {
      checkbox: this.todo.completed
    }
  },
  props: {
    todo: {
      type: Object,
      required: true
    },
    index: Number
  },
  filters: {
    toUpperCase (value) {
      return value.toUpperCase()
    }
  },
  methods: {
    ...mapActions(['delFromTodosList', 'toggleCompleted']),
    remove (id) {
      this.delFromTodosList(id)
    },
    toggle (index) {
      this.toggleCompleted(index)
    }
  }
}
</script>

<style scoped lang="scss">
//span {
//  max-width: 1000px;
//  white-space: nowrap;
//  text-overflow: ellipsis;
//  overflow: hidden;
//}

button {
  cursor: pointer;

  &:hover {
    background-color: lightseagreen;
  }
}

.done {
  text-decoration: line-through;
}
</style>
