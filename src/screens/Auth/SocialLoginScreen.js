// react libraries
import {useQuery} from '@apollo/client';
import {GoogleSignin} from '@react-native-community/google-signin';
import React, {useEffect} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import Button from '../../components/Button/Button';
import Screen from '../../components/Screen';
// internal components
import Text from '../../components/Text';
import {getAllUsers} from '../../graphql/constants';
import {allUsers} from '../../graphql/queries';
// actions for redux implementation
import {authActions} from '../../_actions';

var stringify = require('fast-json-stable-stringify');

const {signInWithGoogle, signOut} = authActions;

// others
const {width, height} = Dimensions.get('window');

const SocialLoginScreen = (props) => {
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }

  useEffect(() => {
    // Your code here
    GoogleSignin.configure();
    props.signOut();
  }, []);

  // componentDidMount() {
  //   GoogleSignin.configure();
  //   this.props.signOut();
  //   // this.signOut();
  // }

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

  const SignInWithGoogle = async () => {
    // this.props.signInWithGoogle()
    try {
      await GoogleSignin.hasPlayServices();
      const {user} = await GoogleSignin.signIn();
      // console.log(user);
      await getAllUsers();
      if (user) {
        props.signInWithGoogle(user);
        props.navigation.navigate('OTP', {user: user.id});
      }
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
  const {loading, error, data} = useQuery(allUsers);
  console.log(data, error);
  // render() {
  // const {googleVerification} = this.props.auth;
  // console.log('Google Verification', googleVerification);
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
              SignInWithGoogle();
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
  // }
};

const mapStateToProps = (state) => {
  const {authState} = state;
  // console.log(authState);
  // console.log(state.gitHubApiData)
  return {
    auth: authState,
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
