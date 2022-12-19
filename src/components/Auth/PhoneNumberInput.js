import {AsYouType, parsePhoneNumberFromString} from 'libphonenumber-js';
import React, {useState, useRef, useEffect} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import colors from '../../config/colors';
import defaultStyles from '../../config/styles';
import Button from '../Button/Button';

const PhoneNumberInput = ({onHandleSubmit}) => {
  const [value, setValue] = useState('');
  const [valueChange, setValueChange] = useState('');
  const [valid, setValid] = useState(true);
  const [countryCode, setCountryCode] = useState('KE');
  const [showMessage, setShowMessage] = useState(false);

  const [textColor, setTextButton] = useState('white');
  const [buttonColor, setButtonColor] = useState('primary');
  const phoneInput = useRef(null);

  const onTextChange = number => {
    const phoneNumber = parsePhoneNumberFromString(number, countryCode);

    if (phoneNumber?.isValid()) {
      setValid(!phoneNumber.isValid());
      setButtonColor('white');
      setTextButton('primary');
    } else {
      setValid(true);
      setButtonColor('primary');
      setTextButton('white');
    }
    // console.log('onTextChange', new AsYouType(countryCode).input(number));
    setValue(new AsYouType(countryCode).input(number));
  };
  const submitPhoneNumber = () => {
    const phoneNumber = parsePhoneNumberFromString(value, countryCode);
    if (phoneNumber.isValid()) {
      onHandleSubmit(phoneNumber.number);
    }
  };

  return (
    <>
      <PhoneInput
        ref={phoneInput}
        // defaultValue={value}
        defaultCode={countryCode}
        onChangeText={text => {
          const change = new AsYouType(countryCode).input(text);
          setValueChange(change);
        }}
        value={valueChange}
        onChangeFormattedText={text => onTextChange(text)}
        onChangeCountry={country => setCountryCode(country)}
        containerStyle={styles.containerStyle}
        textInputStyle={styles.textInputStyle}
        // textInputStyle={defaultStyles.textInput}
        // withDarkTheme
        withShadow
        autoFocus
      />
      <Button
        style={styles.button}
        title={'Request OTP'}
        color={buttonColor}
        disabled={valid}
        // color={valid ? false : 'white'}
        textStyle={styles[textColor]}
        // width={width}
        buttonType
        onPress={() => {
          submitPhoneNumber();
        }}
      />
    </>
  );
};

export default PhoneNumberInput;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
  },
  primary: {
    color: colors.primary,
  },
  containerStyle: {
    backgroundColor: '#fff',
    // paddingVertical: 0,
    // paddingBottom: 9,
    paddingHorizontal: 25,
    borderColor: '#ccc',
    // borderWidth: 2,
    borderRadius: 45,
    marginBottom: 10,
    width: 360,
    height: 64,

    // fontSize: 16,
  },
  textInputStyle: {
    borderRadius: 45,
    letterSpacing: 2,
    padding: 0,
  },
});
