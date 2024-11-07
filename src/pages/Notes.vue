<template>
    <div>
        <el-input v-model="input" style="width: 240px" size="small" placeholder="搜索笔记" :suffix-icon="Search" />
    </div>
</template>
<script  setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
const input = ref('');
</script>