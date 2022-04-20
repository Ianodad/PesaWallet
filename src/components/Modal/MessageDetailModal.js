import {StyleSheet, View, TouchableOpacity, Linking, Share} from 'react-native';
import React, {useEffect} from 'react';
import Modal from 'react-native-modal';
import defaultStyles from '../../config/styles';
import Text from '../Text.js';
import IconsFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconsAntDesign from 'react-native-vector-icons/AntDesign';
import IconsIonicons from 'react-native-vector-icons/Ionicons';
import IconsMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

// import Contacts from 'react-native-contacts';
import colors from '../../config/colors';

const MessageDetailModal = ({
  onModalAction,
  isModalVisible,
  messageData,
  navigation,
}) => {
  const {id, phoneNo, type, name, date, time, amount, finance, message} =
    messageData;

  const onHandlePhoneCall = () => {
    Linking.openURL(`tel://${phoneNo}`);
  };

  const onHandleMessage = () => {
    Linking.openURL(`sms:${phoneNo}`);
  };

  const onAddPhoneNumber = () => {
    let newPerson = {
      phoneNumbers: [
        {
          label: 'mobile',
          number: phoneNo,
        },
      ],
      displayName: name,
    };

    Contacts.openContactForm(newPerson, err => {
      if (err) console.warn(err);
      // form is open
    });
  };
  const onHandleShare = () => {
    Share.share({
      message: `${message}`,
    });
  };
  useEffect(() => {
    console.log('message', phoneNo);
  }, []);
  return (
    <Modal
      style={styles.modalContainer}
      isVisible={isModalVisible}
      onSwipeComplete={onModalAction}
      swipeDirection={['down', 'up', 'left', 'right']}>
      <TouchableOpacity style={styles.closeButton} onPress={onModalAction}>
        {/* <Text>Hello</Text> */}
        <IconsMaterialCommunity name="close-circle" size={35} color="white" />
      </TouchableOpacity>
      <View style={styles.modalHeader}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('FilteredDetailsScreen', {
              id: phoneNo || name,
              title: name,
              phoneNo: phoneNo,
            })
          }>
          <Text style={styles.nameText}>
            {name.split(' ').slice(0, 2).join(' ')}
          </Text>
        </TouchableOpacity>
        <View style={styles.amountText}>
          <Text style={{color: 'white', fontSize: 22}}>{type}</Text>
          <Text
            style={{color: 'white', fontSize: 10, marginTop: 7, marginLeft: 5}}>
            KSH
          </Text>
          <Text style={{...styles.moneyText, color: colors[finance]}}>
            {amount.replace('-', '')}
          </Text>
        </View>
      </View>
      <View style={styles.modalBody}>
        <Text style={styles.idText}>{id}</Text>
        <View style={[styles.messageText, styles.messageShadow]}>
          <Text>{message}</Text>
        </View>
      </View>
      <View style={styles.modalFooter}>
        <TouchableOpacity
          style={{...styles.actionCall, backgroundColor: colors['Receive']}}
          onPress={onHandlePhoneCall}>
          <IconsFontAwesome name="phone" size={35} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            ...styles.actionMessage,
            backgroundColor: colors['secondary'],
          }}
          onPress={onHandleMessage}>
          <IconsAntDesign name="message1" size={35} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{...styles.actionContact, backgroundColor: colors['primary']}}
          onPress={onAddPhoneNumber}>
          <IconsIonicons name="person-add-sharp" size={35} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{...styles.actionShare, backgroundColor: colors['red']}}
          onPress={onHandleShare}>
          <IconsIonicons name="share-social-sharp" size={35} color="white" />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default MessageDetailModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 5,
    marginTop: 35,
    marginLeft: 10,
    marginRight: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  modalHeader: {
    alignItems: 'center',
    marginRight: 15,
    marginLeft: 15,
    borderColor: '#7A7A7A',
    marginBottom: 15,
  },
  nameText: {
    fontSize: 30,
    fontWeight: '900',
    color: 'white',
    marginBottom: 5,
  },
  amountText: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    // fontSize: 18,
    // fontWeight: '900',
    color: 'white',
  },
  moneyText: {
    fontSize: 24,
    fontWeight: '900',
    marginLeft: 4,
  },
  modalBody: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    marginLeft: 15,
    borderColor: '#7A7A7A',
  },
  idText: {
    fontSize: 24,
    fontWeight: 'bold',
    zIndex: 3,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    marginBottom: -16,
    backgroundColor: 'white',
    shadowColor: '#7A7A7A',
    shadowOffset: {width: 0, height: -5},
    shadowOpacity: 0.5,
    shadowRadius: 2.6,
    borderTopEndRadius: 10,

    // borderWidth: 2,
  },
  messageText: {
    borderRadius: 10,
    // borderColor: '#7A7A7A',
    // borderWidth: 1,
    padding: 15,
    fontFamily: 'font-sans',
    // shadowColor: '#7A7A7A',
    // // shadowOffset: {width: 1, height: 2},
    // // shadowOpacity: 0.5,
    // shadowRadius: 2.6,
    // elevation: 5,
    borderWidth: 2,
    borderColor: '#7A7A7A',
  },
  messageShadow: {
    shadowColor: '#7A7',
    shadowOffset: {width: 1, height: 2},
    backgroundColor: 'white',
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 0.3,
  },
  actionCall: {
    backgroundColor: defaultStyles.colors.offWhite,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 2},
    backgroundColor: '#65cd7',
    shadowOpacity: 0.5,
    shadowRadius: 6,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    borderRadius: 10,
    shadowRadius: 2.6,
    borderWidth: 1,
    borderColor: '#7A7A7A',
  },
  actionMessage: {
    backgroundColor: defaultStyles.colors.offWhite,
    shadowColor: '#7A7',
    shadowOffset: {width: 1, height: 2},
    backgroundColor: 'white',
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5,
    shadowRadius: 2.6,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#7A7A7A',
  },
  actionContact: {
    backgroundColor: defaultStyles.colors.offWhite,
    shadowColor: '#7A7',
    shadowOffset: {width: 1, height: 2},
    backgroundColor: 'white',
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5,
    shadowRadius: 2.6,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#7A7A7A',
  },
  actionShare: {
    backgroundColor: defaultStyles.colors.offWhite,
    shadowColor: '#7A7',
    shadowOffset: {width: 1, height: 2},
    backgroundColor: 'white',
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5,
    shadowRadius: 2.6,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#7A7A7A',
  },
});
