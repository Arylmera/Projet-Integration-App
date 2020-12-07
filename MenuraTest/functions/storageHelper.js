

import AsyncStorage from '@react-native-community/async-storage';

export async function getDataStorage(key) {
   try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
         return JSON.parse(value);
      }
      return null;
   } catch (error) {
      console.log(error);
   }
}

export async function storeDataStorage(key, value) {
   try {
      await AsyncStorage.setItem(key, JSON.stringify(value)).then((r) => {
      });
   } catch (error) {
      console.log(error);
   }
}
