import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';

const SPACES = [
  {
    name: 'Recent',
    data: [
      {
        id: 1,
        icon: require('../assets/home/rolex.png'),
        name: 'Akintola  Shobowale',
        time: 'Just now',
      },
      {
        id: 2,
        icon: require('../assets/home/vogue.png'),
        name: 'Attention Seeker',
        time: '2 minutes ago',
      },
      {
        id: 3,
        icon: require('../assets/home/gucci.png'),
        name: 'Martins',
        time: '2 minutes ago',
      },
      {
        id: 4,
        icon: require('../assets/home/prada.png'),
        name: 'David Atte',
        time: '10 minutes ago',
      },
      {
        id: 5,
        icon: require('../assets/home/gucci.png'),
        name: 'Martins',
        time: '2 minutes ago',
      },
      {
        id: 6,
        icon: require('../assets/home/prada.png'),
        name: 'David Atte',
        time: '10 minutes ago',
      },
    ],
  },
  {
    name: 'Viewed',
    data: [
      {
        id: 1,
        icon: require('../assets/home/rolex.png'),
        name: 'Akintola  Shobowale',
        time: 'Just now',
      },
      {
        id: 2,
        icon: require('../assets/home/vogue.png'),
        name: 'Attention Seeker',
        time: '2 minutes ago',
      },
      {
        id: 3,
        icon: require('../assets/home/gucci.png'),
        name: 'Martins',
        time: '2 minutes ago',
      },
      {
        id: 4,
        icon: require('../assets/home/prada.png'),
        name: 'David Atte',
        time: '10 minutes ago',
      },
      {
        id: 5,
        icon: require('../assets/home/gucci.png'),
        name: 'Martins',
        time: '2 minutes ago',
      },
      {
        id: 6,
        icon: require('../assets/home/prada.png'),
        name: 'David Atte',
        time: '10 minutes ago',
      },
    ],
  },
  {
    name: 'Archived',
    data: [
      {
        id: 1,
        icon: require('../assets/home/rolex.png'),
        name: 'Akintola  Shobowale',
        time: 'Just now',
      },
      {
        id: 2,
        icon: require('../assets/home/vogue.png'),
        name: 'Attention Seeker',
        time: '2 minutes ago',
      },
      {
        id: 3,
        icon: require('../assets/home/gucci.png'),
        name: 'Martins',
        time: '2 minutes ago',
      },
      {
        id: 4,
        icon: require('../assets/home/prada.png'),
        name: 'David Atte',
        time: '10 minutes ago',
      },
      {
        id: 5,
        icon: require('../assets/home/gucci.png'),
        name: 'Martins',
        time: '2 minutes ago',
      },
      {
        id: 6,
        icon: require('../assets/home/prada.png'),
        name: 'David Atte',
        time: '10 minutes ago',
      },
    ],
  },
];

const SpacesScreen = ({navigation}) => {
  useEffect(() => {
    getSpaces();
  }, []);

  const getSpaces = async () => {
    const token = await AsyncStorage.getItem('TOKEN');

    await fetch('http://13.59.21.118:3000/api/space', {
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
      });
  };

  const renderSubItem = (data_item, index) => {
    return (
      <View
        style={{
          width: Dimensions.get('window').width / 4,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('SpaceView', {
              user: data_item,
            })
          }>
          <View
            style={{
              borderStyle: 'dashed',
              width: 58,
              height: 58,
              borderRadius: 31,
              borderWidth: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={data_item.icon}
              style={{width: 52, height: 52}}
              resizeMode="cover"
            />
          </View>
        </TouchableOpacity>
        <Text
          style={{
            paddingTop: 10,
            color: '#454545',
            fontWeight: '600',
            fontSize: 14,
            paddingLeft: 5,
          }}
          numberOfLines={1}>
          {data_item.name}
        </Text>
      </View>
    );
  };

  const renderItem = (item, index) => {
    return (
      <View>
        {item.name == 'Live' ? (
          <Image
            source={item.icon}
            style={{marginTop: 20, marginLeft: 25, width: 40, height: 40}}
          />
        ) : (
          <Text
            style={{
              color: '#000000',
              fontSize: 16,
              fontWeight: 'bold',
              marginTop: 20,
              marginLeft: 25,
            }}>
            {item.name}
          </Text>
        )}
        <FlatList
          data={item.data}
          style={{
            backgroundColor:
              item.name == 'Archived' ? 'rgba(18,140,126,0.19)' : 'white',
            marginTop: item.name == 'Archived' ? 10 : 1,
          }}
          showsHorizontalScrollIndicator={false}
          numColumns={4}
          renderItem={({item, index}) => renderSubItem(item, index)}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    );
  };

  const renderSeparatorView = () => {
    return (
      <View
        style={{
          height: 1,
          width: '90%',
          alignSelf: 'center',
          marginTop: 10,
          backgroundColor: '#C4C4C4',
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          height: 60,
          marginTop: 15,
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
          <View style={{paddingLeft: 15}}>
            <Text style={{fontSize: 14, color: '#000000', fontWeight: '800'}}>
              My Spaces
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
        <FlatList
          data={SPACES}
          contentContainerStyle={{paddingBottom: 25}}
          renderItem={({item, index}) => renderItem(item, index)}
          ItemSeparatorComponent={renderSeparatorView}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default SpacesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
