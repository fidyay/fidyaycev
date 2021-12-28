import React, { useState } from 'react';
import { View, StatusBar, UIManager, LayoutAnimation } from 'react-native';
import Header from './components/Header.js';
import SplashScreen from "./components/SplashScreen.js";
import Menu from "./components/PlaylistsMenu.js";
import PlaylistScreen from './components/PlaylistScreen.js';
import MusicScreen from './components/MusicScreen.js';
import FilesScreen from './components/FilesScreen.js';
import Player from './components/Player.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

const Stack = createNativeStackNavigator()


export default function App() {
  const [menuOpened, setMenuOpened] = useState(false)
  return (
    <View style={{flex: 1, marginTop: StatusBar.currentHeight, backgroundColor: '#4C5454'}}>
    <NavigationContainer theme={{colors: {backgroundColor: '#4C5454'}}}>
        <Header openMenu={() => {
          LayoutAnimation.easeInEaseOut()
          setMenuOpened(true)}
          }/>
        <Menu opened={menuOpened} closeMenu={() => {
          LayoutAnimation.easeInEaseOut()
          setMenuOpened(false)
          }}/>
          <Stack.Navigator headerMode="none" initialRouteName="Playlist" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Choose files"  component={FilesScreen}/>
            <Stack.Screen name="Playlist" initialParams={{playlistName: "Default"}} component={PlaylistScreen}/>
            <Stack.Screen name="Music" component={MusicScreen}/>
          </Stack.Navigator>
        <Player/>
      </NavigationContainer>
    </View>
  );
}

