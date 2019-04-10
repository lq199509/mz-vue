import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    { path: '/cinemas', component: () => import('./views/Cinema.vue') },
    { path: '/center', component: () => import('./views/Center.vue') },
    { path: '/films', component: () => import('./views/Film.vue') }
  ]
})
