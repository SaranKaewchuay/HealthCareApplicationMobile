import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';

const var_dump = require('var_dump')

const ListItem = ({ item, selected, onPress, onLongPress }) => (
  <>
    <TouchableOpacity
      onPress={onPress}
      style={[styles.listItem, styles.shadow]}>
      <View style={{ padding: 8 }}>
        <Text style={[{ color: 'black' }, styles.text]}>{item.symptomName}</Text>
      </View>
      {selected && <View style={styles.overlay} />}
    </TouchableOpacity>
  </>
);

const CategoryList = ({ route }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://10.200.28.100:8083/api/symptom/getSymptomByType/' + route.params.id)
      .then(res => res.json())
      .then(result => {
        console.log(result);
        setItems(result);
      });
  }, []);

  const navigation = useNavigation();
  const goSymptomDetail = (id) => {
    navigation.navigate('SymptomDetail', { id: id });
  }
  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView >
            <Pressable style={{ padding: 15 }}>
              <View>
                <FlatList
                  data={items.data}
                  renderItem={({ item }) => <ListItem item={item} onPress={() => goSymptomDetail(item.id)} />}
                  keyExtractor={item => item.id}
                  nestedScrollEnabled={true}
                />
              </View>
            </Pressable>
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
  text: {
    fontFamily: 'Mali-Regular',
  },
  listItem: {
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 5,
    overflow: 'hidden',
    height: 55,
    justifyContent: 'center',
    paddingLeft: 21,
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
  },
  head: {
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
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

export default CategoryList;
