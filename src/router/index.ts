import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../views/Landing.vue'
import Module1 from '../views/Module1.vue'
import Module2 from '../views/Module2.vue'
import Module3 from '../views/Module3.vue'
import Module4 from '../views/Module4.vue'
import Module5 from '../views/Module5.vue'
import Module6 from '../views/Module6.vue'
import Test from '../views/Test.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Landing
    },
    {
      path: '/module/1',
      name: 'Module1',
      component: Module1
    },
    {
      path: '/module/2',
      name: 'Module2',
      component: Module2
    },
    {
      path: '/module/3',
      name: 'Module3',
      component: Module3
    },
    {
      path: '/module/4',
      name: 'Module4',
      component: Module4
    },
    {
      path: '/module/5',
      name: 'Module5',
      component: Module5
    },
    {
      path: '/module/6',
      name: 'Module6',
      component: Module6
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
  ]
})

export default router
