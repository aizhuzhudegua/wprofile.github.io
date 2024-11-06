class Time {
    constructor(timerInterval = 0.5) {
        this.timerInterval = timerInterval; // 刷新的时间间隔
        this.frames = 0; // 帧数计数器
        this.accum = 0; // FPS在间隔时间内累积
        this.totalTime = 0; // 总时间
        this.fps = 0; // 当前 FPS
        this.leftTimer = this.timerInterval; // 剩余时间
        this.textData = ""; // 文本数据缓存
        this.isShow = true; // 是否显示
    }

    // 每帧调用的更新方法
    update(deltaTime) {
        this.frames++;
        this.accum += deltaTime;

        // 更新剩余时间
        this.leftTimer -= deltaTime;

        // 间隔结束，更新 FPS
        if (this.leftTimer <= 0) {
            this.fps = (this.frames / (this.accum / 1000)).toFixed(2); // 计算 FPS
            this.textData = `FPS: ${this.fps}`; // 更新文本数据

            // 重置计数器
            this.leftTimer = this.timerInterval;
            this.frames = 0;
            this.accum = 0;
        }
    }

    // 显示 FPS 信息
    display() {
        if (this.isShow) {
            return Math.floor(this.fps);
        }
    }

    // 切换显示状态
    toggleShow() {
        this.isShow = !this.isShow;
    }
}
export default Time;
