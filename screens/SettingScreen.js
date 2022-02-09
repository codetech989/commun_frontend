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
  ScrollView,
} from 'react-native';

const SETTINGS = [
  {
    id: 1,
    icon: require('../assets/home/ic_balance_wallet.png'),
    title: 'Account',
    desc: 'Change phone number, Add backup account, Privacy',
  },
  {
    id: 2,
    icon: require('../assets/home/ic_chat.png'),
    title: 'Chats',
    desc: 'Chat history, chat background image, backup chat',
  },
  {
    id: 3,
    icon: require('../assets/home/ic_notification.png'),
    title: 'Notification',
    desc: 'Chat and call tones',
  },
  {
    id: 4,
    icon: require('../assets/home/ic_balance_wallet.png'),
    title: 'Account',
    desc: 'Change phone number, Add backup account, Privacy',
  },
  {
    id: 5,
    icon: require('../assets/home/ic_storage.png'),
    title: 'Storage ',
    desc: 'Manage Storage',
  },
  {
    id: 6,
    icon: require('../assets/home/ic_help.png'),
    title: 'Help line',
    desc: 'Help centre, Privacy Policy',
  },
  {
    id: 7,
    icon: require('../assets/home/ic_people.png'),
    title: 'Make a referral',
    desc: 'Help centre, Privacy Policy',
  },
];

const SettingScreen = ({navigation}) => {
  const renderItem = (item, index) => {
    return (
      <View style={{flexDirection: 'row', marginLeft: 25, marginTop: 35}}>
        <Image source={item.icon} style={{width: 25, height: 25}} />
        <View style={{width: '85%', marginLeft: 15}}>
          <Text style={{fontSize: 14, color: '#000000', fontWeight: '600'}}>
            {item.title}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: '#000000',
              fontWeight: '500',
              paddingTop: 15,
            }}>
            {item.desc}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.back}
            source={require('../assets/onboard/round_back.png')}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: '#000000',
            fontWeight: 'bold',
            fontSize: 14,
            paddingLeft: 10,
          }}>
          Settings
        </Text>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          data={SETTINGS}
          renderItem={({item, index}) => renderItem(item, index)}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    marginLeft: 20,
  },
  back: {
    width: 24,
    height: 24,
    marginEnd: 2,
    // tintColor: '#FFFFFF',
  },
});
