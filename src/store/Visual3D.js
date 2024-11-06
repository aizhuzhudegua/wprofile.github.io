// src/store/visualization.js
const visual3DModule = {
    namespaced: true,  
    state: () => ({
        isToggleAxes: true,
        isToggleGrid: true,
        fps:0
    }),
    mutations: {
        setAxesState(state, value) {
            state.isToggleAxes = value; 
        },
        setGridState(state, value) {
            state.isToggleGrid = value; 
        },
        setFpsVal(state, value){
            state.fps = value; 
        }
    },
    actions: {
        toggleAxesAction({ commit }, value) {
            commit('setAxesState', value); // 触发设置具体值的 mutation
        },
        toggleGridAction({ commit }, value) {
            commit('setGridState', value); // 触发设置具体值的 mutation
        },
        setFpsVal({ commit }, value) {
            commit('setFpsVal', value); // 触发设置具体值的 mutation
        },
    },
};

export default visual3DModule;
