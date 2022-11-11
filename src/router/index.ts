import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import store from '@/store';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/list/' + store.getters.lists[0].title
  },
  {
    path: '/list/:id',
    component: () => import ('../views/ListPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
