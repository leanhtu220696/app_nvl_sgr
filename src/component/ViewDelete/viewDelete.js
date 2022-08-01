import React, { useEffect, useState } from 'react';
import { View, Image, Text, Dimensions, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { svgdelete } from '../../assets/svg/svg';
const { width, height } = Dimensions.get('screen')
export default function ViewDelete(props) {
    const { content, onPress } = props;
    const responsive = () => {
        const wpScreen = Dimensions.get('window').width;
        if (wpScreen <= 800) {
            return stylesXs;
        }
    }
    const iconXml = () => {
        const wpScreen = Dimensions.get('window').width;
        if (wpScreen <= 766) {
            return wpScreen * 0.042;
        }
    }
    const [origin, setOrigin] = useState()
    const [season, setSeason] = useState()
    const [regions, setRegions] = useState()
    return (
        <>
            <View style={[responsive().title]}>
                <View style={responsive().viewitemtitleImage}>
                    <Text style={responsive().itemtitle} >{`${content}`}</Text>
                    <TouchableOpacity style={[responsive().viewitemtitle, {}]} onPress={onPress}>
                        <SvgXml style={responsive().Image} xml={svgdelete()} height={iconXml()} width={iconXml()}></SvgXml>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}
const stylesXs = StyleSheet.create({
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    viewitemtitle: {
        marginLeft:15,
        backgroundColor: '#f4f4f4',
    },
    viewitemtitleImage: {
        flexDirection:'row',
        marginLeft: width * 0.05,
        backgroundColor: '#f4f4f4',
        paddingLeft:width*0.04,
        paddingRight:width*0.03,
        paddingBottom:height*0.01,
        paddingTop:height*0.01,
        borderRadius:20,
        marginTop:height*0.01,
    },
    itemtitle: {
        fontSize: 13,
        color: '#777777'
    },
    Image: {
        backgroundColor: '#f4f4f4',
    }
});