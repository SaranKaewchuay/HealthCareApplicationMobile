import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
  StyleSheet,
  Alert
} from 'react-native';



import {NativeBaseProvider, Center, Box, Heading} from 'native-base';
import {images} from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const RecordDetail = ({route}) => {
  const [text, onChangeText] = useState(route.params.detail);
  const [items, setItems] = useState([]);

  const [id, setId] = useState([]);




  useEffect(() => {
    fetch('http://192.168.1.5:8083/api/daily/getRecordById/'+route.params.id)
      .then(res => res.json())
      .then(result => {
        console.log(result);
        setItems(result.data);
      });
  }, []);
  const navigation = useNavigation();
  const goDate = ()=> {
    navigation.navigate('TabsDefaultDate');
  };

  



  const handleRecord = async () => {
    
    {items.map(items => (
        fetch(`http://192.168.1.5:8083/api/daily/edit-record`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            id: items.id,
            dateRecord: route.params.date,
            dailyDescription: text,
            User_id:items.User_id
          }) 
        }).then((response) => response.json())
        .then(data => {
          if (!data.error) {
            Alert.alert('สำเร็จ', 'บันทึกอาการสำเร็จ', [
              {
                text: 'ยกเลิก'
              },
              {
                text: 'ตกลง',
                onPress: () => goDate(),
              },
              
            ]);
          }
          else {
            Alert.alert('ไม่สำเร็จ', 'บันทึกอาการไม่สำเร็จ', [
              {
                text: 'OK'
              },
            ]);
          }
      })
      .catch((error) => {
          console.error(error);
          Alert.alert('invalid data');
      })
      ))}

   
  };
  



  return (
    <NativeBaseProvider>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>กรอกรายละเอียดของคุณ</Text>
        <TextInput
          multiline
          style={styles.textInput}
          value={text}
          onChangeText={onChangeText}
        />
        <Button
          title="Done"
          onPress={() => {
            handleRecord()
          }}
        />
      </ScrollView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  header: {
    color: 'white',
    fontSize: 15,
    marginLeft: 10,
    height: 50,
    backgroundColor: 'blue',
    borderRadius: 15,
    textAlign: 'center',
    paddingTop: 15,
  },
  textInput: {
    height: 200,
    padding: 10,
    backgroundColor: '#e4f2f3',
    color: 'black',
  },
});
export default RecordDetail;