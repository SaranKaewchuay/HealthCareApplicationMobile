import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const Date = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerbox}>
        <Text style={styles.headertext}>บันทึกสุขภาพ</Text>
      </View>
      <View style={[styles.carlendar,styles.shadow]}>
        <Calendar></Calendar>
      </View>
      <View style={styles.todobox}>
        
        <Text style={styles.todotext}>10 พฤศจิกายน 2565{'\n\n'}มีไข้, ไอ, คลื่นไส้ </Text>
      </View>
      <Text
        style={{
          color: 'black',
          fontWeight: 'bold',
          fontSize: 18,
          marginLeft: 20,
          marginBottom: 20,
        }}>
        อาการ
      </Text>
      <View style={{marginLeft: 20, marginRight: 20}}>
        <TouchableOpacity style={styles.listItem}>
          <View style={{padding: 8}}>
            <Text style={{color: 'black'}}>มีไข้</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem}>
          <View style={{padding: 8}}>
            <Text style={{color: 'black'}}>ไอ</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem}>
          <View style={{padding: 8}}>
            <Text style={{color: 'black'}}>คลื่นไส้</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.list}>
          <View style={{padding: 8,paddingBottom:15,paddingTop:15}}>
            <Text style={{color: 'white', paddingLeft: 20,fontWeight:"bold"}}>โรคที่เกี่ยวข้อง</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    borderRadius:10
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
    paddingLeft: 20
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
});

export default Date;
