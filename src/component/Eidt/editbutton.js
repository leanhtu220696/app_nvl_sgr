import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, TextInput } from 'react-native';
import { svgeye } from '../../assets/svg/svg';
import { SvgXml } from 'react-native-svg';
const {width,height} = Dimensions.get('screen');
export default function EditButton(props) {
    const { placeholder , secureTextEntry, onChangeText, value, onBlur, onFocus, onPress , xml} = props;
    const responsive = () => {
        const wpScreen = Dimensions.get('window').width;
        if(wpScreen <= 766){
            return stylesXs;
        }else{
            return stylesMl;
        }
    }
    const iconXml = () => {
        const wpScreen = Dimensions.get('window').height;
        // if (wpScreen < 786) {
            return wpScreen * 0.025;
        // }
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
            <TouchableOpacity style={{position:'absolute',top:15,right:width*0.07}} onPress={onPress}>
                <SvgXml xml={xml} width={17} height={17}  />
            </TouchableOpacity>
        </View>
    );
}
const stylesXs = StyleSheet.create({
    edit:{
        width:width*0.78,
        paddingTop: Platform.OS === 'ios' ? 15 : 10,
        paddingBottom:Platform.OS === 'ios' ? 15 : 10,
        backgroundColor:'#ffffff',
        paddingLeft:width*0.07,
        borderRadius:25,
        fontSize:13,
        color:'#555555',
        position:'relative',
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