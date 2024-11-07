import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from './store/store'; // 确保正确导入

// 引入 Element Plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'; // 引入样式
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import router from './router';

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
// 使用 Element Plus
app.use(router);
app.use(ElementPlus);
app.use(store); // 使用 Vuex Store
app.mount('#app');
