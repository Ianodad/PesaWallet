import AsyncStorage from '@react-native-async-storage/async-storage';

export const getLocalState = async name => {
  const data = await AsyncStorage.getItem(name);

  return JSON.parse(data);
};
