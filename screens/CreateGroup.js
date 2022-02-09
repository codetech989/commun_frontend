import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';

const USERS = [
  {
    id: 1,
    name: 'Adekunle Ayo',
    status: 'No worries',
  },
  {
    id: 2,
    name: 'Adekunle Ayo',
    status: 'Jesus saves',
  },
  {
    id: 3,
    name: 'Bulus Josh',
    status: 'better late than never',
  },
  {
    id: 4,
    name: 'Bulus Josh',
    status: 'busy',
  },
  {
    id: 5,
    name: 'Catherine',
    status: 'typing...',
  },
  {
    id: 6,
    name: 'Catherine',
    status: 'satisfaction',
  },
  {
    id: 7,
    name: 'Adekunle Ayo',
    status: 'No worries',
  },
  {
    id: 8,
    name: 'Adekunle Ayo',
    status: 'No worries',
  },
  {
    id: 9,
    name: 'Adekunle Ayo',
    status: 'No worries',
  },
  {
    id: 10,
    name: 'Adekunle Ayo',
    status: 'No worries',
  },
];

const CreateGroup = ({navigation}) => {
  const renderItem = (item, index) => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center', margin: 10}}>
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: '#C4C4C4',
            borderRadius: 25,
          }}
        />
        <View style={{marginLeft: 15, width: '65%'}}>
          <Text style={{color: '#000000', fontSize: 14, fontWeight: '600'}}>
            {item.name}
          </Text>
          <Text
            style={{
              color: '#000000',
              fontSize: 12,
              fontWeight: '600',
              paddingVertical: 10,
            }}>
            {item.status}
          </Text>
        </View>
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
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: '#000000', fontWeight: 'bold', fontSize: 14}}>
            Create Group
          </Text>
          <Text style={{color: '#000000', fontWeight: '600', fontSize: 10}}>
            Add members
          </Text>
        </View>
        <TextInput style={styles.inputView} />
        <TouchableOpacity
          onPress={() => navigation.navigate('Group Detail')}
          activeOpacity={0.5}
          style={styles.submitView}>
          <Image
            source={require('../assets/home/ic_arrow_up.png')}
            style={{width: 20, height: 20}}
          />
        </TouchableOpacity>
      </View>

      <View style={{flex: 1, marginTop: 10}}>
        <FlatList
          data={USERS}
          renderItem={({item, index}) => renderItem(item, index)}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default CreateGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    marginLeft: 10,
  },
  back: {
    width: 24,
    height: 24,
    marginEnd: 2,
    // tintColor: '#FFFFFF',
  },
  inputView: {
    width: '48%',
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#128C7E',
    marginLeft: 10,
    paddingLeft: 10,
  },
  submitView: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#128C7E',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
