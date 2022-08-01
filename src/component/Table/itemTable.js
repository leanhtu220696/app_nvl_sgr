import React, { useEffect, useState } from 'react';
import { View, Image, Text, Dimensions, StyleSheet, } from 'react-native';
import imageDefault from '../../assets/Image/iconapp.jpeg';
const { width, height } = Dimensions.get('screen')
export default function itemTable(props) {
    const { data, index } = props;

    const responsive = () => {
        const wpScreen = Dimensions.get('window').width;
        if (wpScreen <= 800) {
            return stylesXs;
        }
    }
    const [origin, setOrigin] = useState(data.origin)
    const [season, setSeason] = useState()
    const [regions, setRegions] = useState(data.regions)

    useEffect(() => {
        if (origin != undefined) {
            let countOrigin = origin.split(',')
            if (countOrigin.length == 63) {
                setOrigin("Toàn quốc")
            } else {
                let str = ""
                for (let i = 0; i < countOrigin.length; i++) {
                    if (countOrigin.length == 1) {
                        setOrigin(countOrigin[0])
                    }else if (countOrigin.length == 2) {
                        if(i == 1){
                            str += countOrigin[i]
                            setOrigin(str)
                        }else{
                            str += countOrigin[i] +", "
                        }
                    }else if (countOrigin.length >= 3) {
                        if(i == 2){
                            if(countOrigin.length > 3){
                                str += countOrigin[i] + "..."
                            }else{
                                str += countOrigin[i]
                            }
                            setOrigin(str)
                        }else{
                            str += countOrigin[i] +", "
                        }
                    }
                }
            }
        }
        if ((data.season) != undefined) {
            let item = ""
            if(data.season.length === 12){
                item = "Quanh năm";
                setSeason(item)
            }else{
                for (let i = 0; i < (data.season).length; i++) {
                    if (i == 0) {
                        item = item + `Tháng: ${(data.season)[i]}`
                    } else {
                        item = item + `, ${(data.season)[i]} `
                    }
                }
                setSeason(item)
            }
        }
        if (regions == null) {
            setRegions("Toàn quốc")
        }
    }, [])
    const upperCase = (str) => {
        if (str != undefined) {
            return str.slice(0, 1).toUpperCase() + str.slice(1);
        }
    }
    return (
        <>
            <View style={[responsive().title, { backgroundColor: index % 2 == 0 ? '#ffffff' : '#f4f4f4' }]}>
                <View style={responsive().viewitemtitleImage}>
                    {data.image && (<Image style={responsive().image} source={{ uri: `${(data.image)[0]}` }} height={60} width={60} />)}
                    {!data.image && (<Image style={responsive().image} source={imageDefault} height={60} width={60} />)}
                </View>
                <View style={responsive().viewitemtitle}>
                    <Text style={responsive().itemtitle} >{upperCase(`${data.name}`)}</Text>
                </View>
                <View style={responsive().viewitemtitle}>
                    <Text style={responsive().itemtitle} >{`${data.product_no}`}</Text>
                </View>
                <View style={responsive().viewitemtitle}>
                    {season !== undefined && (<Text style={responsive().itemtitle} >{`${season}`}</Text>)}
                </View>
                <View style={[responsive().viewitemtitle, { width: width * 0.25 }]}>
                    <Text style={responsive().itemtitle} >{`${origin}`}</Text>
                </View>
                <View style={[responsive().viewitemtitle, { width: width * 0.25 }]}>
                    <Text style={responsive().itemtitle} >{`${regions}`}</Text>
                </View>
            </View>
        </>
    )
}
const stylesXs = StyleSheet.create({
    title: {
        flexDirection: 'row',
        paddingTop: height * 0.01,
        paddingBottom: height * 0.01,
    },
    viewitemtitle: {
        // alignItems: 'center',
        // justifyContent: 'center',
        width: width * 0.4,
        marginLeft: width * 0.07,
    },
    viewitemtitleImage: {
        // alignItems: 'center',
        // justifyContent: 'center',
        marginLeft: width * 0.05,
        width: width * 0.2,
    },
    itemtitle: {
        fontSize: 16,
        color: '#777777'
    },
    image: {
        width: width * 0.1,
        height: width * 0.1,
    },
});
