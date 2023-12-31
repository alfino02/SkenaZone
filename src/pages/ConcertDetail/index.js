import React, {useState, useRef, useEffect} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated, ActivityIndicator
} from 'react-native';
import {ArrowCircleLeft, More} from 'iconsax-react-native';
import fontZ from '../../assets/font/fonts';
import {UpcomingConcert} from '../../../detail';
import {useNavigation} from '@react-navigation/native';
import ActionSheet from 'react-native-actions-sheet';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import FastImage from 'react-native-fast-image';

const ConcertDetail = ({route}) => {
  const {concertId} = route.params;
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClampY = Animated.diffClamp(scrollY, 0, 46);
  const headerY = diffClampY.interpolate({
    inputRange: [0, 46],
    outputRange: [0, -46],
  });
  
  const [loading, setLoading] = useState(true);
  const [ selectedConcert , setSelectedConcert] = useState(null);
  const actionSheetRef = useRef(null);
  const openActionSheet = () => {
    actionSheetRef.current?.show();
  };
  const closeActionSheet = () => {
    actionSheetRef.current?.hide();
  };
  useEffect(() => {
    const subscriber = firestore()
      .collection('concert')
      .doc(concertId)
      .onSnapshot(documentSnapshot => {
        const concertData = documentSnapshot.data();
        if (concertData) {
          console.log('Concert data: ', concertData);
          setSelectedConcert(concertData);
        } else {
          console.log(`Concert with ID ${concertId} not found.`);
        }
      });
    setLoading(false);
    return () => subscriber();
  }, [concertId]);
  const navigateEdit = () => {
    closeActionSheet();
    navigation.navigate('EditInfo', {concertId});
  };
  const handleDelete = async () => {
    setLoading(true);
    try {
      await firestore()
        .collection('concert')
        .doc(concertId)
        .delete()
        .then(() => {
          console.log('Info Concert deleted!');
        });
      if (selectedConcert?.image) {
        const imageRef = storage().refFromURL(selectedConcert?.image);
        await imageRef.delete();
      }
      console.log('Concert deleted!');
      closeActionSheet();
      setSelectedConcert(null);
      setLoading(false);
      navigation.navigate('Profile');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.header, {transform: [{translateY: headerY}]}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowCircleLeft color="#ffffff" variant="Linear" size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={openActionSheet}
          style={{flexDirection: 'row', justifyContent: 'center', gap: 20}}>
          <More color="#ffffff" variant="Linear" size={24} />
        </TouchableOpacity>
      </Animated.View>
      {loading ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <ActivityIndicator size={'large'} color='#ffffff' />
        </View>
      ) : (
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <FastImage
            style={styles.imageRec}
            source={{
              uri: selectedConcert?.image,
              headers: {Authorization: 'someAuthToken'},
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}></FastImage>
        </View>
        <View>
          <Text style={styles.artist}>{selectedConcert?.artistName}</Text>
          <Text style={styles.event}>{selectedConcert?.event}</Text>
          <Text style={styles.description}>{selectedConcert?.description}</Text>
          <Text style={styles.description}>Date : {selectedConcert?.date}</Text>
          <Text style={styles.description}>
            More Info(Instagram): {selectedConcert?.info}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 70,
          }}>
          <Text>copyright @ZeuteeApp2023</Text>
        </View>
      </Animated.ScrollView>
      )}
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          backgroundColor: '#000000',
        }}
        indicatorStyle={{
          width: 100,
        }}
        gestureEnabled={true}
        defaultOverlayOpacity={0.3}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={navigateEdit}>
          <Text
            style={{
              fontFamily: fontZ['Pjs-Medium'],
              color: '#ffffff',
              fontSize: 18,
            }}>
            Edit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={handleDelete}>
          <Text
            style={{
              fontFamily: fontZ['Pjs-Medium'],
              color: '#ffffff',
              fontSize: 18,
            }}>
            Delete
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={closeActionSheet}>
          <Text
            style={{
              fontFamily: fontZ['Pjs-Medium'],
              color: '#ff0303',
              fontSize: 18,
            }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </ActionSheet>
    </View>
  );
};

export default ConcertDetail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    paddingHorizontal: 20,
    alignContent: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 46,
    paddingTop: 12,
    paddingBottom: 4,
    backgroundColor: '#1f1f1f',
  },
  artist: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 25,
    color: '#ffffff',
    fontFamily: fontZ['Pjs-Bold'],
  },
  event: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    fontSize: 20,
    color: '#ffffff',
    fontFamily: fontZ['Pjs-SemiBold'],
  },
  description: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 15,
    color: '#ffffff',
    fontFamily: fontZ['Pjs-Regular'],
  },
  imageRec: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
    resizeMode: 'cover',
    width: 210,
    height: 300,
    margin: 15,
  },
});
