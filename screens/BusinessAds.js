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
  ScrollView,
} from 'react-native';

const ADS = [
  {
    name: 'Fashion',
    data: [
      {
        id: 1,
        icon: require('../assets/home/rolex.png'),
        name: 'Rolex',
      },
      {
        id: 2,
        icon: require('../assets/home/vogue.png'),
        name: 'Vogue',
      },
      {
        id: 3,
        icon: require('../assets/home/gucci.png'),
        name: 'Gucci',
      },
      {
        id: 4,
        icon: require('../assets/home/prada.png'),
        name: 'Prada',
      },
    ],
  },
  {
    name: 'Food & Drink',
    data: [
      {
        id: 1,
        icon: require('../assets/home/rolex.png'),
        name: 'Rolex',
      },
      {
        id: 2,
        icon: require('../assets/home/vogue.png'),
        name: 'Vogue',
      },
      {
        id: 3,
        icon: require('../assets/home/gucci.png'),
        name: 'Gucci',
      },
      {
        id: 4,
        icon: require('../assets/home/prada.png'),
        name: 'Prada',
      },
    ],
  },
  {
    name: 'Entertaiment',
    data: [
      {
        id: 1,
        icon: require('../assets/home/rolex.png'),
        name: 'Rolex',
      },
      {
        id: 2,
        icon: require('../assets/home/vogue.png'),
        name: 'Vogue',
      },
      {
        id: 3,
        icon: require('../assets/home/gucci.png'),
        name: 'Gucci',
      },
      {
        id: 4,
        icon: require('../assets/home/prada.png'),
        name: 'Prada',
      },
    ],
  },
];

const BusinessAds = ({navigation}) => {
  const renderItem = (item, index) => {
    return (
      <View>
        <Text
          style={{
            color: '#000000',
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 35,
            marginLeft: 25,
          }}>
          {item.name}
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{flexDirection: 'row', alignItems: 'center'}}>
          {item.data.map((data_item, i) => {
            return (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                  marginHorizontal: 20,
                }}>
                <Image
                  source={data_item.icon}
                  style={{width: 85, height: 85}}
                  resizeMode="cover"
                />
                <Text
                  style={{
                    paddingTop: 10,
                    color: '#454545',
                    fontWeight: '500',
                    fontSize: 14,
                  }}>
                  {data_item.name}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.back}
            source={require('../assets/home/ic_back.png')}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          marginLeft: 20,
          color: '#000000',
          fontWeight: 'bold',
          fontSize: 16,
        }}>
        Recommend a Post
      </Text>
      <View style={styles.searchSection}>
        <Image
          source={require('../assets/home/ic_search.png')}
          style={{tintColor: '#128C7E', width: 20, height: 20}}
          resizeMode="contain"
        />
        <TextInput
          style={styles.input}
          placeholder="Search for Category"
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={{flex: 1}}>
        <FlatList
          data={ADS}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{marginTop: 15}}
          renderItem={({item, index}) => renderItem(item, index)}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default BusinessAds;

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
  searchSection: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderColor: '#128C7E',
    marginTop: 12,
    alignSelf: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(18,140,126,0.15)',
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    color: '#424242',
  },
});
