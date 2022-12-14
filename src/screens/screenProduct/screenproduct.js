import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import Header from '../../component/Header/header';
import Slider from '../../component/Slider/slider';
import { stylesXs } from "./style";
import { svgcomeback } from '../../assets/svg/svg';
import TextDisplay from '../../component/TextDisplay/textdisplay';
import ViewList from '../../component/List/list';
import { dataID } from '../../function/function';
import { Call_Detail } from '../../config/function';
const { width, height } = Dimensions.get('screen');
import moment from 'moment'
export default function Product({ navigation }) {
    const [image, setImage] = useState()
    const [relatedProducts, setRelatedProducts] = useState()
    const [name, setName] = useState()
    const [product_no, setproduct_no] = useState()
    const [hotel_no_product, setHotel_no_product] = useState()
    const [level_2_group, setlevel_2_group] = useState()
    const [level_3_group, setlevel_3_group] = useState()
    const [description, setdescription] = useState()
    const [season, setseason] = useState()
    const [origin, setorigin] = useState()
    const [packing_standard, setpacking_standard] = useState()
    const [standard_of_storage, setstandard_of_storage] = useState()
    const [shipping_standards, setshipping_standards] = useState()
    const [regions, setregions] = useState()
    const [uses, setuses] = useState()
    const [note, senote] = useState()
    const [dataBase, setDataBase] = useState()
    const [dateHistory, setDateHistory] = useState()
    useEffect(() => {
        const data = JSON.stringify({
            "product_no": dataID
        })
        const CallApi = () => {
            Call_Detail(data).then(response => {
                const dataBase = response.data.data
                setImage(dataBase.image)
                setName(dataBase.name)
                setproduct_no(dataBase.product_no)
                setlevel_2_group(dataBase.level_2_group)
                setlevel_3_group(dataBase.level_3_group)
                let str = ""
                if (str.trim() == "") {
                    for (let i = 0; i < (dataBase.description).length; i++) {
                        if ((dataBase.description)[i] != null) {
                            if (i == 0) {
                                str += `    ${(dataBase.description)[i]}`
                            } else {
                                str += `\n    ${(dataBase.description)[i]}`
                            }
                        }
                    }
                    setdescription(str)
                }
                let str_season = ""
                if (str_season.trim() == "") {
                    if((dataBase.season).length === 12){
                        str_season = "Quanh n??m";
                        setseason(str_season)
                    }else{
                    for (let i = 0; i < (dataBase.season).length; i++) {
                        if ((dataBase.season)[i] != null) {
                            if (i == 0) {
                                str_season += `Th??ng: ${(dataBase.season)[i]}`
                            } else {
                                str_season += `, ${(dataBase.season)[i]}`
                            }
                        }
                    }
                    setseason(str_season)
                    }
                }
                setDateHistory(dataBase.date_history)
                setorigin(dataBase.origin)
                const convertPackingStandard = (string) =>{
                    const arr = string.split('-');
                    let stringNew = '';
                    for( let i = 0; i < arr.length; i++ ){
                        if(arr[0] !== '' && i === 0){
                            stringNew += `- ${arr[i]} \n`;
                        }
                        if(i != 0){
                            stringNew += `- ${arr[i]} \n`;
                        }
                    }
                    return stringNew;
                }
                setpacking_standard(convertPackingStandard(dataBase.packing_standard))
                setstandard_of_storage(dataBase.standard_of_storage)
                setshipping_standards(dataBase.shipping_standards)
                setregions(dataBase.regions)
                setuses(dataBase.uses)
                senote(dataBase.note)
                setRelatedProducts(response.data.relatedProducts)
                setHotel_no_product(dataBase.hotel_no_product)
            }).catch(error => {
            })
        }
        CallApi()
    }, [])
    useEffect(() => {
        if (origin != undefined) {
            const countOrigin = origin.split(',')
            if (countOrigin.length == 63) {
                setorigin("To??n qu???c")
            }
        }

    }, [])
    const getOrigin = () => {
        if (origin != undefined) {
            const countOrigin = origin.split(',')
            if (countOrigin.length == 63) {
                return "To??n qu???c"
            } else {
                let str = ""
                for (let i = 0; i < countOrigin.length; i++) {
                    if (countOrigin.length == 1) {
                        return countOrigin[0]
                    } else if (countOrigin.length == 2) {
                        if (i == 1) {
                            str += countOrigin[i]
                            return str
                        } else {
                            str += countOrigin[i] + ", "
                        }
                    } else if (countOrigin.length >= 3) {
                        if (i == 2) {
                            if (countOrigin.length > 3) {
                                str += countOrigin[i] + "..."
                            } else {
                                str += countOrigin[i]
                            }
                            return str
                        } else {
                            str += countOrigin[i] + ", "
                        }
                    }
                }
            }
        }
    }
    //
    const upperCase = (str) => {
        if (str != undefined) {
            return str.slice(0, 1).toUpperCase() + str.slice(1);
        }
    }
    //Menu
    const [menu, setMenu] = useState(false)
    const [listState, setListState] = useState(false)
    const [listMonth, setListMonth] = useState(false)
    btnState = () => {
        setMenu(!menu)
        setListState(!listState)
    }
    btnMonth = () => {
        setListMonth(!listMonth)
    }
    //Responsive
    const responsive = () => {
        const wpScreen = Dimensions.get('window').width;
        // if (wpScreen <= 766) {
        return stylesXs;
        //}
    }
    //btn comeback
    const btnComeback = () => {
        navigation.goBack()
    }
    const nextProduct = (a) => {
        const count = dataID.length
        dataID.splice(0, count)
        dataID.push(a)
        navigation.push('Product')
    }
    const dateTime = () => {
        let unix_timestamp = dateHistory;
        return moment.unix(unix_timestamp).format("DD/MM/YYYY")
    }
    return (
        <>
            <SafeAreaView>
                <View
                    style={responsive().backgroud}>
                    <View>
                        <Header xml={svgcomeback()}
                            onPress={btnComeback} ></Header>
                    </View>
                    <ScrollView style={responsive().scroll}>
                        <View>
                            <Slider dataImage={image}></Slider>
                        </View>
                        <View style={responsive().item}>
                            <TextDisplay Title="T??n s???n ph???m" Content={upperCase(name)} />
                        </View>
                        <View style={responsive().item}>
                            <TextDisplay Title="M?? s???n ph???m" Content={product_no} />
                        </View>
                        <View style={responsive().item}>
                            <TextDisplay Title="M?? v???t t?? kh??ch s???n" Content={hotel_no_product} />
                        </View>
                        <View style={responsive().item}>
                            <TextDisplay Title="Nh??m c???p 2" Content={level_2_group} />
                        </View>
                        <View style={responsive().item}>
                            <TextDisplay Title="Nh??m c???p 3" Content={level_3_group} />
                        </View>
                        <View style={responsive().item}>
                            <Text style={responsive().title}>M?? t??? chi ti???t</Text>
                            <Text style={[responsive().content]}>{description}</Text>
                        </View>
                        <View style={responsive().item}>
                            <TextDisplay Title="M??a v???" Content={season} />
                        </View>
                        <View style={responsive().item}>
                            <TextDisplay Title="Xu???t x???" Content={getOrigin()} />
                        </View>
                        <View style={responsive().item}>
                            <TextDisplay Title="Ti??u chu???n ????ng g??i" Content={packing_standard} />
                        </View>
                        <View style={responsive().item}>
                            <TextDisplay Title="Ti??u chu???n b???o qu???n" Content={standard_of_storage} />
                        </View>
                        <View style={responsive().item}>
                            <TextDisplay Title="Ti??u chu???n v???n chuy???n" Content={shipping_standards} />
                        </View>
                        <View style={responsive().item}>
                            <TextDisplay Title="V??ng Mi???n" Content={regions} />
                        </View>
                        <View style={responsive().item}>
                            <Text style={responsive().title}>C??ng d???ng</Text>
                            <Text style={responsive().content}>{uses == null ? "" : uses}</Text>
                        </View>
                        <View style={responsive().item}>
                            <TextDisplay Title="Ng??y c???p nh???t" Content={dateTime()} />
                        </View>
                        <View style={responsive().item}>
                            <Text style={responsive().title}>L??u ??</Text>
                            <Text style={responsive().content}>{note}</Text>
                        </View>
                        <View style={responsive().item}>
                            <Text style={[responsive().title, { marginBottom: height * 0.02 }]}>S???n ph???m li??n quan</Text>
                            <ViewList dataBase={relatedProducts} onPress={(a) => nextProduct(a)} ></ViewList>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </>
    )
}
