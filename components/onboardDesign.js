import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const OnboardDesign = props => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{flex: 1}}
      onPress={props.onPress}>
      <View>
        <View style={styles.imgContainer}>
          <Image
            source={props.Image}
            style={styles.imgStyles}
            resizeMode="contain"
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.contentHeading}>{props.heading}</Text>
          <Text style={styles.contentPara}>{props.Content}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OnboardDesign;

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    top: hp('50%'),
  },
  contentHeading: {
    fontSize: hp('3.6%'),
    fontWeight: 'bold',
    color: '#128C7E',
  },
  contentPara: {
    textAlign: 'center',
    width: wp('95%'),
    fontSize: hp('2%'),
    padding: 12,
    letterSpacing: 0.9,
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    top: hp('25%'),
  },
  imgStyles: {
    width: wp('12%'),
    height: hp('10%'),
  },
});
