import { createStackNavigator } from 'react-navigation';

import SplashScreen from '../screens/SplashScreen'; // Splash
import SignInScreen from '../screens/SignInScreen'; // Sign
import ConsentScreen from '../screens/ConsentScreen';
import RegisterScreen from '../screens/RegisterScreen';
import BluetoothScreen from '../screens/BluetoothScreen'; // Bluetooth
import MainScreen from './MainTabNavigator';
// Main-Vital
import CalendarScreen from '../screens/CalendarScreen';
import HistoryScreen from '../screens/HistoryScreen';
// Main-Symptom
import SymptomLogScreen from '../screens/SymptomLogScreen';
import SymptomDetailScreen from '../screens/SymptomDetailScreen';
// Main-Profile


import { headerTintColor, mainColor } from '../constants/color';

const RootNavigator = createStackNavigator({
  Splash: { screen: SplashScreen },
  SignIn: { screen: SignInScreen},
  Consent: { screen: ConsentScreen},
  Register: { screen: RegisterScreen },
  Bluetooth: { screen: BluetoothScreen },
  Main: { screen: MainScreen },
  History: { screen: HistoryScreen },
},{
  initialRouteName: 'Splash',
  headerMode: 'screen',
  navigationOptions: {
    title: 'Signalus',
    headerStyle: {
      backgroundColor: mainColor,
      borderBottomWidth: 0,
    },
    headerTintColor: headerTintColor,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});

export default RootNavigator;