// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//项目中的主入口，无需操作
import Vue from 'vue'         //在页面中引入vue.js
import App from './App'       //引入自定义组件
import router from './router' //引入路由
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://127.0.0.1:5000',
  vuex: {
    // store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
  options: { path: "/socket.io/" } //Optional options
}))

/* eslint-disable no-new */
//不修改
new Vue({   //全局实例
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
