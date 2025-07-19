/**
 * Define color strings across the app.
 */

export const Colors = {
    // dark theme colors
    backgroundDark: '#1e1e1e',
    sidebarDark: '#2d2d2d',
    panelDark: '#2a2a2a',
    borderDark: '#3c3c3c',
    textPrimary: '#f0f0f0',
    textSecondary: '#dcdcdc',
    textTertiary: '#c0c0c0',
    activeItem: '#3a3f51',
    highlightBlue: '#3B82F6',
    inputBackground: '#121212',
    inputBorder: '#3a3a3a',
    placeholder: '#888888',


    burgundy: '#64150D',
    ice: '#D3F4EA',
    gold: '#B47D38',
    orange: '#FF8500',
    peach: '#FFCFA6',
    pink: '#FF846D',
    rose: '#ED493F',
    taupe: '#FFEDC7',
    taupeLight: '#FFF5E2',
    turquoise: '#75D3BC',
    yellow: '#FFC300',
    teal: '#165766',
    terracotta: '##CC571B',
    black: '#000000',
    white: '#FFFFFF',
    taupeLight: '#FFF5E2',
    greenLight: '#C9E8C4',
    turquoiseLight: '#DCF4EE',
    greyLight: '#E6E6E6',
    red: '#E42313',
    redActivated: '#C71607',
    redInnerShadow: '#FF6558',
    facebook: '#5165aa',
    facebookActivated: '#2f3f78',
    facebookInnerShadow: '#7680AF',
    green: '#34d332',
    limeGreen: '#26A415',
    grey: '#6E6E70',
    greyHeaderShadow: '#a7a7a7',
    lightGrey: '#696969',
    lightestGrey: '#EAEAEA',
    charcoal: '#3D3838',
    darkStone: '#6E6969',
    clay: '#A4152D',
    clayLight: '#BF5B6C',
    clayLighter: '#DBA1AB',
    clayLightest: '#EDD0D5',
    jarrah: '#5E0024',
    jarrahLight: '#8E4D66',
    jarrahLighter: '#BE99A7',
    jarrahLightest: '#DFCCD3',
    milkyWay: '#0D1D53',
    milkyWayLight: '#566187',
    milkyWayLighter: '#9EA4BA',
    milkyWayLightest: '#CFD2DD',
    stone: '#D1D1D1',
    stoneLight: '#DFDFDF',
    stoneLighter: '#EDEDED',
    stoneLightest: '#F6F6F6',
    background: '#EDEDED',
    desert: '#FF8300',
    desertLight: '#FFA84D',
    desertLighter: '#FFCD99',
    desertLightest: '#FFE6CC',
    sunshine: '#FFD040',
    sunshineLight: '#FFDE79',
    sunshineLighter: '#FFECB2',
    sunshineLightest: '#FFF6D9',
    textInputBorder: '#C2A6AB',
    errorStatusRed: '#FDE9E8',
    successStatusGreen: '#EAF6E8',
    emptyStateNavy: '#E7E9EE',
  
    dropShadow: {
      shadowColor: '#B11C10',
      shadowOpacity: 1.0,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 0,
    },
    headerShadow: {
      borderBottomWidth: 0,
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOpacity: 1.0,
    },
    generalShadow: {
      shadowColor: '#3D38381A',
      shadowOpacity: 1.0,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowRadius: 1,
    },
    inputShadow: {
      shadowColor: '#6E6969',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.18,
      shadowRadius: 5,
    },
  };
  
  
  // Equivalent for SCSS's transparentize function
  // src via: https://stackoverflow.com/a/21648508/4757903
  
  export const transparentize = (hex, alpha) => {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');
      if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = `0x${c.join('')}`;
      // eslint-disable-next-line no-bitwise
      return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')},${alpha})`;
    }
    throw new Error(`Bad Hex ${hex}`);
  };