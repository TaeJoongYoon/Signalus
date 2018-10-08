import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Image } from 'react-native';

import VitalScreen from '../screens/VitalScreen'; // Main-Vital
import CalendarScreen from '../screens/CalendarScreen'; // Vital-Calendar
import SymptomScreen from '../screens/SymptomScreen'; // Main-Symptom
import SymptomLogScreen from '../screens/SymptomLogScreen'; // Symptom-Log
import SymptomDetailScreen from '../screens/SymptomDetailScreen'; //Symptom-Detail
import ProfileScreen from '../screens/ProfileScreen'; // Main-Profile

import { activeTintColor, inactiveTintColor, backgroundColor, mainColor, headerTintColor } from '../constants/color';

const VitalStack = createStackNavigator({
  Vital: VitalScreen,
  Calendar: CalendarScreen
},{
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

const SymptomStack = createStackNavigator({
  Symptom: SymptomScreen,
  SymptomLog: SymptomLogScreen,
  SymptomDetail: SymptomDetailScreen,
},{
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

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
},{
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

const MainScreen = createBottomTabNavigator({
  Vital: {
    screen: VitalStack,
    navigationOptions:{
      tabBarIcon: ({ focused }) => {
      let src = focused ? require('../../assets/vitalON.png') : require('../../assets/vitalOFF.png')
      return <Image
              style={{ width: 20, height: 20 }}
              source={src}
            />;
      },
    }
  },
  Symptom: {
    screen: SymptomStack,
    navigationOptions:{
      tabBarIcon: ({ focused }) => {
        let src = focused ? require('../../assets/symptomON.png') : require('../../assets/symptomOFF.png')
        return <Image
                style={{width: 20, height: 24}}
                source={src}
              />;
      },
    }
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions:{
      tabBarIcon: ({ focused }) => {
        let src = focused ? require('../../assets/profileON.png') : require('../../assets/profileOFF.png')
        return <Image
                style={{width: 20, height: 24}}
                source={src}
              />;
      },
    }
  },
},{
  initialRouteName: 'Vital',
  tabBarOptions:{
    activeTintColor: activeTintColor,
    inactiveTintColor: inactiveTintColor,
    showLabel: false,
    style: {
      backgroundColor: backgroundColor,
    },
  },
});

MainScreen.navigationOptions  = {
  header: null,
};


export default MainScreen;