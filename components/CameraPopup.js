import React from 'react';
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import {connect} from 'react-redux';
// import {Header, Image} from '../../../components';
// import {theme} from '../../../constants/colors';
// import * as VALIDATION from '../../../constants/validation';
// import {showAlert} from '../../../utility/util';
// import * as IMAGE from './../../../assets/images';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const CameraPopup = props => {
  const {visible, selectedImage} = props;

  return (
    <SafeAreaView style={styles.safearea}>
      <Modal visible={visible} transparent>
        <View style={styles.grayBox}>
          <View style={styles.whiteBox}>
            <Text style={styles.titleText}>Choose any one:</Text>
            <TouchableOpacity
              onPress={() => {
                launchCamera(
                  {mediaType: 'photo', cameraType: 'front'},
                  response => {
                    // console.log('Selected Camera Image', response);
                    selectedImage(response.uri);
                  },
                );
              }}>
              <Text style={styles.text}>Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                launchImageLibrary({mediaType: 'photo'}, response => {
                  // console.log('Selected Gallery Image', response);
                  selectedImage(response.uri);
                });
              }}>
              <Text style={styles.text}>Open Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // console.log('Selected Gallery Image', response);
                selectedImage('');
              }}>
              <Text style={styles.text}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CameraPopup;

const styles = StyleSheet.create({
  safearea: {backgroundColor: '#00000F'},
  titleText: {fontSize: 15, fontWeight: '600'},
  grayBox: {backgroundColor: 'rgba(100, 100, 100, 0.5)', height: '100%'},
  whiteBox: {
    width: '90%',
    height: 180,
    backgroundColor: 'white',
    borderColor: 'gray',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '80%',
    justifyContent: 'center',
    borderRadius: 20,
  },
  text: {fontSize: 20, marginTop: 20},
});
