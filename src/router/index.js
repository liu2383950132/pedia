import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/pedia' },
  {
    path: '/pedia',
    name: 'Pedia',
    component: () => import('../views/Pedia/Pedia')
  },
  {
    path: '/pedia/vue',
    name: 'Vue',
    component: () => import('../views/Vue/Vue')
  },
  {
    path: '/pedia/vue/API',
    name: 'vueAPI',
    component: () => import('../views/Vue/API/API')
  },
  {
    path: '/pedia/animation',
    name: 'Animation',
    component: () => import('../views/Animation/Animation')
  },

  // official
  {
    path: '/vuejs',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
