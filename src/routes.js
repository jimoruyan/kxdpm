import home from './components/home.vue'
import luckdraw from './components/luckdraw.vue'
import signin from './components/signin.vue'


export default[
    {path:"/home",component:home},
    {path:"/luckdraw",component:luckdraw},
    {path:"/",component:signin},

]