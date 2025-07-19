/**
 * Define common margins and padding of components for web development
 */

const DEFAULT_SCALE_CONSTANT = 1.01;
const SMALL_SCREEN_SCALE_CONSTANT = 0.85;
const SMALL_DEVICE_THRESHOLD = 375;

// Get window dimensions for web
const width = window.innerWidth;
const height = window.innerHeight;

const scaleConstant = width < SMALL_DEVICE_THRESHOLD ? SMALL_SCREEN_SCALE_CONSTANT : DEFAULT_SCALE_CONSTANT;

const Layout = {
  scaleConstant,
  window: {
    width,
    height,
  },
  button: {
    padding: {
      left: 50 * scaleConstant,
      right: 50 * scaleConstant,
    },
  },
  backgroundMarginNormal: {
    left: 20 * scaleConstant,
    right: 20 * scaleConstant,
    top: 26.67 * scaleConstant,
    bottom: 26.67 * scaleConstant,
  },
  backgroundMarginNarrow: {
    left: 13.33 * scaleConstant,
    right: 13.33 * scaleConstant,
    top: 13.33 * scaleConstant,
    bottom: 13.33 * scaleConstant,
  },
  backgroundMarginLogin: {
    left: 15 * scaleConstant,
    right: 15 * scaleConstant,
    top: 17 * scaleConstant,
    bottom: 17 * scaleConstant,
  },
  extraSmallMargin: 4,
  smallMargin: 8,
  mediumMargin: 16,
  largeMargin: 24,
  xLargeMargin: 32,
  xxLargeMargin: 54,
  isSmallDevice: width < SMALL_DEVICE_THRESHOLD,
  isASmallDevice: width <= SMALL_DEVICE_THRESHOLD,
  calculateImageSize: (multiplier) => height * ((height / 1080) * multiplier), // Adjusted for web
};

export default Layout;