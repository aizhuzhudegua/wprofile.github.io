<template>

  <!-- <HelloWorld msg="Vite + Vue" /> -->
  <el-header>
    <div class="container">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
        <el-breadcrumb-item>promotion management</el-breadcrumb-item>
        <el-breadcrumb-item>promotion list</el-breadcrumb-item>
        <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </el-header>
  <SceneEditor />

</template>
<script setup>
import SceneEditor from './pages/SceneEditor.vue';

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
</style>
