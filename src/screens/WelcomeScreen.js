import React from 'react'
import {StyleSheet, Text, View } from 'react-native'
import Button from "../components/Button"

const WelcomeScreen = ({navigation}) => {
    return (
        <View>
            <Text>Welcome Screen</Text>
            <Button title="Login" width="%100" onPress={() => navigation.navigate("Login")}/>
            <Button title="Register" onPress={() => navigation.navigate("Register")}/>
        </View>
    )
}


export default WelcomeScreen

const styles = StyleSheet.create({})
