import { toRGBA, lighten } from '../../../utils/colors'
import { generateButtonStyles } from './utils'

export const ROOT_FONT_SIZE = 18

/* Theme inspired by: https://color.adobe.com/3-on-3-color-theme-10562048/edit/?copy=true&base=2&rule=Custom&selected=3&name=Copy%20of%203%20on%203&mode=rgb&rgbvalues=0.3176557600941157,0.6980392156862745,0.10174108611321976,0.5820319082105079,1,0.3447833030295686,0.5171910624715654,1,0.2431372549019608,0.6911307528192672,0.03137254901960784,0.6980392156862745,0.9921568627450981,0.24313725490196078,1&swatchOrder=0,1,2,3,4 */

const color1 = '#b008b2'
const color2 = '#2980b9'
const color3 = '#3498db'
// const color4 = '#bedb39'
const color5 = '#fd7400'
// const color6 = '#1F8A70'
const color7 = '#FFE11A'

// const colorTransparent = 'transparent'
const colorPurpleDark = '#650566'
const colorPurpleNormal = '#b008b2'
const colorPurpleLight = '#FC0BFF'
const colorGreenNormal = '#5CB22B'
// const colorGreenDark = '#427F1F'
const colorBlack = '#000'
const colorWhite = '#fff'
const colorLightGray = '#ccc'
const colorGray = '#9a9a9a'
const colorDarkGray = '#777'
const colorDarkerGray = '#444'


export default {
  rem: ROOT_FONT_SIZE,
  header: {
    backgroundColor: colorBlack,
    textColor: colorLightGray,
    dividerColor: lighten(color1, 0.5)
  },
  startScreen: {
    backgroundColor: colorBlack,
    textColor: colorWhite
  },
  browser: {
    tabBar: {
      backgroundColor: color2,
      tab: {
        inactive: {
          borderColor: '#999',
          backgroundColor: '#ccc'
        },
        active: {
          borderColor: '#666',
          backgroundColor: '#eee'
        }
      }
    },
    navBar: {
      borderBottomColor: '#ccc'
    }
  },
  alert: {
    error: {
      backgroundColor: color5,
      textColor: '#fff'
    },
    info: {
      backgroundColor: '#aaf',
      textColor: '#fff'
    }
  },
  log: {
    unseenAlert: {
      backgroundColor: colorGreenNormal,
      textColor: colorWhite,
      metaTextColor: lighten(colorGreenNormal, 0.4)
    },
    event: {
      backgroundColor: colorBlack,
      textColor: colorWhite,
      metaTextColor: colorLightGray,
      warnColor: color7,
      errorColor: color5,
      alertColor: colorGreenNormal
    }
  },
  modal: {
    content: {
      backgroundColor: colorBlack,
      textColor: colorWhite
    },
    overlay: {
      backgroundColor: toRGBA(colorWhite, 0.2)
    },
    alert: {
      overlay: {
        backgroundColor: toRGBA(colorBlack, 0.75)
      }
    },
    log: {
      overlay: {
        backgroundColor: toRGBA(colorWhite, 0.4)
      },
      content: {
        dividerColor: colorDarkerGray
      }
    },
    connectNode: {
      darkTextColor: colorGray
    }
  },
  form: {
    textInput: {
      blurred: {
        borderColor: 'transparent',
        backgroundColor: colorWhite,
        textColor: colorBlack,
        placeholderTextColor: colorGray
      },
      focussed: {
        borderColor: 'transparent',
        backgroundColor: colorWhite,
        textColor: colorBlack,
        placeholderTextColor: colorGray
      }
    },
    picker: {
      borderColor: color1,
      backgroundColor: colorWhite,
      hoverBackgroundColor: colorLightGray,
      textColor: color1
    },
    section: {
      layout: {
        borderColor: colorLightGray
      },
      title: {
        textColor: colorLightGray
      }
    },
    switch: {
      on: {
        trackColor: color2,
        thumbColor: colorWhite,
        label: {
          textColor: colorWhite
        }
      },
      off: {
        trackColor: colorLightGray,
        thumbColor: colorDarkGray,
        label: {
          textColor: colorGray
        }
      }
    },
    checkbox: {
      on: {
        box: {
          backgroundColor: color2,
          borderColor: color2,
          tickIcon: {
            color: colorWhite,
            opacity: 1
          }
        },
        label: {
          textColor: colorWhite
        }
      },
      off: {
        box: {
          backgroundColor: 'transparent',
          borderColor: colorGray,
          tickIcon: {
            color: colorGray,
            opacity: 0.2
          }
        },
        label: {
          textColor: colorGray
        }
      }
    }
  },
  button: {
    picker: generateButtonStyles({
      default: {
        borderColor: colorWhite,
        backgroundColor: color1,
        textColor: colorWhite
      },
      hover: {
        borderColor: colorWhite,
        backgroundColor: color1,
        textColor: colorWhite
      }
    }),
    mask: generateButtonStyles({
      default: {
        borderColor: colorPurpleDark,
        backgroundColor: toRGBA(colorPurpleDark, 0.97),
        textColor: colorWhite
      },
      hover: {
        borderColor: colorPurpleNormal,
        backgroundColor: colorPurpleNormal,
        textColor: colorWhite
      }
    }),
    browserTab: generateButtonStyles({
      default: {
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        textColor: colorGray
      },
      hover: {
        borderColor: 'transparent',
        backgroundColor: colorGray,
        textColor: colorLightGray
      }
    }),
    browserPanel: generateButtonStyles({
      default: {
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        textColor: color3
      },
      hover: {
        borderColor: 'transparent',
        backgroundColor: color3,
        textColor: color2
      }
    }),
    header: generateButtonStyles({
      default: {
        borderColor: colorBlack,
        backgroundColor: colorBlack,
        textColor: colorPurpleDark
      },
      hover: {
        borderColor: colorBlack,
        backgroundColor: colorPurpleLight,
        textColor: colorWhite
      }
    }),
    default: generateButtonStyles({
      default: {
        borderColor: colorPurpleNormal,
        backgroundColor: colorBlack,
        textColor: colorPurpleNormal
      },
      hover: {
        borderColor: colorPurpleLight,
        backgroundColor: colorPurpleLight,
        textColor: colorWhite
      }
    })
  },
  mnemonic: {
    confirmationBox: {
      backgroundColor: color7,
      textColor: color1
    },
    backgroundColor: colorDarkGray,
    textColor: colorWhite
  }
}
