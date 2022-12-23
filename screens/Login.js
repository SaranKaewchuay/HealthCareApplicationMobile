/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import {images} from '../constants';
 import React,{useState,useEffect}from 'react';
 import {TouchableOpacity, StyleSheet,SafeAreaView,ScrollView,Alert} from 'react-native';
 import {
   Button,
   Box,
   Text,
   Link,
   Image,
   HStack,
   Center,
   Heading,
   NativeBaseProvider,
   VStack,
   Input,
 } from 'native-base';
 
 import AsyncStorage from '@react-native-async-storage/async-storage';
 
 const Login = props => {

   const [show, setShow] = React.useState(false);
 
   const [email, setEmail ] = useState("");
   const [password, setPassword] = useState("");
   const handleClick = () => setShow(!show);
 

   const handleLogin = async () => {
     const response = fetch(`http://10.200.27.75:8083/api/auth/login`,{
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json'
       },
       body: JSON.stringify({
         email : email ,
         password : password,
         expiresIn: 60000
         
       })  
       
      }).then((response) => response.json())
     .then(async data => {
        console.log(data)
         if (!data.error) {
            props.navigation.navigate("Home", { data: data })
            
            await AsyncStorage.setItem('@token',data.token)
            const token = await AsyncStorage.getItem('@token')
            console.log(token)
            
         }
         else {
          Alert.alert('Unsuccessful', 'Email or Password is incorrect', [
            {
              text: 'OK'
            },
          ]);
         }
     })
     .catch((error) => {
         console.error(error);
         Alert.alert('invalid data');
     });
   }
 
   return (
     <NativeBaseProvider>
       <SafeAreaView style={styles.container}>
       <ScrollView>
         <Center px={10}>
           <VStack space={5} alignItems="center">
             <Image
               style={styles.margin1}
               size={300}
               borderRadius={50}
               source={images.logo_healthCare}
               alt="logo"
             />
             <Heading size="lg" style={styles.blue}>
               Welcome To
               <Text style={styles.green}> HealthCare</Text>
             </Heading>
             <Input
               style={styles.center}
               size="lg"
               variant="rounded"
               placeholder="Username"
               value={email}
               onChangeText={text => setEmail (text)}
             />
             <Box alignItems="center">
               <Input
                 style={[styles.center, styles.input]}
                 size="lg"
                 variant="rounded"
                 type={show ? 'text' : 'password'}
                 w="100%"
                 py="0"
                 value={password}
                 onChangeText={text => setPassword(text)}
                 InputRightElement={
                   <Button
                     size="xs"
                     rounded="none"
                     w="1/6"
                     h="full"
                     bg="indigo.600"
                     onPress={handleClick}
                     backgroundColor= '#0076BE'>
                     {show ? 'Hide' : 'Show'}
                   </Button>
                 }
                 placeholder="Password"
               />
             </Box>
             <TouchableOpacity
                 style={[styles.roundButton,styles.text]}
                 onPress={handleLogin}
                 >
                   <Text style={styles.text} >Login</Text>

             </TouchableOpacity>
 
             <HStack mt="6" justifyContent="center">
               <Text
                 fontSize="sm"
                 color="coolGray.600"
                 _dark={{
                   color: 'warmGray.200',
                 }}>
                 I'm a new user.{' '}
               </Text>
               <Link
                 _text={{
                   color: '#0076BE',
                   fontWeight: 'medium',
                   fontSize: 'sm',
                 }}
                 onPress={() => props.navigation.navigate('Signup')}>
                 Sign Up
               </Link>
             </HStack>
           </VStack>
         </Center>
         </ScrollView>
       </SafeAreaView>
     </NativeBaseProvider>
   );
 };
 
 const styles = StyleSheet.create({
   container: {
     backgroundColor: '#EAF4FB',
     flex:1
   },
   input: {
     width: 200,
     height: 42,
   },
   green: {
     color: '#1879B4',
   },
   blue: {
     color: 'black',
   },
   margin1: {
     marginTop: 27,
   },
   center: {
     textAlign: 'auto',
   },
   roundButton: {
     width: 310,
     height: 45,
     justifyContent: 'center',
     alignItems: 'center',
     padding: 10,
     borderRadius: 15,
     backgroundColor: '#0076BE'
   },
   text: {
     color: 'white',
   },
 });
 export default Login;
 