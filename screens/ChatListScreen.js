import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
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
  ActivityIndicator,
} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {A_URL} from '@env';
const USERS = [
  {
    id: 1,
    name: 'Ahamed Aisha',
    latest_msg: 'text me when you get home',
    time: '11:20 PM',
    icon: null,
    read: true,
  },
  {
    id: 2,
    name: 'Samuel Etto',
    latest_msg: 'Ensure you listen to pastor’s message',
    time: '11:22 AM',
    icon: null,
    read: false,
  },
  {
    id: 3,
    name: 'Joshua Ade',
    latest_msg: 'text me when you get home',
    time: '10:00 PM',
    read: true,
  },
  {
    id: 4,
    name: 'Ahamed Aisha',
    latest_msg: 'text me when you get home',
    time: '11:20 PM',
    icon: null,
    read: true,
  },
  {
    id: 5,
    name: 'Samuel Etto',
    latest_msg: 'Ensure you listen to pastor’s message',
    time: '11:22 AM',
    icon: null,
    read: false,
  },
  {
    id: 6,
    name: 'Joshua Ade',
    latest_msg: 'text me when you get home',
    time: '10:00 PM',
    icon: null,
    read: false,
  },
];

const GROUPS = [
  {
    id: 1,
    name: 'Loveworld Next',
    latest_msg: 'text me when you get home',
    icon: require('../assets/home/ic_grp1.png'),
    time: '12:50 AM',
    read: false,
  },
  {
    id: 2,
    name: 'Next Elect',
    latest_msg: 'Ensure you listen to pastor’s message',
    icon: require('../assets/home/ic_grp2.png'),
    time: '11:22 AM',
    read: false,
  },
  {
    id: 3,
    name: 'Connection & Exhibition',
    latest_msg: '@paul:',
    icon: require('../assets/home/ic_grp3.png'),
    time: '10:00 PM',
    read: true,
  },
  {
    id: 4,
    name: 'Terracurves',
    latest_msg: 'text me when you get home',
    icon: require('../assets/home/ic_grp4.png'),
    time: '11:20 PM',
    read: true,
  },
  {
    id: 5,
    name: 'Next Foundation',
    latest_msg: 'Ensure you listen to pastor’s message',
    icon: require('../assets/home/ic_grp5.png'),
    time: '11:22 AM',
    read: false,
  },
  {
    id: 6,
    name: 'LBN',
    latest_msg: 'text me when you get home',
    icon: null,
    time: '10:00 PM',
    read: false,
  },
];

const OPTIONS = [
  {
    id: 1,
    title: 'Profile',
  },
  {
    id: 2,
    title: 'Create New Group',
  },
  {
    id: 3,
    title: 'Contact List',
  },
  {
    id: 4,
    title: 'Business Ads',
  },
  {
    id: 5,
    title: 'Settings',
  },
];

