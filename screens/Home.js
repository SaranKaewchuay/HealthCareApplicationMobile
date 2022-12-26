import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import { NativeBaseProvider, Center, Box, Heading } from 'native-base';
import { images } from "../constants"
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = (props) => {

  const [user, setUser] = useState({})
  const [isloading, setIsLoading] = useState(true)

  const fetchUser = async () => {
    const accessToken = await AsyncStorage.getItem('@accessToken')
    const response = fetch()
  }

  useEffect(() => {
    fetchUser()
  }, [isloading])

  return (
    <NativeBaseProvider>
      <ScrollView style={styles.container}>
        <Center w="100%">
          <Box safeArea p="2" w="90%" maxW="290" py="5">
            <Heading size="lg" color="#105A88" fontWeight="900" fontSize={50} alignSelf="center">
              HealthCare
            </Heading>
          </Box>
        </Center>
        <View style={styles.box}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.label}>News</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.label}>Video</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.positionImg}>
          <Image
            style={styles.profile}
            source={images.profile}
          />
        </View>
        <View style={[styles.questionBox, styles.positionImg]}>
          <Text style={styles.question}>สบายดีไหม แจ็ค ?</Text>
        </View>

        
        <View style={[styles.row, styles.emoposition]}>
          <TouchableOpacity>
            <Image
              style={styles.emotion}
              source={images.happy}
            />
            <View style={styles.questionBox}>
              <Text style={styles.question}>สบายดี</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate('SelectSymptom')}>
            <Image
              style={styles.emotion}
              source={images.bad}
            />
            <View style={styles.questionBox}>
              <Text style={styles.question}>ไม่สบาย</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF4FB",
  },
  header: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#105A88",
    textAlign: 'center',
    margin: 28,
  },
  box: {
    backgroundColor: "#FFFFFF",
    height: 60,
    elevation: 10,
    shadowColor: '#52006A',
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#105A88",
    backgroundColor: "white",
    marginHorizontal: "6%",
    marginTop: 10,
    minWidth: "38%",
    textAlign: "center",
  },
  selected: {
    backgroundColor: "#105A88",
    borderWidth: 2,
    borderColor: "black",
  },
  selectedLabel: {
    color: "white"
  },
  label: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "black"
  },
  profile: {
    marginTop: 20,
    margingBottom: 20,
    width: 200,
    height: 200,
  },
  positionImg: {
    alignItems: "center",
  },
  questionBox: {
    backgroundColor: "#2585C0",
    height: 55,
    margin: 20,
    marginLeft: "9%",
    marginRight: "9%",
    borderRadius: 25,
  },
  question: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    paddingVertical: 15,
  },
  emotion: {
    marginTop: 20,
    margingBottom: 20,
    width: 75,
    height: 75,
    marginLeft: "20%",

  },
  emoposition: {
    justifyContent: "center"
  }
});
export default Home;
