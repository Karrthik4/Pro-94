import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer'
import { Icon } from "react-native-elements";
import {AppTabNavigator} from './AppTabNavigator';
import CustomSideBarMenu from './CustomSideBarMenu'
import SettingScreen from '../screens/SettingScreen'

export const AppDrawerNavigator = createDrawerNavigator({
    Home:{
        screen : AppTabNavigator,
        navigationOptions:{
            drawerIcon : <Icon name="home" type ="fontawesome5" />
          }
    },
    Setting:{
        screen:SettingScreen
    }
   },
   {
       contentComponent:CustomSideBarMenu
   },
   {
       initialRouteName:'Home'  
   }
)