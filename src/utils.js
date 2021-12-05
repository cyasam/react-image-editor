export const filterOptions = [
  {
    name: 'brightness',
    label: 'Brightness',
    min: -100,
    max: 100,
    value: 0,
    calculate(value) {
      return (value += 100) / this.max;
    },
  },
  {
    name: 'contrast',
    label: 'Contrast',
    min: -100,
    max: 100,
    value: 0,
    calculate(value) {
      return (value += 100) / this.max;
    },
  },
  {
    name: 'saturate',
    label: 'Saturation',
    min: 0,
    max: 100,
    value: 0,
    calculate(value) {
      return (value += 100) / this.max;
    },
  },
  {
    name: 'hueRotate',
    label: 'Hue',
    min: 0,
    max: 100,
    value: 0,
    calculate(value) {
      const degrees = (360 * value) / this.max;
      const pi = Math.PI;
      return degrees * (pi / 180);
    },
  },
  {
    name: 'blur',
    label: 'Blur',
    min: 0,
    max: 20,
    value: 0,
  },
  {
    name: 'sepia',
    label: 'Sepia',
    min: 0,
    max: 100,
    value: 0,
  },
  {
    name: 'grayscale',
    label: 'Grayscale',
    min: 0,
    max: 100,
    value: 0,
  },
];
