import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {useNavigation} from '@react-navigation/native';

import {images} from '../../constants';
import {TabIcon} from '../../components';
import {icons} from '../../constants';

const DateRecord = ({route, props}) => {
  const [items, setItems] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [id, setID] = useState();
  const [dailyDescription, setDailyDescription] = useState([]);
  const [symptom, setSymptom] = useState([]);
  

  useEffect(() => {
    if (!route) {
      setSelectedDate(route.params.date);
    }
  }, []);

  console.log(selectedDate);

  const getItemForDate = () => {
    fetch(
      'http://192.168.1.5:8083/api/daily/getRecordByDate/' +
        selectedDate +
        '/1',
    ).then(res => res.json())
      .then(result => {
        setItems(result.data);
      });
  
      setSymptom(items.map(obj => obj.Symptom_id))
      console.log("symptom")
      console.log(symptom)
  };




  console.log('dailyDescription');
  console.log(dailyDescription);

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
    navigation.navigate('SelectSymptom', {date: selectedDate,symptom: symptom});
  };

  console.log('ข้อมูลตามวัน');
  console.log(items);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerbox}>
        <Text style={styles.headertext}>บันทึกสุขภาพ</Text>
      </View>

      <View style={[styles.carlendar, styles.shadow]}>
        <Calendar
          markedDates={{
            [selectedDate]: {selected: true},
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
          <TouchableOpacity>
            <View style={styles.todobox}>
              <Text style={styles.todotext}>
                <Text style={{fontSize: 18}}>
                  {selectedDate}
                  {'\n'}
                </Text>
                <Text style={{fontSize: 18}}>ยังไม่บันทึก</Text>
              </Text>
            </View>
          </TouchableOpacity>

          <View style={[styles.row, styles.emoposition]}>
            <TouchableOpacity>
              <Image style={styles.emotion} source={images.happy} />
              <View style={styles.questionBox}>
                <Text style={styles.question}>สบายดี</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goSelectSymptom()}>
              <Image style={styles.emotion} source={images.bad} />
              <View style={styles.questionBox}>
                <Text style={styles.question}>ไม่สบาย</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <View style={{marginLeft: 20, marginRight: 20}}>
            <TouchableOpacity onPress={() => goSelectSymptom()}>
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
                          {/* {selectItems(items.Symptom_id)} */}
                      </Text>
                    ))}
                  </Text>
                </View>
                <View style={{flex: 0.08}}>
                  <TabIcon icon={icons.edit} />
                </View>
              </View>
            </TouchableOpacity>
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
          <View>
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
    marginLeft: '20%',
  },
  emoposition: {
    justifyContent: 'center',
  },
});

export default DateRecord;
