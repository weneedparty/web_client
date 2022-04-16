import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import roomList from '../views/RoomListView.vue'
import chatRoom from '../views/ChatRoomView.vue'

import store from "../store";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'default',
    component: HomeView
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
    path: store.variables.routesMap.roomList,
    name: 'roomList',
    component: roomList
  },
  {
    path: store.variables.routesMap.chatRoom,
    name: 'chatRoom',
    component: chatRoom
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
