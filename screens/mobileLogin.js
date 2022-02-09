import React, {useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import PhoneInput from 'react-native-phone-number-input';
import Navigation from '../navigation/navigation';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {A_URL} from '@env';

const MobileLogin = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('92');

  const phoneInput = useRef < PhoneInput > null;

  const sendOtp = async () => {
    console.log(A_URL)
    await fetch(A_URL + '/api/auth/send-otp', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber: phone,
        countryCode: '+' + code,
      }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.code == 200) {
          console.log(json);
          Toast.show(json.data.message);
          AsyncStorage.setItem('phone', phone);
          navigation.navigate('otp', {
            TOKEN: json.data.token,
          });
        } else {
          Toast.show(json.error);
          navigation.navigate('otp');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={styles.mobileContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.headingColor}>What's your Phone Number</Text>
        <Text style={styles.paraColor}>
          A confirmation code will be sent to this number
        </Text>
      </View>
      <View style={styles.phoneNumberContainer}>
        <PhoneInput
          defaultValue={phone}
          defaultCode="PK"
          layout="first"
          onChangeText={text => {
            setPhone(text);
          }}
          onChangeCountry={code => setCode(code.callingCode)}
          withDarkTheme
          withShadow
          autoFocus
        />
        <TouchableOpacity
          style={styles.numBtn}
          onPress={() => {
            sendOtp();
            console.log('PHONE ', phone + ',' + code);
          }}>
          <Text style={styles.btnText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MobileLogin;

const styles = StyleSheet.create({
  mobileContainer: {
    flex: 1,
  },
  textContainer: {
    top: hp('10%'),
    marginLeft: wp('4%'),
    padding: 12,
    // alignItems: 'center'
  },
  headingColor: {
    color: '#128C7E',
    fontSize: hp('4.0%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
  },
  paraColor: {
    fontSize: hp('2.1%'),
    fontWeight: '600',
  },
  phoneNumberContainer: {
    top: hp('27%'),
    alignItems: 'center',
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
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: hp('2%'),
    fontWeight: '700',
  },
});
