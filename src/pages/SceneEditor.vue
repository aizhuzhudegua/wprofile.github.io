<template>
    <el-container>

        <el-main>
            <el-row>
                <el-col :span="4" class="hierarchy">
                    <el-card shadow="hover">
                        <template #header>
                            <div class="hierarchyHeader">
                                <el-text class="mx-1" size="large">Hierarchy</el-text>
                                <div>
                                    <el-button plain @click="dialogVisible = true">
                                        <el-icon>
                                            <Plus />
                                        </el-icon>
                                    </el-button>
                                    <el-button type="danger" @click="dialogVisible = true">
                                        <el-icon>
                                            <Minus />
                                        </el-icon>
                                    </el-button>
                                </div>

                                <el-dialog v-model="dialogVisible" title="添加物体" width="500" draggable>
                                    <el-tabs v-model="activeName" class="demo-tabs">
                                        <el-tab-pane label="3D物体" name="first">
                                            <el-form :model="form" label-width="auto"
                                                style="display: flex;justify-content: center;">
                                                <div>
                                                    <el-form-item label="选择物体类型">
                                                        <el-cascader :options="options" />
                                                    </el-form-item>
                                                    <el-form-item label="纹理">
                                                        <el-upload v-model:file-list="imgList" :auto-upload="false"
                                                            action="#" list-type="picture-card"
                                                            :on-preview="handlePictureCardPreview"
                                                            :on-remove="handleRemove">
                                                            <el-icon>
                                                                <Plus />
                                                            </el-icon>
                                                        </el-upload>

                                                        <el-dialog v-model="dialogVisibleIMG">
                                                            <img w-full :src="dialogImageUrl" alt="Preview Image" />
                                                        </el-dialog>
                                                    </el-form-item>
                                                </div>
                                            </el-form>

                                        </el-tab-pane>
                                        <el-tab-pane label="外部模型" name="second">外部模型</el-tab-pane>
                                    </el-tabs>

                                    <!-- {{ objType }} -->
                                    <template #footer>
                                        <div class="dialog-footer">
                                            <el-button @click="dialogVisible = false">Cancel</el-button>
                                            <el-button type="primary" @click="dialogVisible = false">
                                                Confirm
                                            </el-button>
                                        </div>
                                    </template>
                                </el-dialog>
                            </div>
                        </template>
                        <el-tree style="max-width: 600px" :data="hierarchy" show-checkbox
                            :render-content="renderContent" @node-click="handleNodeClick" />
                    </el-card>

                </el-col>
                <el-col :span="16">
                    <div class="container" ref="container">
                        <el-card>
                            <template #header>
                                <div class="ui-top">
                                    <div class="left">
                                        <el-space direction="horizontal" alignment="start" :size="30">
                                            <el-switch v-model="isToggleAxes" size="small" active-text="显示坐标轴" />
                                            <el-switch v-model="isToggleGrid" size="small" active-text="显示网格" />
                                            <el-switch v-model="isFPS" size="small" active-text="FPS" />
                                            <el-color-picker v-model="color" show-alpha size="small" />
                                        </el-space>
                                    </div>
                                    <div class="right">
                                        <el-button type="primary" @click="Save">save</el-button>
                                    </div>
                                </div>
                            </template>

                            <div class="visualWrap">
                                <div class="fpsPanel" v-if="isFPS" :style="{ color: color }">
                                    <el-tooltip class="box-item" effect="light" content="每秒帧数，60以上流畅" placement="left">
                                        FPS:{{ fps }}
                                    </el-tooltip>
                                </div>

                                <Visual3D :width="1024" :height="720" ref="visual" />
                            </div>

                            <el-upload class="upload" drag :limit="1" :auto-upload="false" :on-change="onFileChange">
                                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                                <div class="el-upload__text">
                                    Drop scene file here or <em>click to upload</em>
                                </div>
                            </el-upload>
                        </el-card>
                    </div>
                </el-col>
                <el-col :span="4" class="inspector">
                    <el-card shadow="hover">
                        <template #header>
                            <el-text class="mx-1" size="large">Inspector</el-text>
                        </template>

                    </el-card>
                </el-col>
            </el-row>
        </el-main>
    </el-container>

</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import Visual3D from '../components/Visual3D.vue'; // 确保导入子组件
import { useStore } from 'vuex';
import { Minus } from '@element-plus/icons-vue'
import { ElButton, ElIcon } from 'element-plus'; // 导入组件
import Type3D from '../utils/type';
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'

