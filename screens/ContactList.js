import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Dimensions,
  PermissionsAndroid,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import Contacts from 'react-native-contacts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {A_URL} from '@env';
const ContactList = ({navigation}) => {
  const [myContacts, setMyContacts] = useState([]);
  const [communeUsers, setCommuneUsers] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [filteredNonContacts, setFilteredNonContacts] = useState([]);
  const renderItem = (item, index) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Chats')}>
        <View style={{marginTop: 15, marginLeft: 15}}>
          <Text style={{fontSize: 14, color: '#000000', fontWeight: '500'}}>
            {item.name}
          </Text>
          <Text style={{fontSize: 14, color: '#000000', fontWeight: '500'}}>
            {item.countryCode} {item.number}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    console.log("asd")
    getContacts();
    getUsers();
    // getInvited();
  }, []);
  useEffect(() => {
    const communeNumbers = [];
    const myPhoneNumbers = [];
    for (const user of communeUsers) {
      const userObj = {};
      userObj.number = user.phoneNumber;
      userObj.id = user.id;
      userObj.countryCode = user.countryCode;
      userObj.isActive = user.isActive;
      communeNumbers.push(userObj);
    }
    for (const contact of myContacts) {
      for (const numberObj of contact.phoneNumbers) {
        let number = numberObj.number.replace(/\D/g, '');
        number = number.slice(-10);
        const myContactsObj = {};
        myContactsObj.name = contact.displayName;
        myContactsObj.number = number;
        myPhoneNumbers.push(myContactsObj);
      }
    }
    var filteredArrayP = myPhoneNumbers.filter(function (o1) {
      return communeNumbers.some(function (o2) {
        return o1.number === o2.number && o2.isActive === true; // return the ones with equal id
      });
    });
    //
    var filteredArrayC = communeNumbers.filter(function (o1) {
      return myPhoneNumbers.some(function (o2) {
        return o1.number === o2.number && o1.isActive === true; // return the ones with equal id
      });
    });
    const merge = [];
    for (let i = 0; i < filteredArrayP.length; i++) {
      let a = {...filteredArrayP[i], ...filteredArrayC[i]};
      merge.push(a);
    }
    var filteredArrayNonP = myContacts.filter(function (n) {
      for (var i = 0; i < communeNumbers.length; i++) {
        let number = n.phoneNumbers[0].number.replace(/\D/g, '');
        number = number.slice(-10);
        if (number === communeNumbers[i].number) {
          return false;
        }
      }
      return true;
    });

    setFilteredContacts(merge);
    setFilteredNonContacts(filteredArrayNonP);
  }, [myContacts, communeUsers]);

  const getContacts = async () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Allow',
    })
      .then(
        Contacts.checkPermission().then(permission => {
          // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
          if (permission === 'undefined') {
            Contacts.requestPermission().then(permission => {
              // ...
            });
          }
          if (permission === 'authorized') {
            Contacts.getAll().then(contacts => {
              // contacts returned
              setMyContacts(contacts);
            });
          }
          if (permission === 'denied') {
            // x.x
            console.log('denied');
          }
        }),
      )
      .catch(error => {
        console.log(error);
      });
  };

  const getUsers = async () => {
    const token = await AsyncStorage.getItem('TOKEN');
    await fetch(A_URL + '/api/client/all', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.code == 200) {
          console.log('users', json.data);
          setCommuneUsers(json.data);
        }
      })
      .catch(error => {
        console.error(error);
        Toast.show('error');
      });
  };

  const sendInvite = async phoneNumber => {
    console.log(phoneNumber);
    const token = await AsyncStorage.getItem('TOKEN');
    await fetch(A_URL + '/api/auth/invite-contact', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber: phoneNumber,
      }),
    })
      .then(res => res.json())
      .then(json => {
        Toast.show(json.message);
      })
      .catch(error => {
        console.error(error);
        Toast.show('error');
      });
  };
  const renderInviteItem = (item, index) => {
    return (
      <View
        style={{
          marginTop: 15,
          marginLeft: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <View>
          <Text style={{fontSize: 14, color: '#000000', fontWeight: '500'}}>
            {item.displayName}
          </Text>
          <Text style={{fontSize: 14, color: '#000000', fontWeight: '500'}}>
            {item.phoneNumbers[0].number}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => sendInvite(item.phoneNumbers[0].number)}>
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              borderWidth: 1,
              borderColor: '#128C7E',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>+</Text>
          </View>
        </TouchableOpacity>
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
          Contact List
        </Text>
      </View>

      <View style={{flex: 1, marginTop: 10}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 0.5}}>
            <Text
              style={{
                color: '#000000',
                fontWeight: '600',
                fontSize: 16,
                alignSelf: 'center',
              }}>
              Available on Commune
            </Text>
            <FlatList
              data={filteredContacts}
              contentContainerStyle={{marginTop: 15, paddingBottom: 15}}
              renderItem={({item, index}) => renderItem(item, index)}
              showsVerticalScrollIndicator={false}
              keyExtractor={(_, index) => index.toString()}
            />
          </View>
          <View style={{flex: 0.5}}>
            <Text
              style={{
                color: '#000000',
                fontWeight: '600',
                fontSize: 16,
                alignSelf: 'center',
              }}>
              Invite to Commune
            </Text>
            <FlatList
              data={filteredNonContacts}
              contentContainerStyle={{marginTop: 15, paddingBottom: 15}}
              renderItem={({item, index}) => renderInviteItem(item, index)}
              showsVerticalScrollIndicator={false}
              keyExtractor={(_, index) => index.toString()}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ContactList;

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
