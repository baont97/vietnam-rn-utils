import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { ExampleHook } from './ExampleHook';

export default function App() {
  return (
    <View style={styles.container}>
      <ExampleHook />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
