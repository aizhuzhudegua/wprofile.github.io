import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue'; // 主页组件
import Notes from '../pages/Notes.vue'; // 个人笔记组件
import SceneEditor from '../pages/SceneEditor.vue'; // 场景编辑器组件
import Profile from '../pages/Profile.vue'; // 个人简历组件

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/notes',
    name: 'Notes',
    component: Notes,
  },
  {
    path: '/scene-editor',
    name: 'SceneEditor',
    component: SceneEditor,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
