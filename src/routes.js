import home from './components/home.vue'
import luckdraw from './components/luckdraw.vue'
import signin from './components/signin.vue'
import login from './components/login.vue'
import sign from './components/sign.vue'
import index from './components/index.vue'


export default[
    {path:"/",redirect:"/login"},
    {path:"/home",component:home,
    children: [  //这里就是二级路由的配置
        {
          path: '/luckdraw',
          component: luckdraw
        },
        {
            path: '/',
            redirect: "/luckdraw"
          },
        {
          path: '/signin',
          component: signin
        },
        {path:"/index",component:index},
      ]},
    {path:"/login",component:login},
    {path:"/sign",component:sign},
   



    // {path:"/luckdraw",component:luckdraw},
    // {path:"/signin",component:signin},
]

// router.beforeEach((to, from, next) => {
//     if (to.path === '/login') {
//       next();
//     } else {
//       let token = localStorage.getItem('Authorization');
   
//       if (token === 'null' || token === '') {
//         next('/login');
//       } else {
//         next();
//       }
//     }
// }