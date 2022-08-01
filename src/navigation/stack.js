import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screens/screenWelcome/screenwelcome';
import Login from '../screens/screenLogin/screenlogin';
import Search from '../screens/screenSearch/screensearch';
import { TabScreen } from './tab';
import Register from '../screens/screenRegister/screenregister';
const ConctactsStack = createStackNavigator();
const ContactsStackScreen = () => (
        <ConctactsStack.Navigator>
            <ConctactsStack.Screen name = "Welcome" component = {Welcome} options={{ headerShown:false }}/>
            <ConctactsStack.Screen name = "Login" component = {Login} options={{headerShown:false}}/>
            <ConctactsStack.Screen name = "Register" component = {Register} options={{headerShown:false}}/>
            <ConctactsStack.Screen name = "Search" component = {TabScreen} options={{headerShown:false}}/>
        </ConctactsStack.Navigator>
);
export default () =>(
    <NavigationContainer>
        <ContactsStackScreen/>
    </NavigationContainer>
);