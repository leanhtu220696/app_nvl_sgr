import * as React from 'react';
import { Dimensions } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { svgtabsearch,svgtablist,svgcomment} from '../assets/svg/svg';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from '../screens/screenSearch/screensearch';
import { ListStackScreen, SearchStackScreen } from './itemstack';
import Contact from '../screens/screenContact/screencontact';
const {width,height} = Dimensions.get('screen');
const sizeicon = () => {
    const wpScreen = Dimensions.get('window').width;
    if(wpScreen <= 766){
        return width*0.06
    }else{
        return stylesMl;
    }
}
const Tab = createBottomTabNavigator();
const TabScreen = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Search') {
                    return <SvgXml xml={svgtabsearch(color)} height={sizeicon()} width={sizeicon()}/>;
                } else if (route.name === 'List') {
                    return <SvgXml xml={svgtablist(color)} height={sizeicon()} width={sizeicon()} />;
                }   else if (route.name === 'Contact') {
                    return <SvgXml xml={svgcomment(color)} height={sizeicon()} width={sizeicon()} />;
                }
            },
        })}
        tabBarOptions={{
            activeTintColor: '#fade7b',
            inactiveTintColor: '#777777',
        }}

    >
        <Tab.Screen name="Search" component={SearchStackScreen} options={{title:"Tìm kiếm"}}/>
        <Tab.Screen name="List" component={ListStackScreen} options={{title:"Danh sách"}} />
        <Tab.Screen name="Contact" component={Contact} options={{title:"Góp ý"}} />
    </Tab.Navigator>
);
export { TabScreen }