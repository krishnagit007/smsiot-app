import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.smsiot.app',
  appName: 'sms',
  webDir: 'www',
  plugins: {
    StatusBar: {
      style: 'dark',
      backgroundColor: '#3880ff',
      overlaysWebView: false
    },
    App: {
      disableBackButtonHandler: false
    }
  }
};

export default config;
