import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity , Image, Modal } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function ContactItem({ contact, onPress }) {
  const [showModal, setShowModal] = useState(false);

  const onSelectNumber = (number) => {
    setShowModal(false);
    onPress(number);
  };

  const onSelectContact = useCallback(() => {
    if(contact.phoneNumbers.length == 1) {
      onSelectNumber(contact.phoneNumbers[0]);
    }
    else {
      setShowModal(true);
    }
  }, [showModal, onSelectNumber]);

  const phoneNumberList = contact.phoneNumbers.map((number, i) => (
    <View onPress={() => onSelectNumber(number)} key={i}>
      <View style={styles.phoneNumberItem}>
        <Text style={styles.phoneNumberItemLabel}>{number.label}</Text>
        <Text style={styles.phoneNumberItemNumber}>{number.number}</Text>
      </View>
    </View>
  ));

  const phoneNumberModalList = contact.phoneNumbers.map((number, i) => (
    <TouchableHighlight onPress={() => onSelectNumber(number)} key={i}>
      <View style={styles.phoneNumberItem}>
        <Text style={styles.phoneNumberItemLabel}>{number.label}</Text>
        <Text style={styles.phoneNumberItemNumber}>{number.number}</Text>
      </View>
    </TouchableHighlight>
  ));

  return (
    <TouchableHighlight onPress={onSelectContact}>
      <View style={styles.container}>
        <Image style={styles.photo} 
          source={contact.image ?? require('../assets/default.jpg')} />
        <View style={styles.info}>
          <Text style={styles.name}>{contact.name}</Text>
          {phoneNumberList}
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => {
          }}
        >
          <TouchableOpacity style={styles.centeredView} onPress={() => setShowModal(false)}>
            <View style={styles.modalView}>
              {phoneNumberModalList}
            </View>
          </TouchableOpacity >
        </Modal>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#aaa'
  },
  photo: {
    width: 50,
    height: 50
  },
  info: {
    paddingLeft: 10,
  },
  name: {
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    padding: 5,
    borderWidth: 1,
    borderColor: "#aaa",
    backgroundColor: "white",
    borderRadius: 5,
    alignItems: "center",
    shadowColor: "#000",
    width: 200,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  phoneNumberItem: {
    flexDirection: 'row'
  },
  phoneNumberItemLabel: {
    width: 50
  },
  phoneNumberItemNumber: {

  }
});
