
import { createApp } from 'vue'
import App from './App.vue'
import ElementUI from "element-plus";
import 'element-plus/dist/index.css'
import axios from './components/plugins/axiosInstance.js'
const app = createApp(App)
app.use(ElementUI)
app.mount('#app')
app.config.globalProperties.$axios=axios;  //配置axios的全局引用