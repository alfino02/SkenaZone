import React, {useState, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import fontZ from '../../assets/font/fonts';
import {useNavigation} from '@react-navigation/native';
import {ArrowLeft} from 'iconsax-react-native';
import {ListMyInfo} from '../../components';
import firestore from '@react-native-firebase/firestore';

const MyInfo = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [concertData, setConcertData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    const subscriber = firestore()
      .collection('concert')
      .onSnapshot(querySnapshot => {
        const concerts = [];
        querySnapshot.forEach(documentSnapshot => {
          concerts.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });
        setConcertData(concerts);
        setLoading(false);
      });
    return () => subscriber();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      firestore()
        .collection('concert')
        .onSnapshot(querySnapshot => {
          const concerts = [];
          querySnapshot.forEach(documentSnapshot => {
            concerts.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });
          setConcertData(concerts);
        });
      setRefreshing(false);
    }, 1500);
  }, []);
  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="#ffffff" variant="Linear" size={24} />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={styles.title}>My Concert Info</Text>
        </View>
      </View>
      {loading && <ActivityIndicator size={'large'} color={'#5ea668'} />}
      <View style={{paddingVertical: 10, paddingHorizontal: 10, gap: 10}}>
        {!loading &&
          concertData.map((item, index) => (
            <ListMyInfo item={item} key={index} />
          ))}
      </View>
    </ScrollView>
  );
};

export default MyInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    paddingHorizontal: 24,
    alignItems: 'center', // Fix here
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 52,
    elevation: 8,
    paddingTop: 8,
    paddingBottom: 4,
  },
  title: {
    fontSize: 20,
    color: '#ffffff',
    fontFamily: fontZ['Pjs-ExtraBold'],
  },
});
