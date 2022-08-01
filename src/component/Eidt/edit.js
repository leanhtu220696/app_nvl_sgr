import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, TextInput, Platform } from 'react-native';
const {width,height} = Dimensions.get('screen');
export default function Edit(props) {
    const { placeholder , secureTextEntry, onChangeText, value, onBlur, onFocus} = props;
    const responsive = () => {
        const wpScreen = Dimensions.get('window').width;
        if(wpScreen <= 766){
            return stylesXs;
        }else{
            return stylesMl;
        }
    }
    return (
        <View>
            <TextInput
                placeholderTextColor="#c0bdbd"
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                onChangeText={onChangeText}
                value={value}
                style={responsive().edit}
                onBlur={onBlur}
                onFocus={onFocus}
            />
        </View>
    );
}
const stylesXs = StyleSheet.create({
    edit:{
        width:width*0.78,
        paddingTop: Platform.OS === 'ios' ? 15 : 10,
        paddingBottom:Platform.OS === 'ios' ? 15 : 10,
        paddingLeft:width*0.07,
        backgroundColor:'#ffffff',
        borderRadius:25,
        fontSize:13,
        color:'#555555',
    },
});
const stylesMl = StyleSheet.create({
    edit:{
        width:width*0.7,
        paddingTop: Platform.OS === 'ios' ? 15 : 10,
        paddingBottom:Platform.OS === 'ios' ? 15 : 10,
        backgroundColor:'#ffffff',
        borderRadius:10,
        paddingLeft:width*0.07,
        fontSize:23,
        color:'#555555',
    },
});