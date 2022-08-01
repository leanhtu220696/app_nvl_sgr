import React,{useEffect,useState} from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, TextInput, SafeAreaView } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { svgnext, svgpre} from "../../assets/svg/svg";

const { width, height } = Dimensions.get('screen');
export default function ItemPaging(props) {
    const { text, active, onPressBtn} = props;
    const responsive = () => {
        const wpScreen = Dimensions.get('window').width;
        if (wpScreen <= 766) {
            return stylesXs;
        } else {
            return stylesMl;
        }
    }
    const [btnIcon, setBtnIcon] = useState(false)
    useEffect(()=>{
        if(text == 'pre' || text == 'next'){
            setBtnIcon(true)
        }
    },[])
    const icon = () => {
        const wpScreen = Dimensions.get('window').width;
        if (wpScreen <= 766) {
            return width*0.05;
        } else {
            return width*0.1;
        }
    }
    return (
        <TouchableOpacity style={[responsive().background, { backgroundColor: active ? '#fade7b' : '#ffffff' }]} onPress={()=>{onPressBtn(text)}}>
            {!btnIcon && <Text style={responsive().item}>{text}</Text> }
            {btnIcon && <SvgXml xml={text == 'pre' ? svgpre() : svgnext()} height={icon()} width={icon()} style={responsive().svg}></SvgXml> }
        </TouchableOpacity>
    );
}
const stylesXs = StyleSheet.create({
    background: {
        backgroundColor: '#000000',
        alignItems: 'center',
        margin: width * 0.01,
        borderRadius: 7,
    },
    item: {
        paddingLeft: width * 0.04,
        paddingRight: width * 0.04,
        paddingTop: width * 0.02,
        paddingBottom: width * 0.02,
        fontSize: 13,
        fontWeight: 'bold',
        color: '#555555',
    },
    svg:{
        paddingLeft: width * 0.04,
        paddingRight: width * 0.04,
        marginTop: width * 0.02,
        paddingBottom: width * 0.02,
    }
});
const stylesMl = StyleSheet.create({
    background: {
        backgroundColor: '#000000',
        padding: width * 0.02,
    },
    item: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555555',
    },
});