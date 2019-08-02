class AnimateStack {
  status = 0; // 0等待开始，1正在进行中，2暂停，3完成

  finishStack = [];

  waitStack = [];

  doing = undefined;

  constructor() {}

  push() {}

  /**
   * 开始动画队列
   */
  async start() {
    const ani = AnimateStack.waitStack.shift();
    if (ani) {
      this.doing = ani;
      await ani.start();
      this.start();
    }
  }

  /**
   * 暂停动画队列
   */
  pause() {}

  pauseCallback() {}

  /**
   * 停止所有动画,清空等待堆栈动画
   */
  stop() {}

  stopCallback() {}

  finishCallback() {}
}

export default AnimateStack;
