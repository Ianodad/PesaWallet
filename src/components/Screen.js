import React from 'react'
import { Constants } from 'react-native-unimodules';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'

const Screen = () => {
    return (
        <SafeAreaView>
            <View style={[styles.view, style]}>{children}</View>
        </SafeAreaView>
    )
}

export default Screen

const styles = StyleSheet.create({
    screen: {
        paddingTop: Constants.statusBarHeight,
        flex:1,
    },
    view: {
        flex:1,
    },
});
