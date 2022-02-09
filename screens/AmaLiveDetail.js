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
} from 'react-native';
import {
  Bubble,
  Composer,
  GiftedChat,
  InputToolbar,
} from 'react-native-gifted-chat';
const AmaLiveDetail = ({navigation, route}) => {
  const {user} = route.params;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

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
            onPress={() => props.onSend({text: props.text}, true)}>
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
              {user.title}
            </Text>
            <Text
              style={{
                fontSize: 10,
                color: '#000000',
                fontWeight: '500',
                paddingVertical: 5,
              }}>
              Host: Abraham Judiben
            </Text>
            <Text style={{fontSize: 10, color: '#000000', fontWeight: '500'}}>
              {user.time}
            </Text>
          </View>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginRight: 20}}>
          <Image
            source={require('../assets/home/ic_3dot.png')}
            style={{width: 20, height: 20, tintColor: '#128C7E'}}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={{flex: 1}}>
        <GiftedChat
          messages={messages}
          showUserAvatar={false}
          renderAvatarOnTop={true}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
          }}
          renderBubble={renderBubble}
          // renderSend={renderSend}
          onInputTextChanged={text => setInputText(text)}
          timeTextStyle={{left: {color: 'black'}, right: {color: 'black'}}}
          renderComposer={renderComposer}
          messagesContainerStyle={{paddingBottom: 20}}
        />
      </View>
      <View style={{marginBottom: 15}} />
    </View>
  );
};

export default AmaLiveDetail;

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
