import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import fontZ from '../assets/font/fonts';

export default function ItemCity ({NameCity}){
  return (
    <View style={styles.Location}>
      <Text style={styles.LocText}>{NameCity}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
Location: {
  paddingHorizontal: 14,
  paddingVertical: 10,
  borderRadius: 25,
  alignItems: 'center',
  backgroundColor: '#2c2c2c',
  marginHorizontal: 5,
},
LocText: {
  fontFamily: fontZ['Pjs-SemiBold'],
  fontSize: 14,
  lineHeight: 18,
},
});