import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    paymentsList: [],
    categoryList: [],
    todosList: JSON.parse(localStorage.getItem('todos') || '[]')
  },
  mutations: {
    setPaymentsListData (state, payload) {
      state.paymentsList = payload
    },
    addDataToPaymentsList (state, payload) {
      state.paymentsList.map(i => {
        i.id += 1
      })
      state.paymentsList.unshift(payload)
    },
    setCategoriesList (state, payload) {
      state.categoryList = payload
    },
    delDataToPaymentsList (state, payload) {
      // state.paymentsList.splice(payload - 1, 1)
      state.paymentsList = state.paymentsList.filter(item => item.id !== payload)
      let n = 1
      state.paymentsList.map(item => {
        item.id = n
        n++
      })
    },
    editDataToPaymentsList (state, payload) {
      // Vue.set(state.paymentsList, payload.id - 1, {
      //   category: payload.category,
      //   value: payload.value,
      //   date: state.paymentsList[payload.id - 1].date,
      //   id: payload.id
      // })
      Object.assign(state.paymentsList[payload.id - 1], payload)
    },
    setTodosList (state, payload) {
      state.todosList = payload
    },
    addToTodosList (state, payload) {
      state.todosList.push(payload)
      localStorage.setItem('todos', JSON.stringify(state.todosList))
    },
    delFromTodosList (state, payload) {
      state.todosList = state.todosList.filter(item => item.id !== payload)
      localStorage.setItem('todos', JSON.stringify(state.todosList))
    },
    toggleCompleted (state, payload) {
      Vue.set(state.todosList, payload, {
        id: state.todosList[payload].id,
        title: state.todosList[payload].title,
        completed: !state.todosList[payload].completed
      })
      // Vue.set(state.todosList, payload, {
      //   id: payload.id,
      //   title: payload.title,
      //   completed: !payload.completed
      // })
      localStorage.setItem('todos', JSON.stringify(state.todosList))
    }
  },
  getters: {
    getPaymentsList: state => state.paymentsList,
    getFullPaymentValue: state => {
      return state.paymentsList.reduce((res, cur) => res + cur.value, 0)
    },
    getCategoryList: state => state.categoryList,
    getChart: (state) => {
      return state.categoryList.map(category => {
        return state.paymentsList.reduce((total, item) => {
          if (item.category === category) {
            total += +item.value
          }
          return total
        }, 0)
      })
    },
    getTodosList: state => state.todosList
  },
  actions: {
    fetchData ({ commit }) {
      return commit('setPaymentsListData', [
        {
          id: 1,
          date: '2020-03-28',
          category: 'Food',
          value: 169
        },
        {
          id: 2,
          date: '2020-03-24',
          category: 'Transport',
          value: 360
        },
        {
          id: 3,
          date: '2020-03-24',
          category: 'Food',
          value: 532
        },
        {
          id: 4,
          date: '2020-03-21',
          category: 'Housing',
          value: 273
        },
        {
          id: 5,
          date: '2020-03-21',
          category: 'Healthcare',
          value: 545
        },
        {
          id: 6,
          date: '2020-03-16',
          category: 'Housing',
          value: 502
        },
        {
          id: 7,
          date: '2020-03-14',
          category: 'Clothing',
          value: 692
        },
        {
          id: 8,
          date: '2020-03-02',
          category: 'Food',
          value: 143
        },
        {
          id: 9,
          date: '2020-03-01',
          category: 'Entertainment',
          value: 339
        }
      ])
    },
    loadCategories ({ commit }) {
      return commit('setCategoriesList', ['Food', 'Transport', 'Housing', 'Clothing', 'Healthcare', 'Entertainment'])
    },
    addToTodosList ({ commit }, payload) {
      commit('addToTodosList', payload)
    },
    delFromTodosList ({ commit }, payload) {
      commit('delFromTodosList', payload)
    },
    toggleCompleted ({ commit }, payload) {
      commit('toggleCompleted', payload)
    }
  }
})
