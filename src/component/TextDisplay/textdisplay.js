import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, TextInput } from 'react-native';
const {width,height} = Dimensions.get('screen');
export default function TextDisplay(props) {
    const {Title,Content} = props;
    const responsive = () => {
        const wpScreen = Dimensions.get('window').width;
        if(wpScreen <= 766){
            return stylesXs;
        }else{
            return stylesMl;
        }
    }
    return (
        <View style={{flexDirection:'row', paddingBottom:height*0.03,}}>
            <Text style={responsive().title}>{Title}</Text>
            <Text style={responsive().content}>{Content}</Text>
        </View>
    );
}
const stylesXs = StyleSheet.create({
    title:{
        width:width*0.5,
        paddingLeft: width * 0.05,
        fontSize:16,
        fontWeight:'700',
    },
    content:{
        width:width*0.5,
        paddingLeft:width*0.05,
        lineHeight:height*0.025,
        position:'relative',
        right: width * 0.05,
        fontSize:16,
    }
});
const stylesMl = StyleSheet.create({
    title:{
        paddingLeft: width * 0.05,
        fontSize:16,
        fontWeight:'700',
    },
    content:{
        position:'relative',
        right: width * 0.05,
        fontSize:16,
    }
});
