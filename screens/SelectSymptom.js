import React, { useState, useEffect } from 'react';
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
  Button,
} from 'react-native';

import { Center, NativeBaseProvider, Input } from 'native-base';

const ListItem = ({ item, selected, onPress, onLongPress }) => (
  <>
    <TouchableOpacity
      onPress={onPress}
      style={[styles.listItem, styles.shadow]}>
      <View style={{ padding: 8 }}>
        <Text style={{ color: 'black', fontFamily: "Mali-Regular" }}>{item.symptomName}</Text>
      </View>
      {selected && <View style={styles.overlay} />}
    </TouchableOpacity>
  </>
);

const ListItemIcon = ({ item, selected, onPress, onLongPress }) => (
  <>
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.listItemIcon}>
      <View style={{ padding: 8, }}>
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

          <Text style={{ color: 'black', marginTop: 5, fontFamily: "Mali-Regular" }}>
            {/* {item.typeTitle} */}
            {item.symptomName}
          </Text>
        </Center>
      </View>
      {selected && <View style={styles.overlay} />}
    </TouchableOpacity>
  </>
);

const SelectSymptom = props => {
  // const [selectCategory, setSelectCategory] = useState();
  const [items, setItems] = useState([]);
  const [titleCategory, setTitleCategory] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch('http://192.168.1.10:8083/api/symptom/getSymptomByImg')
      .then(res => res.json())
      .then(result => {
        //console.log(result);
        setItems(result);
      });
  }, []);
  // console.log(items);

  useEffect(() => {
    fetch('http://192.168.1.10:8083/api/body/bodytype')
      .then(res => res.json())
      .then(result => {
        // console.log(result);
        setTitleCategory(result);
      });
  }, []);

  const [activeButton, setActiveButton] = useState(null);

  const handlePress = id => {
    // setIsActive(!isActive);
    setActiveButton(id);
    fetch('http://192.168.1.10:8083/api/symptom/getSymptomByTypeNotImg/' + id)
      .then(res => res.json())
      .then(result => {
        //console.log(result);
        setList(result);
      });
  };

  console.log('คือ');
  console.log(list.data);

  const [selectedItems, setSelectedItems] = useState([]);
  const handleOnPress = contact => {
    if (selectedItems.length) {
      return selectItems(contact);
    }

    // here you can add you code what do you want if user just do single tap
    console.log('pressed');
  };

  const getSelected = contact => selectedItems.includes(contact.id);
  const [item] = useState('');
  const deSelectItems = () => setSelectedItems([]);

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



  useEffect(() => { handlePress(1) }, [])

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>

        <Pressable onPress={deSelectItems}>
          <View>
            <Center>
              <View style={{ marginTop: 15 }}>
                {selectedItems.map(user => (
                  <Text style={{ color: 'black' }}>{user}</Text>
                ))}
                <Input
                  style={[styles.center, styles.input]}
                  size="1"
                  variant="rounded"
                  w="90%"
                  py="0"
                  placeholder="ค้นหา  ปวดหัว ท้องเสีย เป็นหวัด"
                  marginTop={1}
                  marginBottom={3}
                />
              </View>
            </Center>

            <Text style={styles.head}>คุณมีอาการอะไรบ้าง ?</Text>
            <FlatList
              numColumns={4}
              data={items.data}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
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
              renderItem={({ item }) => (
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
            <View >
              <View>
                <FlatList
                  style={styles.marginTop}
                  data={list.data}
                  renderItem={({ item }) => (
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
    </NativeBaseProvider >
  );
};

const styles = StyleSheet.create({
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
    fontFamily: "Mali-Regular",
  },
  listItem: {
    backgroundColor: '#EAF8FC',
    marginBottom: 10,
    borderRadius: 5,
    overflow: 'hidden',
    height: 40,
    justifyContent: 'center',
    paddingLeft: 21,
    margin: 10
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
    fontFamily: "Mali-Bold",
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
