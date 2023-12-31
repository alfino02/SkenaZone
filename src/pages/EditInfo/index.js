import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,ActivityIndicator
} from 'react-native';
import {ArrowLeft, AddSquare, Add} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import fontZ from '../../assets/font/fonts';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import FastImage from 'react-native-fast-image';

const EditInfo = ({route}) => {
  const {concertId} = route.params;
  const [concertData, setConcertData] = useState({
    artistName: '',
    event: '',
    description: '',
    date: '',
    info: '',
  });
  const handleChange = (key, value) => {
    setConcertData({
      ...concertData,
      [key]: value,
    });
  };
  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const subscriber = firestore()
      .collection('concert')
      .doc(concertId)
      .onSnapshot(documentSnapshot => {
        const concertData = documentSnapshot.data();
        if (concertData) {
          console.log('Concert data: ', concertData);
          setConcertData({
            artistName: concertData.artistName,
            event: concertData.event,
            description: concertData.description,
            date: concertData.date,
            info: concertData.info,
          });
          setOldImage(concertData.image);
          setImage(concertData.image);
          setLoading(false);
        } else {
          console.log(`Concert with ID ${concertId} not found.`);
        }
      });
    setLoading(false);
    return () => subscriber();
  }, [concertId]);

  const handleImagePick = async () => {
    ImagePicker.openPicker({
      width: 1920,
      height: 1080,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        setImage(image.path);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleUpdate = async () => {
    setLoading(true);
    let filename = image.substring(image.lastIndexOf('/') + 1);
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;
    const reference = storage().ref(`concertimages/${filename}`);
    try {
      if (image !== oldImage && oldImage) {
        const oldImageRef = storage().refFromURL(oldImage);
        await oldImageRef.delete();
      }
      if (image !== oldImage) {
        await reference.putFile(image);
      }
      const url =
        image !== oldImage ? await reference.getDownloadURL() : oldImage;
      await firestore().collection('concert').doc(concertId).update({
        image: url,
        artistName: concertData.artistName,
            event: concertData.event,
            description: concertData.description,
            date: concertData.date,
            info: concertData.info,
      });
      setLoading(false);
      console.log('Info Concert Updated!');
      navigation.navigate('ConcertDetail', {concertId});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="#ffffff" variant="Linear" size={24} />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={styles.title}>Edit Concert Info</Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingVertical: 10,
          gap: 10,
        }}>
        {image ? (
          <View style={{position: 'relative'}}>
            <FastImage
              style={{width: '100%', height: 127, borderRadius: 5}}
              source={{
                uri: image,
                headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: -5,
                right: -5,
                backgroundColor: '#000000',
                borderRadius: 25,
              }}
              onPress={() => setImage(null)}>
              <Add
                size={20}
                variant="Linear"
                color='#ffffff'
                style={{transform: [{rotate: '45deg'}]}}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={handleImagePick}>
            <View
              style={[
                textInput.borderDashed,
                {
                  gap: 10,
                  paddingVertical: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <AddSquare color='#ffffff' variant="Linear" size={42} />
              <Text
                style={{
                  fontFamily: fontZ['Pjs-Regular'],
                  fontSize: 12,
                  color: '#ffffff',
                }}>
                Upload Thumbnail
              </Text>
            </View>
          </TouchableOpacity>
        )}
        <View style={textInput.borderDashed}>
          <TextInput
            placeholder="Event"
            value={concertData.event}
            onChangeText={text => handleChange('event', text)}
            placeholderTextColor="#888888"
            multiline
            style={textInput.content}
          />
        </View>
        <View style={textInput.borderDashed}>
          <TextInput
            placeholder="Artist"
            value={concertData.artistName}
            onChangeText={text => handleChange('artistName', text)}
            placeholderTextColor="#888888"
            multiline
            style={textInput.content}
          />
        </View>
        <View style={[textInput.borderDashed, {minHeight: 250}]}>
          <TextInput
            placeholder="Concert Info"
            value={concertData.description}
            onChangeText={text => handleChange('description', text)}
            placeholderTextColor="#888888"
            multiline
            style={textInput.content}
          />
        </View>
        <View style={[textInput.borderDashed]}>
          <TextInput
            placeholder="Date"
            value={concertData.date}
            onChangeText={text => handleChange('date', text)}
            placeholderTextColor="#888888"
            multiline
            style={textInput.content}
          />
        </View>
        <View style={[textInput.borderDashed]}>
          <TextInput
            placeholder="Instagram"
            value={concertData.info}
            onChangeText={text => handleChange('info', text)}
            placeholderTextColor="#888888"
            multiline
            style={textInput.content}
          />
        </View>
      </ScrollView>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonLabel}>Update</Text>
        </TouchableOpacity>
      </View>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color='#ffffff' />
        </View>
      )}
    </View>
  );
};
export default EditInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    elevation: 8,
    paddingTop: 8,
    paddingBottom: 4,
  },
  title: {
    fontFamily: fontZ['Pjs-Bold'],
    fontSize: 16,
    color: '#ffffff',
  },
  bottomBar: {
    backgroundColor: '#000000',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingVertical: 10,
    shadowColor: '#888888',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#000000',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    fontSize: 14,
    fontFamily: fontZ['Pjs-SemiBold'],
    color: '#ffffff',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#888888',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const textInput = StyleSheet.create({
  borderDashed: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: '#888888',
  },
  content: {
    fontSize: 12,
    fontFamily: fontZ['Pjs-Regular'],
    color: '#ffffff',
    padding: 0,
  },
  title: {
    fontSize: 16,
    fontFamily: fontZ['Pjs-SemiBold'],
    color: '#ffffff',
    padding: 0,
  },
});
