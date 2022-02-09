import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';

const GROUP_MEMBERS = [
  {
    id: 1,
    image: null,
    name: 'Akintola  Shobowale',
  },
  {
    id: 2,
    image: null,
    name: 'Attention Seeker',
  },
  {
    id: 3,
    image: null,
    name: 'Martins',
  },
  {
    id: 4,
    image: null,
    name: 'Akintola  Shobowale',
  },
  {
    id: 5,
    image: null,
    name: 'Martins',
  },
];

const GroupDetail = ({navigation}) => {
  const renderItem = (item, index) => {
    return (
      <View
        style={{
          width: Dimensions.get('window').width / 4,
          marginTop: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: '#C4C4C4',
            borderRadius: 25,
          }}
        />
        <Text
          style={{
            fontWeight: '600',
            color: '#000000',
            fontSize: 12,
            paddingTop: 10,
            paddingLeft: 4,
          }}
          numberOfLines={1}>
          {item.name}
        </Text>
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
          Create Group
        </Text>
      </View>

      <View style={{flex: 1, marginTop: 20}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '90%',
            alignSelf: 'center',
          }}>
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: '#C4C4C4',
              borderRadius: 25,
            }}
          />
          <TextInput
            style={{
              width: '75%',
              height: 60,
              borderBottomWidth: 2,
              borderBottomColor: '#C4C4C4',
              marginLeft: 15,
            }}
          />
        </View>
        <Text
          style={{
            color: '#000000',
            fontWeight: '500',
            fontSize: 16,
            paddingLeft: 10,
            paddingTop: 25,
            marginLeft: 65,
          }}>
          Group Description
        </Text>
        <TextInput
          style={{
            width: '70%',
            height: 80,
            alignSelf: 'center',
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#C4C4C4',
            marginTop: 30,
            marginLeft: 45,
            paddingLeft: 15,
          }}
        />

        <Text
          style={{
            paddingTop: 35,
            paddingLeft: 25,
            fontSize: 14,
            color: '#000000',
            fontWeight: '500',
          }}>
          Group members
        </Text>
        <View style={{marginTop: 20, marginLeft: 10, marginRight: 10}}>
          <FlatList
            data={GROUP_MEMBERS}
            showsHorizontalScrollIndicator={false}
            numColumns={4}
            renderItem={({item, index}) => renderItem(item, index)}
            keyExtractor={(_, index) => index.toString()}
          />
        </View>

        <View
          style={{
            width: '40%',
            height: 50,
            backgroundColor: '#128C7E',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
            alignSelf: 'center',
            marginTop: 25,
          }}>
          <Text style={{fontSize: 14, color: '#FFFFFF', fontWeight: '600'}}>
            Create Group
          </Text>
        </View>
      </View>
    </View>
  );
};

export default GroupDetail;

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
