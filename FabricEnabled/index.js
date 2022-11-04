/**
 * @format
 */

import {AppRegistry} from 'react-native';
// Scenario 1
// import App from './scenarios/thousand-views/App';
// Scenario 2
// import App from './scenarios/thousand-views/App';
// Scenario 3
// import App from './scenarios/tweets/App';
// Scenario 4
// import App from './scenarios/svg/App';
// Scenario 5
import App from './scenarios/concurrent/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
