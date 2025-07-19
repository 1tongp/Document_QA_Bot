/**
 * Define all fonts and sizes used in the app
 */
import {Colors} from './Colors';
import Layout from './Layout';

const { scaleConstant } = Layout;

export default {
  nunito: 'Nunito Sans Regular',
  nunitoBold: 'Nunito Sans Bold',
  nunitoBlack: 'Nunito Sans Black',
  headersBold: 'Obviously Narrow Bold',
  headersMedium: 'Obviously Narrow Medium',
  sizes: {
    xxs: 12 * scaleConstant,
    xs: 14 * scaleConstant,
    sm: 16 * scaleConstant,
    md: 18 * scaleConstant,
    lg: 22 * scaleConstant,
    xl: 24 * scaleConstant,
    xxl: 28 * scaleConstant,
    xxxl: 36 * scaleConstant,
  },
  colors: {
    dark: Colors.black,
    light: Colors.white,
    teal: Colors.teal,
    link: Colors.burgundy,
  },
  fontWeights: {
    black: '900',
    bold: '700',
    medium: '600',
    regular: '400',
  },
  lineHeights: {
    xs: 19 * scaleConstant,
    sm: 24 * scaleConstant,
    md: 27.5 * scaleConstant,
    lg: 32 * scaleConstant,
    xl: 35 * scaleConstant,
    xxl: 45 * scaleConstant,
  },
};
