import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Navigation from './navigation/navigation';
import SplashScreen from 'react-native-splash-screen';
import {MenuProvider} from 'react-native-popup-menu';
const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <MenuProvider>
        <Navigation />
      </MenuProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default App;
