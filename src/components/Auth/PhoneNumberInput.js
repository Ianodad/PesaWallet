import React, {useState, useRef} from 'react';
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
import Button from '../Button/Button';

const PhoneNumberInput = ({handleSubmit}) => {
  const [value, setValue] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef < PhoneInput > null;
  return (
    <>
      <PhoneInput
        ref={phoneInput}
        defaultValue={value}
        defaultCode="IN"
        onChangeFormattedText={text => {
          setValue(text);
        }}
        withDarkTheme
        withShadow
        autoFocus
      />
      <Button
        style={styles.button}
        title={'Request OTP'}
        // color={buttonColor}
        // textStyle={styles[textColor]}
        // width={width}
        buttonType
        onPress={() => {
          const checkValid = phoneInput.current?.isValidNumber();
          setValid(checkValid ? checkValid : false);
          //proceed
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
});
