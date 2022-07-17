import Vue from 'vue'
import Router from 'vue-router'

import PersonalCosts from '../views/PersonalCosts'
import Calculator from '../views/Calc'
import Todos from '../views/Todos'
import About from '../views/About'
import Home from '../views/Home'
import NotFound from '../views/NotFound'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/costs',
      name: 'costs',
      component: PersonalCosts,
      children: [
        {
          path: '/costs/:page',
          component: PersonalCosts
        },
        {
          path: '/costs/:action/:what/:category',
          name: 'addLink',
          component: PersonalCosts,
          props: true
        }
      ]
    },
    {
      path: '/calc',
      name: 'calc',
      component: Calculator
    },
    {
      path: '/todos',
      name: 'todos',
      component: Todos
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/*',
      name: '404',
      component: NotFound
    }
  ]
})

const titles = {
  home: 'Home page',
  costs: 'Personal Costs',
  todos: 'Todos',
  calc: 'Calculator',
  about: 'About',
  404: '404'
}

router.afterEach((to) => {
  document.title = titles[to.name]
})

export default router
