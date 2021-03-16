// react libraries
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import {Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
var stringify = require('fast-json-stable-stringify');

// internal components
import Text from '../../components/Text';
import Button from '../../components/Button/Button';
import Screen from '../../components/Screen';

//configure and utils
import {Auth, analytics} from '../../firebase/config';
import defaultStyles from '../../config/styles';

// actions for redux implementation
import {authActions} from '../../_actions';
const {signInWithGoogle, signOut} = authActions;

// others
const {width, height} = Dimensions.get('window');

class SocialLoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    GoogleSignin.configure();
    this.props.signOut();
    // this.signOut();
  }

  // signOut = async () => {
  //   try {
  //     await GoogleSignin.revokeAccess();
  //     await GoogleSignin.signOut();
  //     this.setState({user: ''}); // Remember to remove the user from your app's state as well
  //     await AsyncStorage.setItem('User', '');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  signInWithGoogle = async () => {
    // this.props.signInWithGoogle()
    try {
      await GoogleSignin.hasPlayServices();
      const {user} = await GoogleSignin.signIn();
      console.log(user.id);
      await AsyncStorage.setItem('User', stringify(user));
      this.setState({user});
      this.props.navigation.navigate('OTP', {user: user.id});
    } catch (error) {
      // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      //   // user cancelled the login flow
      // } else if (error.code === statusCodes.IN_PROGRESS) {
      //   // operation (e.g. sign in) is in progress already
      // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      //   // play services not available or outdated
      // } else {
      //   // some other error happened
      // }
    }
  };

  render() {
    return (
      <Screen style={styles.container} Gradient>
        <View style={styles.header}>
          <Text style={styles.title}>Login Screen</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.authButtons}>
            <Button
              buttonType
              style={styles.googlelogin}
              color={'white'}
              title="Login with Google"
              textStyle={styles.text}
              onPress={() => {
                this.props.signInWithGoogle();
              }}
            />
            {/* <Button
          buttonType
          style={styles.create}
          textStyle={styles.text}
          color={'white'}
          title="Create Account"
          onPress={}
        /> */}
          </View>
        </View>
      </Screen>
    );
  }
}

const mapStateToProps = (state) => {
  const {auth} = state;
  console.log(auth);
  // console.log(state.gitHubApiData)
  return {
    authState: auth,
  };
};

export default connect(mapStateToProps, {
  signInWithGoogle,
  signOut,
})(SocialLoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: 'blue',
  },
  // submitButton: {
  //   width: 900,
  //   marginTop: 20,
  //   backgroundColor: 'white',
  // },
  form: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    color: 'white',
    // fontWeight: 'bold',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googlelogin: {
    alignItems: 'center',
    backgroundColor: 'white',
    color: 'blue',
    marginVertical: 10,
    width: width - 90,
    height: height / 15,
  },
});
