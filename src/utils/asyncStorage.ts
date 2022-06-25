import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToStorage = async (key: string, data: any) => {
  try {
    const jsonData = JSON.stringify(data)
    await AsyncStorage.setItem(key, jsonData)
  } catch (error) {
    console.log("error: ", error)
  }
  console.log("Saved in storage")
}
