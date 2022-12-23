import {useEffect,useState,} from 'react';
import {StyleSheet, View,ScrollView} from 'react-native';
import {
  NativeBaseProvider,
  Center,
  Box,
  Heading,
  Button,
  Image,
  Text
} from 'native-base';
import {images} from '../constants';
import { useNavigation } from '@react-navigation/native';


const Category = (props) => {
  const [items, setItems] = useState([]);


  useEffect(() => {
    fetch('http://192.168.1.5:8083/api/body/bodytype')
      .then(res => res.json())
      .then(result => {
        console.log(result);
        setItems(result);
      });
  }, []);

  console.log(items)

  const navigation = useNavigation();
  const goCategotyList = (id) => {
    navigation.navigate('CategoryList', {id:id});
  }
  return (
    <NativeBaseProvider>
      <ScrollView>
      <Center w="100%">
        <Box safeArea p="2" w="90%" maxW="290" py="5">
          <Heading size="lg" color="#105A88" fontWeight="900" fontSize={50} alignSelf="center">
            HealthCare
          </Heading>
        </Box>
      </Center>
      <Button
        size="lg"
        borderRadius="12"
        margin={2}
        bg="lightBlue.700"
        padding={0} 
        onPress={() =>  goCategotyList(1)}
        >
        <View flexDirection={'row'}>
          <Image
            size={120}
            source={images.head}
            alt="Alternate Text"
            alignSelf={'flex-start'}
          />
          <Text
            bold="900"
            fontSize={29}
            color="white"
        
            marginRight={20}
            marginTop={3}>
            ศีรษะ 
            <Text fontSize={15} fontStyle="italic"> {'\n'}หู ตา คอ จมูก ปาก</Text>
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
        onPress={() =>  goCategotyList(2)}
        >
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
            bold="900"
            fontSize={29}
            color="white"
            marginLeft={2}
            marginRight={4}
            marginTop={2}>
            ลำตัว
            <Text fontSize={15} fontStyle="italic"> {'\n'}ท้อง แขน มือ อวัยวะภายใน</Text>
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
        onPress={() =>  goCategotyList(3)}>
        <View flexDirection={'row'}>
          <Image
            width={125}
            height={220}
            source={images.leg}
            alt="Alternate Text"
            alignSelf={'flex-start'}
          />
          <Text
            bold="900"
            fontSize={29}
            color="white"
            marginLeft={1}
            marginRight={20}
            marginTop={8}>
            ส่วนล่าง
            <Text fontSize={15} fontStyle="italic"> {'\n'}อวัยวะเพศ ขา เท้า</Text>
          </Text>
        </View>
      </Button>
      <View flexDirection={'row'} height={190}>
        <Button
          size="lg"
          borderRadius="12"
          margin={2}
          bg="lightBlue.700"
          width={180}
          marginTop={'0'}
          onPress={() =>  goCategotyList(4)}
          >
          <Center>
            <View>
              <Text bold="900" fontSize={29} color="white">
                ทั่วไป
              </Text>
              <Text color="white" fontStyle="italic">ไข้หวัด ผิวหนัง ฯลฯ</Text>
            </View>
          </Center>
        </Button>
        <Button
          size="lg"
          borderRadius="12"
          margin={2}
          bg="lightBlue.700"
          width={180}
          marginTop={'0'}
          marginLeft={'0'}
          onPress={() => props.navigation.navigate('Maps')}
          >
          <Text color="white" bold="900" fontSize={29}>
            โรงพยาบาล
          </Text>
        </Button>
      </View>
      </ScrollView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  center: {
    alignSelf: 'center',
    marginTop: 30,
  },
  color: {
    color: 'white',
  },
});

export default Category;
