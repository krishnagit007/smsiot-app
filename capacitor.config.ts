import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.smsiot.app',
  appName: 'sms',
  webDir: 'www',
  android: {
    backgroundColor: '#FFFFFF', // set background color
    allowMixedContent: true,
    webContentsDebuggingEnabled: true
  },
  server: {
    cleartext: true
  },
  plugins: {
    StatusBar: {
      style: 'dark',
      backgroundColor: '#3880ff',
      overlaysWebView: false
    },
    App: {
      disableBackButtonHandler: false
    },
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#ffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
      useDialog: false
    }
  }
};

export default config;
