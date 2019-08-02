import Color from './core/Color';

class Animate {
  status = 0; // 0等待开始，1正在进行中，2暂停，3完成

  constructor(args) {
    this.option = args;

    if (args.onUpdate) {
      this.onStart = args.onUpdate;
    }
    if (args.onUpdate) {
      this.onUpdate = args.onUpdate;
    }
  }

  start() {
    const self = this;
    let start = null;
    const time = this.option.dur * 1000 || 1000; // 动效的总共运动时长

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      let percent = progress / time;
      if (percent > 1) {
        percent = 1;
      }

      const result = Animate.getCurrValue(self.option.from, self.option.to, percent);

      self.onUpdate(result);

      if (progress < time) {
        window.requestAnimationFrame(step);
      }
    }
    window.requestAnimationFrame(step);
  }

  /**
   * 获取整体的计算数据
   * @param  {Array} fromArr [description]
   * @param  {Array} toArr   [description]
   * @param  {String} percent [description]
   * @return {Array}         [description]
   */
  static getCurrValue(fromArr, toArr, percent) {
    const maxLen = Math.max(fromArr.length, toArr.length);
    const newArr = Array(maxLen).fill(0);
    return newArr.map((v, i) => {
      if (this.getType(fromArr[i]) === this.getType(toArr[i])) {
        return this.calculateValue(fromArr[i], toArr[i], percent);
      }
      return undefined;
    });
  }

  /**
   * 计算中间值
   * @param  {Number || string} a       [description]
   * @param  {Number || string} b       [description]
   * @param  {[type]} percent [description]
   * @return {[type]}         [description]
   */
  static calculateValue(a, b, percent) {
    if (a === b) {
      return a;
    }

    if (this.getType(a) === 'color') {
      return this.calculateColorValue(a, b, percent);
    }
    return this.calculateNumberValue(Number(a), Number(b), percent);
  }

  /**
   * 根据比例计算中间值
   * @param  {Number} a       [description]
   * @param  {Number} b       [description]
   * @param  {Number} percent [description]
   * @return {Number}         [description]
   */
  static calculateNumberValue(a, b, percent) {
    return a + (b - a) * percent;
  }

  /**
   * 根据比例计算颜色中间值
   * @param  {String} a       [description]
   * @param  {String} b       [description]
   * @param  {Number} percent [description]
   * @return {String}         [description]
   */
  static calculateColorValue(a, b, percent) {
    const {
      red: red1, green: green1, blue: blue1, alpha: alpha1,
    } = Color.fromCssColorString(a);
    const {
      red: red2, green: green2, blue: blue2, alpha: alpha2,
    } = Color.fromCssColorString(b);
    const color = new Color(
      this.calculateNumberValue(red1, red2, percent),
      this.calculateNumberValue(green1, green2, percent),
      this.calculateNumberValue(blue1, blue2, percent),
      this.calculateNumberValue(alpha1, alpha2, percent),
    );
    return color.toCssColorString();
  }

  /**
   * 获取类型
   * @param  {[type]} str [description]
   * @return {[type]}     [description]
   */
  static getType(str) {
    if (Color.isCssColor(str)) {
      return 'color';
    }
    if (Number(str).toString() !== 'NaN') {
      return 'number';
    }
    return NaN;
  }
}

export default Animate;
