import React, { useState, useEffect } from 'react';
import { View, Image, ImageBackground, TextInput, SafeAreaView, Dimensions, TouchableOpacity, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { stylesXs } from "./style";
import { svgsearch, svglogout } from '../../assets/svg/svg';
import Edit from '../../component/Eidt/edit';
import Button from '../../component/Button/button';
import Header from '../../component/Header/header';
import { SvgXml } from 'react-native-svg';
import backgroud from "./../../assets/Image/backgroud.png";
import logo from "./../../assets/Image/logo.png"
import EditButton from '../../component/Eidt/editbutton';
import { dataProduct } from '../../function/function';
import { Call_Search, Call_Filter } from '../../config/function';
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Keychain from 'react-native-keychain';
const { width, height } = Dimensions.get('screen');
export default function Search({ navigation }) {
    //Responsive
    const responsive = () => {
        const wpScreen = Dimensions.get('window').width;
        // if (wpScreen <= 766) {
        return stylesXs;
        //} 
    }
    const iconXml = () => {
        const wpScreen = Dimensions.get('window').width;
        if (wpScreen <= 766) {
            return wpScreen * 0.06;
        }
    }
    //Edit
    const [search, setSearch] = useState("")
    //CallApi
    const btnSearch = (search) => {
        if (search.trim() != "") {
            CallApi()
        } else {
            Alert.alert("Thông báo", "Yêu cầu nhập mã sản phẩm")
        }
    }
    const btnLogout = async () => {
        try {
            await Keychain.resetGenericPassword();
            navigation.replace('Login')
        } catch (e) {

        }

    }
    const CallApi = () => {
        // const data = JSON.stringify({
        //     "product_no": search
        // })
        // Call_Search(data).then(response => {
        //     const data = response.data
        //     if (data.data != null) {
        //         const count = dataProduct.length
        //         dataProduct.splice(0, count)
        //         dataProduct.push(data)
        //         navigation.navigate('List')
        //     }
        // }).catch(error => {
        // })
        const dataFilter = JSON.stringify({
            "key": [`${search}`],
            "page": 1,
            "regions": [""],
            "season": [""],
            "origin": "",
        });
        Call_Filter(dataFilter).then(response => {
            const data = response.data
            if (data.data != null) {
                const count = dataProduct.length
                dataProduct.splice(0, count)
                dataProduct.push(data)
                dataProduct.push([`${search}`])
                navigation.replace('List')
                navigation.navigate('List')
            } else {
                Alert.alert("Thông báo", data.message)
            }
        }).catch(error => {
            console.log(error)
        })
    }
    useEffect(() => {
        const CallApi = () => {
            // const data = JSON.stringify({
            //     "product_no": search
            // })
            // Call_Search(data).then(response => {
            //     const data = response.data
            //     if (data.data != null) {
            //         const count = dataProduct.length
            //         dataProduct.splice(0, count)
            //         dataProduct.push(data)
            //     }
            // }).catch(error => {
            // })
            const dataFilter = JSON.stringify({
                "key": [`${search}`],
                "page": 1,
                "regions": [""],
                "season": [""],
                "origin": "",
            });
            console.log("data", dataFilter)
            Call_Filter(dataFilter).then(response => {
                const data = response.data
                if (data.data != null) {
                    const count = dataProduct.length
                    dataProduct.splice(0, count)
                    dataProduct.push(data)
                    dataProduct.push(`${search}`)
                }
            }).catch(error => {
                console.log(error)
            })
        }
        CallApi()
    }, [])
    return (
        <>
            <SafeAreaView>
                <ImageBackground
                    source={backgroud}
                    style={responsive().backgroud}
                >
                    <View
                        style={[responsive().backgroud, { backgroundColor: 'rgba(0,0,0,0.6)' }]}
                    >
                        <View>
                            <Header xml={svglogout()}
                                onPress={() => {
                                    btnLogout()
                                }}></Header>
                        </View>
                        <KeyboardAvoidingView behavior='position' style={{ height: height * 0.6 }}>
                            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                <View style={responsive().content}>
                                    <View style={responsive().viewedit}>
                                        <View style={responsive().edit}>
                                            <EditButton
                                                placeholder="Mã sản phẩm"
                                                onChangeText={text => setSearch(text)}
                                                value={search}
                                                onPress={() => { btnSearch(search) }}
                                                xml={svgsearch()}
                                            ></EditButton>
                                        </View>
                                        <View style={responsive().button}>
                                            <Button
                                                nameBtn="Quét mã QR"
                                                onPress={() => {
                                                    navigation.replace('Scan')
                                                }}
                                            ></Button>
                                        </View>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </KeyboardAvoidingView>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        </>
    )
}