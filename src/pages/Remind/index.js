import React from 'react';
import {Image, ScrollView, StyleSheet,Text,  View} from 'react-native';
import fontZ from '../../assets/font/fonts';
import { ItemRemind } from '../../components';
import {UpcomingConcert} from '../../../detail';

const Remind = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.containerLogo}>
          <Image style={styles.logo} source={require('../../pic/logome.png')} />
        </View>
        <Text style={styles.title}>Reminder</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal:10, gap:5, paddingVertical:5}}>
        {UpcomingConcert.map((item, index) => (
          <ItemRemind item={item} key={index} />
        ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Remind;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  logo: {
    margin: 10,
    resizeMode: 'cover',
    width: 22,
    height: 22,
  },
  containerLogo: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  header: {
    paddingHorizontal: 24,
    alignContent: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 52,
    elevation: 8,
    paddingTop: 8,
  },
  header1: {
    paddingTop: 8,
    paddingBottom: 4,
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  title: {
    paddingTop: 5,
    fontSize: 20,
    color: '#ffffff',
    fontFamily: fontZ['Pjs-ExtraBold'],
  },
});
