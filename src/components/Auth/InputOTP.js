import React, {useEffect, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../config/colors';

import Button from '../Button/Button';

export default function InputOTPScreen({
  navigation,
  route,
  confirmCode,
  onChangeNumber,
  clearOTP,
}) {
  const defaultCountdown = 30;
  let clockCall = null;
  const [internalVal, setInternalVal] = useState('');
  const [enableResend, setEnableResend] = useState(false);
  const [countdown, setCountdown] = useState(defaultCountdown);
  const [verificationCode, setVerificationCode] = useState('');
  let textInput = useRef(null);
  const lengthInput = 6;

  const onChangeText = async val => {
    // console.log('InputOTPScreen -> val', val);
    setInternalVal(val);
    setVerificationCode(val);
    try {
      if (val.length === 6) {
        confirmCode(val);
        // if (authResult) {

        //   Alert.alert('Phone authentication successful!');
        // }
        // signUp();
      } else {
        Alert.alert('Please enter a 6 digit OTP code.');
      }
    } catch (err) {
      // setConfirmError(err);
      // setConfirmInProgress(false);
    }
  };

  useEffect(() => {
    textInput.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    clockCall = setInterval(() => {
      decrementClock();
    }, 1000);
    return () => {
      clearInterval(clockCall);
    };
  });

  const onResendOTP = () => {
    if (enableResend) {
      setCountdown(defaultCountdown);
      setEnableResend(false);
      clearInterval(clockCall);
      clockCall = setInterval(() => {
        decrementClock();
      }, 1000);
    }
  };

  const clearOtp = () => {
    setInternalVal('');
    clearOTP('');
  };

  const decrementClock = () => {
    if (countdown === 0) {
      setEnableResend(true);
      setCountdown(0);
      clearInterval(clockCall);
    } else {
      setCountdown(countdown - 1);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior={'padding'}
        style={styles.containerAvoidingView}>
        <View style={styles.containerInput}>
          <TextInput
            ref={input => (textInput = input)}
            style={styles.textInput}
            keyboardType="numeric"
            value={internalVal}
            maxlength={lengthInput}
            onChangeText={onChangeText}
            returnKeyType="done"
          />
          <View style={styles.inputContainer}>
            {Array(lengthInput)
              .fill()
              .map((data, index) => (
                <View
                  key={index}
                  style={[
                    styles.cellView,
                    // eslint-disable-next-line react-native/no-inline-styles
                    {
                      borderBottomColor:
                        index === internalVal.length ? 'white' : '#244DB7',
                    },
                  ]}>
                  <Text
                    style={styles.cellText}
                    onPress={() => textInput.focus()}>
                    {internalVal && internalVal.length > 0
                      ? internalVal[index]
                      : ''}
                  </Text>
                </View>
              ))}
          </View>
        </View>
        <View style={styles.bottomView}>
          <Button
            style={styles.btnChangeNumber}
            title={'Change Number'}
            // color={'white'}
            textStyle={styles.textChange}
            // width={width}
            buttonType
            onPress={onChangeNumber}
          />
          {/* <Button
            style={styles.btnResend}
            title={`Resend OTP ${countdown}`}
            textStyle={styles.textResend}
            // width={width}
            buttonType
            onPress={onResendOTP}
          /> */}
          <Button
            style={styles.btnResend}
            title={'Clear'}
            textStyle={styles.textResend}
            // width={width}
            buttonType
            onPress={clearOtp}
          />
          {/* <TouchableOpacity onPress={onChangeNumber}>
            <View style={styles.btnChangeNumber}>
              <Text style={styles.textChange}>Change Number</Text>
            </View>
          </TouchableOpacity> */}
          {/* <TouchableOpacity onPress={onResendOTP}>
            <View style={styles.btnResend}>
              <Text
                style={[
                  styles.textResend,
                  // eslint-disable-next-line react-native/no-inline-styles
                  {color: enableResend ? 'orange' : 'gray'},
                ]}>
                Resend OTP ({countdown})
              </Text>
            </View>
          </TouchableOpacity> */}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerAvoidingView: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  textTitle: {
    marginBottom: 50,
    marginTop: 50,
    fontSize: 16,
  },
  textInput: {
    width: 0,
    height: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellView: {
    alignItems: 'center',
    borderBottomWidth: 1.5,
    justifyContent: 'center',
    margin: 5,
    paddingVertical: 11,
    width: 40,
  },
  cellText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
  },
  bottomView: {
    flexDirection: 'row',
    flex: 1,
    // justifyContent: "flex-end",
    marginBottom: 40,
    alignItems: 'flex-end',
  },
  btnChangeNumber: {
    width: 150,
    height: 50,
    alignItems: 'center',
    // color: colors.primary,
    // alignItems: 'flex-start',
    justifyContent: 'center',
  },
  textChange: {
    color: 'white',
    alignItems: 'center',
    fontSize: 15,
  },
  btnResend: {
    marginLeft: 10,
    width: 150,
    height: 50,
    color: 'white',
    // borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textResend: {
    alignItems: 'center',
    fontSize: 15,
    color: 'white',
  },
});
