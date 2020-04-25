//管理所有的组件，万物皆组件，配置路由
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ChatRoom from '@/components/ChatRoom'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/Home'
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/ChatRoom',
      name: 'ChatRoom',
      component: ChatRoom
    }
  ]
})
