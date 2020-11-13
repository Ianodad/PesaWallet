import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Button from '../components/Button/Button';
import Text from '../components/Text';
import Screen from '../components/Screen';
// import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';

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
        <Text>Logo</Text>
      </View>
      <View style={styles.authButtons}>
        <Button
          style={styles.login}
          width="50%"
          color={'white'}
          title="Login"
          textStyle={styles.text}
          onPress={toggleLoginModal}
          onPress={() => navigation.navigate('Login')}
        />
        <Button
          textStyle={styles.text}
          color={'white'}
          width="50%"
          title="Create Account"
          onPress={toggleCreateModal}
          onPress={() => navigation.navigate('Create')}
        />
      </View>
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
    // justifyContent: 'center',
    // flexDirection: 'col',
    // alignItems: 'center',
  },
  main: {
    flex: 1,
    flexDirection: 'row',
  },
  logoDescription: {
    flex: 1,
    alignItems: 'center',
  },
  authButtons: {
    flex: 1,
    // width:'70%',
    flexDirection: 'column',
  },
  login: {
    backgroundColor: 'white',
    color: 'blue',
    marginVertical: 10,
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
