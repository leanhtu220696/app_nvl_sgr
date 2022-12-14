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
            str += "B???n ch??a nh???p h??? t??n"
            setErrorUserName(false)
            setTextErrorUserName('B???n ch??a nh???p h??? t??n')
        }else{
            setErrorUserName(true)
        }
        if(password.trim() == ""){
            str += "B???n ch??a nh???p s??? ??i???n tho???i"
            setErrorPhone(false)
            setTextErrorPhone('B???n ch??a nh???p s??? ??i???n tho???i')
        }else{
            setErrorPhone(true)
        }
        if(mail.trim() == ""){
            str += "B???n ch??a nh???p mail"
            setErrorMail(false)
            setTextErrorMail('B???n ch??a nh???p mail')
        }else{
            setErrorMail(true)
        }
        if(phone.trim() == ""){
            str += "B???n ch??a nh???p s??? ??i???n tho???i"
            setErrorPhone(false)
            setTextErrorPhone('B???n ch??a nh???p s??? ??i???n tho???i')
        }else{
            setErrorPhone(true)
        }
        if(password.trim() == ""){
            str += "B???n ch??a nh???p s??? ??i???n tho???i"
            setErrorPassword(false)
            setTextErrorPassword('B???n ch??a nh???p m???t kh???u')
        }else{
            setErrorPassword(true)
        }
        if(password.trim() != confirmPassword){
            str += "B???n ch??a nh???p s??? ??i???n tho???i"
            setErrorConfirmPassword(false)
            setTextErrorConfirmPassword('M???t kh???u x??c nh???n kh??ng tr??ng kh???p')
        }else{
            setErrorConfirmPassword(true)
        }
        if(str.trim() == "" ){
            if(errorMail && errorUsername && errorPhone && errorConfirmPassword){
                Call_Register(phone,mail,username,password).then(response=>{
                    const data = response.data;
                    if(data.status == success){
                        Alert.alert("Th??ng b??o",data.message)
                    }else{
                        let str = data.message;
                        str += data.list_error.email ? `\n ${data.list_error.email}`:'';
                        str += data.list_error.phonenumber ? `\n ${data.list_error.phonenumber}`:'';
                        Alert.alert("Th??ng b??o",`${str} `)
                    }
                }).catch(error=>{
                    Alert.alert("L???i", error)
                })
            }
        }
    }
    const [secureTextEntry, setSecureTextEntry] = useState(true)
    const [secureTextEntryConfirm, setSecureTextEntryConfirm] = useState(true)
    const removeAscent = (str) => {
        if (str === null || str === undefined) return str;
         str = str.toLowerCase();
         str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "a");
         str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, "e");
         str = str.replace(/??|??|???|???|??/g, "i");
         str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "o");
         str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, "u");
         str = str.replace(/???|??|???|???|???/g, "y");
         str = str.replace(/??/g, "d");
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
                            <Text style={{fontSize:20, fontWeight:'bold',color:'#fade7b'}}>????ng k??</Text>
                            <View style={{marginTop:20}}>
                                    <Edit
                                    placeholder="H??? v?? t??n"
                                    onChangeText={(text) => { 
                                        if(!text){
                                            setErrorUserName(true)
                                        }else{
                                            setErrorUserName(regexName.test(removeAscent(text)))
                                            setTextErrorUserName('Nh???p sai ki???u d??? li???u')
                                        }
                                        setUserName(text) 
                                    }}
                                    value={username}
                                    />
                                    {!errorUsername && <Text style={{color:'#fc3f3f', textAlign:'center', marginTop:5}}>{textErrorUsername}</Text>}
                                </View>
                                <View style={{marginTop:20}}>
                                    <Edit
                                    placeholder="S??? ??i???n tho???i"
                                    onChangeText={(text) => {
                                        if(!text){
                                            setErrorPhone(true)
                                        }else{
                                            setErrorPhone(regexPhone.test(text))
                                            setTextErrorPhone('Nh???p sai ki???u d??? li???u')
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
                                            setTextErrorMail('Nh???p sai ki???u d??? li???u')
                                        }
                                        setMail(text)}}
                                    value={mail}
                                    />
                                    {!errorMail && <Text style={{color:'#fc3f3f', textAlign:'center', marginTop:5}}>{textErrorMail}</Text>}
                                </View>
                                <View style={{marginTop:20}}>
                                <EditButton
                                    secureTextEntry={secureTextEntry}
                                    placeholder="M???t kh???u"
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
                                    placeholder="Nh???p l???i m???t kh???u"
                                    onChangeText={(text) => {
                                        if(!text){
                                            setErrorConfirmPassword(true)
                                        }else{
                                            if(password != text){
                                                setErrorConfirmPassword(false)
                                                setTextErrorConfirmPassword('M???t kh???u kh??ng tr??ng kh???p')
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
                                        nameBtn="????ng k??"
                                        onPress={() => {
                                            btnRegister(username,mail,phone,password)
                                        }}
                                    ></Button>
                                </View>
                                <View style={{marginTop:10}}>
                                <TouchableOpacity activeOpacity={0.5} onPress={()=>{navigation.goBack()}}>
                                        <Text style={{textDecorationLine:'underline', color:'#ffffff'}}>????ng nh???p</Text>
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