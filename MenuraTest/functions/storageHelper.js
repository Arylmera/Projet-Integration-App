

import AsyncStorage from '@react-native-community/async-storage';

/**
 * récupération des données du storage
 * @param key
 * @return {Promise<null|any>}
 */
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

/**
 * store dans le storage
 * @param key
 * @param value
 * @return {Promise<void>}
 */
export async function storeDataStorage(key, value) {
   try {
      await AsyncStorage.setItem(key, JSON.stringify(value)).then((r) => {
      });
   } catch (error) {
      console.log(error);
   }
}
