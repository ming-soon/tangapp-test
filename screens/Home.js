import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, Button } from 'react-native';

export default function Home({ route, navigation }) {
  const phoneNumber = route.params?.phoneNumber ?? '';

  const onPushContactsListScreen = useCallback(() => {
    navigation.push('ContactsList', {
      phoneNumber: phoneNumber
    });
  }, [phoneNumber]);

  return (
    <SafeAreaView style={styles.container}>
      <Button onPress={onPushContactsListScreen} title="Push to Contact List" />
      <Text>{phoneNumber == '' ? 'No number selected' : phoneNumber}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
