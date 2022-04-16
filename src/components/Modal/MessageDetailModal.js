import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import Modal from 'react-native-modal';
import defaultStyles from '../../config/styles';
import Text from '../Text.js';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconIonicons from 'react-native-vector-icons/Ionicons';

const MessageDetailModal = ({onModalAction, isModalVisible, messageData}) => {
  const {id, phoneNo, type, name, date, time, amount, finance, message} =
    messageData;
  useEffect(() => {
    console.log('message', message);
  }, []);
  return (
    <Modal
      style={styles.modalContainer}
      isVisible={isModalVisible}
      onSwipeComplete={onModalAction}
      swipeDirection={['down', 'up', 'left', 'right']}>
      <View style={styles.modalHeader}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.amount}>
          <Text style={{color: 'green', fontWeight: 'bold'}}>{type}</Text>
          <Text
            style={{color: 'white', fontSize: 10, marginTop: 4, marginLeft: 5}}>
            KSH
          </Text>
          <Text style={{color: 'white', fontWeight: 'bold'}}>{amount}</Text>
        </View>
      </View>
      <View style={styles.modalBody}>
        <Text style={styles.id}>{id}</Text>
        <View style={[styles.message, styles.messageShadow]}>
          <Text>{message}</Text>
        </View>
      </View>
      <View style={styles.modalFooter}>
        <TouchableOpacity style={styles.actionCall}>
          <IconFontAwesome name="phone" size={35} color="darkblue" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionMessage}>
          <IconAntDesign name="message1" size={35} color="darkblue" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionContact}>
          <IconIonicons name="person-add-sharp" size={35} color="darkblue" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionShare}>
          <IconIonicons name="share-social-sharp" size={35} color="darkblue" />
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
  modalHeader: {
    alignItems: 'center',
    marginRight: 15,
    marginLeft: 15,
    borderColor: '#7A7A7A',
    marginBottom: 15,
  },
  name: {
    fontSize: 30,
    fontWeight: '900',
    color: 'white',
  },
  amount: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    // fontSize: 18,
    // fontWeight: '900',
    color: 'white',
  },
  modalBody: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    marginLeft: 15,
    borderColor: '#7A7A7A',
  },
  id: {
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
  },
  message: {
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
    backgroundColor: 'white',
    shadowOpacity: 0.5,
    shadowRadius: 6,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    borderRadius: 10,
    shadowRadius: 2.6,
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
  },
});