const ChatListScreen = ({navigation}) => {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Profile');
  const [selectChat, setSelecteChat] = useState(true);
  const [loading, setLoading] = useState(true);
  const [chatData, setChatData] = useState([]);
  const [userPhone, setUserPhone] = useState('');
  const [userId, setUserId] = useState('');

  const renderSeparatorView = () => {
    return (
      <View
        style={{
          height: 1,
          width: '90%',
          alignSelf: 'center',
          marginVertical: 5,
          backgroundColor: '#C4C4C4',
        }}
      />
    );
  };

  useEffect(() => {
    try {
      const unsubscribe = navigation.addListener('focus', () => {
        getChatList();
        return () => {
          unsubscribe.remove();
        };
      });
    } catch (error) {
      console.log(error);
    }
    // Return the function to unsubscribe from the event so it gets removed on unmount
  }, []);

  const getChatList = async () => {
    const phone = await AsyncStorage.getItem('userPhoneNumber');
    const id = await AsyncStorage.getItem('userId');
    setUserPhone(phone);
    setUserId(id);

    const token = await AsyncStorage.getItem('TOKEN');

    await fetch(A_URL + '/api/chat/all?page=1&limit=50', {
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
        if (json.code == 200) {
          setChatData(json.data);

          setLoading(false);
        }
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  const renderItem = (item, index) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Chats', {
              user: item,
              receiverId: item.id,
              userPhone: userPhone,
              userId: userId,
            });
          }}
          activeOpacity={0.5}
          style={{flexDirection: 'row', alignItems: 'center', margin: 10}}>
          <View>
            {item.icon == null ? (
              <View
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: '#C4C4C4',
                  borderRadius: 25,
                }}
              />
            ) : (
              <Image source={item.icon} style={{width: 50, height: 50}} />
            )}
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: '#000000',
                position: 'absolute',
                right: -5,
                bottom: 2,
              }}
            />
          </View>
          <Image
            source={
              item.read
                ? require('../assets/home/ic_tickgreen.png')
                : require('../assets/home/ic_tick.png')
            }
            style={{
              width: 15,
              height: 15,
              marginLeft: 10,
              alignSelf: 'flex-end',
            }}
            resizeMode="contain"
          />
          <View style={{marginLeft: 15, width: '60%'}}>
            {userPhone == item.lastMessage.receiver.phoneNumber ? (
              <Text style={{color: '#000000', fontSize: 12, fontWeight: '600'}}>
                {item.lastMessage.sender.firstName
                  ? item.lastMessage.sender.firstName +
                    ' ' +
                    item.lastMessage.sender.lastName
                  : item.lastMessage.sender.countryCode +
                    item.lastMessage.sender.phoneNumber}
              </Text>
            ) : (
              <Text style={{color: '#000000', fontSize: 12, fontWeight: '600'}}>
                {item.lastMessage.receiver.firstName
                  ? item.lastMessage.receiver.firstName +
                    ' ' +
                    item.lastMessage.receiver.lastName
                  : item.lastMessage.receiver.countryCode +
                    item.lastMessage.receiver.phoneNumber}
              </Text>
            )}
            <Text
              style={{
                color: '#000000',
                fontSize: 11,
                fontWeight: '400',
                paddingVertical: 10,
              }}>
              {item.lastMessage.caption}
            </Text>
          </View>
          <Text style={{color: '#000000', fontSize: 9, fontWeight: '500'}}>
            {item.time}
          </Text>
        </TouchableOpacity>
      </>
    );
  };

  const optionSelect = title => {
    setShowDialog(false);
    setSelectedOption(title);
    navigation.navigate(title);
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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: 14, color: '#000000', fontWeight: 'bold'}}>
            Chats
          </Text>

          <Image
            source={require('../assets/home/ic_doubleArrow.png')}
            style={{width: 12, height: 12, marginLeft: 5}}
            resizeMode="contain"
          />
          <TouchableOpacity
            onPress={() => setSelecteChat(true)}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 14,
                color: '#000000',
                fontWeight: 'bold',
                paddingLeft: 5,
              }}>
              My Chat
            </Text>
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: '#979696',
                marginLeft: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{fontSize: 10, color: '#000000', fontWeight: 'bold'}}>
                50
              </Text>
            </View>
          </TouchableOpacity>
          <Image
            source={require('../assets/home/ic_doubleArrow.png')}
            style={{
              width: 12,
              height: 12,
              marginLeft: 5,
              tintColor: selectChat ? 'rgba(0,0,0,0.25)' : '#128C7E',
            }}
            resizeMode="contain"
          />
          <TouchableOpacity
            onPress={() => setSelecteChat(false)}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 14,
                color: selectChat ? 'rgba(0,0,0,0.25)' : '#128C7E',
                fontWeight: 'bold',
                paddingLeft: 5,
              }}>
              My Groups
            </Text>
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: '#979696',
                marginLeft: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{fontSize: 10, color: '#000000', fontWeight: 'bold'}}>
                50
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../assets/home/ic_search.png')}
            style={{width: 15, height: 15}}
          />
          <Menu opened={showDialog} onBackdropPress={() => setShowDialog(true)}>
            <MenuTrigger
              onPress={() => setShowDialog(true)}
              style={{marginLeft: 12}}>
              <Image
                source={require('../assets/home/ic_3dot.png')}
                style={{width: 15, height: 15}}
                resizeMode="contain"
              />
            </MenuTrigger>
            <MenuOptions>
              {OPTIONS.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setShowDialog(false), optionSelect(item.title);
                    }}
                    key={item.id}
                    style={{
                      marginHorizontal: 20,
                      marginVertical: 5,
                      paddingVertical: 10,
                      borderRadius: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#000000',
                        fontWeight: '600',
                        paddingLeft: 20,
                      }}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </MenuOptions>
          </Menu>
        </View>
      </View>

      <Text
        style={{
          marginLeft: 20,
          fontSize: 12,
          color: '#000000',
          fontWeight: 'bold',
        }}>
        20 Online
      </Text>
      <View style={styles.devider} />
      {!loading ? (
        <View style={{flex: 1}}>
          {selectChat ? (
            <>
              {chatData == null || chatData.length == 0 ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{fontSize: 18, color: '#128C7E', fontWeight: '600'}}>
                    No Chat Found
                  </Text>
                </View>
              ) : (
                <FlatList
                  data={chatData}
                  contentContainerStyle={{marginTop: 15}}
                  renderItem={({item, index}) => renderItem(item, index)}
                  ItemSeparatorComponent={renderSeparatorView}
                  keyExtractor={(_, index) => index.toString()}
                />
              )}
            </>
          ) : (
            <FlatList
              data={GROUPS}
              contentContainerStyle={{marginTop: 15}}
              renderItem={({item, index}) => renderItem(item, index)}
              ItemSeparatorComponent={renderSeparatorView}
              keyExtractor={(_, index) => index.toString()}
            />
          )}
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator
            size="large"
            animating={loading}
            color={'#128C7E'}
          />
        </View>
      )}
    </View>
  );
};

export default ChatListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  dialogView: {
    width: '55%',
    height: '25%',
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  devider: {
    width: '90%',
    marginTop: 15,
    alignSelf: 'center',
    height: 2,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
});
