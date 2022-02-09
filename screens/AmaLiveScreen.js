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

const AMALIVE_DATA = [
  {
    id: 1,
    icon: require('../assets/home/ic_grp1.png'),
    title: 'Relationship Matters',
    time: 'Today  ||  2 PM',
  },
  {
    id: 2,
    icon: require('../assets/home/ic_grp2.png'),
    title: 'Kingdom Finance',
    time: '22nd July, 2021  ||  5 PM ',
  },
  {
    id: 3,
    icon: require('../assets/home/ic_grp3.png'),
    title: 'Goals',
    time: '22nd July, 2021  ||  5 PM ',
  },
  {
    id: 4,
    icon: require('../assets/home/ic_grp4.png'),
    title: 'Values',
    time: '22nd July, 2021  ||  5 PM ',
  },
  {
    id: 5,
    icon: require('../assets/home/ic_grp5.png'),
    title: 'Eph 5',
    time: '22nd July, 2021  ||  5 PM ',
  },
];

const AmaLiveScreen = ({navigation}) => {
  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('AMA Live Detail', {
            user: item,
          })
        }>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <Image source={item.icon} style={{width: 50, height: 50}} />
              <Image
                source={require('../assets/home/ic_live.png')}
                style={{
                  width: 25,
                  height: 25,
                  position: 'absolute',
                  alignSelf: 'center',
                  bottom: 0.5,
                }}
              />
            </View>
            <View>
              <Text style={{paddingLeft: 15, fontWeight: '600', fontSize: 14}}>
                {item.title}
              </Text>
              <Text style={{paddingLeft: 15, fontWeight: '500', fontSize: 10}}>
                {item.time}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 14,
                color: '#000000',
                fontWeight: '600',
                paddingRight: 15,
              }}>
              decline
            </Text>
            <View
              style={{
                width: 50,
                height: 25,
                backgroundColor: '#128C7E',
                borderRadius: 13,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 14, color: '#FFFFFF', fontWeight: '600'}}>
                join
              </Text>
            </View>
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
          AMA
          <Image
            source={require('../assets/home/ic_live.png')}
            style={{width: 25, height: 25}}
          />
        </Text>
        <View style={styles.searchSection}>
          <TextInput style={styles.input} underlineColorAndroid="transparent" />
          <Image
            source={require('../assets/home/ic_search.png')}
            style={{width: 20, height: 20, marginRight: 15}}
            resizeMode="contain"
          />
        </View>
        <Image
          source={require('../assets/home/ic_3dot.png')}
          style={{width: 25, height: 25}}
          resizeMode="contain"
        />
      </View>
      <View style={styles.devider} />

      <View style={{marginTop: 35}}>
        <View
          style={{
            width: Dimensions.get('window').width,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <ImageBackground
            source={require('../assets/home/ic_Union.png')}
            style={{width: Dimensions.get('window').width / 2.2, height: 130}}
            resizeMode="stretch">
            <Text
              style={{
                fontSize: 15,
                color: '#000000',
                fontWeight: '800',
                alignSelf: 'center',
                paddingTop: 10,
              }}>
              Faith
            </Text>
            <Image
              source={require('../assets/home/ic_demoUser.png')}
              style={{width: 120, height: 60, alignSelf: 'center'}}
              resizeMode="contain"
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: '#000000',
                  fontWeight: '800',
                  marginRight: 10,
                }}>
                Messages
              </Text>
              <View
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 11,
                  backgroundColor: '#C4C4C4',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{fontSize: 12, color: '#000000', fontWeight: '800'}}>
                  20
                </Text>
              </View>
            </View>
          </ImageBackground>
          <ImageBackground
            source={require('../assets/home/ic_Union.png')}
            style={{width: Dimensions.get('window').width / 2.2, height: 130}}
            resizeMode="stretch">
            <Text
              style={{
                fontSize: 15,
                color: '#000000',
                fontWeight: '800',
                alignSelf: 'center',
                paddingTop: 10,
              }}>
              Governance
            </Text>
            <Image
              source={require('../assets/home/ic_demoUser.png')}
              style={{width: 120, height: 60, alignSelf: 'center'}}
              resizeMode="contain"
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: '#000000',
                  fontWeight: '800',
                  marginRight: 10,
                }}>
                Messages
              </Text>
              <View
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 11,
                  backgroundColor: '#C4C4C4',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{fontSize: 12, color: '#000000', fontWeight: '800'}}>
                  20
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View
          style={{
            width: Dimensions.get('window').width,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <ImageBackground
            source={require('../assets/home/ic_UnionRight.png')}
            style={{width: Dimensions.get('window').width / 2.2, height: 130}}
            resizeMode="stretch">
            <Text
              style={{
                fontSize: 15,
                color: '#000000',
                fontWeight: '800',
                alignSelf: 'center',
                paddingTop: 10,
              }}>
              The Church
            </Text>
            <Image
              source={require('../assets/home/ic_demoUser.png')}
              style={{width: 120, height: 60, alignSelf: 'center'}}
              resizeMode="contain"
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: '#000000',
                  fontWeight: '800',
                  marginRight: 10,
                }}>
                Messages
              </Text>
              <View
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 11,
                  backgroundColor: '#C4C4C4',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{fontSize: 12, color: '#000000', fontWeight: '800'}}>
                  20
                </Text>
              </View>
            </View>
          </ImageBackground>
          <ImageBackground
            source={require('../assets/home/ic_UnionRight.png')}
            style={{width: Dimensions.get('window').width / 2.2, height: 130}}
            resizeMode="stretch">
            <Text
              style={{
                fontSize: 15,
                color: '#000000',
                fontWeight: '800',
                alignSelf: 'center',
                paddingTop: 10,
              }}>
              Education
            </Text>
            <Image
              source={require('../assets/home/ic_demoUser.png')}
              style={{width: 120, height: 60, alignSelf: 'center'}}
              resizeMode="contain"
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: '#000000',
                  fontWeight: '800',
                  marginRight: 10,
                }}>
                Messages
              </Text>
              <View
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 11,
                  backgroundColor: '#C4C4C4',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{fontSize: 12, color: '#000000', fontWeight: '800'}}>
                  20
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
      <View style={[styles.devider, {marginTop: 25}]} />
      <FlatList
        data={AMALIVE_DATA}
        contentContainerStyle={{paddingTop: 25, paddingBottom: 15}}
        renderItem={({item, index}) => renderItem(item, index)}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

export default AmaLiveScreen;

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
