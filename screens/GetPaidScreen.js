import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

const GetPaidScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={require('../assets/home/ic_logoPocket.png')}
          style={{width: 150, height: 150}}
          resizeMode="contain"
        />
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 25}}>
          <Text>Total earnings</Text>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: '#128C7E',
              marginLeft: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#FFFFFF', fontSize: 16, fontWeight: '500'}}>
              $50
            </Text>
          </View>
        </View>
      </View>
      <View style={{flex: 0.5}}>
        <Text
          style={{
            fontSize: 16,
            color: '#000000',
            fontWeight: '600',
            alignSelf: 'center',
          }}>
          Pocket Id
        </Text>
        <View
          style={{
            width: '80%',
            height: 40,
            borderRadius: 10,
            backgroundColor: 'rgba(18,140,126,0.15)',
            marginTop: 25,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#000000', fontSize: 15}}>2345DANYTI89759</Text>
        </View>
        <View
          style={{
            width: '40%',
            height: 40,
            borderRadius: 20,
            backgroundColor: 'rgba(18,140,126,1)',
            marginTop: 25,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#FFFFFF', fontSize: 15}}>Get Paid</Text>
        </View>
        <Text
          style={{
            color: '#128C7E',
            fontSize: 15,
            alignSelf: 'center',
            fontWeight: '600',
            marginTop: 55,
          }}>
          Download POCKT here
        </Text>
        <View
          style={{
            width: '40%',
            height: 2,
            backgroundColor: '#128C7E',
            alignSelf: 'center',
            marginTop: 15,
          }}
        />
      </View>
    </View>
  );
};

export default GetPaidScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
