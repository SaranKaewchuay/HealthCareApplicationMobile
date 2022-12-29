import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';

import {Center, NativeBaseProvider, Input} from 'native-base';
import {useNavigation} from '@react-navigation/native';
const API_URL = Platform.OS === 'ios' ? 'http://localhost:8083' : 'http://10.0.2.2:8083';




const ListItem = ({item, selected, onPress}) => (
  <>
    <TouchableOpacity
      onPress={onPress}
      style={[styles.listItem, styles.shadow]}>
      <View style={{padding: 8}}>
        <Text style={{color: 'black', fontFamily: 'Mali-Regular'}}>
          {item.symptomName}
        </Text>
      </View>
      {selected && <View style={styles.overlay} />}
    </TouchableOpacity>
  </>
);

const ListItemIcon = ({item, selected, onPress}) => (
  <>
    <TouchableOpacity onPress={onPress} style={styles.listItemIcon}>
      <View style={{padding: 11}}>
        <Center>
          <Image
            source={{
              uri: item.imageUrl,
            }}
            style={{
              marginTop: 0,
              marginBottom: 0,
              width: 56.5,
              height: 50,
              borderWidth: 2,
              resizeMode: 'contain',
              margin: 8,
            }}
          />

          <Text
            style={{color: 'black', marginTop: 5, fontFamily: 'Mali-Regular'}}>
            {/* {item.typeTitle} */}
            {item.symptomName}
          </Text>
        </Center>
      </View>
      {selected && <View style={styles.overlay} />}
    </TouchableOpacity>
  </>
);

