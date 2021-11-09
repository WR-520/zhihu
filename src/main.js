import { createApp } from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router/index'
import Vant from 'vant'
import './assets/reset.min.css'
import 'vant/lib/index.css'
import 'amfe-flexible'
// 处理最大宽度
import {handleMaxWidth} from './assets/utils'
handleMaxWidth()
window.addEventListener('resize',handleMaxWidth)
// 导入API
const app = createApp(App)
app.use(Vant)
app.use(store)
app.use(router)
app.mount('#app')
