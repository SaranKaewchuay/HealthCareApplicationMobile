import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, SafeAreaView,FlatList,TouchableOpacity} from 'react-native';

import {Button, NativeBaseProvider} from 'native-base';
import { useNavigation } from '@react-navigation/native';

const SymptomDetail = ({route}) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(
      'http://192.168.1.10:8083/api/symptom/getSymptomById/' + route.params.id,
    )
      .then(res => res.json())
      .then(result => {
        //console.log(result);
        setItems(result.data);
      });
  }, []);

  const [relatedDiseases, setRelatedDiseases] = useState([]);
  useEffect(() => {
    fetch(
      'http://192.168.1.10:8083/api/symptom/getSymptomByDisease/' + route.params.id,
    )
      .then(res => res.json())
      .then(result => {
        //console.log(result);
        setRelatedDiseases(result.data);
      });
  }, []);

  console.log(relatedDiseases)

  const navigation = useNavigation();
  const goDiseaseDetail = (id) => {
    navigation.navigate('DiseaseDetail', {id:id});
  }


  const ListItem = ({item, selected}) => (
    <>
      <TouchableOpacity
        onPress={() => goDiseaseDetail(item.id)}
        style={[styles.listItem, styles.shadow]}>
        <View style={{padding: 8}}>
          <Text style={{color: 'black' ,fontFamily:'Mali-Regular'}}>{item.diseaseName}</Text>
        </View>
        {selected && <View style={styles.overlay} />}
      </TouchableOpacity>
    </>
  );

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          {items.map((items, index) => (
            <Text style={styles.headertext}>{items.symptomName}</Text>
          ))}
        </View>
        <ScrollView>
          <View style={styles.innerbox}>
            <Text numberOfLines={18} style={styles.inner_small_text}>
              <Text style={styles.blodtext}>
                คำเเนะนำ{'\n'}***{'\n'}
              </Text>
              {items.map((items, index) => (
                <Text style={{color: 'black'}}>{items.discription}</Text>
              ))}
            </Text>
          </View>
          <View style={styles.innerbox2}>
            <Text>
              <Text style={styles.blodtext2}>
                โรคที่เกี่ยวข้อง{'\n'}***{'\n'}
              </Text>
              <Text style={styles.listItem}></Text>
            </Text>
            <View>
                  <FlatList
                    data={relatedDiseases}
                    renderItem={({item}) => (
                      <ScrollView>
                        <ListItem
                          item={item}
                        />
                      </ScrollView>
                    )}
                    keyExtractor={item => item.id}
                  />
                </View>
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
    fontSize: 17,
    fontWeight: 'bold',
    color: '#004C7A',
  },
  header: {
    backgroundColor: '#004C7A',
    height: 100,
    left: 0,
  },
  headertext: {
    fontSize: 25,
    // fontWeight: 'bold',
    fontFamily: 'Mali-Bold',
    color: 'white',
    paddingTop: 22,
    paddingLeft: 25,
    margin: 5,
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
    fontSize: 16,
    fontFamily: 'Mali-Bold',
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
    fontSize: 14,
    color: 'gray',
    fontFamily: 'Mali-Regular',
  },
});

export default SymptomDetail;
