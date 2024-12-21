import { createApp } from 'vue'
import WorkspaceApp from './WorkspaceApp.vue'
import router from './router'
import './css/styles.css'

// 创建Vue应用
const app = createApp(WorkspaceApp)

// 使用路由
app.use(router)

// 挂载应用
app.mount('#workspace-app') 