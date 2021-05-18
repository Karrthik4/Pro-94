import React from 'react';
import { Text, View } from 'react-native';
import MyHeader from "../components/MyHeader";
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default class AllRemindersScreen extends React.Component {
  render() {
    return (
      <SafeAreaProvider>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <MyHeader title="Reminders" />
        </View>
      </SafeAreaProvider>
    );
  }
}