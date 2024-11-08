<template>
    <div>
        <el-input v-model="input" style="width: 240px" size="small" placeholder="搜索笔记" :suffix-icon="Search" />
        <ul>
            <li v-for="note in filteredNotes" :key="note.title">{{ note.title }}</li>
        </ul>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Search } from '@element-plus/icons-vue';
import axiosInstance from '@/utils/axios'; // 导入封装好的 axios 实例
import {data} from '@/store/index.js'; // 导入数据

const input = ref('');
const notes = ref([]);

const owner = 'aizhuzhudegua'; // 替换为你的 GitHub 用户名


onMounted(async () => {
    try {
        const response = await axiosInstance.get(`/repos/${owner}/${data[0].children[0].repo}/contents/${data[0].children[0].path}`); // 替换为具体路径
        console.log(response);
        // notes.value = response.map(note => ({
        //     title: note.name,
        //     content: note.content // 需要根据你的笔记内容格式进行解析
        // }));
    } catch (error) {
        console.error('获取笔记失败:', error);
    }
});

const filteredNotes = computed(() => {
    return notes.value.filter(note =>
        note.title.includes(input.value) || note.content.includes(input.value)
    );
});
</script>
