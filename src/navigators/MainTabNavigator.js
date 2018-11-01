import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Image } from 'react-native';

import VitalScreen from '../screens/VitalScreen'; // Main-Vital
import CalendarScreen from '../screens/CalendarScreen'; // Vital-Calendar
import SymptomScreen from '../screens/SymptomScreen'; // Main-Symptom
import SymptomLogScreen from '../screens/SymptomLogScreen'; // Symptom-Log
import SymptomDetailPatchScreen from '../screens/SymptomDetailPatchScreen'; //Symptom-DetailFromDevice
import SymptomDetailUserScreen from '../screens/SymptomDetailUserScreen'; //Symptom-DetailFromUser
import ProfileScreen from '../screens/ProfileScreen'; // Main-Profile
import SettingScreen from '../screens/SettingScreen'; // Profile-Setting

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

VitalStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const SymptomStack = createStackNavigator({
  Symptom: SymptomScreen,
  SymptomLog: SymptomLogScreen,
  SymptomDetailPatch: SymptomDetailPatchScreen,
  SymptomDetailUser: SymptomDetailUserScreen,
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

SymptomStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
  Setting: SettingScreen,
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