const SelectSymptom = ({route}) => {
  // const [selectCategory, setSelectCategory] = useState();
  const [items, setItems] = useState([]);
  const [titleCategory, setTitleCategory] = useState([]);
  const [list, setList] = useState([]);
  const deSelectItems = () => setSelectedItems([]);
  const [activeButton, setActiveButton] = useState(null);
  const [currentDate, setCurrentDate] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [dailyDescription, setDailyDescription] = useState("");
  const [idDaily, setID] = useState();
  const getSelected = contact => selectedItems.includes(contact.id);


  getSelected(66);

  useEffect(() => {
    setCurrentDate(route.params.date);
    setSelectedItems(route.params.symptom)
    setDailyDescription(route.params.dailyDescription)
    setID(route.params.id)
    console.log("selectedItems")
    console.log(selectedItems)
    console.log(dailyDescription)
    console.log(idDaily)
  }, []);

  console.log('CurrentDate');
  console.log(currentDate);
  useEffect(() => {
    fetch('http://192.168.1.5:8083/api/symptom/getSymptomByImg')
      .then(res => res.json())
      .then(result => {
        setItems(result);
      });
  }, []);

  useEffect(() => {
    fetch('http://192.168.1.5:8083/api/body/bodytype')
      .then(res => res.json())
      .then(result => {
        setTitleCategory(result);
      });
  }, []);

  const handlePress = id => {
    setActiveButton(id);
    fetch('http://192.168.1.5:8083/api/symptom/getSymptomByTypeNotImg/' + id)
      .then(res => res.json())
      .then(result => {
        setList(result);
      });
  };

  console.log('คือ');
  console.log(list.data);

  const selectItems = item => {
    console.log(item);
    if (selectedItems.includes(item.id)) {
      const newListItems = selectedItems.filter(
        listItem => listItem !== item.id,
      );
      return setSelectedItems([...newListItems]);
    }
    setSelectedItems([...selectedItems, item.id]);
  };

  const showItems = id => {
    if (selectedItems.includes(id)) {
      const newListItems = selectedItems.filter(listItem => listItem !== id);
      return setSelectedItems([...newListItems]);
    }
    setSelectedItems([...selectedItems, id]);
    
  };

  useEffect(() => {
    handlePress(1);
  }, []);

  const [counter, setCounter] = useState(0);

  const navigation = useNavigation();
  const goDate = id => {
    navigation.navigate('Date', {date: currentDate});
  };

  const handleRecord = async () => {
    console.log('เข้า');
    fetch(`http://192.168.1.5:8083/api/daily/edit-record`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        id: idDaily, 
        dateRecord: currentDate,
        dailyDescription: dailyDescription,
        User_id: 1,
      }),
    });
    setTimeout(() => {
      detail();
    }, 500);
  };

  const detail = () => {
    fetch(`http://192.168.1.5:8083/api/record/edit-record`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        Symptom_id: selectedItems,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          Alert.alert('สำเร็จ', 'บันทึกอาการสำเร็จ', [
            {
              text: 'ยกเลิก',
            },
            {
              text: 'ตกลง',
              onPress: () => goDate(),
            },
          ]);
        } else {
          Alert.alert('ไม่สำเร็จ', 'บันทึกอาการไม่สำเร็จ', [
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
  };
  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <Pressable onPress={deSelectItems}>
          <View style={styles.headerbox}>
            <Text style={styles.headertext}>เลือกอาการ</Text>
          </View>

          <TouchableOpacity
            style={styles.listview}
            onPress={() => handleRecord()}>
            <Text style={[styles.buttonText, {color: 'white'}]}>
              {' '}
              เสร็จสิ้น{' '}
            </Text>
          </TouchableOpacity>

          <View>
            <Text style={styles.head}>คุณมีอาการอะไรบ้าง ?</Text>
            <FlatList
              numColumns={4}
              data={items.data}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <ListItemIcon
                  onPress={() => selectItems(item)}
                  selected={getSelected(item)}
                  item={item}
                />
              )}
            />

            <FlatList
              data={titleCategory.data}
              horizontal={true}
              renderItem={({item}) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handlePress(item.id)}
                  style={[
                    styles.button,
                    item.id === activeButton && styles.buttonActive,
                  ]}>
                  <Text style={styles.buttonText}>{item.typeTitle}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
            />
          </View>
          <ScrollView>
            <View>
              <View>
                <FlatList
                  style={styles.marginTop}
                  data={list.data}
                  renderItem={({item}) => (
                    <ListItem
                      onPress={() => selectItems(item)}
                      selected={getSelected(item)}
                      item={item}
                    />
                  )}
                  keyExtractor={item => item.id}
                />
              </View>
            </View>
          </ScrollView>
        </Pressable>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  listview: {
    position: 'absolute',
    backgroundColor: '#00446e',
    borderRadius: 10,
    marginTop: 12,
    alignSelf: 'flex-end',
  },
  headerbox: {
    height: 60,
    backgroundColor: '#2585C0',
    elevation: 20,
    shadowColor: '#52006A',
  },
  headertext: {
    fontFamily: 'Mali-Bold',
    fontSize: 17,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 14,
  },
  container: {
    backgroundColor: '#DFF8FE',
    flex: 1,
  },
  button: {
    backgroundColor: '#CBE8F9',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
  buttonActive: {
    backgroundColor: '#96cce7',
    color: 'white',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Mali-Regular',
  },
  listItem: {
    backgroundColor: '#EAF8FC',
    marginBottom: 10,
    borderRadius: 5,
    overflow: 'hidden',
    height: 42,
    justifyContent: 'center',
    paddingLeft: 21,
    margin: 10,
  },
  marginTop: {
    marginTop: 0,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  listItemIcon: {
    backgroundColor: '#EAF8FC',
    borderColor: '#E0E3E4',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 10,
    overflow: 'hidden',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(75, 205, 239, 0.3)',
  },
  marginTop: {
    marginTop: 0,
  },
  header: {
    marginTop: 15,
    marginBottom: 15,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  head: {
    color: 'black',
    // fontWeight: 'bold',
    fontFamily: 'Mali-Bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    width: 200,
    height: 42,
  },
  center: {
    textAlign: 'auto',
  },
  title: {
    backgroundColor: 'white',
    borderRadius: 9,
    marginTop: 8,
    marginBottom: 15,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    color: 'black',
  },
});

export default SelectSymptom;
