<template>

  <!-- <HelloWorld msg="Vite + Vue" /> -->
  <el-header>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
      @select="handleSelect">
      <el-menu-item index="0">
        <router-link :to="{ path: '/' }"  index="1"><img style="width: 100px" src="/logo.png" alt="logo" /></router-link>
      </el-menu-item>
      <div class="flex-grow" />
      <el-menu-item><router-link :to="{ path: '/' }"  index="1">主页</router-link></el-menu-item>
      <el-menu-item><router-link :to="{ path: '/notes' }"  index="2">个人笔记</router-link></el-menu-item>
      <el-menu-item><router-link :to="{ path: '/scene-editor' }"  index="3">场景编辑器</router-link></el-menu-item>
      <el-menu-item><router-link :to="{ path: '/profile' }"  index="4">个人简历</router-link></el-menu-item>
    </el-menu>
  </el-header>

  <!-- 添加路由视图 -->
  <router-view />

</template>
<script setup>
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>
<style scoped>
.container {
  margin: 0 auto;
}

.el-header .container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
}

.el-header {
  padding-left: 0;
  padding-right: 0;

}

.flex-grow {
  flex-grow: 1;
}
</style>
