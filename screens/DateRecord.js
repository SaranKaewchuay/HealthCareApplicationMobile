import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {useNavigation} from '@react-navigation/native';

import {images} from '../constants';
import {TabIcon} from '../components';
import {icons} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {NavigationContainer, useIsFocused} from '@react-navigation/native';
const API_URL =
  Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://192.168.1.5:5000';

const DateRecord = ({route, props}) => {
  const [items, setItems] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [dailyId, setID] = useState();
  const [dailyDescription, setDailyDescription] = useState('');
  const [symptom, setSymptom] = useState([]);
  const [mailToken, setmailToken] = useState();
  const [userID, setUserID] = useState();
  const [userName, setUserName] = useState('');

  const isFocused = useIsFocused();
  const goDate = id => {
    navigation.navigate('Date', {date: selectedDate});
  };

  useEffect(() => {
    if (!route) {
      setSelectedDate(route.params.date);
    }
  }, [isFocused]);

  const getToken = async () => {
    try {
      return await AsyncStorage.getItem('token');
    } catch (e) {
      console.log(e);
    }
  };

  const getItemForDate = async data => {
    const token = await getToken();
    console.log('token ==== > ', token);
    fetch(`${API_URL}/private`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async res => {
        try {
          const jsonRes = await res.json();
          if (res.status === 200) {
            setUserID(jsonRes.data.id);
            setUserName(jsonRes.data.name);
            console.log(selectedDate);
            fetch(
              'http://192.168.1.5:8083/api/daily/getRecordByDate/' +
                selectedDate +
                '/' +
                jsonRes.data.id,
            )
              .then(res => res.json())
              .then(result => {
                setItems(result.data);
              });
          }
        } catch (err) {
          console.log(err);
        }
      })
      .catch(err => {
        console.log(err);
      });

    setSymptom(items.map(obj => obj.Symptom_id));
    {
      items.slice(0, 1).map((items, index) => setID(items.DailyRecord_id));
    }
    {
      items
        .slice(0, 1)
        .map((items, index) => setDailyDescription(items.dailyDescription));
    }
  };

  const deleteItem = () => {
    Alert.alert('ลบรายการ', 'คุณแน่ใจไหมว่าต้องการลบ', [
      {
        text: 'ยกเลิก',
      },
      {
        text: 'ตกลง',
        onPress: () => deleteDaily(),
      },
    ]);
  };

  const deleteDaily = () => {
    fetch('http://192.168.1.5:8083/api/daily/delete-Record/' + dailyId)
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          Alert.alert('สำเร็จ', 'ลบรายการสำเร็จ', [
            {
              text: 'ตกลง',
              onPress: () => goDate(),
            },
          ]);
        }
      })
      .catch(error => {
        console.error(error);
        Alert.alert('invalid data');
      });
  };
  const ListItem = ({item}) => (
    <>
      <TouchableOpacity
        onPress={() => goSymptomDetail(item.id)}
        style={[styles.listItem, styles.shadow]}>
        <View style={{padding: 8}}>
          <Text style={{color: 'black', fontFamily: 'Mali-Regular'}}>
            {item.symptomName}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );

  const navigation = useNavigation();
  const goSymptomDetail = id => {
    navigation.navigate('SymptomDetail', {id: id});
  };

  const goRecordDetail = detail => {
    {
      items.map((items, index) =>
        navigation.navigate('RecordDetail', {
          id: items.DailyRecord_id,
          date: selectedDate,
          detail: detail,
        }),
      );
    }
  };

  const goSelectSymptom = () => {
    navigation.navigate('SelectSymptom', {date: selectedDate});
  };
  const goEditSymptom = id => {
    navigation.navigate('EditSelectSymptom', {
      date: selectedDate,
      symptom: symptom,
      dailyDescription: dailyDescription,
      id: dailyId,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerbox}>
        <Text style={[styles.headertext, styles.mali]}>บันทึกสุขภาพ</Text>
      </View>
      <Text style={[{textAlign: 'center', fontSize: 25},styles.name]}>
        สวัสดีคุณ {userName}{' '}
      </Text>
      <View style={[styles.carlendar, styles.shadow]}>
        <Calendar
          markedDates={{
            [selectedDate]: {selected: true},
            // ["2022-12-02"]: { marked: true, dotColor: 'green' },
            // ["2022-12-05"]: { marked: true, dotColor: 'red' },
            // ["2022-12-21"]: { marked: true, dotColor: 'red' }
          }}
          onDayPress={day => {
            {
              setSelectedDate(day.dateString), getItemForDate();
            }
          }}
        />
      </View>

      {items === null || items.length === 0 ? (
        <View>
          <View>
            <View style={styles.todobox}>
              <Text style={styles.todotext}>
                <Text style={{fontSize: 18}}>
                  {selectedDate}
                  {'\n'}
                </Text>
                <Text style={{fontSize: 18}}>ยังไม่บันทึก</Text>
              </Text>
            </View>
          </View>

          <View style={[styles.row, styles.emoposition]}>
            <TouchableOpacity onPress={() => goSelectSymptom()}>
              <Image style={styles.emotion} source={images.bad} />
              <View style={styles.questionBox}>
                <Text style={styles.question}>บันทึกอาการ</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <View style={{marginLeft: 20, marginRight: 20}}>
            {/* {userID && <Text>{userID.id}</Text>} */}

            <View>
              <View style={[styles.todobox, {flexDirection: 'row'}]}>
                <View style={{flex: 1}}>
                  <Text style={styles.todotext}>
                    <Text style={{fontSize: 18}}>
                      {selectedDate}
                      {'\n'}
                    </Text>
                    {items.map((items, index) => (
                      <Text
                        style={{
                          color: 'black',
                          fontFamily: 'Mali-Regular',
                          marginLeft: 10,
                        }}>
                        {items.symptomName + '  '}
                      </Text>
                    ))}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity onPress={() => goEditSymptom()}>
                <TabIcon icon={icons.edit} style={styles.edit} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteItem()}>
                <TabIcon icon={icons.deleteIcon} />
              </TouchableOpacity>
            </View>

            <Text style={styles.font}>อาการ</Text>
            <FlatList
              style={styles.marginTop}
              data={items}
              renderItem={({item}) => <ListItem item={item} />}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      )}

      {items.slice(0, 1).map((items, index) =>
        items.dailyDescription === null ||
        items.dailyDescription.length === 0 ? (
          <View style={{padding: 20}}>
            <TouchableOpacity
              style={styles.list}
              onPress={() => goRecordDetail()}>
              <View style={{padding: 8, paddingBottom: 15, paddingTop: 15}}>
                <Text
                  style={{
                    color: 'white',
                    paddingLeft: 20,
                    fontWeight: 'bold',
                  }}>
                  บันทึกรายละเอียดเพิ่มเติม
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <View>
              <Text style={[styles.font, {marginLeft: 19}]}>
                รายละเอียดเพิ่มเติม
              </Text>
              <TouchableOpacity
                onPress={() => goRecordDetail(items.dailyDescription)}>
                <View style={[styles.todobox, {paddingBottom: 30}]}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                      <Text style={[styles.todotext]}>
                        <Text style={styles.fonts}>
                          {' '}
                          {items.dailyDescription}
                        </Text>
                      </Text>
                    </View>
                    <View style={{flex: 0.1}}>
                      <TabIcon icon={icons.edit} />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ),
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mali: {
    fontFamily: 'Mali-Regular',
  },
  edit: {
    backgroundColor: 'yellow',
    width: '50%',
    height: '150%',
    borderRadius: 30,
  },
  font: {
    color: 'black',
    paddingLeft: 20,
    fontSize: 16,
    fontFamily: 'Mali-Bold',
    marginTop: 10,
    marginBottom: 10,
  },
  fonts: {
    fontFamily: 'Mali-Medium',
  },
  container: {
    flex: 1,
    backgroundColor: '#EAF4FB',
  },
  headerbox: {
    height: 65,
    backgroundColor: '#2585C0',
    elevation: 20,
    shadowColor: '#52006A',
  },
  name: {
    height: 65,
    backgroundColor: 'white',
    elevation: 20,
    elevation: 5,
    shadowColor: '#000',
    paddingTop:8,
    fontFamily:"Mali-Regular",
    color:"black"
  },
  headertext: {
    fontSize: 18.5,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    paddingVertical: 20,
  },
  carlendar: {
    margin: 28,
    marginTop: 15,
    marginBottom: 12,
    elevation: 10,
    shadowColor: '#52006A',
    borderRadius: 10,
  },
  todobox: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginTop: 0,
    marginLeft: '5%',
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
  },
  todotext: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#105A88',
    textAlign: 'center',
    paddingVertical: 20,
  },
  listItem: {
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 5,
    overflow: 'hidden',
    paddingLeft: 20,
  },
  list: {
    backgroundColor: '#0076BE',
    marginBottom: 40,
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
  box: {
    backgroundColor: '#FFFFFF',
    height: 60,
    elevation: 10,
    shadowColor: '#52006A',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#105A88',
    backgroundColor: 'white',
    marginHorizontal: '6%',
    marginTop: 10,
    minWidth: '38%',
    textAlign: 'center',
  },
  selected: {
    backgroundColor: '#105A88',
    borderWidth: 2,
    borderColor: 'black',
  },
  selectedLabel: {
    color: 'white',
  },
  label: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  profile: {
    marginTop: 20,
    margingBottom: 20,
    width: 200,
    height: 200,
  },
  positionImg: {
    alignItems: 'center',
  },
  questionBox: {
    backgroundColor: '#2585C0',
    height: 55,
    margin: 20,
    marginLeft: '9%',
    marginRight: '9%',
    borderRadius: 25,
  },
  question: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    paddingVertical: 15,
  },
  emotion: {
    marginTop: 20,
    margingBottom: 20,
    width: 75,
    height: 75,
    marginLeft: '26%',
  },
  emoposition: {
    justifyContent: 'center',
  },
});

export default DateRecord;
