import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/components/LoginPage'
import SessionPage from '@/components/SessionPage'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/s/:id',
      name: 'SessionPage',
      component: SessionPage,
      props: true
    },
    {
      path: '/404',
      name: '404',
      component: NotFound
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
