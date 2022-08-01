import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Dimensions, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TextInput, Alert } from 'react-native';
import { svgcomeback } from '../../assets/svg/svg';
import Header from '../../component/Header/header';
import { stylesXs } from "./style";
import Button from '../../component/Button/button';
import { Call_Contact } from '../../config/function';
import Loader from '../../component/Loader/Loader';
const { width, height } = Dimensions.get('screen');
export default function Contact({ navigation, route }) {
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
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [mail, setMail] = useState("")
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    //Call Api
    const [display, setDisplay] = useState(true)
    const btnSend = (name, phone, mail, title, content,) => {
        setDisplay(false)
        setModalVisible(true)
        var data = JSON.stringify({
            "fullname": `${name}`,
            "phone": `${phone}`,
            "email": `${mail}`,
            "title": `${title}`,
            "content": `${content}`
        });
        let str = ""
        let countPhone = ((phone.trim()).slice(0)).length
        if (name.trim() == "") {
            str = "Bạn chưa nhập họ tên"
        } else if (phone.trim() == "") {
            str = "Bạn chưa nhập số điện thoại"
        } else if ( countPhone < 9 || countPhone > 10){
            str = "Số điện thoại của bạn không hợp lệ"
        } else if (mail.trim() == "") {
            str = "Bạn chưa nhập email"
        } else if (!mail.includes('@')) {
            str = "Email không hợp lệ"
        } else if(!(mail.slice(mail.indexOf('@'))).includes('.')){
            str = "Email không hợp lệ"
        }else if (title.trim() == "") {
            str = "Bạn chưa nhập tiêu đề"
        } else if (content.trim() == "") {
            str = "Bạn chưa nhập nội dung"
        }
        if (str.trim() == "") {
            console.log('result', 'ahihi');
            Call_Contact(data).then(result => {
                const data = result.data
                console.log('result', data );
                if (data.status == 0) {
                    Alert.alert("Thông báo", data.message)
                    setName("")
                    setPhone("")
                    setMail("")
                    setTitle("")
                    setContent("")
                }
                setDisplay(true)
                setModalVisible(false)
            }).catch(e => {
                console.log('result', e );
                setModalVisible(false)
                setDisplay(true)
            })
        } else {
            Alert.alert("Thông báo", str)
            setModalVisible(false)
            setDisplay(true)
        }
    }
    const btnBack = () => {
        navigation.navigate("List")
    }
    const [modalVisible, setModalVisible] = useState(false)
    return (
        <>
            <SafeAreaView>
                <View
                    style={responsive().backgroud}>
                    <View>
                        <Header
                            xml={svgcomeback()}
                            onPress={() => { btnBack() }}
                        ></Header>
                    </View>
                    <KeyboardAvoidingView behavior='position' style={{ height: height * 0.7 }}>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View >
                                <View style={responsive().note}>
                                    <Text style={responsive().title_note}>GÓP Ý KIẾN CHỈNH SỬA</Text>
                                    <Text style={responsive().content_note}>Nếu bạn có bất cứ ý kiến chỉnh sửa nào về</Text>
                                    <Text style={responsive().content_note}>Sun-Group Sale Portal, vui lòng điền vào form</Text>
                                    <Text style={responsive().content_note}>góp ý kiến bên dưới</Text>
                                </View>

                                <View style={responsive().textInput}>
                                    <TextInput
                                        style={responsive().edit}
                                        placeholder={"Họ và tên *"}
                                        placeholderTextColor="#aaa"
                                        onChangeText={text => setName(text)}
                                        value={name}
                                    />
                                    <TextInput
                                        style={responsive().edit}
                                        placeholder={"Số điện thoại *"}
                                        placeholderTextColor="#aaa"
                                        onChangeText={text => setPhone(text)}
                                        value={phone}
                                    />
                                    <View>
                                        <TextInput
                                            style={responsive().edit}
                                            placeholder={"Email *"}
                                            placeholderTextColor="#aaa"
                                            onChangeText={text => setMail(text)}
                                            value={mail}
                                        />
                                        <TextInput
                                            style={responsive().edit}
                                            placeholder={"Tiêu đề *"}
                                            placeholderTextColor="#aaa"
                                            onChangeText={text => setTitle(text)}
                                            value={title}
                                        />
                                        <TextInput
                                            style={[responsive().edit, { height: height * 0.1 }]}
                                            placeholder={"Nội dung"}
                                            placeholderTextColor="#aaa"
                                            numberOfLines={5}
                                            multiline={true}
                                            onChangeText={text => setContent(text)}
                                            value={content}
                                        />
                                    </View>
                                </View>
                                <View style={[responsive().button, { display: display ? "flex" : "none" }]}>
                                    <Button nameBtn={"Gửi góp ý"} onPress={() => { btnSend(name, phone, mail, title, content) }}></Button>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </View>
                <Loader modalVisible={modalVisible} />
            </SafeAreaView>
        </>
    )
}