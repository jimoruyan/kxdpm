import home from './components/home.vue'
import luckdraw from './components/luckdraw.vue'
import signin from './components/signin.vue'
import login from './components/login.vue'


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
        }
      ]},
    {path:"/login",component:login},

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