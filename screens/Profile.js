import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
    Button,
    Image, Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import CameraPopup from '../components/CameraPopup';
import {URL} from '@env';
import {launchCamera,launchImageLibrary} from "react-native-image-picker";
const Profile = () => {
    const navigation = useNavigation();
    const [phone, setPhone] = useState('');
    const [bio, setBio] = useState('');
    const [bioEdit, setBioEdit] = useState(true);
    const [profileImage, setProfileImage] = useState(null);
    const [profileImageData, setProfileImageData] = useState(null);

    const [popupVisible, setPopupVisible] = useState(false);

    var token = ''

    const checkData =async()=>{
        try{
            token = await AsyncStorage.getItem('TOKEN');
            token !== null ? getProfileData(): navigation.navigate("Logout")
        }catch (e){
            console.log(e)
        }
    }
    useEffect(() => {
        checkData()

    }, []);

    const logOut = async (title) => {
        let keys = ['TOKEN', 'IS_ACTIVE'];
        AsyncStorage.multiRemove(keys, (err) => {
            navigation.navigate(title)
            // keys k1 & k2 removed, if they existed
            // do most stuff after removal (if you want)
        });

    }
    const getProfileData = async () => {
        // console.log(URL)
        await fetch(URL+'/api/auth/me', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        })
            .then(res => res.json())
            .then(json => {
                setPhone(json.data.phoneNumber);
                AsyncStorage.setItem('userPhoneNumber', json.data.phoneNumber);
                AsyncStorage.setItem('userId', json.data.id + '');
                AsyncStorage.setItem('userProfile', (JSON.parse(json.data.image)).location);
                setProfileImage((JSON.parse(json.data.image)).location)
                setBio(json.data.bio);
            })
            .catch(error => {
                console.error(error);
            });
    };

    // useEffect(() => {
    //   setProfileData()
    // }, [bio])

    const [photo, setPhoto] = React.useState(null);

    const handleChoosePhoto = () => {
        try {
            launchImageLibrary({
                noData: true,
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 200,
                maxWidth: 200,
            }, (response) => {
                if (response.uri) {
                    setPhoto( response )
                }
            })
        } catch (error) {
            console.log(error)
        }

    };


    const createFormData = (photo, body = {}) => {
        console.log(photo.assets[0].fileName)
        let formdata = new FormData();
        formdata.append('firstName', 'Test');
        formdata.append('lastName', 'Test');
        formdata.append('bio', bio);
        // formdata.append('image', profileImageData);
        formdata.append('image', {
            name: photo.assets[0].fileName,
            type: photo.assets[0].type,
            uri: Platform.OS === 'ios' ? photo.assets[0].uri.replace('file://', '') : photo.assets[0].uri,
        });
        Object.keys(body).forEach((key) => {
            formdata.append(key, body[key]);
        });

        console.log(formdata._parts[3][1]);
        console.log("formdata");
        return formdata;
    };

    const setProfileData = async () => {
        const token = await AsyncStorage.getItem('TOKEN');

        try{
            const ourData = await fetch(`${URL}/api/auth/profile`, {
                method: 'POST',
                headers: {
                    'Content-Type':  'application/json',
                    Authorization: 'Bearer ' + token,
                },
                body: createFormData(photo),
            })
            console.log("sadad",ourData)
        }catch (e) {
            console.log(e)
        }
            // .then(res => {
            //     console.log(res)
            //     res.json()
            // })
            // .then(json => {
            //     console.log("JSON"+json);
            // })
            // .catch(error => {
            //     console.error("FINAL"+error);
            // });
    };
    const Log = ({title, image, disable,navigate}) => {
        return (
            <TouchableOpacity
                onPress={() => logOut(navigate)}
                disabled={disable}
                style={styles.row}>
                <Image style={styles.icon} source={image} resizeMode={'contain'}/>
                <Text style={styles.title}>{title}</Text>
            </TouchableOpacity>
        );
    };
    const Title = ({title, image, disable}) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate(title)}
                disabled={disable}
                style={styles.row}>
                <Image style={styles.icon} source={image} resizeMode={'contain'}/>
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
                            source={profileImage!==null ? {uri:profileImage}:require('../assets/onboard/user.png')}
                            resizeMode={'cover'}
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
                            placeholder={'E.g: 32141929012'}
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
                            blurOnSubmit={true}
                            onSubmitEditing={() => setProfileData()}
                            onChangeText={val => {
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

                        <Log
                            navigate={'onboarding'}
                            title={'Logout'}
                            image={require('../assets/onboard/logout.png')}
                        />
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            {photo && (
                                <>
                                    <Image
                                        style={styles.user}
                                        source={{ uri: photo.uri }}
                                        resizeMode={'cover'}
                                    />
                                    <Button title="Upload Photo" onPress={setProfileData} />

                                </>
                            )}
                            <Button title="Choose Photo" onPress={handleChoosePhoto} />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <CameraPopup
                visible={popupVisible}
                selectedImage={img => {
                    setPopupVisible(false);
                    setProfileImageData(img!==null?img:null);
                    setProfileImage(img!==null?img.assets[0].uri:null);
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
