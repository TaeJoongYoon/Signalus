import { createStackNavigator } from 'react-navigation';

import SplashScreen from '../screens/SplashScreen'; // Splash
import SignInScreen from '../screens/SignInScreen'; // Sign
import ConsentScreen from '../screens/ConsentScreen'; // Consent
import ConsentHTMLScreen from '../screens/ConsentHTMLScreen'; // Consent HTML
import RegisterScreen from '../screens/RegisterScreen'; // Register
import BluetoothScreen from '../screens/BluetoothScreen'; // Bluetooth
import MainScreen from './MainTabNavigator'; // Main

import { headerTintColor, mainColor } from '../constants/color';

const RootNavigator = createStackNavigator({
  Splash: { screen: SplashScreen },
  SignIn: { screen: SignInScreen},
  Consent: { screen: ConsentScreen},
  ConsentHTML: { screen: ConsentHTMLScreen},
  Register: { screen: RegisterScreen },
  Bluetooth: { screen: BluetoothScreen },
  Main: { screen: MainScreen },
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