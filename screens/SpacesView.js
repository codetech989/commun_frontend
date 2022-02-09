import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,
  StatusBar,
  ProgressBarAndroid,
} from 'react-native';

const {width, height} = Dimensions.get('screen');

const images = [
  {
    id: 1,
    icon: require('../assets/home/rolex.png'),
  },
  {
    id: 2,
    icon: require('../assets/home/vogue.png'),
  },
  {
    id: 3,
    icon: require('../assets/home/gucci.png'),
  },
  {
    id: 4,
    icon: require('../assets/home/prada.png'),
  },
];

const SpacesView = ({navigation, route}) => {
  const {user} = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.containerProgress}>
        {images.map((story, index) => (
          <View
            style={[
              styles.single,
              {width: Math.floor(width / images.length) - 20},
            ]}
            key={index}>
            <View
              style={{
                width: width / images.length - 20,
                height: 4,
                borderRadius: 2,
                backgroundColor: 'rgba(0,0,0,0.25)',
              }}
            />
          </View>
        ))}
      </View>

      <View
        style={{
          width: '100%',
          height: 60,
          backgroundColor: '#F9F9F9',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          shadowColor: '#000',

          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
        }}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginLeft: 20}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/home/ic_back.png')}
              style={{
                width: 25,
                height: 25,
                marginRight: 10,
                tintColor: '#128C7E',
              }}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          {user.icon == null ? (
            <View
              style={{
                width: 45,
                height: 45,
                borderRadius: 23,
                backgroundColor: '#C4C4C4',
              }}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: '#128C7E',
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                }}
              />
            </View>
          ) : (
            <Image source={user.icon} style={{width: 50, height: 50}} />
          )}
          <View style={{paddingLeft: 15}}>
            <Text style={{fontSize: 14, color: '#000000', fontWeight: '600'}}>
              {user.name}
            </Text>
            <Text style={{fontSize: 12, color: '#000000', fontWeight: '500'}}>
              {user.time}
            </Text>
          </View>
        </View>

        <Image
          source={require('../assets/home/ic_3dot.png')}
          style={{width: 20, height: 20, tintColor: '#128C7E', marginRight: 20}}
          resizeMode="contain"
        />
      </View>

      <Image
        source={require('../assets/home/ic_story.png')}
        style={{
          width: width * 0.9,
          height: height * 0.5,
          alignSelf: 'center',
          marginTop: 25,
        }}
      />
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          marginTop: 25,
        }}>
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 10,
            backgroundColor: '#F3F3F3',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 25,
          }}>
          <Image
            style={{width: 30, height: 30}}
            source={require('../assets/home/ic_download.png')}
          />
        </View>
        <Image
          style={{width: 30, height: 30}}
          source={require('../assets/home/ic_storyShare.png')}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default SpacesView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  containerProgress: {
    marginTop: StatusBar.currentHeight,
    width,
    height: height * 0.03,
    paddingTop: height * 0.01,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  bar: {transform: [{scaleX: 1.0}, {scaleY: 1}], height: height * 0.01},
  single: {marginLeft: 1},
});
