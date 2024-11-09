<template>
    <el-carousel :interval="20000" type="card" height="400px">
        <el-carousel-item v-for="(item, index) in images" :key="index">
            <img :src="item" alt="Carousel Image" style="width: 100%; height: auto;">
        </el-carousel-item>
    </el-carousel>
    <div class="container">
        <div class="container-wrap">

            <div class="filter">
                <el-breadcrumb :separator-icon="ArrowRight">
                    <el-breadcrumb-item :to="{ path: '/' }">home</el-breadcrumb-item>
                    <el-breadcrumb-item>promotion management</el-breadcrumb-item>
                    <el-breadcrumb-item>promotion list</el-breadcrumb-item>
                    <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
                </el-breadcrumb>
                <el-space wrap :size="10">
                    <span>Filter:</span>
                    <el-input v-model="input" style="width: 240px" size="small" placeholder="搜索笔记"
                        :suffix-icon="Search" />
                </el-space>
            </div>
            <el-scrollbar max-height="500px">
                <div style="padding: 5px;">
                    <el-space fill wrap :fill-ratio="20" :direction="horizontal" style="width: 100%">

                        <el-card shadow="hover" v-for="item in data" class="box-card">
                            <template #header>{{ item.name }}</template>
                            <div class="card-content">
                                <div>
                                    <img
                                        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" />

                                    <div v-if="item.additonal == null">
                                        {{ item.mark }}
                                    </div>
                                        
                                </div>

                                <div style="word-wrap: break-word;height: 100%;max-width: 300px;margin-left: 20px;" v-if="item.additonal != null">
                                    {{ item.additonal }}
                                </div>
                            </div>

                        </el-card>

                    </el-space>
                </div>

            </el-scrollbar>


        </div>

    </div>
</template>

<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { ref, computed, onMounted } from 'vue';
import { Search } from '@element-plus/icons-vue';
import axiosInstance from '@/utils/axios'; // 导入封装好的 axios 实例
import { data } from '@/store/index.js'; // 导入数据
const images = [
    '/carousel/1.jpg',
    '/carousel/2.jpg',
    '/carousel/3.jpg',
    '/carousel/4.jpg',
    '/carousel/5.jpg',
    '/carousel/6.jpg',
    '/carousel/7.png',
];
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
<style scoped>
.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}

.container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

.container-wrap {
    width: 50%;
    text-align: left;
}

.el-card {
    cursor: pointer;
}

.filter {

    margin-top: 30px;
    margin-bottom: 30px;
}

.filter>.el-breadcrumb {
    margin-bottom: 30px;
}

.content {
    display: flex;
    justify-content: space-between;
}

.card-content {
    display: flex;
}
</style>