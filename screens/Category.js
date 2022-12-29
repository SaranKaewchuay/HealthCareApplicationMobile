import {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import {
  NativeBaseProvider,
  Center,
  Box,
  Heading,
  Button,
  Image,
  Text,
  Input,
} from 'native-base';
import {images} from '../constants';
import {useNavigation} from '@react-navigation/native';

const Category = props => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://192.168.1.5:8083/api/body/bodytype')
      .then(res => res.json())
      .then(result => {
        console.log(result);
        setItems(result);
      });
  }, []);

  console.log(items);

  const navigation = useNavigation();
  const goCategotyList = id => {
    navigation.navigate('CategoryList', {id: id});
  };
  const goSearch = () => {
    navigation.navigate('Search');
  };

  return (
    <NativeBaseProvider>
      <ScrollView style={styles.container}>
        <Center w="100%">
          <Box safeArea p="2" w="90%" maxW="290" py="5">
            <Heading
              size="lg"
              color="#105A88"
              fontWeight="900"
              fontSize={50}
              alignSelf="center">
              HealthCare
            </Heading>
          </Box>
          <TouchableOpacity
            onPress={() => goSearch()}
            style={[styles.center, styles.input]}>
            <Text style={[{textAlign: 'center', marginTop: 10}, styles.mali]}>
              ค้นหา ปวดหัว ท้องเสีย เป็นหวัด
            </Text>

            {/* <Input
                style={[styles.center, styles.input]}
                size="1"
                variant="rounded"
                w="90%"
                py="0"
                placeholder="ค้นหา  ปวดหัว ท้องเสีย เป็นหวัด"
                marginTop={1}
                marginBottom={3}
              /> */}
          </TouchableOpacity>
        </Center>
        <Button
          size="lg"
          borderRadius="12"
          margin={2}
          bg="lightBlue.700"
          padding={0}
          onPress={() => goCategotyList(1)}>
          <View flexDirection={'row'}>
            <Image
              size={120}
              source={images.head}
              alt="Alternate Text"
              alignSelf={'flex-start'}
            />
            <Text
              // bold="900"
              fontSize={26}
              color="white"
              marginRight={20}
              marginTop={3}
              style={styles.text}>
              ศีรษะ
              <Text fontSize={15} style={styles.text}>
                {' '}
                {'\n'}หู ตา คอ จมูก ปาก
              </Text>
            </Text>
          </View>
        </Button>
        <Button
          size="lg"
          borderRadius="12"
          margin={2}
          bg="lightBlue.700"
          padding={0}
          marginTop={'0'}
          onPress={() => goCategotyList(2)}>
          <View flexDirection={'row'}>
            <Center>
              <Image
                width={125}
                height={100}
                source={images.body}
                alt="Alternate Text"
              />
            </Center>
            <Text
              // bold="900"
              fontSize={26}
              color="white"
              marginLeft={2}
              marginRight={4}
              marginTop={2}
              style={styles.text}>
              ลำตัว
              <Text fontSize={15} style={styles.text}>
                {' '}
                {'\n'}ท้อง แขน มือ อวัยวะภายใน
              </Text>
            </Text>
          </View>
        </Button>
        <Button
          size="lg"
          borderRadius="12"
          margin={2}
          padding={0}
          bg="lightBlue.700"
          marginTop={'0'}
          onPress={() => goCategotyList(3)}>
          <View flexDirection={'row'}>
            <Image
              width={125}
              height={220}
              source={images.leg}
              alt="Alternate Text"
              alignSelf={'flex-start'}
            />
            <Text
              // bold="900"
              fontSize={29}
              color="white"
              marginLeft={1}
              marginRight={20}
              marginTop={8}
              style={styles.text}>
              ส่วนล่าง
              <Text fontSize={15} style={styles.text}>
                {' '}
                {'\n'}อวัยวะเพศ ขา เท้า
              </Text>
            </Text>
          </View>
        </Button>
        <View flexDirection={'row'} height={150}>
          <Button
            size="lg"
            borderRadius="12"
            margin={2}
            bg="lightBlue.700"
            width={'370'}
            marginTop={'0'}
            onPress={() => goCategotyList(4)}>
            <Center>
              <View style={{flexDirection:"row"}}>
                <Image
                  width={120}
                  height={120}
                  marginRight={8}
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/1176/1176354.png',
                  }}
                  alt="Alternate Text"
                  alignSelf={'flex-start'}
                />
                <Text
                  fontSize={29}
                  paddingTop={5}
                  color="white"
                  style={styles.text}>
                  ทั่วไป {'\n'}
                  <Text fontSize={18} color="white" style={styles.text}>
                  ไข้หวัด ผิวหนัง ฯลฯ
                </Text>
                
                </Text>
                
              </View>
            </Center>
          </Button>
          {/* <Button
            size="lg"
            borderRadius="12"
            margin={2}
            bg="lightBlue.700"
            // width={180}
            marginTop={'0'}
            marginLeft={'0'}
            padding={'4'}
            onPress={() => props.navigation.navigate('Maps')}>
            <Text color="white" fontSize={26} style={styles.text}>
              โรงพยาบาล
            </Text>
          </Button> */}
        </View>
      </ScrollView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  mali: {
    fontFamily: 'Mali-Regular',
    marginTop: 12,
  },
  container: {
    flex: 1,
    backgroundColor: '#e4f2f3',
  },
  text: {
    fontFamily: 'Mali-Regular',
  },
  center: {
    alignSelf: 'center',
    marginTop: 30,
  },
  color: {
    color: 'white',
  },
  input: {
    width: 350,
    borderRadius: 50,
    height: 45,
    borderWidth: 2,
    borderColor: '#0E88D7',
    backgroundColor: 'white',
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
  center: {
    textAlign: 'auto',
  },
});

export default Category;
