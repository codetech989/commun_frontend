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

const CallInfoScreen = ({navigation, route}) => {
  const {user} = route.params;
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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/home/ic_back.png')}
              style={{width: 22, height: 22, tintColor: '#128C7E'}}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              color: '#000000',
              fontWeight: 'bold',
              paddingLeft: 15,
            }}>
            Call Info
          </Text>
        </View>
        <Image
          source={require('../assets/home/ic_3dot.png')}
          style={{width: 22, height: 22, tintColor: '#128C7E'}}
          resizeMode="contain"
        />
      </View>
      <View style={styles.devider} />
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 25,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image source={user.icon} style={{width: 50, height: 50}} />
          <View style={{marginLeft: 15}}>
            <Text style={{fontSize: 14, color: '#000000', fontWeight: 'bold'}}>
              {user.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Image source={user.call_icon} style={{width: 20, height: 20}} />
              <Text
                style={{
                  paddingLeft: 15,
                  fontSize: 12,
                  color: '#000000',
                  fontWeight: '500',
                }}>
                {user.call_type}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: '#000000',
                  fontWeight: '500',
                  paddingLeft: 10,
                }}>
                {user.time}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Image source={user.call_icon} style={{width: 20, height: 20}} />
              <Text
                style={{
                  paddingLeft: 15,
                  fontSize: 12,
                  color: '#000000',
                  fontWeight: '500',
                }}>
                {user.call_type}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: '#000000',
                  fontWeight: '500',
                  paddingLeft: 10,
                }}>
                {user.time}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Image source={user.call_icon} style={{width: 20, height: 20}} />
              <Text
                style={{
                  paddingLeft: 15,
                  fontSize: 12,
                  color: '#000000',
                  fontWeight: '500',
                }}>
                {user.call_type}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: '#000000',
                  fontWeight: '500',
                  paddingLeft: 10,
                }}>
                {user.time}
              </Text>
            </View>
          </View>
        </View>

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
    </View>
  );
};

export default CallInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  devider: {
    width: '90%',
    marginTop: 5,
    alignSelf: 'center',
    height: 3,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
});
