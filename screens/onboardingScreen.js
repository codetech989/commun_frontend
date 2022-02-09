import React, {useRef} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import PagerView from 'react-native-pager-view';
import OnboardDesign from '../components/onboardDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {URL} from '@env';

const onboardingScreen = ({navigation}) => {
  const pagerRef = useRef(null);
  const handlePageChange = pageNumber => {
    pagerRef.current.setPage(pageNumber);
  };
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('veryfied');
      const token = await AsyncStorage.getItem('TOKEN');
      if (value !== null) {
        await fetch(URL + '/api/auth/me', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        })
          .then(res => res.json())
          .then(json => {
            console.log(json);
            AsyncStorage.setItem(
              'isActive',
              JSON.stringify(json.data.isActive),
            );
            if (value !== null && json.data.isActive === true) {
              navigation.replace('Chats');
            } else if (value === null) {
              navigation.navigate('login');
            } else if (json.data.isActive === false) {
              navigation.navigate('Invite');
            }
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        navigation.navigate('login');
      }
    } catch (e) {
      // error reading value
    }
  };
  return (
    <View style={styles.onBoard}>
      <PagerView style={{flex: 1}} initialPage={0} ref={pagerRef}>
        <View key="1">
          <OnboardDesign
            Image={require('../assets/onboard/1.png')}
            heading="Chats"
            Content="Get Connected to  friends and family, get connected with people of like minds by creating or joining a group.  "
            onPress={() => handlePageChange(1)}
          />
        </View>
        <View key="2">
          <OnboardDesign
            Image={require('../assets/onboard/2.png')}
            heading="Spaces"
            Content="Get paid for having atleast 50 views "
            onPress={() => handlePageChange(2)}
          />
        </View>
        <View key="3">
          <OnboardDesign
            Image={require('../assets/onboard/3.png')}
            heading="AMA"
            Content="Get paid for having atleast 50 views "
            onPress={() => {
              getData();
            }}
          />
        </View>
      </PagerView>
    </View>
  );
};

export default onboardingScreen;

const styles = StyleSheet.create({
  onBoard: {
    flex: 1,
  },
});