import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import List from '../screens/screenList/screenlist';
import Product from '../screens/screenProduct/screenproduct';
import Search from "../screens/screenSearch/screensearch";
import Scan from "../screens/screenScan/screenscan";
const ConctactsStack = createStackNavigator();
const ListStackScreen = () => (
        <ConctactsStack.Navigator>
            <ConctactsStack.Screen name = "List" component = {List} initialParams={{load : 1}} options={{ headerShown:false }}/>
            <ConctactsStack.Screen name = "Product" component = {Product} options={{headerShown:false}}/>
        </ConctactsStack.Navigator>
);
const SearchStackScreen = () => (
    <ConctactsStack.Navigator>
        <ConctactsStack.Screen name = "Search" component = {Search} initialParams={{load : 1}} options={{ headerShown:false }}/>
        <ConctactsStack.Screen name = "Scan" component = {Scan} options={{headerShown:false}}/>
    </ConctactsStack.Navigator>
);
export {ListStackScreen, SearchStackScreen};