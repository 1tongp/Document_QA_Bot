// @ts-nocheck
import {Colors} from './Colors';
import Layout from './Layout';
import Fonts from './Fonts';

export const defaultTabBarStyle = {
  display: 'flex',
  paddingTop: '4px',
  paddingBottom: '4px',
  paddingLeft: `${Layout.backgroundMarginNarrow.left}px`,
  paddingRight: `${Layout.backgroundMarginNarrow.right}px`,
  height: '50px',
};

const { scaleConstant } = Layout;
const { colors, nunito, headersBold, headersMedium, sizes, lineHeights, nunitoBlack, nunitoBold } = Fonts;

export const Styles = {
  heading1: {
    fontFamily: headersBold,
    fontSize: `${sizes.xxxl}px`,
    lineHeight: `${lineHeights.xxl}px`,
    color: colors.dark,
  },
  heading2: {
    fontFamily: headersBold,
    fontSize: `${sizes.xxl}px`,
    lineHeight: `${lineHeights.xl}px`,
    color: colors.dark,
  },
  heading3: {
    fontFamily: headersMedium,
    fontSize: `${sizes.lg}px`,
    lineHeight: `${lineHeights.md}px`,
    color: colors.dark,
  },
  heading4: {
    fontFamily: nunitoBlack,
    fontSize: `${sizes.md}px`,
    lineHeight: `${lineHeights.sm}px`,
    color: colors.dark,
    textTransform: 'uppercase',
  },
  heading5: {
    fontFamily: nunitoBlack,
    fontSize: `${sizes.md}px`,
    lineHeight: `${lineHeights.sm}px`,
    color: colors.dark,
  },
  blockquote: {
    fontFamily: nunito,
    fontSize: `${sizes.xl}px`,
    lineHeight: `${lineHeights.lg}px`,
    color: colors.dark,
  },
  intro: {
    fontFamily: nunitoBold,
    fontSize: `${sizes.md}px`,
    lineHeight: `${lineHeights.sm}px`,
    color: colors.dark,
  },
  body: {
    fontFamily: nunito,
    fontSize: `${sizes.sm}px`,
    lineHeight: `${lineHeights.sm}px`,
    color: colors.dark,
  },
  bodyList: {
    fontFamily: nunito,
    fontSize: `${sizes.sm}px`,
    lineHeight: `${lineHeights.sm}px`,
    color: colors.dark,
  },
  bodyStrong: {
    fontFamily: nunitoBold,
    fontSize: `${sizes.sm}px`,
    lineHeight: `${lineHeights.sm}px`,
    color: colors.dark,
  },
  bodyLink: {
    fontFamily: nunito,
    fontSize: `${sizes.sm}px`,
    lineHeight: `${lineHeights.sm}px`,
    color: colors.link,
    textDecoration: 'underline',
  },
  small: {
    fontFamily: nunito,
    fontSize: `${sizes.xs}px`,
    lineHeight: `${lineHeights.xs}px`,
    color: colors.dark,
  },
  smallStrong: {
    fontFamily: nunitoBold,
    fontSize: `${sizes.xs}px`,
    lineHeight: `${lineHeights.xs}px`,
    color: colors.dark,
  },
  smallLink: {
    fontFamily: nunito,
    fontSize: `${sizes.xs}px`,
    lineHeight: `${lineHeights.xs}px`,
    color: colors.link,
    textDecoration: 'underline',
  },
  preHeader: {
    fontFamily: headersBold,
    fontSize: `${16 * scaleConstant}px`,
    lineHeight: `${21 * scaleConstant}px`,
    letterSpacing: `${1 * scaleConstant}px`,
    color: colors.dark,
    textTransform: 'uppercase',
  },
  subheading: {
    fontFamily: nunito,
    fontSize: `${16 * scaleConstant}px`,
    lineHeight: `${27 * scaleConstant}px`,
    color: Colors.black,
  },
  paragraph: {
    fontFamily: nunito,
    fontSize: `${sizes.sm}px`,
    lineHeight: `${lineHeights.sm}px`,
    color: colors.dark,
  },
  loginHint: {
    fontFamily: nunito,
    fontSize: `${sizes.sm}px`,
    lineHeight: `${lineHeights.sm}px`,
    color: Colors.black,
  },
  link: {
    fontSize: `${sizes.sm}px`,
    lineHeight: `${lineHeights.sm}px`,
    textDecoration: 'underline',
    fontFamily: nunito,
    color: Colors.red,
  },
  linkAction: {
    fontSize: `${sizes.sm}px`,
    lineHeight: `${lineHeights.sm}px`,
    textDecoration: 'underline',
    fontFamily: nunito,
    color: Colors.red,
  },
  primaryButtonLabel: {
    fontFamily: nunito,
    fontSize: `${sizes.sm}px`,
    lineHeight: `${lineHeights.sm}px`,
    color: Colors.white,
  },
  secondaryButtonLabel: {
    fontFamily: nunito,
    fontSize: `${sizes.sm}px`,
    lineHeight: `${lineHeights.sm}px`,
    color: Colors.clay,
  },
  textInputErrorMessage: {
    fontFamily: nunito,
    fontSize: `${sizes.sm}px`,
    lineHeight: `${lineHeights.xs}px`,
    color: Colors.red,
  },
  linkCTA: {
    fontSize: `${sizes.sm}px`,
    lineHeight: `${lineHeights.sm}px`,
    textDecoration: 'none',
    fontFamily: nunito,
    color: Colors.clay,
  },
  title: {
    fontFamily: headersBold,
    fontSize: `${sizes.sm}px`,
    lineHeight: `${lineHeights.lg}px`,
    color: Colors.black,
    fontStyle: 'normal',
  },
  subTitle: {
    fontFamily: nunito,
    fontSize: `${sizes.sm}px`,
    lineHeight: `${lineHeights.lg}px`,
    color: Colors.black,
  },
  regular: {
    fontFamily: nunito,
    fontSize: `${sizes.sm}px`,
    lineHeight: `${lineHeights.md}px`,
    color: Colors.black,
  },
  regularSmall: {
    fontFamily: nunito,
    fontSize: `${sizes.xs}px`,
    lineHeight: `${lineHeights.md}px`,
    color: Colors.black,
  },
  semiBold: {
    fontFamily: nunito,
    lineHeight: `${lineHeights.md}px`,
    color: Colors.black,
  },
  light: {
    fontFamily: nunito,
    fontSize: `${sizes.xs}px`,
    lineHeight: `${lineHeights.md}px`,
    color: Colors.black,
  },
};