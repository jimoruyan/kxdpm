import home from './components/home.vue'
import luckdraw from './components/luckdraw.vue'
import signin from './components/signin.vue'
import login from './components/login.vue'
import sign from './components/sign.vue'
import index from './components/index.vue'



export default[
    {path:"/",redirect:"/home"},
    {path:"/home",component:home,
    children: [  //二级路由的配置
        {
          path: '/luckdraw',
          component: luckdraw
        },
        {
            path: '/',
            redirect: "/index"
          },
        {
          path: '/signin',
          component: signin
        },
        {path:"/index",component:index},
      ]},
    {path:"/login",component:login},
    {path:"/sign",component:sign},
]

