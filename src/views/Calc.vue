<template>
  <v-container>
    <v-col>
      <v-row class="flex-column mb-1">
        <v-text-field v-model="op1" label="Enter a number" type="number"/>
        <v-text-field v-model="op2" label="Enter a number" type="number"/>
        <v-text-field v-model="result" label="Result" value=""/>
      </v-row>
      <v-row>
        <v-btn
          v-for="operation in operations"
          :key="operation"
          @click="calculate(operation)"
          :name="operation"
          color="orange darken-1"
          class="mb-1"
          :disabled="check(operation)">
          {{ operation }}
        </v-btn>
      </v-row>
      <v-row>
        <v-checkbox v-model="toggle" label="On-screen keyboard" color="orange darken-1"/>
      </v-row>
      <v-row v-if="toggle" class="flex-column pl-2">
        <v-row >
          <v-btn
            v-for="number in numbers"
            :key="number"
            @click="add(number)"
            class="mb-1"
            color="orange darken-1" dark>
            {{ number }}
          </v-btn>
          <v-btn @click="remove" name="remove" color="orange darken-1" dark>
            &larr;
          </v-btn>
        </v-row>
        <v-row>
          <v-radio-group v-model="picked">
            <v-radio :value="1" color="orange darken-1" label="Operand 1"></v-radio>
            <v-radio :value="2" color="orange darken-1" label="Operand 2"></v-radio>
          </v-radio-group>
        </v-row>
      </v-row>
    </v-col>

  </v-container>
</template>

<script>
export default {
  name: 'calc',
  data () {
    return {
      op1: '',
      op2: '',
      result: '',
      operations: ['+', '-', '*', '/', '^', '÷'],
      numbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      toggle: false,
      picked: 1,
      links: 'op'
    }
  },
  methods: {
    calculate (operation = '+') {
      switch (operation) {
        case '+':
          this.sum()
          break
        case '-':
          this.sub()
          break
        case '*':
          this.mul()
          break
        case '/':
          this.div()
          break
        case '^':
          this.exp()
          break
        case '÷':
          this.intDiv()
          break
      }
    },
    sum () {
      const {
        op1,
        op2
      } = this
      this.result = +op1 + +op2
    },
    sub () {
      const {
        op1,
        op2
      } = this
      this.result = op1 - op2
    },
    mul () {
      const {
        op1,
        op2
      } = this
      this.result = op1 * op2
    },
    div () {
      const {
        op1,
        op2
      } = this
      this.result = op1 / op2
    },
    exp () {
      const {
        op1,
        op2
      } = this
      this.result = op1 ** op2
    },
    intDiv () {
      const {
        op1,
        op2
      } = this
      this.result = (op1 - op1 % op2) / op2
    },
    add (number) {
      if (this.picked === 1) {
        this.op1 += number
      }
      if (this.picked === 2) {
        this.op2 += number
      }
    },
    remove () {
      if (this.picked === 1) {
        this.op1 = this.op1.slice(0, -1)
      }
      if (this.picked === 2) {
        this.op2 = this.op2.slice(0, -1)
      }
    },
    check (operation) {
      if (this.op1 === '' || this.op2 === '') { // проверяет на пустую строку
        return true
      }
      if (isNaN(this.op1) || isNaN(this.op2)) { // проверяет на число
        return true
      }
      switch (operation) {
        case '/':
        case '÷':
          return +this.op2 === 0 // проверяет деление на 0
        case '^':
          return +this.op1 === 0 && this.op2 <= 0 // проверяет возведение 0 в степень 0 или отрицательную степень
      }
      return false
    }
  }
}
</script>

<style scoped lang="scss">

button {
  margin-right: 5px;
}

</style>
