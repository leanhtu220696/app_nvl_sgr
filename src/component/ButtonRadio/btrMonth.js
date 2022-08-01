import React, {useState, useEffect} from 'react';
import {View, Image, Text, Dimensions, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {svground, svgroundactive} from '../../assets/svg/svg';
import {dataProduct, dataSeason} from '../../function/function.js'
import Button from "../Button/button";

const {width, height} = Dimensions.get('screen')
export default function BTRMonth(props) {
    const {databaseMonth} = props;

    const responsive = () => {
        const wpScreen = Dimensions.get('window').width;
        if (wpScreen <= 766) {
            return stylesXs;
        }
    }
    const iconWidth = () => {
        const wpScreen = Dimensions.get('window').width;
        if (wpScreen <= 766) {
            return width * 0.1
        }
    }
    const [num1, setnum1] = useState(false)
    const [num2, setnum2] = useState(false)
    const [num3, setnum3] = useState(false)
    const [num4, setnum4] = useState(false)
    const [num5, setnum5] = useState(false)
    const [num6, setnum6] = useState(false)
    const [num7, setnum7] = useState(false)
    const [num8, setnum8] = useState(false)
    const [num9, setnum9] = useState(false)
    const [num10, setnum10] = useState(false)
    const [num11, setnum11] = useState(false)
    const [num12, setnum12] = useState(false)
    const getdisplaynum = (a) => {
        let bolean = false
        if (a == 1) {
            bolean = !num1;
            setnum1(bolean)
        }
        if (a == 2) {
            bolean = !num2;
            setnum2(bolean)
        }
        if (a == 3) {
            bolean = !num3;
            setnum3(bolean)
        }
        if (a == 4) {
            bolean = !num4;
            setnum4(bolean)
        }
        if (a == 5) {
            bolean = !num5;
            setnum5(bolean)
        }
        if (a == 6) {
            bolean = !num6;
            setnum6(bolean)
        }
        if (a == 7) {
            bolean = !num7;
            setnum7(bolean)
        }
        if (a == 8) {
            bolean = !num8;
            setnum8(bolean)
        }
        if (a == 9) {
            bolean = !num9;
            setnum9(bolean)
        }
        if (a == 10) {
            bolean = !num10;
            setnum10(bolean)
        }
        if (a == 11) {
            bolean = !num11;
            setnum11(bolean)
        }
        if (a == 12) {
            bolean = !num12;
            setnum12(bolean)
        }
    }
    console.log('dataSeason', dataSeason)
    useEffect(() => {
        const display = () => {
            for (let index = 0; index < dataSeason.length; index++) {
                getdisplaynum(dataSeason[index]);
            }
        }
        display()
    }, [])
    const [array, setArray] = useState()
    const getnum = (a) => {
        let bolean = false
        if (a == 1) {
            bolean = !num1;
            setnum1(bolean)
        }
        if (a == 2) {
            bolean = !num2;
            setnum2(bolean)
        }
        if (a == 3) {
            bolean = !num3;
            setnum3(bolean)
        }
        if (a == 4) {
            bolean = !num4;
            setnum4(bolean)
        }
        if (a == 5) {
            bolean = !num5;
            setnum5(bolean)
        }
        if (a == 6) {
            bolean = !num6;
            setnum6(bolean)
        }
        if (a == 7) {
            bolean = !num7;
            setnum7(bolean)
        }
        if (a == 8) {
            bolean = !num8;
            setnum8(bolean)
        }
        if (a == 9) {
            bolean = !num9;
            setnum9(bolean)
        }
        if (a == 10) {
            bolean = !num10;
            setnum10(bolean)
        }
        if (a == 11) {
            bolean = !num11;
            setnum11(bolean)
        }
        if (a == 12) {
            bolean = !num12;
            setnum12(bolean)
        }
        if (bolean == true) {
            for (let index = 0; index < dataSeason.length; index++) {
                if (dataSeason[index] == "") {
                    dataSeason.splice(index, 1)
                }
            }
            dataSeason.push(`${a}`)
        }
        if (bolean == false) {
            for (let index = 0; index < dataSeason.length; index++) {
                if (dataSeason[index] == a) {
                    dataSeason.splice(index, 1)
                }
            }
            if (dataSeason.length == 0) {
                dataSeason.push("")
            }
        }
    }
    return (
        <>
            <View style={{marginTop: width * 0.05}}>
                <View style={[responsive().backgroud]}>
                    <View style={responsive().colum}>
                        <TouchableOpacity style={[{alignItems: 'center', justifyContent: 'center'}, responsive().item]}
                                          onPress={() => {
                                              getnum(1)
                                          }}>
                            <SvgXml xml={num1 ? svgroundactive() : svground()} height={iconWidth()}
                                    width={iconWidth()}></SvgXml>
                            <Text style={[{position: 'absolute', justifyContent: 'center'}, responsive().text]}>1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[{alignItems: 'center', justifyContent: 'center'}, responsive().item]}
                                          onPress={() => {
                                              getnum(7)
                                          }}>
                            <SvgXml xml={num7 ? svgroundactive() : svground()} height={iconWidth()}
                                    width={iconWidth()}></SvgXml>
                            <Text style={[{position: 'absolute', justifyContent: 'center'}, responsive().text]}>7</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={responsive().colum}>
                        <TouchableOpacity style={[{alignItems: 'center', justifyContent: 'center'}, responsive().item]}
                                          onPress={() => {
                                              getnum(2)
                                          }}>
                            <SvgXml xml={num2 ? svgroundactive() : svground()} height={iconWidth()}
                                    width={iconWidth()}></SvgXml>
                            <Text style={[{position: 'absolute', justifyContent: 'center'}, responsive().text]}>2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[{alignItems: 'center', justifyContent: 'center'}, responsive().item]}
                                          onPress={() => {
                                              getnum(8)
                                          }}>
                            <SvgXml xml={num8 ? svgroundactive() : svground()} height={iconWidth()}
                                    width={iconWidth()}></SvgXml>
                            <Text style={[{position: 'absolute', justifyContent: 'center'}, responsive().text]}>8</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={responsive().colum}>
                        <TouchableOpacity style={[{alignItems: 'center', justifyContent: 'center'}, responsive().item]}
                                          onPress={() => {
                                              getnum(3)
                                          }}>
                            <SvgXml xml={num3 ? svgroundactive() : svground()} height={iconWidth()}
                                    width={iconWidth()}></SvgXml>
                            <Text style={[{position: 'absolute', justifyContent: 'center'}, responsive().text]}>3</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[{alignItems: 'center', justifyContent: 'center'}, responsive().item]}
                                          onPress={() => {
                                              getnum(9)
                                          }}>
                            <SvgXml xml={num9 ? svgroundactive() : svground()} height={iconWidth()}
                                    width={iconWidth()}></SvgXml>
                            <Text style={[{position: 'absolute', justifyContent: 'center'}, responsive().text]}>9</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={responsive().colum}>
                        <TouchableOpacity style={[{alignItems: 'center', justifyContent: 'center'}, responsive().item]}
                                          onPress={() => {
                                              getnum(4)
                                          }}>
                            <SvgXml xml={num4 ? svgroundactive() : svground()} height={iconWidth()}
                                    width={iconWidth()}></SvgXml>
                            <Text style={[{position: 'absolute', justifyContent: 'center'}, responsive().text]}>4</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[{alignItems: 'center', justifyContent: 'center'}, responsive().item]}
                                          onPress={() => {
                                              getnum(10)
                                          }}>
                            <SvgXml xml={num10 ? svgroundactive() : svground()} height={iconWidth()}
                                    width={iconWidth()}></SvgXml>
                            <Text
                                style={[{position: 'absolute', justifyContent: 'center'}, responsive().text]}>10</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={responsive().colum}>
                        <TouchableOpacity style={[{alignItems: 'center', justifyContent: 'center'}, responsive().item]}
                                          onPress={() => {
                                              getnum(5)
                                          }}>
                            <SvgXml xml={num5 ? svgroundactive() : svground()} height={iconWidth()}
                                    width={iconWidth()}></SvgXml>
                            <Text style={[{position: 'absolute', justifyContent: 'center'}, responsive().text]}>5</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[{alignItems: 'center', justifyContent: 'center'}, responsive().item]}
                                          onPress={() => {
                                              getnum(11)
                                          }}>
                            <SvgXml xml={num11 ? svgroundactive() : svground()} height={iconWidth()}
                                    width={iconWidth()}></SvgXml>
                            <Text
                                style={[{position: 'absolute', justifyContent: 'center'}, responsive().text]}>11</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={responsive().colum}>
                        <TouchableOpacity style={[{alignItems: 'center', justifyContent: 'center'}, responsive().item]}
                                          onPress={() => {
                                              getnum(6)
                                          }}>
                            <SvgXml xml={num6 ? svgroundactive() : svground()} height={iconWidth()}
                                    width={iconWidth()}></SvgXml>
                            <Text style={[{position: 'absolute', justifyContent: 'center'}, responsive().text]}>6</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[{alignItems: 'center', justifyContent: 'center'}, responsive().item]}
                                          onPress={() => {
                                              getnum(12)
                                          }}>
                            <SvgXml xml={num12 ? svgroundactive() : svground()} height={iconWidth()}
                                    width={iconWidth()}></SvgXml>
                            <Text
                                style={[{position: 'absolute' , justifyContent: 'center'}, responsive().text]}>12</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ background: '#000000', display:'flex',  alignItems:'center' }}>
                    <View style={{
                        background: '#000000',
                        position: 'absolute',
                        bottom: 0,
                        transform: [{translateY: -(height * 0.03)}]
                    }}>
                        <Button
                            nameBtn="Xác nhận"
                            onPress={() => {
                                let max = 0;
                                let min = 12
                                const countDataSeason = dataSeason.length;
                                if (countDataSeason >= 2) {
                                    for (let i = 0; i < countDataSeason; i++) {
                                        const element = parseInt(dataSeason[i])
                                        if (max < element) {
                                            max = element
                                        }
                                        if (min > element) {
                                            min = element
                                        }
                                    }
                                    dataSeason.splice(0, countDataSeason)
                                    for (let i = 1; i <= 12; i++) {
                                        if (min <= i && i <= max) {
                                            dataSeason.push(`${i}`)
                                        }
                                    }
                                }
                                setTimeout(()=>{
                                    props.buttonMonth()
                                })
                            }}
                        ></Button>
                    </View>
                </View>
            </View>
        </>
    )
}
const stylesXs = StyleSheet.create({
    backgroud: {
        justifyContent: 'center',
        marginTop: height * 0.02,
        marginBottom: height * 0.02,
        paddingTop: width * 0.01,
        paddingBottom: width * 0.15,
        paddingLeft: width * 0.02,
        paddingRight: width * 0.02,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
    },
    item: {
        margin: width * 0.02,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold'
    }
});