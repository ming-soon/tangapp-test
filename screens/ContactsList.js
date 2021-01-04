import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, TextInput, SafeAreaView, ScrollView } from 'react-native';
import * as Contacts from 'expo-contacts';
import ContactItem from '../components/ContactItem';

export default function ContactsList({ route, navigation }) {
  const { phoneNumber } = route.params;
  const [ search, setSearch ] = useState('');
  const [ contactList, setContactList ] = useState([]);
  const [ showList, setShowList ] = useState([]);

  const onSelectNumber = useCallback((number) => {
    navigation.navigate('Home', {
      phoneNumber: number.number
    });
  }, [phoneNumber]);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync();

        setContactList(data);
      }
    })();
  }, []);

  useEffect(() => {
    if(search === '') return setShowList(contactList);
    setShowList(contactList.filter(number => {
      if(number.name.toLowerCase().indexOf(search.toLowerCase()) !== -1) return true;
      for(var i = 0; i < number.phoneNumbers.length; i++) {
        if(number.phoneNumbers[i].number.indexOf(search) !== -1) return true;
      }
      return false;
    }));
  }, [contactList, search]);

  const ContactsItemList = showList.map((contact, i) => (
    <ContactItem key={i} contact={contact} onPress={onSelectNumber} />
  ));

  return (
    <SafeAreaView style={styles.container}>
      <TextInput placeholder="Search..." style={styles.search} onChangeText={text => setSearch(text)} value={search} />
      <ScrollView style={{flex: 1}}>
        {ContactsItemList}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  search: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5,
    padding: 10,
    borderRadius: 5
  }
});
