import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import fontZ from '../assets/font/fonts';
import {CalendarAdd} from 'iconsax-react-native';

const truncateDescription = (text, maxLength) => {
  if (!text || typeof text !== 'string') {
    return ''; // atau nilai default sesuai kebutuhan Anda
  }
  const words = text.split(' ');
  if (words.length > maxLength) {
    return words.slice(0, maxLength).join(' ') + ' ...';
  }
  return text;
};

const ItemRemind = ({item, variant, onPress}) => {
  return (
    <TouchableOpacity style={styles.reminditem}>
      <View style={styles.remindcard}>
        <Image
          style={styles.imageUpcoming}
          resizeMode="cover"
          imageStyle={{borderRadius: 10}}
          source={item.UpcomingImage}
        />
        <View style={{paddingTop: 10, width: 230}}>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <TouchableOpacity onPress={onPress}>
              <CalendarAdd color="#eee" variant={variant} size={25} />
            </TouchableOpacity>
          </View>
          <View style={{paddingLeft: 5, paddingTop: 50}}>
            <Text style={styles.upComingInfo}>{item.artistName}</Text>
            <Text style={styles.upComingText}>{item.event}</Text>
            <Text style={styles.desc}>
              {truncateDescription(item.description, 10)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemRemind;

const styles = StyleSheet.create({
  remindcard: {
    flexDirection: 'row',
    width: 230,
    height: 180,
  },
  imageUpcoming: {
    resizeMode: 'cover',
    width: 150,
    height: 180,
    borderRadius: 15,
  },
  upComingInfo: {
    fontSize: 18,
    color: '#ffffff',
    fontFamily: fontZ['Pjs-Bold'],
  },
  upComingText: {
    fontSize: 13,
    color: '#e8e8e8',
    fontFamily: fontZ['Pjs-Medium'],
  },
  reminditem: {
    borderRadius: 15,
    backgroundColor: '#363636',
  },
  desc: {
    fontSize:11,
    fontFamily: fontZ['Pjs-Light'],
  },
});
