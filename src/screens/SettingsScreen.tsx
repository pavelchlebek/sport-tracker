import React from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

type TProps = {
  children?: never
}

export const SettingsScreen: React.FC<TProps> = () => {
  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
})
