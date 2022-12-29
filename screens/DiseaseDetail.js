import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { NativeBaseProvider } from 'native-base';

const DiseaseDetail = ({ route }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(
      'http://192.168.1.5:8083/api/disease/getDiseaseById/' + route.params.id,
    )
      .then(res => res.json())
      .then(result => {
        setItems(result.data);
      });
  }, []);

  console.log(items);
  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          {items.map((items, index) => (
            <Text style={styles.headertext}>{items.diseaseName}</Text>
          ))}
        </View>
        <ScrollView>
          <View style={styles.innerbox}>
            <Text numberOfLines={1000} style={styles.inner_small_text} >
              <Text style={styles.blodtext}>
                คำเเนะนำ{'\n'}***{'\n'}
              </Text>
              {items.map((items, index) => (

                <Text letterSpacing={2} style={{ color: 'black', fontFamily: "Mali-Regular", }}>
                  {"* อาการ *"}{'\n'}{'\n'}
                  {items.symptom} {'\n'}{'\n'}
                  {"* สาเหตุ *"}{'\n'}{'\n'}
                  {items.cause} {'\n'}{'\n'}
                  {"* วิธีรักษา *"}{'\n'}{'\n'}
                  {items.treatment} {'\n'}{'\n'}
                  {"* การดูแลตัวเอง *"}{'\n'}{'\n'}
                  {items.selfCare} {'\n'}
                </Text>
              ))}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#daecf0',
  },
  blodtext: {
    fontSize: 16,
    fontFamily: "Mali-Bold",
    color: '#004C7A',
  },
  header: {
    backgroundColor: '#004C7A',
    height: 100,
    left: 0,
  },
  headertext: {
    fontSize: 25,
    fontFamily: "Mali-Bold",
    color: 'white',
    paddingTop: 22,
    paddingLeft: 25,
    marginTop: 6,
  },
  innerbox: {
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    shadowOpacity: 80,
    elevation: 4,
    borderRadius: 30,
    width: '90%',
    padding: 20,
    paddingBottom: 25,
    marginTop: 25,
    marginBottom: 25
  },
  innerbox2: {
    alignSelf: 'center',
    backgroundColor: '#1A78AC',
    shadowOpacity: 80,
    elevation: 4,
    borderRadius: 30,
    width: '90%',
    padding: 20,
    marginTop: 25,
    marginBottom: 25,
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
  blodtext2: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  listItem: {
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 5,
    overflow: 'hidden',
    height: 40,
    justifyContent: 'center',
    paddingLeft: 21,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  inner_small_text: {
    fontSize: 15,
    color: 'gray',
  },
});

export default DiseaseDetail;
