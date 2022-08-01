import React from 'react';
import {View, Text, TouchableOpacity, Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('screen')
export default function Button(props){
    const {nameBtn, onPress} = props;
    const responsive = () => {
        const wpScreen = Dimensions.get('window').width;
        if(wpScreen <= 766){
            return stylesXs;
        }else{
            return stylesMl;
        }
    }
    return(
        <TouchableOpacity style={responsive().view} activeOpacity={0.5} onPress={onPress}>
            <Text style={responsive().text}>{nameBtn}</Text>
        </TouchableOpacity>
    );
}
const stylesXs = StyleSheet.create({
    view:{
        paddingTop:height*0.015,
        paddingBottom:height*0.015,
        paddingRight:width*0.13,
        paddingLeft:width*0.13,
        backgroundColor:'#fade7b',
        borderRadius:25,
        alignItems:'center',
        justifyContent:'center',
    },
    text:{
        fontSize:14,
        color:'#605e58',
        fontWeight:'bold',
    },
});
const stylesMl = StyleSheet.create({
    view:{
        paddingTop:height*0.02,
        paddingBottom:height*0.02,
        paddingRight:width*0.15,
        paddingLeft:width*0.15,
        backgroundColor:'#FCC01A',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
    },
    text:{
        fontSize:24,
        color:'#ffffff',
        fontWeight:'bold',
    },
});