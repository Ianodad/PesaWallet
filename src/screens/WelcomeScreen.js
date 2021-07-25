import React, {useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import Button from '../components/Button/Button';
import Text from '../components/Text';
import Screen from '../components/Screen';
// import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';

import {Dimensions} from 'react-native';
import defaultStyles from '../config/styles';
import SocialLogin from './Auth/SocialLoginScreen';

const {width, height} = Dimensions.get('window');

const WelcomeScreen = ({navigation}) => {
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);

  const toggleLoginModal = () => {
    setLoginModalVisible(!isLoginModalVisible);
    setCreateModalVisible(false);
  };
  const toggleCreateModal = () => {
    setLoginModalVisible(false);
    setCreateModalVisible(!isCreateModalVisible);
  };

  return (
    <Screen style={styles.container} Gradient>
      <View style={styles.main} />
      <View style={styles.logoDescription}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={require('../assets/logo/logoW.png')}
        />
      </View>
      <SocialLogin navigation={navigation} />
      {/* <View style={styles.authButtons}>
        <Button
          buttonType
          style={styles.login}
          color={'white'}
          title="Login"
          textStyle={styles.text}
          onPress={toggleLoginModal}
          onPress={() => navigation.navigate('Login')}
        />
        <Button
          buttonType
          style={styles.create}
          textStyle={styles.text}
          color={'white'}
          title="Create Account"
          onPress={toggleCreateModal}
          onPress={() => navigation.navigate('Create')}
        />
      </View> */}
      <Modal isVisible={isLoginModalVisible}>
        <View style={{flex: 1}}>
          <Text>Login In </Text>
          <Button title="Hide Login modal" onPress={toggleLoginModal} />
        </View>
      </Modal>
      <Modal isVisible={isCreateModalVisible}>
        <View style={{flex: 1}}>
          <Text>Create User </Text>
          <Button title="Hide User" onPress={toggleCreateModal} />
        </View>
      </Modal>
    </Screen>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    // flex: 1,
    flexDirection: 'row',
  },
  logoDescription: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
  },
  authButtons: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  login: {
    alignItems: 'center',
    backgroundColor: 'white',
    color: 'blue',
    marginVertical: 10,
    width: width - 90,
    height: height / 15,
  },
  create: {
    width: '80%',
    marginVertical: 10,
    alignItems: 'center',
  },
  text: {
    color: 'blue',
  },
  linearGradient: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    // height: 200,
    // width: 350,
  },
});
