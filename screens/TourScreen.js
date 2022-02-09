import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Modal,
  TouchableOpacity,
} from 'react-native';

const TourScreen = ({navigation}) => {
  const [showDialog, setShowDialog] = useState(true);
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: Dimensions.get('screen').width / 2 - 30,
              height: 200,
              borderRadius: 10,
              marginRight: 15,
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}>
            <Image
              source={require('../assets/home/arrow_down_left.png')}
              style={{width: 50, height: 50}}
            />
          </View>
          <View
            style={{
              width: Dimensions.get('screen').width / 2 - 30,
              height: 200,
              backgroundColor: '#128C7E',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../assets/home/ic_emogi_sunglasses.png')}
              style={{width: 40, height: 40}}
            />

            <Text
              style={{
                fontSize: 12,
                color: '#FFFFFF',
                fontWeight: '600',
                paddingTop: 10,
              }}>
              {' '}
              YES!!!
            </Text>
            <Text
              style={{
                fontSize: 11,
                color: '#FFFFFF',
                fontWeight: '600',
                paddingTop: 5,
                paddingHorizontal: 10,
                textAlign: 'center',
              }}>
              {' '}
              You can choose to join live Q/A sessions via AMA Live
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
            marginTop: 15,
          }}>
          <View
            style={{
              width: Dimensions.get('screen').width / 2 - 30,
              height: 200,
              backgroundColor: '#128C7E',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../assets/home/ic_emogi_sunglasses.png')}
              style={{width: 40, height: 40}}
            />

            <Text
              style={{
                fontSize: 12,
                color: '#FFFFFF',
                fontWeight: '600',
                paddingTop: 10,
              }}>
              INTERESTING!!!
            </Text>
            <Text
              style={{
                fontSize: 11,
                color: '#FFFFFF',
                fontWeight: '600',
                paddingTop: 5,
                paddingHorizontal: 10,
                textAlign: 'center',
              }}>
              Business owners aren’t left out proceed to run your business ads
              now.
            </Text>
          </View>
          <View
            style={{
              width: Dimensions.get('screen').width / 2 - 30,
              height: 200,
              borderRadius: 10,
              marginLeft: 15,
              justifyContent: 'flex-end',
            }}>
            <Image
              source={require('../assets/home/arrow_down_right.png')}
              style={{width: 50, height: 50}}
            />
          </View>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
            marginTop: 15,
          }}>
          <View
            style={{
              width: Dimensions.get('screen').width / 2 - 30,
              height: 200,
              borderRadius: 10,
              marginLeft: 15,
              justifyContent: 'flex-end',
            }}
          />
          <View
            style={{
              width: Dimensions.get('screen').width / 2 - 30,
              height: 200,
              backgroundColor: '#128C7E',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../assets/home/ic_emogi_sunglasses.png')}
              style={{width: 40, height: 40}}
            />

            <Text
              style={{
                fontSize: 12,
                color: '#FFFFFF',
                fontWeight: '600',
                paddingTop: 10,
              }}>
              GUESS WHAT???
            </Text>
            <Text
              style={{
                fontSize: 11,
                color: '#FFFFFF',
                fontWeight: '600',
                paddingTop: 5,
                paddingHorizontal: 10,
                textAlign: 'center',
              }}>
              You can get paid just by increasing the numbers of your viewers on
              Spaces
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
            marginTop: 15,
          }}>
          <View
            style={{
              width: Dimensions.get('screen').width / 2 - 30,
              height: 200,
              backgroundColor: '#128C7E',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../assets/home/ic_emoji_hearteyes.png')}
              style={{width: 40, height: 40}}
            />

            <Text
              style={{
                fontSize: 11,
                color: '#FFFFFF',
                fontWeight: '600',
                paddingTop: 5,
                paddingHorizontal: 10,
                textAlign: 'center',
              }}>
              Start chatting with your frinds and loved ones
            </Text>
          </View>

          <View
            style={{
              width: Dimensions.get('screen').width / 2 - 30,
              height: 200,
              borderRadius: 10,
              marginLeft: 15,
              justifyContent: 'flex-end',
            }}>
            <Image
              source={require('../assets/home/arrow_down_right_last.png')}
              style={{width: 50, height: 50}}
            />
          </View>
        </View>
      </ScrollView>

      <Modal visible={showDialog} transparent={true} animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.dialogView}>
            <Text style={{fontSize: 45, color: '#FFFFFF', fontWeight: 'bold'}}>
              Skip Tour?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setShowDialog(false);
                  navigation.navigate('InviteList');
                }}>
                <Text
                  style={{fontSize: 24, color: '#FFFFFF', fontWeight: 'bold'}}>
                  Yes
                </Text>
              </TouchableOpacity>
              <Text
                style={{fontSize: 24, color: '#FFFFFF', fontWeight: 'bold'}}>
                {' '}
                /{' '}
              </Text>
              <TouchableOpacity onPress={() => true}>
                <Text
                  style={{fontSize: 24, color: '#FFFFFF', fontWeight: 'bold'}}>
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TourScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  dialogView: {
    width: '85%',
    height: '15%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#128C7E',
  },
});
