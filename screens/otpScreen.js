import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {A_URL} from '@env';

const OtpScreen = ({route}) => {
  const {TOKEN} = route.params;
  let textInput = useRef(null);
  const lengthInput = 4;
  let clockCall = null;
  const defaultCountdown = 60;
  const navigation = useNavigation();
  const [interval, setIntervalVal] = useState('');
  const [countdown, setCountdown] = useState(defaultCountdown);
  const [enable, setEnableResend] = useState(false);

  const onChangeText = val => {
    setIntervalVal(val);
  };

  useEffect(() => {
    textInput.focus();
  }, []);

  useEffect(() => {
    clockCall = setInterval(() => {
      decrementClock();
    }, 1000);
    return () => {
      clearInterval(clockCall);
    };
  }, []);

  const decrementClock = () => {
    if (countdown == 0) {
      setCountdown(0);
      clearInterval(clockCall);
    } else {
      setCountdown(countdown - 1);
    }
  };

  const resend = () => {
    if (enable) {
      setCountdown(defaultCountdown), setEnableResend(false);
      clearInterval(clockCall);
      clockCall = setInterval(() => {
        decrementClock(0);
      }, 1000);
    }
  };

  const confirmCode = async () => {
    await fetch(A_URL + '/api/auth/verify-otp', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + TOKEN,
      },
      body: JSON.stringify({
        otp: interval,
      }),
    })
      .then(res => res.json())
      .then(json => {
        AsyncStorage.setItem('TOKEN', json.token);
        console.log('json.data.id', json.data.id);
        AsyncStorage.setItem('userPhoneNumber', json.data.phoneNumber);
        AsyncStorage.setItem('userId', JSON.stringify(json.data.id));
        AsyncStorage.setItem('isActive', JSON.stringify(json.data.isActive));
        AsyncStorage.setItem('isInvited', JSON.stringify(json.data.isInvited));
        if (json.data.isActive) {
          navigation.navigate('Chats');
        } else {
          navigation.navigate('Invite');
        }
        storeData(true);
      })
      .catch(error => {
        console.error(error);
        storeData(false);
      });
  };

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('veryfied', value + '');
    } catch (e) {
      // saving error
    }
  };

  return (
    <View style={styles.otpContainer}>
      <Text style={styles.otpHeading}>Enter confirmation code</Text>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.containerAvoidingView}>
        <Text style={styles.textTitle}>
          Enter a six digit confirmation code
        </Text>
        <View>
          <TextInput
            ref={input => (textInput = input)}
            onChangeText={onChangeText}
            style={{width: 0, height: 0}}
            value={interval}
            maxLength={lengthInput}
            returnKeyType="done"
            keyboardType="number-pad"
          />

          <View style={styles.containerInput}>
            {Array(lengthInput)
              .fill()
              .map((data, index) => (
                <View style={styles.cellView} key={index}>
                  <Text
                    style={styles.cellText}
                    onPress={() => textInput.focus()}>
                    {interval && interval.length > 0 ? interval[index] : ''}
                  </Text>
                </View>
              ))}
          </View>
        </View>
        <View style={styles.btnContainer}>
          <Text style={styles.timerText} onPress={resend}>
            Didn't recieve? Resending code in {countdown} seconds
          </Text>
          <TouchableOpacity
            style={styles.numBtn}
            onPress={() => {
              confirmCode();
            }}>
            <Text style={styles.btntext}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  otpContainer: {
    flex: 1,
  },
  otpHeading: {
    top: hp('12%'),
    color: '#128C7E',
    fontSize: hp('4.0%'),
    marginLeft: wp('5%'),
    fontWeight: 'bold',
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellView: {
    paddingVertical: 15,
    width: 55,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2.5,
    borderRadius: 5,
    borderColor: '#128C7E3D',
  },
  cellText: {
    textAlign: 'center',
    fontSize: hp('2.2%'),
  },
  textTitle: {
    color: '#000',
    fontSize: hp('2%'),
    marginBottom: hp('3%'),
    textAlign: 'left',
    left: wp('5%'),
    top: hp('2%'),
  },
  timerText: {
    color: '#000',
    fontSize: hp('2%'),
    marginBottom: hp('3%'),
    textAlign: 'left',
    left: wp('5%'),
    top: hp('2%'),
  },
  numBtn: {
    top: hp('4%'),
    backgroundColor: '#128C7E',
    padding: 12,
    width: wp('40%'),
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    left: wp('30%'),
  },
  btntext: {
    color: '#ffff',
    textAlign: 'center',
    fontSize: hp('2%'),
    fontWeight: '700',
  },
  containerAvoidingView: {
    flex: 1,
    top: hp('20%'),
  },
});
