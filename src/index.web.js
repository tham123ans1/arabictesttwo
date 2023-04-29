
import React from 'react';
import {AppRegistry} from 'react-native-web';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import App from './App';
import appConfig from './app.json';

const MyApp = () => (
  <SafeAreaProvider>
    <App />
  </SafeAreaProvider>
);

AppRegistry.registerComponent(appConfig.name, () => MyApp);
AppRegistry.runApplication(appConfig.name, {
  rootTag: document.getElementById('root'),
});
