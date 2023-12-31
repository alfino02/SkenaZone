import React from 'react';
import {StyleSheet, Text, View, Image, FlatList, TouchableOpacity} from 'react-native';
import fontZ from '../assets/font/fonts';

const ItemArtist = ({item}) => {
  return (
    <View style={styles.VerticalList}>
      <TouchableOpacity style={styles.artistCon} >
        <Image
          style={styles.imageRec}
          source={item.ArtistPic}
        />
        <View>
          <Text style={styles.Name}>{item.ArtistName}</Text>
          <Text style={styles.description}>{item.Song}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const ListArtist =({data})=>{
  const renderItem =({item})=>{
    return(
      <ItemArtist
          item={item}
          onPress={() => (item.id)}
        />
    );
  }
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={item => renderItem({...item})}
      ItemSeparatorComponent={() => <View style={{width: 10}} />}
      contentContainerStyle={{paddingHorizontal: 10, gap:5}}
      horizontal
    />
  );
}
export default ListArtist;

const styles = StyleSheet.create({
  VerticalList: {
    borderRadius: 10,
    backgroundColor: '#2c2c2c',
  },
  artistCon: {
    gap: 2,
    flexDirection: 'row',
    borderRadius: 10,
    width : 300,
  },
  imageRec: {
    margin: 5,
    borderRadius: 10,
    resizeMode: 'cover',
    width: 120,
    height: 160,
  },
  Name : {
    paddingTop: 10,
    fontSize: 18,
    color: '#ffffff',
    fontFamily: fontZ['Pjs-Bold'],
    flexDirection: 'row',
  },
  description: {
    paddingTop: 6,
    fontSize: 15,
    color: '#ffffff',
    fontFamily: fontZ['Pjs-Regular'],
    flexDirection: 'row',
    width : 150,
    flexWrap : 'wrap',
  },
});
