import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Dimensions,
  ImageBackground,
} from 'react-native';

const CALLS = [
  {
    id: 1,
    icon: require('../assets/home/ic_grp1.png'),
    name: 'Jessica Attah (6)',
    call_type: 'Call In',
    call_icon: require('../assets/home/ic_callin.png'),
    time: '10 minutes ago',
  },
  {
    id: 2,
    icon: require('../assets/home/ic_grp2.png'),
    name: 'Anairobi John',
    call_type: 'Call Out',
    call_icon: require('../assets/home/ic_callout.png'),
    time: '10 minutes ago',
  },
  {
    id: 3,
    icon: require('../assets/home/ic_grp3.png'),
    name: 'Chukwu Jane (4)',
    call_type: 'Missed',
    call_icon: require('../assets/home/ic_missedcall.png'),
    time: '2 hours ago',
  },
  {
    id: 4,
    icon: require('../assets/home/ic_grp4.png'),
    name: 'Ebubechi (4)',
    call_type: 'Missed',
    call_icon: require('../assets/home/ic_missedcall.png'),
    time: 'yesterday',
  },
];

const CallsScreen = ({navigation}) => {
  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Call Info', {
            user: item,
          })
        }>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 25,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={item.icon} style={{width: 50, height: 50}} />
            <View style={{marginLeft: 15}}>
              <Text
                style={{fontSize: 14, color: '#000000', fontWeight: 'bold'}}>
                {item.name}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <Image
                  source={item.call_icon}
                  style={{width: 20, height: 20}}
                />
                <Text
                  style={{
                    paddingLeft: 15,
                    fontSize: 12,
                    color: '#000000',
                    fontWeight: '500',
                  }}>
                  {item.call_type}
                </Text>
              </View>
            </View>
          </View>
          <Text
            style={{
              fontSize: 12,
              color: '#000000',
              fontWeight: '500',
              paddingTop: 5,
            }}>
            {item.time}
          </Text>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../assets/home/ic_call.png')}
              resizeMode="contain"
              style={{width: 22, height: 22, marginRight: 10}}
            />
            <Image
              source={require('../assets/home/ic_videoCall.png')}
              resizeMode="contain"
              style={{width: 22, height: 22}}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          marginVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 18, color: '#000000', fontWeight: 'bold'}}>
          Calls
        </Text>
        <View style={styles.searchSection}>
          <TextInput style={styles.input} underlineColorAndroid="transparent" />
          <Image
            source={require('../assets/home/ic_search.png')}
            style={{
              width: 20,
              height: 20,
              marginRight: 15,
              tintColor: '#128C7E',
            }}
            resizeMode="contain"
          />
        </View>
        <Image
          source={require('../assets/home/ic_3dot.png')}
          style={{width: 22, height: 22, tintColor: '#128C7E'}}
          resizeMode="contain"
        />
      </View>
      <View style={styles.devider} />

      <View style={{flex: 1}}>
        <FlatList
          data={CALLS}
          renderItem={({item, index}) => renderItem(item, index)}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default CallsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchSection: {
    width: '65%',
    height: 50,
    borderWidth: 1,
    borderColor: '#F9F9F9',
    marginTop: 12,
    alignSelf: 'center',
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    color: '#424242',
  },
  devider: {
    width: '90%',
    marginTop: 5,
    alignSelf: 'center',
    height: 3,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
});
