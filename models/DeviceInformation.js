const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortId = require('shortid');

const DeviceInformationSchema = Schema({
  deviceId: {
    type: String,
    default: shortId.generate,
    unique: true,
    index: true
  },
  isAuthoritative: {
    type: Boolean,
    default: false
  },
  isMobile: {
    type: Boolean,
    default: false
  },
  isTablet: {
    type: Boolean,
    default: false
  },
  isiPad: {
    type: Boolean,
    default: false
  },
  isiPod: {
    type: Boolean,
    default: false
  },
  isiPhone: {
    type: Boolean,
    default: false
  },
  isAndroid: {
    type: Boolean,
    default: false
  },
  isBlackberry: {
    type: Boolean,
    default: false
  },
  isOpera: {
    type: Boolean,
    default: false
  },
  isIE: {
    type: Boolean,
    default: false
  },
  isEdge: {
    type: Boolean,
    default: false
  },
  isIECompatibilityMode: {
    type: Boolean,
    default: false
  },
  isSafari: {
    type: Boolean,
    default: false
  },
  isFirefox: {
    type: Boolean,
    default: false
  },
  isWebkit: {
    type: Boolean,
    default:false
  },
  isChrome: {
    type: Boolean,
    default: false
  },
  isKonqueror: {
    type: Boolean,
    default: false
  },
  isOmniWeb: {
    type: Boolean,
    default: false
  },
  isSeaMonkey: {
    type: Boolean,
    default: false
  },
  isFlock: {
    type: Boolean,
    default: false
  },
  isAmaya: {
    type: Boolean,
    default: false
  },
  isPhantomJS: {
    type: Boolean,
    default: false
  },
  isEpiphany: {
    type: Boolean,
    default: false
  },
  isDesktop: {
    type: Boolean,
    default: false
  },
  isWindows: {
    type: Boolean,
    default: false
  },
  isLinux: {
    type: Boolean,
    default: false
  },
  isLinux64: {
    type: Boolean,
    default: false
  },
  isMac: {
    type: Boolean,
    default: false
  },
  isChromeOS: {
    type: Boolean,
    default: false
  },
  isBada: {
    type: Boolean,
    default: false
  },
  isSamsung: {
    type: Boolean,
    default: false
  },
  isRaspberry: {
    type: Boolean,
    default: false
  },
  isBot: {
    type: Boolean,
    default: false
  },
  isCurl: {
    type: Boolean,
    default: false
  },
  isAndroidTablet: {
    type: Boolean,
    default: false
  },
  isWinJs: {
    type: Boolean,
    default: false
  },
  isKindleFire: {
    type: Boolean,
    default: false
  },
  isSilk: {
    type: Boolean,
    default: false
  },
  isCaptive: {
    type: Boolean,
    default: false
  },
  isSmartTV: {
    type: Boolean,
    default: false
  },
  isUC: {
    type: Boolean,
    default: false
  },
  isFacebook: {
    type: Boolean,
    default: false
  },
  isAlamoFire: {
    type: Boolean,
    default: false
  },
  silkAccelerated: {
    type: Boolean,
    default: false
  },
  browser: {
    type: String,
    default: null
  },
  version: {
    type: String,
    default: null
  },
  os: {
    type: String,
    default: null
  },
  platform: {
    type: String,
    default: null
  },
  source: {
    type: String,
    default: null
  }
},
{
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  id: false,
  collection: 'devices' 
});
//unique virtuals based on device types :)


class DeviceInformation {

  static async createDevice(data) {
    try{

    } catch (err) {

    }
  }

  static async getDeviceData(id) {
    try{

    } catch (err) {
      
    }
  }

  static async getAlDeviceData() {
    try{

    } catch (err) {
      
    }
  }

}

DeviceInformationSchema.loadClass(DeviceInformation);

module.exports = mongoose.model('Device', DeviceInformationSchema);