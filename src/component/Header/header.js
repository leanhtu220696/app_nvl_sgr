import React from 'react';
import { View, Image, TouchableOpacity, Dimensions, StyleSheet, SafeAreaView} from 'react-native';
import logo from "./../../assets/Image/logo.png"
import { SvgXml } from 'react-native-svg';
const {width,height} = Dimensions.get('screen');
export default function Header(props) {
    const { onPress, xml} = props;
    const responsive = () => {
        const wpScreen = Dimensions.get('window').width;
        if(wpScreen <= 766){
            return stylesXs;
        }else{
            return stylesMl;
        }
    }
    const sizeicon = () => {
        const wpScreen = Dimensions.get('window').width;
        if(wpScreen <= 766){
            return width*0.06
        }else{
            return stylesMl;
        }
    }
    return (
        <>
        <View style={responsive().backgroud}>
            <View style={responsive().left} >
                <Image source={logo}></Image>
            </View>
            <View style={responsive().right}>
                <TouchableOpacity style={responsive().button} onPress={()=>{onPress()}} >
                    <SvgXml xml={xml} height={sizeicon()} width={sizeicon()}/>
                </TouchableOpacity>
            </View>
        </View>
        </>
    );
}
const stylesXs = StyleSheet.create({
    backgroud:{
        width:width,
        height:height*0.08,
        backgroundColor:'#333333',
        alignItems:'center',
        flexDirection:'row'
    },
    left:{
        justifyContent:'flex-start',
        marginLeft:width*0.08,
    },
    right:{
        position:'absolute',
        right:width*0.08,
    },
    button:{
        width:width*0.05,
        height:width*0.05,
    }
});
const stylesMl = StyleSheet.create({
    
});