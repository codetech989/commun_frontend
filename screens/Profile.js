import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CameraPopup from '../components/CameraPopup';

const Profile = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [bioEdit, setBioEdit] = useState(true);

  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    getProfileData();
  }, []);

  const getProfileData = async () => {
    const token = await AsyncStorage.getItem('TOKEN');
    console.log('TOKEN ', token);
    await fetch('http://13.59.21.118:3000/api/auth/me', {
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

        setPhone(json.data.phoneNumber);
        AsyncStorage.setItem('userPhoneNumber', json.data.phoneNumber);
        AsyncStorage.setItem('userId', json.data.id + '');

        setBio(json.data.bio);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // useEffect(() => {
  //   setProfileData()
  // }, [bio])

  const setProfileData = async () => {
    const token = await AsyncStorage.getItem('TOKEN');
    console.log('TOKEN ', token);
    let formdata = new FormData();
    formdata.append('firstName', 'Test');
    formdata.append('lastName', 'Test');
    formdata.append('bio', bio);
    formdata.append('image', null);

    console.log(formdata);
    await fetch('http://13.59.21.118:3000/api/auth/profile', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formdata,
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const Title = ({title, image, disable}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(title)}
        disabled={disable}
        style={styles.row}>
        <Image style={styles.icon} source={image} resizeMode={'contain'} />
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.back}
            source={require('../assets/onboard/round_back.png')}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
        <Text>Profile</Text>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => setPopupVisible(true)}
            style={styles.imageContainer}>
            <Image
              style={styles.user}
              source={require('../assets/onboard/user.png')}
              resizeMode={'contain'}
            />
            <View style={styles.plusContainer}>
              <Image
                style={styles.plusIcon}
                source={require('../assets/onboard/plus.png')}
                resizeMode={'contain'}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.childContainer}>
            <Title
              title={'Contact'}
              image={require('../assets/onboard/telephone.png')}
              disable
            />
            <TextInput
              placeholder={'E.g: 9999999999'}
              value={phone}
              onChangeText={val => setPhone(val)}
              style={styles.contactInput}
              keyboardType={'number-pad'}
              maxLength={10}
            />
            <Title
              disable
              title={'Bio'}
              image={require('../assets/onboard/info.png')}
            />
            <TextInput
              placeholder={'Not less than 100 words'}
              value={bio}
              returnKeyType="done"
              onSubmitEditing={() => setProfileData()}
              onChangeText={val => {
                setProfileData();
                setBio(val);
              }}
              style={styles.bioInput}
            />
            <Title
              title={'Get Paid'}
              image={require('../assets/onboard/coins.png')}
            />

            <Title
              title={'Settings'}
              image={require('../assets/onboard/setting.png')}
            />

            <Title
              title={'Logout'}
              image={require('../assets/onboard/logout.png')}
            />
          </View>
        </View>
      </ScrollView>
      <CameraPopup
        visible={popupVisible}
        selectedImage={img => {
          setPopupVisible(false);
          // setProfileImage(img);
        }}
      />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    alignItems: 'center',
  },
  row: {flexDirection: 'row', alignItems: 'center', marginTop: 25},
  childContainer: {width: '100%', marginTop: 60},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {fontWeight: '500', fontSize: 14},
  back: {
    width: 24,
    height: 24,
    marginEnd: 20,
    // tintColor: '#FFFFFF',
  },
  plusContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#128C7E',
    borderRadius: 50,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    bottom: 0,
  },
  plusIcon: {width: 20, height: 20, tintColor: '#FFFFFF'},
  user: {
    width: 100,
    height: 100,
  },
  imageContainer: {
    height: 144,
    width: 144,
    backgroundColor: '#128C7E24',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {width: 20, height: 20, marginEnd: 12},
  contactInput: {
    borderWidth: 1,
    borderRadius: 6,
    color: 'black',
    backgroundColor: '#128C7E15',
    borderColor: '#128C7E',
    height: 40,
    width: '50%',
    marginTop: 15,
    textAlign: 'center',
  },
  bioInput: {
    borderWidth: 1,
    borderRadius: 6,
    color: 'black',
    backgroundColor: '#128C7E15',
    borderColor: '#128C7E',
    height: 100,
    width: '100%',
    marginTop: 15,
    textAlignVertical: 'top',
    paddingHorizontal: 16,
    paddingTop: 0,
  },
});
