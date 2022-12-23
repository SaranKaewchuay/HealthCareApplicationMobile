import React from 'react';
import {
  Login,
  Signup,
  SelectSymptom,
  CategoryList,
  Maps,
  SymptomDetail,
  DiseaseDetail
} from './screens';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Button, StyleSheet, Alert} from 'react-native';

import Tabs from './navigation/tabs';
import TabsDefaultDate from './navigation/tabs1';

import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createStackNavigator();

const App = ({route, navigation}) => {
  //const { title } = route.params;
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Home'}>
        {/* <Stack.Screen
          options={{
            headerShown: false,  
          }}
          name="Login"
          component={Login}
        /> */}
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Signup"
          component={Signup}
        />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Maps"
          component={Maps}
        />

        <Stack.Screen
          name="SymptomDetail"
          component={SymptomDetail}
          options={{
            title: 'ศรีษะ หู ตา คอ จมูก ปาก',
            headerStyle: {
              textAlign: 'center',
              backgroundColor: '#2585C0',
            },
            headerTitleStyle: {
              color: 'white',
              alignSelf: 'center',
              fontWeight: 'bold',
            },
          }}
        />

        <Stack.Screen
          name="DiseaseDetail"
          component={DiseaseDetail}
          options={{
            title: 'ศรีษะ หู ตา คอ จมูก ปาก',
            headerStyle: {
              textAlign: 'center',
              backgroundColor: '#2585C0',
            },
            headerTitleStyle: {
              color: 'white',
              alignSelf: 'center',
              fontWeight: 'bold',
            },
          }}
        />

        <Stack.Screen
          name="CategoryList"
          component={CategoryList}
          options={{
            title: 'ศรีษะ หู ตา คอ จมูก ปาก',
            headerStyle: {
              textAlign: 'center',
              backgroundColor: '#2585C0',
            },
            headerTitleStyle: {
              color: 'white',
              alignSelf: 'center',
              fontWeight: 'bold',
            },
          }}
        />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Home"
          component={Tabs}
        />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="TabsDefaultDate"
          component={TabsDefaultDate}
        />
        <Stack.Screen
          name="SelectSymptom"
          component={SelectSymptom}
          options={({navigation}) => ({
            headerRight: () => (
              <Button
                styles={styles.button}
                onPress={() =>
                  Alert.alert('สำเร็จ', 'คุณบันทึกอาการสำเร็จ', [
                    {
                      text: 'ตกลง',
                      onPress: () => navigation.navigate('TabsDefaultDate'),
                    },
                  ])
                }
                title="เสร็จสิ้น"
                color="#053C5F"
                borderRadius="15"
              />
            ),
            title: 'เลือกอาการ',
            headerStyle: {
              textAlign: 'center',
              backgroundColor: '#2585C0',
            },
            headerTitleStyle: {
              color: 'white',
              alignSelf: 'center',
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  button: {
    marginRight: 15,
    borderRadius: 15,
  },
});