const dialogImageUrl = ref('')
const dialogVisibleIMG = ref(false)
const disabled = ref(false)
const imgList = ref([]);



const handleRemove = (file) => {
    console.log(imgList.value);
    // fileList.value = fileList.value.filter(item => item.uid !== file.uid);
}

const handlePictureCardPreview = (file) => {
    dialogImageUrl.value = file.url;
    dialogVisibleIMG.value = true;
}


const color = ref('rgba(255, 255, 255, 0.8)');
const activeName = ref('first');
const objType = ref(
    Type3D.getAllTypes()
);
const options = [
    {
        value: 'guide',
        label: 'Guide',
        disabled: true,
        children: [
            {
                value: 'disciplines',
                label: 'Disciplines',
                children: [
                    {
                        value: 'consistency',
                        label: 'Consistency',
                    },
                    {
                        value: 'feedback',
                        label: 'Feedback',
                    },
                    {
                        value: 'efficiency',
                        label: 'Efficiency',
                    },
                    {
                        value: 'controllability',
                        label: 'Controllability',
                    },
                ],
            },
            {
                value: 'navigation',
                label: 'Navigation',
                children: [
                    {
                        value: 'side nav',
                        label: 'Side Navigation',
                    },
                    {
                        value: 'top nav',
                        label: 'Top Navigation',
                    },
                ],
            },
        ],
    },
    {
        value: 'component',
        label: 'Component',
        children: [
            {
                value: 'basic',
                label: 'Basic',
                children: [
                    {
                        value: 'layout',
                        label: 'Layout',
                    },
                    {
                        value: 'color',
                        label: 'Color',
                    },
                    {
                        value: 'typography',
                        label: 'Typography',
                    },
                    {
                        value: 'icon',
                        label: 'Icon',
                    },
                    {
                        value: 'button',
                        label: 'Button',
                    },
                ],
            },
            {
                value: 'form',
                label: 'Form',
                children: [
                    {
                        value: 'radio',
                        label: 'Radio',
                    },
                    {
                        value: 'checkbox',
                        label: 'Checkbox',
                    },
                    {
                        value: 'input',
                        label: 'Input',
                    },
                    {
                        value: 'input-number',
                        label: 'InputNumber',
                    },
                    {
                        value: 'select',
                        label: 'Select',
                    },
                    {
                        value: 'cascader',
                        label: 'Cascader',
                    },
                    {
                        value: 'switch',
                        label: 'Switch',
                    },
                    {
                        value: 'slider',
                        label: 'Slider',
                    },
                    {
                        value: 'time-picker',
                        label: 'TimePicker',
                    },
                    {
                        value: 'date-picker',
                        label: 'DatePicker',
                    },
                    {
                        value: 'datetime-picker',
                        label: 'DateTimePicker',
                    },
                    {
                        value: 'upload',
                        label: 'Upload',
                    },
                    {
                        value: 'rate',
                        label: 'Rate',
                    },
                    {
                        value: 'form',
                        label: 'Form',
                    },
                ],
            },
            {
                value: 'data',
                label: 'Data',
                children: [
                    {
                        value: 'table',
                        label: 'Table',
                    },
                    {
                        value: 'tag',
                        label: 'Tag',
                    },
                    {
                        value: 'progress',
                        label: 'Progress',
                    },
                    {
                        value: 'tree',
                        label: 'Tree',
                    },
                    {
                        value: 'pagination',
                        label: 'Pagination',
                    },
                    {
                        value: 'badge',
                        label: 'Badge',
                    },
                ],
            },
            {
                value: 'notice',
                label: 'Notice',
                children: [
                    {
                        value: 'alert',
                        label: 'Alert',
                    },
                    {
                        value: 'loading',
                        label: 'Loading',
                    },
                    {
                        value: 'message',
                        label: 'Message',
                    },
                    {
                        value: 'message-box',
                        label: 'MessageBox',
                    },
                    {
                        value: 'notification',
                        label: 'Notification',
                    },
                ],
            },
            {
                value: 'navigation',
                label: 'Navigation',
                children: [
                    {
                        value: 'menu',
                        label: 'Menu',
                    },
                    {
                        value: 'tabs',
                        label: 'Tabs',
                    },
                    {
                        value: 'breadcrumb',
                        label: 'Breadcrumb',
                    },
                    {
                        value: 'dropdown',
                        label: 'Dropdown',
                    },
                    {
                        value: 'steps',
                        label: 'Steps',
                    },
                ],
            },
            {
                value: 'others',
                label: 'Others',
                children: [
                    {
                        value: 'dialog',
                        label: 'Dialog',
                    },
                    {
                        value: 'tooltip',
                        label: 'Tooltip',
                    },
                    {
                        value: 'popover',
                        label: 'Popover',
                    },
                    {
                        value: 'card',
                        label: 'Card',
                    },
                    {
                        value: 'carousel',
                        label: 'Carousel',
                    },
                    {
                        value: 'collapse',
                        label: 'Collapse',
                    },
                ],
            },
        ],
    },
    {
        value: 'resource',
        label: 'Resource',
        children: [
            {
                value: 'axure',
                label: 'Axure Components',
            },
            {
                value: 'sketch',
                label: 'Sketch Templates',
            },
            {
                value: 'docs',
                label: 'Design Documentation',
            },
        ],
    },
]
const createTreeNode = (label, children = []) => ({
    label,
    children,
});
const dialogVisible = ref(false);
const isFPS = ref(true);

