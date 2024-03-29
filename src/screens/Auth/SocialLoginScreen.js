// react libraries
import {useMutation, useQuery} from '@apollo/client';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {authActions} from '../../_actions';
import Button from '../../components/Button/Button';
import Screen from '../../components/Screen';
// internal components
import Text from '../../components/Text';
import {SIGNUP_WITH_GOOGLE} from '../../graphql/mutation';
import {GET_USER_WITH_GOOGLE_ID} from '../../graphql/queries';
// actions for redux implementation

const {signInWithGoogle, signOut} = authActions;

// others
const {width, height} = Dimensions.get('window');
// GoogleSignin.configure({
//   webClientId:
//     '445455504561-jqgk3er2jpq4a0jcnn76k67cedqro7n8.apps.googleusercontent.com',
// });
const SocialLoginScreen = props => {
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }

  const [gId, setGoogeleId] = useState();
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);

  const [signUpWithGoogle, {loading: loadingSignIn}] =
    useMutation(SIGNUP_WITH_GOOGLE);

  const {
    data: checkdata,
    error: checkError,
    loading: checkLoading,
  } = useQuery(GET_USER_WITH_GOOGLE_ID, {
    variables: {id: gId},
    skip: !gId,
  });

  // getUserVerification=(id)=>{
  //   checkId({variables: {id: id}});
  //   console.log(data, error, loading)
  // }
  useEffect(() => {
    // Your code here
    GoogleSignin.configure();
    // props.signOut();
  }, []);

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
    let googleUserDetails = {};
    try {
      await GoogleSignin.hasPlayServices();
      const {user} = await GoogleSignin.signIn();
      let {id, name, email, givenName, familyName, photo} = user;
      // getUserVerification(id)
      // checkId({variables: {id: id}});
      // setGoogeleId(id);

      // just use google sign ti validate user
      console.log(user);
      if (user) {
        // console.log(data?.createUser);
        console.log('New User Created ' + name);
        props.signInWithGoogle(user);
        props.navigation.navigate('OTP', {
          googleId: id,
          userId: id,
        });
      }
      // console.log(id, name, email, givenName, familyName, photo);
      // if (user) {
      //   googleUserDetails = {id, name, email, givenName, familyName, photo};
      //   // use backend to check if user is already registered
      //   const {data} = await signUpWithGoogle({
      //     variables: {id, name, email, givenName, familyName, photo},
      //   });
      //   // console.log(checkId(data));
      //   if (data) {
      //     // console.log(data?.createUser);
      //     console.log('New User Created ' + name);
      //     props.signInWithGoogle(user);
      //     props.navigation.navigate('OTP', {
      //       googleId: user.id,
      //       userId: data?.createUser?.id,
      //     });
      //   }
      //   // console.log({data, loading, error});
      // }
    } catch (error) {
      let obj = JSON.parse(JSON.stringify(error));
      // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      //   // user cancelled the login flow
      //   console.log('User cancelled login');
      // } else if (error.code === statusCodes.IN_PROGRESS) {
      //     // operation (e.g. sign in) is in progress already
      //     console.log('Operation in progress');
      // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      //   // play services not available or outdated
      //   console.log('Play services not available or outdated');
      // } else {
      //   // some other error happened
        console.log(obj);
      // }
      console.log(error);
      // // GRAHLY ERROR
      // let {graphQLErrors} = obj;
      // let {
      //   extensions: {
      //     exception: {
      //       code,
      //       keyValue: {email, id},
      //     },
      //   },
      // } = graphQLErrors[0];

      // if ((code === 11000 && email) || id) {
      //   console.log('Email exist for ' + googleUserDetails.name + ' proceed');
      //   props.signInWithGoogle(googleUserDetails);
      //   props.navigation.navigate('OTP', {
      //     googleId: googleUserDetails.id,
      //     userId: '',
      //   });
      // }
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
          {/* <GoogleSigninButton
            style={{width: 192, height: 48}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={SignInWithGoogle}
            disabled={isSigninInProgress}
          /> */}
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

const mapStateToProps = state => {
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
