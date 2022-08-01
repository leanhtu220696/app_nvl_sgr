import React, { useState, useEffect } from 'react';
import { View, Image, ImageBackground, Text, SafeAreaView,KeyboardAvoidingView, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { stylesXs } from "./style";
import Edit from '../../component/Eidt/edit';
import Button from '../../component/Button/button';
import backgroud from "./../../assets/Image/backgroud.png";
import logo from "./../../assets/Image/logo.png";
import EditButton from '../../component/Eidt/editbutton';
import { Call_Register, setToken, setKey ,codeSha } from '../../config/function';
import { success } from '../../config/error';
import { svgeye } from '../../assets/svg/svg';
import { SvgXml } from 'react-native-svg';
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function Register({ navigation }) {
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
    const [mail, setMail] = useState("")
    const [phone, setPhone] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [password, setPassWord] = useState("")
    const [errorUsername, setErrorUserName] = useState(true)
    const [errorMail, setErrorMail] = useState(true)
    const [errorPhone, setErrorPhone] = useState(true)
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(true)
    const [errorPassword, setErrorPassword] = useState(true)
    const [textErrorUsername, setTextErrorUserName] = useState()
    const [textErrorMail, setTextErrorMail] = useState()
    const [textErrorPhone, setTextErrorPhone] = useState()
    const [textErrorConfirmPassword, setTextErrorConfirmPassword] = useState()
    const [textErrorPassword, setTextErrorPassword] = useState()
    //CallApi
    const btnRegister = (username,mail,phone,password) => {
        let str = ""
        if(username.trim() == ""){
            str += "Bạn chưa nhập họ tên"
            setErrorUserName(false)
            setTextErrorUserName('Bạn chưa nhập họ tên')
        }else{
            setErrorUserName(true)
        }
        if(password.trim() == ""){
            str += "Bạn chưa nhập số điện thoại"
            setErrorPhone(false)
            setTextErrorPhone('Bạn chưa nhập số điện thoại')
        }else{
            setErrorPhone(true)
        }
        if(mail.trim() == ""){
            str += "Bạn chưa nhập mail"
            setErrorMail(false)
            setTextErrorMail('Bạn chưa nhập mail')
        }else{
            setErrorMail(true)
        }
        if(phone.trim() == ""){
            str += "Bạn chưa nhập số điện thoại"
            setErrorPhone(false)
            setTextErrorPhone('Bạn chưa nhập số điện thoại')
        }else{
            setErrorPhone(true)
        }
        if(password.trim() == ""){
            str += "Bạn chưa nhập số điện thoại"
            setErrorPassword(false)
            setTextErrorPassword('Bạn chưa nhập mật khẩu')
        }else{
            setErrorPassword(true)
        }
        if(password.trim() != confirmPassword){
            str += "Bạn chưa nhập số điện thoại"
            setErrorConfirmPassword(false)
            setTextErrorConfirmPassword('Mật khẩu xác nhận không trùng khớp')
        }else{
            setErrorConfirmPassword(true)
        }
        if(str.trim() == "" ){
            if(errorMail && errorUsername && errorPhone && errorConfirmPassword){
                Call_Register(phone,mail,username,password).then(response=>{
                    const data = response.data;
                    if(data.status == success){
                        Alert.alert("Thông báo",data.message)
                    }else{
                        let str = data.message;
                        str += data.list_error.email ? `\n ${data.list_error.email}`:'';
                        str += data.list_error.phonenumber ? `\n ${data.list_error.phonenumber}`:'';
                        Alert.alert("Thông báo",`${str} `)
                    }
                }).catch(error=>{
                    Alert.alert("Lỗi", error)
                })
            }
        }
    }
    const [secureTextEntry, setSecureTextEntry] = useState(true)
    const [secureTextEntryConfirm, setSecureTextEntryConfirm] = useState(true)
    const removeAscent = (str) => {
        if (str === null || str === undefined) return str;
         str = str.toLowerCase();
         str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
         str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
         str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
         str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
         str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
         str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
         str = str.replace(/đ/g, "d");
         return str;
     }
     const regexName = /^[a-zA-Z ]{2,}$/g;
     const regexPhone= /^[0-9\b]+$/;
     const regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/
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
                            <Text style={{fontSize:20, fontWeight:'bold',color:'#fade7b'}}>Đăng ký</Text>
                            <View style={{marginTop:20}}>
                                    <Edit
                                    placeholder="Họ và tên"
                                    onChangeText={(text) => { 
                                        if(!text){
                                            setErrorUserName(true)
                                        }else{
                                            setErrorUserName(regexName.test(removeAscent(text)))
                                            setTextErrorUserName('Nhập sai kiểu dữ liệu')
                                        }
                                        setUserName(text) 
                                    }}
                                    value={username}
                                    />
                                    {!errorUsername && <Text style={{color:'#fc3f3f', textAlign:'center', marginTop:5}}>{textErrorUsername}</Text>}
                                </View>
                                <View style={{marginTop:20}}>
                                    <Edit
                                    placeholder="Số điện thoại"
                                    onChangeText={(text) => {
                                        if(!text){
                                            setErrorPhone(true)
                                        }else{
                                            setErrorPhone(regexPhone.test(text))
                                            setTextErrorPhone('Nhập sai kiểu dữ liệu')
                                        }
                                        setPhone(text) 
                                    }}
                                    value={phone}
                                    />
                                    {!errorPhone && <Text style={{color:'#fc3f3f', textAlign:'center', marginTop:5}}>{textErrorPhone}</Text>}
                                </View>
                                <View style={{marginTop:20}}>
                                    <Edit
                                    placeholder="Email"
                                    onChangeText={(text) => {
                                        if(!text){
                                            setErrorMail(true)
                                        }else{
                                            setErrorMail(regexMail.test(text))
                                            setTextErrorMail('Nhập sai kiểu dữ liệu')
                                        }
                                        setMail(text)}}
                                    value={mail}
                                    />
                                    {!errorMail && <Text style={{color:'#fc3f3f', textAlign:'center', marginTop:5}}>{textErrorMail}</Text>}
                                </View>
                                <View style={{marginTop:20}}>
                                <EditButton
                                    secureTextEntry={secureTextEntry}
                                    placeholder="Mật khẩu"
                                    onChangeText={(text) => {
                                        setErrorPassword(true)
                                        setPassWord(text)}}
                                    value={password}
                                    onPress={()=>{setSecureTextEntry(!secureTextEntry)}}
                                    xml={svgeye()}
                                ></EditButton>
                                {!errorPassword && <Text style={{color:'#fc3f3f', textAlign:'center', marginTop:5}}>{textErrorPassword}</Text>}
                                </View>
                                <View style={{marginTop:20}}>
                                <EditButton
                                    secureTextEntry={secureTextEntryConfirm}
                                    placeholder="Nhập lại mật khẩu"
                                    onChangeText={(text) => {
                                        if(!text){
                                            setErrorConfirmPassword(true)
                                        }else{
                                            if(password != text){
                                                setErrorConfirmPassword(false)
                                                setTextErrorConfirmPassword('Mật khẩu không trùng khớp')
                                            }else{
                                                setErrorConfirmPassword(true)
                                            }
                                        }
                                        setConfirmPassword(text)}}
                                    value={confirmPassword}
                                    onPress={()=>{setSecureTextEntryConfirm(!secureTextEntryConfirm)}}
                                    xml={svgeye()}
                                ></EditButton>
                                {!errorConfirmPassword && <Text style={{color:'#fc3f3f', textAlign:'center', marginTop:5}}>{textErrorConfirmPassword}</Text>}
                                </View>
                                <View style={responsive().button}>
                                    <Button
                                        nameBtn="Đăng ký"
                                        onPress={() => {
                                            btnRegister(username,mail,phone,password)
                                        }}
                                    ></Button>
                                </View>
                                <View style={{marginTop:10}}>
                                <TouchableOpacity activeOpacity={0.5} onPress={()=>{navigation.goBack()}}>
                                        <Text style={{textDecorationLine:'underline', color:'#ffffff'}}>Đăng nhập</Text>
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