// src/store/store.js
import { createStore } from 'vuex';
import visual3DModule from './Visual3D'; // 引入模块

const store = createStore({
    modules: {
        visual3D: visual3DModule, // 注册模块
    },
});

export default store;
