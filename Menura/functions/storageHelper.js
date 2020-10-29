import AsyncStorage from '@react-native-community/async-storage';

export async function getDataStorage(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      let output = JSON.parse(value);
      console.log('data got from key :' + key + ' = ' + output);
      return output;
    }
    return null;
  } catch (e) {
    console.log('Error getting data : ' + e);
  }
}

export async function storeDataStorage(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value)).then((r) => {
      console.log('data stored : ' + value + ' at key : ' + key);
    });
  } catch (e) {
    console.log('Error storing data');
  }
}
