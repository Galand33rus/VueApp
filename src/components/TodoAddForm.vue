<template>
    <v-form
      class="justify-center mb-10"
      ref="form"
      lazy-validation
      @submit.prevent="add">
      <v-text-field
        v-model="input"
        :counter="80"
        label="TODO"
        color="#42b883"
        required></v-text-field>
      <v-btn
        :disabled="!input"
        color="#42b883"
        class="mr-4"
        @click="add">
        ADD NEW TODO
      </v-btn>
    </v-form>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'TodoAddForm',
  data () {
    return {
      input: ''
    }
  },
  methods: {
    ...mapActions(['addToTodosList']),
    add () {
      const data = {
        id: this.$uuid.v4(),
        title: this.input,
        completed: false
      }
      this.addToTodosList(data)
      this.input = ''
    }
  }
}
</script>

<style scoped>
</style>
