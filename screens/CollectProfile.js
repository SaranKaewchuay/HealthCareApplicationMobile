import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Button,
  Image,
  PermissionsAndroid,
  Alert,
} from 'react-native';

import {NativeBaseProvider} from 'native-base';

// import ImagePicker from 'react-native-image-picker';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {images_profile} from '../constants';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const CollectProfile = () => {
  const [sliderState, setSliderState] = useState({currentPage: 0});

  const setSliderPage = event => {
    const {x} = event.nativeEvent.contentOffset;
    const screenWidth = event.nativeEvent.layoutMeasurement.width;
    const indexOfNextScreen = Math.floor(x / screenWidth);
    if (indexOfNextScreen !== sliderState.currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };
  const [photo, setPhoto] = useState();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [conDisease, setConDisease] = useState('');
  const [contact, setcontact] = useState('');
  const [userWeidth, setWeidth] = useState('');
  const [userHeight, setHeight] = useState('');

  const openCamera = async () => {
    let options = {
      saveToPhotos: true,
      mediaType: 'photo',
    };

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(options);
      setPhoto(result.assets[0].uri);
    }
  };

  const openGallery = async () => {
    let options = {
      saveToPhotos: true,
      mediaType: 'photo',
    };

    const result = await launchImageLibrary(options);
    setPhoto(result.assets[0].uri);
  };

  const navigation = useNavigation();
  const goPage = () => {
    navigation.navigate('Home');
  };

  const handleCreate = async () => {
    const response = await fetch(
      `http://192.168.1.5:8083/api/profile/add-profile`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          profileImage: photo,
          firstName: firstName,
          lastName: lastName,
          age: age,
          birthDate: birthDate,
          conDisease: conDisease,
          contact: contact,
          weight: userWeidth,
          height: userHeight,
          User_id: 29,
        }),
      },
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (!data.error) {
          Alert.alert('Success', 'Signup Successfully', [
            {
              text: 'OK',
              onPress: () => goPage(),
            },
          ]);
        } else {
          Alert.alert('Unsuccess', 'Signup Unsuccessfully', [
            {
              text: 'OK',
            },
          ]);
        }
      })
      .catch(error => {
        console.error(error);
        Alert.alert('invalid data');
      });

    const data = await response.json();
    console.log(data);
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          style={{flex: 1}}
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          onScroll={setSliderPage}
          showsHorizontalScrollIndicator={false}>
          <View style={{width, height}}>
            <View style={styles.innerbox}>
              <Text style={styles.blodtext}>
                คุณชื่ออะไรเหรอ{'\n'}บอกให้เรารู้หน่อยสิ!
              </Text>
            </View>
            <View style={styles.outerbox}>
              <Text style={styles.outtext}>ชื่อ</Text>
              <TextInput style={styles.input} value={firstName}  onChangeText={text => setFirstName(text)}></TextInput>
              <Text style={styles.outtext}>{'\n'}นามสกุล</Text>
              <TextInput style={styles.input} value={lastName}  onChangeText={text => setLastName(text)}></TextInput>
            </View>
          </View>
          <View style={{width, height}}>
            <View style={styles.innerbox}>
              <Text style={styles.blodtext}>คุณเกิด พ.ศ. อะไรเหรอ</Text>
            </View>
            <View style={styles.outerbox}>
              <Text style={styles.outtext}>ปีเกิด (พ.ศ.)</Text>
              <TextInput style={styles.input} value={birthDate}  onChangeText={text => setBirthDate(text)}></TextInput>
              <Text style={styles.outtext}>{'\n'}อายุ</Text>
              <TextInput style={styles.input} value={age}  onChangeText={text => setAge(text)}></TextInput>
            </View>
          </View>
          <View style={{width, height}}>
            <View style={styles.innerbox}>
              <Text style={styles.blodtext}>
                คุณมีน้ำหนัก เเละส่วนสูงเท่าไหร่
              </Text>
            </View>
            <View style={styles.outerbox}>
              <Text style={styles.outtext}>น้ำหนัก (กิโลกรัม)</Text>
              <TextInput style={styles.input} value={userWeidth}  onChangeText={text => setWeidth(text)}></TextInput>
              <Text style={styles.outtext}>{'\n'} ส่วนสูง (เซนติเมตร)</Text>
              <TextInput style={styles.input}></TextInput>
            </View>
          </View>
          <View style={{width, height}}>
            <View style={styles.innerbox}>
              <Text style={styles.blodtext}>
                คุณมีโรคประจำตัวอะไรมั้ย เเล้วเราสามารถติดต่อคุณทางไหนได้บ้าง?
              </Text>
            </View>
            <View style={styles.outerbox}>
              <Text style={styles.outtext}>โรคประจำตัว</Text>
              <TextInput style={styles.input} value={conDisease}  onChangeText={text => setConDisease(text)}></TextInput>
              <Text style={styles.outtext}>{'\n'}เบอร์โทร</Text>
              <TextInput style={styles.input } value={contact}  onChangeText={text => setcontact(text)}></TextInput>
            </View>
          </View>
          <View style={{width, height}}>
            <View style={styles.container2}>
              {photo === null ? (
                <Image
                  style={styles.profile_pic}
                  source={images_profile.profile_pic}
                />
              ) : (
                <Image style={styles.imageStyle} source={{uri: photo}} />

              
              )}

              <TouchableOpacity onPress={openCamera} style={styles.button}>
                <Text style={styles.buttonText}>Open Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={openGallery} style={styles.button}>
                <Text style={styles.buttonText}>Open Gallery</Text>
              </TouchableOpacity>
              {console.log("photo")}
              {console.log(photo)}
              <TouchableOpacity
                style={[styles.button, {backgroundColor: 'green'}]}
                onPress={handleCreate}>
                <Text style={styles.buttonText}>เสร็จสิ้น</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <View style={[styles.paginationWrapper, {bottom: 15}]}>
          {Array.from(Array(5).keys()).map((key, index) => (
            <View
              style={[
                styles.paginationDots,
                {opacity: sliderState.currentPage === index ? 1 : 0.3},
              ]}
              key={index}
            />
          ))}
        </View>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF4FB',
  },
  innerbox: {
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#0459b8',
    shadowOpacity: 80,
    elevation: 4,
    borderRadius: 30,
    width: '90%',
    padding: 20,
    marginTop: 25,
    marginBottom: 25,
  },
  blodtext: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  outerbox: {
    padding: 20,
  },
  outtext: {
    fontSize: 17,
    color: 'gray',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    color: 'black',
  },
  paginationWrapper: {
    position: 'absolute',
    bottom: 200,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  paginationDots: {
    height: 10,
    width: 10,
    borderRadius: 10 / 2,
    backgroundColor: '#0898A0',
    marginLeft: 10,
  },
  // container2: {
  //     flex: 1,
  //     padding: 30,
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     backgroundColor: '#fff'
  // },
  // button: {
  //     width: 250,
  //     height: 60,
  //     backgroundColor: '#3740ff',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     borderRadius: 4,
  //     marginBottom: 12
  // },
  // buttonText: {
  //     textAlign: 'center',
  //     fontSize: 15,
  //     color: '#fff'
  // }

  container2: {
    backgroundColor: '#ebebeb',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#0459b8',
    paddingHorizontal: 50,
    paddingVertical: 10,
    marginTop: 50,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#ebebeb',
    fontWeight: 'bold',
  },
  imageStyle: {
    height: 150,
    width: 150,
    marginTop: 20,
    borderRadius: 5,
  },
});

export default CollectProfile;
