import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

import store from "../store";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'default',
    component: LoginView
  },
  {
    path: store.variables.routesMap.home,
    name: 'home',
    component: HomeView
  },
  {
    path: store.variables.routesMap.login,
    name: 'login',
    component: LoginView
  },
  {
    path: store.variables.routesMap.about,
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
