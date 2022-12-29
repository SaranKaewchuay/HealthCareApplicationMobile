import React from 'react';
import {
  Login,
  Signup,
  SelectSymptom,
  CategoryList,
  Maps,
  SymptomDetail,
  DiseaseDetail,
  RecordDetail,
  Search,
  CollectProfile,
  EditSelectSymptom,
  Auth
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
      <Stack.Navigator initialRouteName={"Auth"}>
        <Stack.Screen
          options={{
            headerShown: false,  
          }}
          name="Auth"
          component={Auth}
        />

        <Stack.Screen
          options={{
            // headerShown: false,
            title: 'ค้นหาอาการ',
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
          name="Search"
          component={Search}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Signup"
          component={Signup}
        />

        <Stack.Screen
          options={{
            title:"โรงพยาบาล"
          }}
          name="Maps"
          component={Maps}
        />
        <Stack.Screen
          options={{
            // headerShown: false,
            title: 'สร้างโปรไฟล์',
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
          name="CollectProfile"
          component={CollectProfile}
        />

        <Stack.Screen
          name="SymptomDetail"
          component={SymptomDetail}
          options={{
            title: 'คำแนะนำอาการ',
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
            title: 'คำแนะนำโรค',
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
            title: 'อาการ',
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
            title: 'บันทึกรายละเอียดเพิ่มเติม',
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
          name="RecordDetail"
          component={RecordDetail}
        />

        {/* <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="TabsDefaultDate"
          component={TabsDefaultDate}
        /> */}

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="EditSelectSymptom"
          component={EditSelectSymptom}
        />

        <Stack.Screen
          name="SelectSymptom"
          component={SelectSymptom}
          options={({navigation}) => ({
            headerShown: false,
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
