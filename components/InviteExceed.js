import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const InviteExceed = ({visible, onPress}) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safearea}>
      <Modal visible={visible} transparent>
        <View style={styles.container}>
          <TouchableOpacity onPress={onPress} style={styles.closeContainer}>
            <Image
              source={require('../assets/onboard/x.png')}
              style={styles.closeIcon}
            />
          </TouchableOpacity>
          <Text
            onPress={() => {
              onPress();
              //navigation.navigate('InviteList');
              navigation.navigate('Tour');
            }}
            style={styles.title}>
            You have exceeded the invite list
          </Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default InviteExceed;

const styles = StyleSheet.create({
  safearea: {
    backgroundColor: '#128C7E',
    flex: 1,
  },
  container: {
    backgroundColor: '#128C7E',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 30,
    color: '#FFFFFF',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  closeContainer: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 60,
    right: 15,
  },
  closeIcon: {width: 20, height: 20},
});
