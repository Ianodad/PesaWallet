// react libraries
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { GoogleSignin } from '@react-native-community/google-signin';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import Button from '../../components/Button/Button';
import Screen from '../../components/Screen';
// internal components
import Text from '../../components/Text';
import { CHECK_USER_GOOGLE_ID, SIGNUP_WITH_GOOGLE } from '../../graphql/queries';
// actions for redux implementation
import { authActions } from '../../_actions';

const {signInWithGoogle, signOut} = authActions;

// others
const {width, height} = Dimensions.get('window');

const SocialLoginScreen = (props) => {
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }
  // getUserVerification=(id)=>{
  //   console.log(id)
  //   console.log(data, error, loading)
  // }
  
  const [gId, setGoogeleId] = useState('')

  const [googleSignIn, {loading:loadingSignIn}] = useMutation(SIGNUP_WITH_GOOGLE);

  const {data:checkdata, error: checkError, loading:checkLoading } = useQuery(CHECK_USER_GOOGLE_ID, {
  variables: { id:gId }
  })

  useEffect(() => {
    // Your code here
    GoogleSignin.configure();
    // props.signOut();
    console.log(checkdata, checkError)
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
      const {id, name, email, givenName, familyName, photo} = user;
      // getUserVerification(id)
      // await checkId({variables: {id: id}});
      setGoogeleId(id)
      console.log(id, name, email, givenName, familyName, photo);
      // console.log(user);
      // CHECK IS USER EXIST BY QUERYING USER
      // IF  EXIST LOGININ AND MOVE TO OPT
      console.log(checkLoading)
      if (!checkLoading){
        console.log(checkdata.id, checkError, gId)
      }
      // ELSE ADD USER AND LOGIN WITH OPT
      // if (user) {
      //   const res = await googleSignIn({
      //     variables: {id, name, email, givenName, familyName, photo},
      //     onError(err) {
      //       console.log(err);
      //     },
      //   });
      //   console.log(res);
      //   // console.log({data, loading, error});
      //   props.signInWithGoogle(user);
      //   props.navigation.navigate('OTP', {user: user.id});
      // }
    } catch (err) {
      console.log(err);
      console.log(typeof err);
      let obj = JSON.parse(JSON.stringify(err));
      console.log(obj);
      const {Error} = err;
      console.log(Error);
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

  // console.log(data);
  // console.log(error);
  // const error =
  //   data?.authenticateUserWithPassword.__typename ===
  //   'UserAuthenticationWithPasswordFailure'
  //     ? data?.authenticateUserWithPassword
  //     : undefined;
  // render() {
  // const {googleVerification} = this.props.auth;
  // console.log('Google Verification', googleVerification);

  return (
    <Screen style={styles.container} Gradient>
      <View style={styles.header}>
        <Text style={styles.title}>Login Screen</Text>
      </View>
      {/* <View>
        <Text>{error}</Text>
      </View> */}
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
