import defined from './defined';
import defaultValue from './defaultValue';

// #rgb
const rgbMatcher = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i;
// #rrggbb
const rrggbbMatcher = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i;
// rgb(), rgba(), or rgb%()
const rgbParenthesesMatcher = /^rgba?\(\s*([0-9.]+%?)\s*,\s*([0-9.]+%?)\s*,\s*([0-9.]+%?)(?:\s*,\s*([0-9.]+))?\s*\)$/i;
// hsl(), hsla(), or hsl%()
const hslParenthesesMatcher = /^hsla?\(\s*([0-9.]+)\s*,\s*([0-9.]+%)\s*,\s*([0-9.]+%)(?:\s*,\s*([0-9.]+))?\s*\)$/i;

class Color {
  constructor(red, green, blue, alpha) {
    this.red = defaultValue(red, 1.0);
    this.green = defaultValue(green, 1.0);
    this.blue = defaultValue(blue, 1.0);
    this.alpha = defaultValue(alpha, 1.0);
  }

  toCssColorString() {
    const red = Color.floatToByte(this.red);
    const green = Color.floatToByte(this.green);
    const blue = Color.floatToByte(this.blue);
    if (this.alpha === 1) {
      return `#${Color.ByteTo16(red)}${Color.ByteTo16(green)}${Color.ByteTo16(blue)}`;
    }
    return `rgba(${red},${green},${blue},${this.alpha})`;
  }

  static floatToByte(number) {
    return number === 1.0 ? 255.0 : (number * 256.0) | 0;
  }

  static ByteTo16(number) {
    if (number.toString(16).length === 1) {
      return `0${number.toString(16)}`;
    }
    return number.toString(16);
  }

  static isCssColor(color) {
    if (typeof color !== 'string') {
      return false;
    }

    const namedColor = Color[color.toUpperCase()];
    if (defined(namedColor)) {
      return true;
    }

    if (
      rgbMatcher.test(color)
      || rrggbbMatcher.test(color)
      || rgbParenthesesMatcher.test(color)
      || hslParenthesesMatcher.test(color)
    ) {
      return true;
    }
    return false;
  }

  static fromCssColorString(color) {
    if (typeof color !== 'string') {
      return undefined;
    }

    let result = new Color();

    const namedColor = Color[color.toUpperCase()];
    if (defined(namedColor)) {
      Color.clone(namedColor, result);
      return result;
    }

    let matches = rgbMatcher.exec(color);
    if (matches !== null) {
      result.red = parseInt(matches[1], 16) / 15;
      result.green = parseInt(matches[2], 16) / 15.0;
      result.blue = parseInt(matches[3], 16) / 15.0;
      result.alpha = 1.0;
      return result;
    }

    matches = rrggbbMatcher.exec(color);
    if (matches !== null) {
      result.red = parseInt(matches[1], 16) / 255.0;
      result.green = parseInt(matches[2], 16) / 255.0;
      result.blue = parseInt(matches[3], 16) / 255.0;
      result.alpha = 1.0;
      return result;
    }

    matches = rgbParenthesesMatcher.exec(color);
    if (matches !== null) {
      result.red = parseFloat(matches[1]) / (matches[1].substr(-1) === '%' ? 100.0 : 255.0);
      result.green = parseFloat(matches[2]) / (matches[2].substr(-1) === '%' ? 100.0 : 255.0);
      result.blue = parseFloat(matches[3]) / (matches[3].substr(-1) === '%' ? 100.0 : 255.0);
      result.alpha = parseFloat(defaultValue(matches[4], '1.0'));
      return result;
    }

    matches = hslParenthesesMatcher.exec(color);
    if (matches !== null) {
      return Color.fromHsl(
        parseFloat(matches[1]) / 360.0,
        parseFloat(matches[2]) / 100.0,
        parseFloat(matches[3]) / 100.0,
        parseFloat(defaultValue(matches[4], '1.0')),
        result,
      );
    }

    result = undefined;
    return result;
  }

  static clone(color) {
    let result;

    if (!defined(color)) {
      return undefined;
    }
    if (!defined(result)) {
      return new Color(color.red, color.green, color.blue, color.alpha);
    }
    result.red = color.red;
    result.green = color.green;
    result.blue = color.blue;
    result.alpha = color.alpha;
    return result;
  }

  static RED = Color.fromCssColorString('#FF0000');

  static YELLOW = Color.fromCssColorString('#FFFF00');

  static BLUE = Color.fromCssColorString('#0000FF');

  static GREEN = Color.fromCssColorString('#00FF00');

  static ORANGE = Color.fromCssColorString('#FFA500');

  static WHITE = Color.fromCssColorString('#FFFFFF');

  static BLACK = Color.fromCssColorString('#000000');
}

export default Color;
