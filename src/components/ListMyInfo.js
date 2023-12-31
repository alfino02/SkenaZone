import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import fontZ from '../assets/font/fonts';
import {useNavigation} from '@react-navigation/native';

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

const ListMyInfo = ({item}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ConcertDetail', {concertId: item.id})
      }>
      <View style={{backgroundColor: '#1f1f1f', borderRadius: 15}}>
        <Image
          style={styles.imageUpcoming}
          resizeMode="cover"
          source={{uri: item?.image}}
        />
        <View style={{paddingVertical: 8, width: 392}}>
          <Text style={styles.upComingInfo}>{item?.artistName}</Text>
          <Text style={styles.upComingText}>{item?.event}</Text>
          <Text style={styles.description}>
            {truncateDescription(item?.description, 10)}
          </Text>
          <Text style={styles.upComingText}>{item?.date}</Text>
          <Text style={styles.upComingText}>{item?.info}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListMyInfo;

const styles = StyleSheet.create({
  imageUpcoming: {
    resizeMode: 'cover',
    width: 392,
    height: 150,
    borderRadius: 15,
  },
  upComingInfo: {
    paddingLeft: 8,
    fontSize: 18,
    color: '#ffffff',
    fontFamily: fontZ['Pjs-Bold'],
  },
  upComingText: {
    paddingLeft: 8,
    fontSize: 13,
    color: '#e8e8e8',
    fontFamily: fontZ['Pjs-Medium'],
  },
  description: {
    paddingLeft: 8,
    fontSize: 15,
    color: '#ffffff',
    fontFamily: fontZ['Pjs-Regular'],
  },
});
