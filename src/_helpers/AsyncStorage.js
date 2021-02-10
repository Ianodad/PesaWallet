import AsyncStorage from '@react-native-community/async-storage';

export const getFromAsyncStorage = async () => {
    try {
      return AsyncStorage.getItem('COLLECTION');
    } catch (error) {
        console.log(error)
      // Error retrieving data
    }
  };