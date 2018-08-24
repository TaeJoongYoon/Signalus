import { createBottomTabNavigator } from 'react-navigation';

import VitalScreen from '../screens/VitalScreen'; // Main-Vital
import SymptomScreen from '../screens/SymptomScreen'; // Main-Symptom
import ProfileScreen from '../screens/ProfileScreen'; // Main-Profile

import { activeTintColor, inactiveTintColor, backgroundColor } from '../constants/color';

const MainScreen = createBottomTabNavigator({
  Vital: { screen: VitalScreen },
  Symptom: { screen: SymptomScreen },
  Profile: { screen: ProfileScreen },
},{
  initialRouteName: 'Vital',
  tabBarOptions:{
    activeTintColor: activeTintColor,
    inactiveTintColor: inactiveTintColor,
    //showLabel: false,
    style: {
      backgroundColor: backgroundColor,
    },
  },
});

export default MainScreen;