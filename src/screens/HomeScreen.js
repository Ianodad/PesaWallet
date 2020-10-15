import React, { Component } from 'react'
import Screen from '../components/Screen'
import { StyleSheet, SafeAreaView, View, Text, Style } from "react-native";
import {connect} from 'react-redux';
import ReadMessages from '../_helpers/ReadMessages';
import { storeMessages } from '../_actions';


export class home extends Component {


 
    render() {
        return (
            <Screen>
                <Text> Hello This should work </Text>
            </Screen>
        )
    }
}
const mapStateToProps = (state) => {
  const {SmsCollected} = state;
  return {
    collection: SmsCollected.collection,
  };
};
const mapDispatchToProps = {storeMessages};

export default connect(mapStateToProps, mapDispatchToProps)(home);


const styles = StyleSheet.create({})

