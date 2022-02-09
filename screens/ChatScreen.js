import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect, useCallback} from 'react';
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
  ActivityIndicator,
  Platform,
} from 'react-native';
import {
  Bubble,
  Composer,
  GiftedChat,
  InputToolbar,
} from 'react-native-gifted-chat';
import {A_URL, SOCKET_A} from '@env';
const ChatScreen = ({navigation, route}) => {
  const {user, receiverId, userId, userPhone} = route.params;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const [loading, setLoading] = useState(false);
  const [chatData, setChatData] = useState([]);
  const [serverState, setServerState] = React.useState('Loading...');
  var temp = 0;
  var ws = React.useRef(new WebSocket('ws://' + SOCKET_A)).current;
  useEffect(() => {
    console.log('ws',ws);
    // if (userId == user.lastMessage.sender.id) {
      console.log('receiverIds', receiverId)
      ws.onopen = () => {
        console.log('Server Stat ', 'Connected to the server');
        setServerState('Connected to the server');
        const userOpen = {
          // action: 'open',
          userId: parseInt(userId),
          // countryCode: user.lastMessage.sender.countryCode,
          // phoneNumber: user.lastMessage.sender.phoneNumber,
        };
        ws.send(JSON.stringify(userOpen));
      };
    // }
    // } else {
    //   ws.onopen = () => {
    //     console.log('Server Stat ', 'Connected to the server');
    //     setServerState('Connected to the server');
    //     console.log('receiverId',receiverId)
    //     const userOpen = {
    //       // action: 'open',
    //       userId: receiverId,
    //       // countryCode: user.lastMessage.receiver.countryCode,
    //       // phoneNumber: user.lastMessage.receiver.phoneNumber,
    //     };
    //     ws.send(JSON.stringify(userOpen));
    //   };
    // }

    ws.onclose = e => {
      console.log('Server Stat ', 'Disconnected. Check internet or server.');
      setServerState('Disconnected. Check internet or server.');
    };
    ws.onerror = e => {
      setServerState(e.message);
    };

    ws.onmessage = e => {
      console.log('Server Stat Awais', JSON.parse(e.data).action);
      console.log(JSON.parse(e.data));
      if (JSON.parse(e.data).action == 'incomingMessage') {
        console.log('USER ID incomingMessage dfsdfsdf', Platform.OS + ' ' + receiverId);
        // if (
        //   userId === JSON.parse(e.data).senderId &&
        //   receiverId === JSON.parse(e.data).receiverId
        // ) {
        console.log('awais',JSON.parse(e.data));
          const message = {
            _id: Math.round(new Date().getTime()+1111 / 1000),
            text: JSON.parse(e.data).messageData.caption,
            createdAt: new Date(),
            user: {
              _id: receiverId,
              name: user.lastMessage.receiver.phoneNumber,
              avatar: 'https://placeimg.com/140/140/any',
            },
          };
          console.log('asdasdassssssssschat')
          console.log('message',message)
          setMessages(previousMessages =>
            GiftedChat.append(previousMessages, message),
          );
        }
      // }
      else if (JSON.parse(e.data).action == 'messageSendAcknowledgment') {
        console.log(
          'USER ID messageSendAcknowledgment',
          Platform.OS + ' ' + userId,
        );
        console.log(JSON.parse(e.data).Data.data);
        if (
          userId == JSON.parse(e.data).Data.data.senderId &&
          receiverId == JSON.parse(e.data).Data.data.receiverId
        ) {
          const message = {
            _id: Math.round(new Date().getTime() +2 / 1000),
            text: JSON.parse(e.data).Data.data.caption,
            createdAt: new Date(),
            user: {
              _id: receiverId,
              name: user.lastMessage.receiver.phoneNumber,
              avatar: 'https://placeimg.com/140/140/any',
            },
          };
          setMessages(previousMessages =>
            GiftedChat.append(previousMessages, message),
          );
        }
      }
    };

    getChat();
  }, []);

  const getChat = async () => {
    const token = await AsyncStorage.getItem('TOKEN');
    setLoading(true);
    if (userId == user.lastMessage.sender.id) {
      await fetch(A_URL + '/api/chat/' + user.lastMessage.receiver.id, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
        .then(res => res.json())
        .then(json => {
          if (json.code == 200) {
            setChatData(json.data);

            for (var i = 0; i < json.data.length; i++) {
              const message = {
                _id: Math.round(new Date().getTime() + 3 / 1000),
                text: json.data[i].caption,
                createdAt: json.data[i].createdAt,
                user: {
                  _id: json.data[i].receiver.id,
                  name: json.data[i].receiver.phoneNumber,
                  avatar: 'https://placeimg.com/140/140/any',
                },
              };
              setMessages(previousMessages =>
                GiftedChat.append(previousMessages, message),
              );
            }

            setLoading(false);
          }
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
        });
    } else {
      await fetch(A_URL + '/api/chat/' + user.lastMessage.sender.id, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
        .then(res => res.json())
        .then(json => {
          if (json.code == 200) {
            setChatData(json.data);
            for (var i = 0; i < json.data.length; i++) {
              const message = {
                _id: Math.round(new Date().getMilliseconds() / 1000),
                text: json.data[i].caption,
                createdAt: json.data[i].createdAt,
                user: {
                  _id: json.data[i].senderId,
                  name: json.data[i].sender.phoneNumber,
                  avatar: 'https://placeimg.com/140/140/any',
                },
              };

              setMessages(previousMessages =>
                GiftedChat.append(previousMessages, message),
              );
            }
            setLoading(false);
          }
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
        });
    }
  };

  const onSend = useCallback((messages = []) => {
    // if (userId == user.lastMessage.sender.id) {
    //   console.log('f1');
    const message = {
      action: 'send',
      userId: userId,
      senderId: parseInt(userId),
      receiverId: parseInt(receiverId),
      sendingType: 'INDIVIDUAL',
      type: 'INDIVIDUAL',
      caption: messages[0].text,
      format: 'text',
      user: user,
    };
    ws.send(JSON.stringify(message));
    // } else {
    //   const message = {
    //     action: 'send',
    //     userId: userId,
    //     receiverId: receiverId,
    //     senderId: userId,
    //     sendingType: 'INDIVIDUAL',
    //     caption: messages[0].text,
    //     format: 'text',
    //     user: user,
    //     abc:'2'
    //   };
    //   ws.send(JSON.stringify(message));
    // }
    // setMessages(previousMessages =>
    //   GiftedChat.append(previousMessages, messages),
    // );
  }, []);
  // const sendMessage = async message => {
  //   const token = await AsyncStorage.getItem('TOKEN');
  //   await fetch(A_URL + '/api/chat/message/send', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //       Authorization: 'Bearer ' + token,
  //     },
  {/*    body: JSON.stringify({*/}
  {/*      receiverId: message.user._id,*/}
  {/*      sendingType: 'INDIVIDUAL',*/}
  {/*      caption: message.text,*/}
  //       format: 'text',
  //     }),
  //   })
  //     .then(res => res.json())
  //     .then(json => {
  //       if (json.code == 200) {
  //         setChatData(json.data);
  //         for (var i = 0; i < json.data.length; i++) {
  //           const message = {
  {/*            _id: Math.round(new Date().getTime() / 1000),*/}
  //             text: json.data[i].caption,
  //             createdAt: json.data[i].createdAt,
  //             user: {
  //               _id: json.data[i].senderId,
  //               name: json.data[i].sender.phoneNumber,
  //               avatar: 'https://placeimg.com/140/140/any',
  //             },
  //           };
  //
  //           setMessages(previousMessages =>
  //             GiftedChat.append(previousMessages, message),
  //           );
  //         }
  //         setLoading(false);
  //       }
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       setLoading(false);
  //     });
  // };
  const renderComposer = props => {
    return (
      <View style={styles.searchSection}>
        <Image
          source={require('../assets/home/ic_emoji.png')}
          style={styles.emojiIcon}
          resizeMode="contain"
        />
        <Composer
          {...props}
          textInputStyle={styles.input}
          textInputProps={{fontStyle: 'italic'}}
        />
        {inputText == '' ? (
          <>
            <Image
              source={require('../assets/home/ic_camera.png')}
              style={styles.icon}
              resizeMode="contain"
            />
            <Image
              source={require('../assets/home/ic_mic.png')}
              style={styles.icon}
              resizeMode="contain"
            />
            <Image
              source={require('../assets/home/ic_attatch.png')}
              style={styles.icon}
              resizeMode="contain"
            />
          </>
        ) : (
          <TouchableOpacity
            onPress={() => {
              // const message = {
              //   senderId: 2,
              //   receiverId: [11],
              //   action: 'send',
              //   type: 'INDIVIDUAL',
              //   format: 'text',
              //   caption: props.text,
              // };
              // ws.send(JSON.stringify(message));
              props.onSend({text: props.text}, true);
            }}>
            <Text style={{paddingRight: 15}}>Send</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {color: '#000000'},
        }}
        wrapperStyle={{
          left: {
            backgroundColor: '#C4C4C4',
          },
          right: {
            backgroundColor: '#C4C4C4',
          },
        }}
      />
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.back}
            source={require('../assets/home/ic_back.png')}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
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
                  backgroundColor: user.lastMessage.sender.isActive
                    ? '#128C7E'
                    : '#000000',
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
            {userId == user.lastMessage.sender.id ? (
              <Text style={{fontSize: 14, color: '#000000', fontWeight: '600'}}>
                {user.lastMessage.receiver.firstName
                  ? user.lastMessage.receiver.firstName
                  : user.lastMessage.receiver.phoneNumber}
              </Text>
            ) : (
              <Text style={{fontSize: 14, color: '#000000', fontWeight: '600'}}>
                {user.lastMessage.sender.firstName
                  ? user.lastMessage.sender.firstName
                  : user.lastMessage.sender.phoneNumber}
              </Text>
            )}
            <Text style={{fontSize: 12, color: '#000000', fontWeight: '500'}}>
              Online
            </Text>
          </View>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginRight: 20}}>
          <Image
            source={require('../assets/home/ic_call.png')}
            style={{width: 25, height: 25, marginRight: 15}}
            resizeMode="contain"
          />
          <Image
            source={require('../assets/home/ic_videoCall.png')}
            style={{width: 25, height: 25, marginRight: 15}}
            resizeMode="contain"
          />
          <Image
            source={require('../assets/home/ic_3dot.png')}
            style={{width: 20, height: 20, tintColor: '#128C7E'}}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={{flex: 1}}>
        {!loading ? (
          <GiftedChat
            messages={messages}
            showUserAvatar={false}
            onSend={messages => onSend(messages)}
            user={{
              _id: receiverId,
            }}
            renderBubble={renderBubble}
            isTyping={true}
            // renderSend={renderSend}
            onInputTextChanged={text => setInputText(text)}
            timeTextStyle={{left: {color: 'black'}, right: {color: 'black'}}}
            renderComposer={renderComposer}
            messagesContainerStyle={{paddingBottom: 20}}
            renderAvatar={() => null}
          />
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator color={'#128C7E'} size="large" />
          </View>
        )}
      </View>
      <View style={{marginBottom: 15}} />
    </View>
  );
};

export default ChatScreen;

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
    tintColor: '#128C7E',
  },
  searchSection: {
    width: '90%',
    marginHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.25)',
    alignSelf: 'center',
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  emojiIcon: {
    tintColor: '#128C7E',
    width: 20,
    height: 20,
    marginHorizontal: 15,
  },
  icon: {
    tintColor: '#128C7E',
    width: 20,
    height: 20,
    marginRight: 15,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    color: '#424242',
  },
});
