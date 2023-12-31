import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import fontZ from '../../assets/font/fonts';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
    const navigation = useNavigation();
    useEffect(() => {
      checkToken();
    }, []);
    const checkToken = async () => {
      try {
        const userDataJSON = await AsyncStorage.getItem('userData');
  
        if (userDataJSON) {
          const userData = JSON.parse(userDataJSON);
          const {userToken, expirationTime} = userData;
  
          if (userToken && expirationTime) {
            const currentTime = new Date().getTime();
  
            if (currentTime <= expirationTime) {
              setTimeout(() => {
                navigation.replace('MainApp');
              }, 1500);
            } else {
              setTimeout(() => {
                navigation.replace('Login');
              }, 1500);
            }
          } else {
            setTimeout(() => {
              navigation.replace('Login');
            }, 1500);
          }
        } else {
          setTimeout(() => {
            navigation.replace('Login');
          }, 1500);
        }
      } catch (error) {
        console.error('Error retrieving token data:', error);
        setTimeout(() => {
          navigation.replace('Login');
        }, 1500);
      }
    };
  return (
    <View style={styles.container}>
      <Image
                style={styles.logo}
                source={require('../../pic/logome.png')}
              />
      <View style={styles.infoContainer}>
        <Text style={[styles.info, {fontFamily: fontZ['Pjs-Regular']}]}>
          Presented By
        </Text>
        <Text
          style={[
            styles.info,
            {fontFamily: fontZ['Pjs-SemiBold'], textAlign: 'center'},
          ]}>
          Mobile Programming
        </Text>
        <Text
          style={[
            styles.info,
            {fontFamily: fontZ['Pjs-SemiBold'], textAlign: 'center'},
          ]}>
          Laboratory
        </Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
  },
  logo: {
    height:212,
    width:212,
    alignSelf: 'center',
  },
  infoContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
  },
  info: {
    fontSize: 12,
    color:'#1f1f1f',
  },
});