const renderContent = (h, { node, data, store }) => {
    return h(
        'span',
        {
            class: 'custom-tree-node',
        },
        h('span', null, node.label),
        // h(ElButton, {
        //     plain: true,
        //     circle:true,
        //     onClick: () => { dialogVisible.value = true; }, // 调用响应式状态更新
        // }, h(ElIcon,null,h(Minus)))
        // h(
        //     'span', // 包裹 el-button 的 span
        //     h(
        //         'el-button',
        //         {
        //             plain: true,
        //             onClick: () => { dialogVisible.value = true; }, // 调用响应式状态更新
        //         },
        //         h(
        //             'el-icon',
        //             {
        //                 style: { fontSize: '16px' } // 设置自定义的字体大小
        //             },
        //             {
        //                 // 使用 render 函数方式渲染 Plus 图标
        //                 default: () => h(Plus)
        //             }
        //         )
        //     )
        // )
    );
};


const hierarchy = ref([]);
hierarchy.value.push(createTreeNode("box", null))

const handleNodeClick = (data) => {
    console.log(data);
}
const container = ref(null);
const visual = ref(null);
const store = useStore();
const isToggleAxes = computed({
    get: () => store.state.visual3D.isToggleAxes,
    set: (value) => {
        store.dispatch('visual3D/toggleAxesAction', value); // 调用 Vuex action 设置新值
    }
});
const isToggleGrid = computed({
    get: () => store.state.visual3D.isToggleGrid,
    set: (value) => {
        store.dispatch('visual3D/toggleGridAction', value); // 调用 Vuex action 设置新值
    }
});
const fps = computed({
    get: () => store.state.visual3D.fps,
    set: (value) => {
        store.dispatch('visual3D/setFpsVal', value); // 调用 Vuex action 设置新值
    }
});

// 加载场景
const onFileChange = (f) => {
    const file = f.raw;
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const jsonString = e.target.result;
            visual.value.loadSceneFromJson(jsonString); // 调用加载方法
        };
        reader.readAsText(file); // 读取文件为文本
    }
};

const Save = () => {
    // 保存逻辑
    visual.value.save();
};

const resize = (padding) => {
    visual.value.resize(container.value.clientWidth - padding, window.innerHeight / window.innerWidth * (container.value.clientWidth - padding));
}

const padding = 40;

onMounted(() => {
    resize(padding);
    window.addEventListener("resize", () => {
        resize(padding);
    })
})




</script>
<style scoped>
.el-row {
    margin-bottom: 20px;
}

.container {
    margin: 0 auto;
}

.ui-top {
    display: flex;
    justify-content: space-between;
}

.hierarchy {
    padding: 0 20px 20px 0;
    box-sizing: border-box;
}

.inspector {
    padding: 0 0px 20px 20px;
    box-sizing: border-box;
}



.inner-shadow-box {
    background-color: white;
    box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.5),
        inset -5px -5px 10px rgba(0, 0, 0, 0.5);
    border: 1px solid #ccc;
    border-radius: 5px;

}

.hierarchyHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.fpsPanel {
    position: absolute;
    z-index: 999;
    color: #ffffff;
    left: 5px;
    top: 5px;
}

.visualWrap {
    position: relative;
}
</style>