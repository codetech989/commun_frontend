import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import InviteExceed from '../components/InviteExceed';
import ContactList from './ContactList';
const Invite = () => {
  const [visible, setVisible] = useState(false);
  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../assets/onboard/commune_logo.png')}
          resizeMode={'contain'}
        />
        <Text style={styles.title}>Commune is an invite only app</Text>
        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Find a current user to invite you
          </Text>
        </TouchableOpacity>
      </View>
      <InviteExceed visible={visible} onPress={() => setVisible(false)} />
    </SafeAreaView>
  );
};

export default Invite;

const styles = StyleSheet.create({
  safearea: {
    backgroundColor: '#128C7E',
    flex: 1,
  },
  container: {
    backgroundColor: '#128C7E',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    fontSize: 20,
    fontWeight: '600',
    color: '#128C7E',
    textAlign: 'center',
  },
  descriptionContainer: {
    marginTop: 124,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 51,
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
  title: {
    fontWeight: '600',
    fontSize: 30,
    color: '#FFFFFF',
    width: '70%',
    textAlign: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    tintColor: '#FFFFFF',
    marginBottom: 100,
  },
});
