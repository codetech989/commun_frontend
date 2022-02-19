import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {URL} from '@env';
import {PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';
import Toast from 'react-native-simple-toast';

const InviteList = () => {
    const [visible, setVisible] = useState(false);
    const [isInvited, setInvited] = useState(false);
    const [myContacts, setMyContacts] = useState([]);
    const [communeUsers, setCommuneUsers] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);

    const navigation = useNavigation();

    useEffect(() => {
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
                return o1.number === o2.number; // return the ones with equal id
            });
        });
        var filteredArrayC = communeNumbers.filter(function (o1) {
            return myPhoneNumbers.some(function (o2) {
                return o1.number === o2.number; // return the ones with equal id
            });
        });
        const merge = [];
        for (let i = 0; i < filteredArrayP.length; i++) {
            let a = {...filteredArrayP[i], ...filteredArrayC[i]};
            merge.push(a);
        }
        setFilteredContacts(merge);
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
                        navigation.goBack()
                        console.log('denied');
                    }
                }),
            )
            .catch(error => {
                console.log(error);
            });
    };

    const inviteUser = async () => {
        const token = await AsyncStorage.getItem('TOKEN');
        await fetch(URL + '/api/auth/request-invite', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                requestedUserId: 2,
            }),
        })
            .then(res => res.json())
            .then(json => {
                // if (json.code == 200) {
                // console.log(json);
                Toast.show(json.message);
                // }
            })
            .catch(error => {
                console.error(error);
                Toast.show('error');
            });
    };
    const getUsers = async () => {
        const token = await AsyncStorage.getItem('TOKEN');
        await fetch(URL + '/api/client/all', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(json => {
                if (json.code == 200) {
                    setCommuneUsers(json.data);
                }
            })
            .catch(error => {
                console.error(error);
                Toast.show('error');
            });
    };
    const getInvited = async () => {
        const invited = await AsyncStorage.getItem('isInvited');
        setInvited(JSON.parse(invited));
    };

    const renderItem = (item, index) => {
        console.log(item)
        return (
            <>
                <TouchableOpacity onPress={() => inviteUser(item.phoneNumbers[0].number)}>
                    <View style={{
                        marginTop: 15,
                        display: 'flex',
                        marginLeft: 15,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <View
                            style={{
                                flex: 0.1,
                                // width: 30,
                                // height: 30,
                                borderRadius: 15,
                                borderWidth: 1,
                                borderColor: '#128C7E',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text>+</Text>
                        </View>
                        <View style={{flex: 0.8, display: 'flex', flexDirection: 'row'}}>
                            <Text style={{fontSize: 14, color: '#000000', fontWeight: '500', flex: 0.6}}>
                                {item.name}
                            </Text>
                            <Text style={{fontSize: 14, color: '#000000', fontWeight: '500', flex: 0.5}}>
                                {item.countryCode} {item.number}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </>
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
                <Text>Contact list</Text>
            </View>

            <View style={styles.container}>
                <Text>Invite to Commune</Text>
                <View style={{flexDirection: 'row', width: '100%', marginTop: 20}}>
                    <FlatList
                        data={filteredContacts}
                        contentContainerStyle={{marginTop: 15, paddingBottom: 15}}
                        renderItem={({item, index}) => renderItem(item, index)}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(_, index) => index.toString()}
                    />

                </View>
            </View>
        </SafeAreaView>
    );
};

export default InviteList;

const styles = StyleSheet.create({
    safearea: {
        flex: 1,
    },
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    back: {
        width: 24,
        height: 24,
        marginEnd: 20,
        // tintColor: '#FFFFFF',
    },
    button: {
        paddingVertical: 5,
        marginBottom: 10,
        backgroundColor: '#128C7E',
        // width: '40%',
        alignItems: 'center',
        borderRadius: 15,
        marginEnd: 20,
    },
    buttonWhite: {
        paddingVertical: 5,
        marginBottom: 10,
        // width: '40%',
        alignItems: 'center',
        borderRadius: 15,
        marginEnd: 20,
    },
    itemTitle: {fontWeight: '400', fontSize: 12, color: '#FFFFFF'},
    itemTitleDark: {fontWeight: '400', fontSize: 12},
    plusContainer: {
        height: 16,
        width: 16,
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 10,
        top: 10,
    },
    plusIcon: {width: 6, height: 6, tintColor: '#128C7E'},
});
