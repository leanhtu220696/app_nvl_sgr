import React, { useEffect } from 'react';
import { View, Image, Text, Dimensions, StatusBar, SafeAreaView } from 'react-native';
import { stylesXs, stylesMl } from "./style.js";
import logo from "../../assets/Image/logo_ngang.png";
import { Call_Login, setToken, setKey, codeSha } from '../../config/function';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { success } from '../../config/error';
import * as Keychain from 'react-native-keychain';
export default function Welcome({ navigation }) {
    useEffect(() => {
        const timeOut = () => {
            setTimeout(async () => {
                try {
                    const credentials = await Keychain.getGenericPassword();
                    if (credentials) {
                        Call_Login(credentials.username, credentials.password).then(response => {
                            const data = response.data;
                            if (data.status == success) {
                                codeSha(credentials.username,credentials.password);
                                setToken(data.token);
                                navigation.replace("Search")
                            }
                        }).catch(error => {
                            navigation.replace("Login")
                        })
                    } else {
                        navigation.replace("Login")
                    }
                } catch (error) {
                    navigation.replace("Login")
                }
            }, 3000);
        }
        timeOut()
    }, [])
    const strSlogan = "Hệ thống báo cáo quản trị MIS";
    //Response 
    const responsive = () => {
        const wpScreen = Dimensions.get('window').width;
        if (wpScreen <= 766) {
            return stylesXs;
        } else {
            return stylesMl;
        }
    }
    return (
        <>
            <StatusBar hidden={true} />
            <View style={responsive().backgroud}>
                <View style={responsive().viewlogo}>
                    <Image source={logo} style={[responsive().img, { backgroundColor: 'transparent' }]}></Image>
                </View>
            </View>
        </>
    );
}