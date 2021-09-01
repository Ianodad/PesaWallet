import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import Screen from '../components/Screen';
import Card from '../components/Card';
import {CommonActions} from '@react-navigation/native';

import defaultStyles from '../config/styles';

import {authActions} from '../_actions/authActions';
const {signOut} = authActions;

// eslint-disable-next-line no-shadow
const SettingScreen = ({navigation, signOut}) => {
  return (
    <Screen>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => signOut(navigation, CommonActions)}>
          <Text>LogOut</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() =>
            navigation.dispatch(
              CommonActions.navigate({
                name: 'Welcome',
              }),
            )
          }>
          <Text>LogOut</Text>
        </TouchableOpacity> */}
      </View>
    </Screen>
  );
};

const mapStateToProps = state => {
  // console.log(state.gitHubApiData)
  return {};
};

export default connect(mapStateToProps, {signOut})(SettingScreen);
const styles = StyleSheet.create({});
