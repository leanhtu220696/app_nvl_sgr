import React, { useState, useEffect } from 'react';
import { View, Image, ImageBackground, Text, SafeAreaView,KeyboardAvoidingView, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { stylesXs } from "./style";
import Edit from '../../component/Eidt/edit';
import Button from '../../component/Button/button';
import backgroud from "./../../assets/Image/backgroud.png";
import logo from "./../../assets/Image/logo.png";
import EditButton from '../../component/Eidt/editbutton';
import { Call_Login, setToken, setKey ,codeSha } from '../../config/function';
import { success } from '../../config/error';
import { svgeye } from '../../assets/svg/svg';
import { SvgXml } from 'react-native-svg';
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function Login({ navigation }) {
    const SavePass = async (username, password) => {
        await Keychain.setGenericPassword(username, password);
    }
    //Responsive
    const responsive = () => {
        const wpScreen = Dimensions.get('window').width;
        // if (wpScreen <= 766) {
        return stylesXs;
        //} 
    }
    //Edit
    const [username, setUserName] = useState("")
    const [password, setPassWord] = useState("")
    //CallApi
    const btnLogin = (user, pass) => {
        let str = ""
        if(user.trim() == ""){
            str += "Bạn chưa nhập tài khoản"
        }
        if(pass.trim() == ""){
            if(str.trim() == "" ){
                str += "Bạn chưa nhập mật khẩu"
            }else{
                str += " và mật khẩu"
            }
        }
        if(str.trim() == "" ){
            Call_Login(user,pass).then(response=>{
                const data = response.data;
                if(data.status == success){
                    codeSha(user,pass);
                    SavePass(user,pass)
                    setToken(data.token);
                    navigation.replace("Search")
                }else{
                    Alert.alert("Thông báo",data.message)
                }
            }).catch(error=>{
                Alert.alert("Lỗi", error)
            })
        }else{
            Alert.alert("Thông báo",str)
        }
    }
    const [secureTextEntry, setSecureTextEntry] = useState(true)
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
                        <View style={responsive().header}>
                            <Image source={logo} style={responsive().logo}></Image>
                        </View>
                        <KeyboardAvoidingView behavior="position">
                        <View style={responsive().content}>
                            <View style={responsive().viewedit}>
                                <Edit
                                    placeholder="Tài Khoản"
                                    onChangeText={(text) => { setUserName(text) }}
                                    value={username}
                                ></Edit>
                                <View style={{marginTop:20}}>
                                <EditButton
                                    secureTextEntry={secureTextEntry}
                                    placeholder="Mật khẩu"
                                    onChangeText={(text) => { setPassWord(text) }}
                                    value={password}
                                    onPress={()=>{setSecureTextEntry(!secureTextEntry)}}
                                    xml={svgeye()}
                                ></EditButton>
                                </View>
                                <View style={responsive().button}>
                                    <Button
                                        nameBtn="Đăng Nhập"
                                        onPress={() => {
                                            btnLogin(username, password)
                                            // navigation.replace("Search")
                                        }}
                                    ></Button>
                                </View>
                                <View style={{marginTop:10}}>
                                <TouchableOpacity activeOpacity={0.5} onPress={()=>{navigation.navigate('Register')}}>
                                        <Text style={{textDecorationLine:'underline', color:'#ffffff'}}>Đăng ký</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        </KeyboardAvoidingView>

                    </View>
                </ImageBackground>
            </SafeAreaView>
        </>
    )
}