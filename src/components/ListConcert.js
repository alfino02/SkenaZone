import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import fontZ from '../assets/font/fonts';
import {CalendarAdd} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';

const ListUpcoming = ({item, variant, onPress}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ConcertDetail', {concertId: item.id})
      }>
        <ImageBackground
          style={styles.imageUpcoming}
          resizeMode="cover"
          imageStyle={{borderRadius: 10}}
          source={{uri: item?.image}}>
          <View style={styles.calendar}>
            <TouchableOpacity onPress={onPress}>
              <CalendarAdd color="#eee" variant={variant} size={25} />
            </TouchableOpacity>
          </View>
          <View style={{paddingVertical: 8, width: 392}}>
            <Text style={styles.upComingInfo}>{item?.artistName}</Text>
            <Text style={styles.upComingText}>{item?.event}</Text>
          </View>
        </ImageBackground>
    </TouchableOpacity>
  );
};

export default ListUpcoming;

const styles = StyleSheet.create({
  imageUpcoming: {
    resizeMode: 'cover',
    width: 210,
    height: 280,
    borderRadius: 15,
  },
  upComingInfo: {
    paddingTop: 180,
    paddingLeft: 8,
    justifyContent: 'flex-end',
    fontSize: 18,
    color: '#ffffff',
    fontFamily: fontZ['Pjs-Bold'],
  },
  upComingText: {
    paddingLeft: 8,
    justifyContent: 'flex-end',
    fontSize: 13,
    color: '#e8e8e8',
    fontFamily: fontZ['Pjs-Medium'],
  },
  description: {
    paddingTop: 6,
    fontSize: 15,
    color: '#ffffff',
    fontFamily: fontZ['Pjs-Bold'],
    flexDirection: 'row',
  },
  calendar: {
    paddingLeft: 175,
    paddingTop: 10,
  },
});
