import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    SafeAreaView,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';
import Header from '../../component/Header/header';
import Table from '../../component/Table/Table';
import {SvgXml} from 'react-native-svg'
import {svglist, svgsearch, svgcomeback} from '../../assets/svg/svg';
import {dataState, dataTest, dataVung} from '../../function/data';
import {stylesXs} from "./style";
import {dataPage, dataProduct, dataRegions, dataSeason, dataOrigin, setDataOrigin} from '../../function/function';
import BTRMonth from '../../component/ButtonRadio/btrMonth';
import {Call_Search, Call_Filter} from '../../config/function';
import ViewDelete from '../../component/ViewDelete/viewDelete';
import Loader from '../../component/Loader/Loader';
import Paging from "../../component/Paging/paging";
import EditButton from '../../component/Eidt/editbutton';
import Button from "../../component/Button/button";

const {width, height} = Dimensions.get('screen');
const ArrayRegions = new Array("");
export default function List({navigation, route}) {
    const [DataBase, setDataBase] = useState(dataTest)
    const [displayTable, setDisplayTable] = useState(false)
    const [product_no, setProduct_no] = useState([""])
    const [page, setPage] = useState(dataPage)
    const [reginos, setReginos] = useState(dataRegions)
    const [season, setSeason] = useState(dataSeason)
    const [origin, setOrigin] = useState(dataOrigin)
    const [displayDeleteMonth, setDisplayDeleteMonth] = useState(false)
    const [displayDeleteOrgin, setDisplayDeleteOrgin] = useState(false)
    const [displayDeleteReginos1, setDisplayDeleteReginos1] = useState(false)
    const [displayDeleteReginos2, setDisplayDeleteReginos2] = useState(false)
    const [dataMonth, setDataMonth] = useState()
    const [inputSelectDataMonth, setInputSelectDataMonth] = useState()

    const btnDelete = (item) => {
        if (item == 'month') {
            setDisplayDeleteMonth(false)
            setMonth('Chọn tháng')
            for (let index = 0; index < dataSeason.length; index++) {
                dataSeason.splice(index, dataSeason.length)
            }
            if (dataSeason.length == 0) {
                dataSeason.push("")
            }
            setSeason([""])
            const arr = new Array()
            for (let i = 0; i < ArrayRegions.length; i++) {
                if (ArrayRegions[i] !== undefined) {
                    arr.push(`${ArrayRegions[i]}`)
                }
            }
            const arrSearch = new Array("")
            if (txtSearch != undefined) {
                if ((txtSearch.split(","))[0].trim() != "") {
                    arrSearch.splice(0, 1)
                    for (let i = 0; i < (txtSearch.split(",")).length; i++) {
                        if ((txtSearch.split(","))[i] !== "") {
                            arrSearch.push((txtSearch.split(","))[i])
                        }
                    }
                }
            }
            callFilter(arrSearch, page, arr.length === 0 ? [""] : arr, [""], origin)
        } else if (item == 'orgin') {
            getTextState('Tỉnh/Thành')
            setDisplayDeleteOrgin(false)
            let arrState = new Array();
            for (let i = 0; i < dataState.length; i++) {
                arrState.push(dataState[i])
            }
            setDataMonth(arrState)
            setOrigin("")
            const arr = new Array()
            for (let i = 0; i < ArrayRegions.length; i++) {
                if (ArrayRegions[i] !== undefined) {
                    arr.push(`${ArrayRegions[i]}`)
                }
            }
            const arrSearch = new Array("")
            if (txtSearch != undefined) {
                if ((txtSearch.split(","))[0].trim() != "") {
                    arrSearch.splice(0, 1)
                    for (let i = 0; i < (txtSearch.split(",")).length; i++) {
                        if ((txtSearch.split(","))[i] != "") {
                            arrSearch.push((txtSearch.split(","))[i])
                        }
                    }
                }
            }
            callFilter(arrSearch, page, arr.length === 0 ? [""] : arr, season, "")
        } else {
            setVung("Vùng miền")
            let str1 = ""
            const countArr = ArrayRegions.length
            if (item === 'regins1') {
                if (countArr == 2) {
                    str1 = ArrayRegions[1]
                    setReginos([`${ArrayRegions[1]}`])
                    ArrayRegions.splice(1, 1)
                    setDisplayDeleteReginos2(false)
                } else {
                    setDisplayDeleteReginos1(false)
                    ArrayRegions.splice(0, 1)
                    setReginos([""])
                }
            } else {
                setDisplayDeleteReginos2(false)
                if (countArr == 1) {
                    ArrayRegions.splice(0, 1)
                    setReginos([""])
                } else {
                    ArrayRegions.splice(1, 2)
                    str1 = ArrayRegions[0]
                    setReginos([`${ArrayRegions[0]}`])
                }
            }
            const arrSearch = new Array("")
            if (txtSearch != undefined) {
                if ((txtSearch.split(","))[0].trim() != "") {
                    arrSearch.splice(0, 1)
                    for (let i = 0; i < (txtSearch.split(",")).length; i++) {
                        if ((txtSearch.split(","))[i] != "") {
                            arrSearch.push((txtSearch.split(","))[i])
                        }
                    }
                }
            }
            callFilter(arrSearch, page, [`${str1}`], season, origin)
        }
    }
    useEffect(() => {
        ArrayRegions.splice(0, ArrayRegions.length)
        const data = dataProduct[0];
        if (data != null) {
            setDisplayTable(true)
            setDataBase("")
            setDataBase(data)
            let str = ""
            for (let i = 0; i < dataProduct[1].length; i++) {
                str = str + `${dataProduct[1][i]}`
            }
            setSearch(dataProduct[1][0])
        } else {
            setDisplayTable(false)
        }
    }, [])
    //Menu
    const [state, setState] = useState("Tỉnh/Thành")
    const [vung, setVung] = useState("Vùng Miền")
    const [menu, setMenu] = useState(false)
    const [listState, setListState] = useState(false)
    const [listVung, setListVung] = useState(false)
    const [listMonth, setListMonth] = useState(false)
    const getTextState = (item) => {
        let str = ""
        const array = item.split(' ')
        for (let i = 0; i < array.length; i++) {
            if (i < 2) {
                str = str + `${array[i]} `
                setState(str)
            } else {
                if (str.indexOf('...') <= -1) {
                    str = str + `...`
                    setState(str)
                }
            }
        }
    }
    const btnState = () => {
        setListState(!listState)
        setListVung(false)
        setListMonth(false)
    }
    const btnVung = () => {
        setListVung(!listVung)
        setListState(false)
        setListMonth(false)
    }
    const btnMonth = () => {
        setListMonth(!listMonth)
        setListState(false)
        setListVung(false)
        btnSeason()
    }
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
    const [txtSearch, setSearch] = useState("")
    //CallApi
    const callFilter = (itemProduct, itemPage, itemRegions, itemSeason, itemOrigin) => {
        setModalVisible(true)
        const dataFilter = JSON.stringify({
            "key": itemProduct,
            "page": itemPage,
            "regions": itemRegions,
            "season": itemSeason,
            "origin": itemOrigin,
        });
        console.log("Data Call", dataFilter)
        setDataBase("")
        Call_Filter(dataFilter).then(response => {
            const data = response.data
            if (data.data != null) {
                setDisplayTable(true)
                setDataBase(response.data)
            } else {
                setDisplayTable(false)
            }
            setModalVisible(false)
        }).catch(error => {
            setModalVisible(false)
        })
    }
    //Button

    const btnBack = () => {
        ArrayRegions.splice(0, ArrayRegions.length)
        navigation.replace('Search')
    }
    const btnOrigin = (item) => {
        setDisplayDeleteOrgin(true)
        setListState(!listState)
        setVung
        setDataBase(`${item}`)
        setOrigin(`${item}`)
        const arr = new Array()
        for (let i = 0; i < ArrayRegions.length; i++) {
            if (ArrayRegions[i] !== undefined) {
                arr.push(`${ArrayRegions[i]}`)
            }
        }
        const arrSearch = new Array("")
        if (txtSearch != undefined) {
            if ((txtSearch.split(","))[0].trim() != "") {
                arrSearch.splice(0, 1)
                for (let i = 0; i < (txtSearch.split(",")).length; i++) {
                    if ((txtSearch.split(","))[i] != "") {
                        arrSearch.push((txtSearch.split(","))[i])
                    }
                }
            }
        }
        callFilter(arrSearch, page, arr.length === 0 ? [""] : arr, season, `${item}`)
    }
    const btnRegions = async (item) => {
        setListVung(!listVung)
        const countRegions = ArrayRegions.length
        for (let i = 0; i < countRegions; i++) {
            if (ArrayRegions[i] == "") {
                ArrayRegions.splice(i, 1)
            }
        }
        let str = item
        const arr = new Array()
        if (item == "Toàn quốc" || countRegions == 2) {
            setDisplayDeleteReginos1(true)
            setDisplayDeleteReginos2(false)
            str = ""
            arr.push("")
            ArrayRegions.splice(0, countRegions)
            setReginos(["Toàn quốc"])
            setVung("Toàn quốc")
            ArrayRegions.push(`${str}`)
        } else {
            setVung(`${item}`)
            let dem = 0
            for (let i = 0; i < countRegions; i++) {
                if (ArrayRegions[i] == item) {
                    dem = dem + 1
                }
                if (ArrayRegions[i] !== undefined) {
                    arr.push(`${ArrayRegions[i]}`)
                }
            }
            if (dem == 0) {
                arr.push(`${item}`)
                ArrayRegions.push(`${str}`)
                if (ArrayRegions.length == 1) {
                    setDisplayDeleteReginos1(true)
                } else {
                    setDisplayDeleteReginos2(true)
                }
                setReginos(ArrayRegions)
            }
        }
        const arrSearch = new Array("")
        if (txtSearch != undefined) {
            if ((txtSearch.split(","))[0].trim() != "") {
                arrSearch.splice(0, 1)
                for (let i = 0; i < (txtSearch.split(",")).length; i++) {
                    if ((txtSearch.split(","))[i] != "") {
                        arrSearch.push((txtSearch.split(","))[i])
                    }
                }
            }
        }
        await callFilter(arrSearch, page, arr.length === 0 ? [""] : arr, season, origin)
    }
    const [month, setMonth] = useState("Chọn tháng")
    const [sort, setSort] = useState("")
    const btnSeason = () => {
        let stemp = 0;
        const array = dataSeason.sort(function (a, b) {
            return a - b
        })
        if (dataSeason.length != 0 && dataSeason[0] != "") {
            setDisplayDeleteMonth(true)
            let item = "Tháng: "
            for (let index = 0; index < dataSeason.length; index++) {
                const element = array[index];
                if (element != "") {
                    if (index == 0) {
                        item = item + ` ${element}`
                        setMonth(item)
                        stemp = array[index];
                    } else {
                        if (array[index + 1] - array[index] > 1 && array[index] - array[index - 1] == 1) {
                            item = item + ` - ${element}`
                            setMonth(item)
                        }
                        if (array[index] - array[index - 1] > 1) {
                            item = item + `, ${element}`
                            setMonth(item)
                            stemp = element
                        } else {
                            if (index == array.length - 1) {
                                item = item + ` - ${element}`
                                setMonth(item)
                            }
                        }
                    }
                }
            }
        } else {
            setDisplayDeleteMonth(false)
            setMonth("Chọn tháng")
        }
        let min = array.length
        let max = 0
        const strFunction = (a) => {
            if (min > a) {
                return a
            } else {
                return a
            }
        }
        setSeason(dataSeason)
        const arr = new Array()
        for (let i = 0; i < ArrayRegions.length; i++) {
            if (ArrayRegions[i] !== undefined) {
                arr.push(`${ArrayRegions[i]}`)
            }
        }
        const arrSearch = new Array("")
        if (txtSearch != undefined) {
            if ((txtSearch.split(","))[0].trim() != "") {
                arrSearch.splice(0, 1)
                for (let i = 0; i < (txtSearch.split(",")).length; i++) {
                    if ((txtSearch.split(","))[i] != "") {
                        arrSearch.push((txtSearch.split(","))[i])
                    }
                }
            }
        }
        callFilter(arrSearch, page, arr.length === 0 ? [""] : arr, dataSeason, origin)
    }
    const btnProduct = () => {
        const arr = new Array()
        for (let i = 0; i < ArrayRegions.length; i++) {
            if (ArrayRegions[i] !== undefined) {
                arr.push(`${ArrayRegions[i]}`)
            }
        }
        const arrSearch = new Array("")
        if (txtSearch != undefined) {
            if ((txtSearch.split(","))[0].trim() != "") {
                arrSearch.splice(0, 1)
                for (let i = 0; i < (txtSearch.split(",")).length; i++) {
                    if ((txtSearch.split(","))[i] != "") {
                        arrSearch.push((txtSearch.split(","))[i])
                    }
                }
            }
        }
        callFilter(arrSearch, page, arr.length === 0 ? [""] : arr, season, origin)
    }
    const btnNavigation = () => {
        navigation.navigate('Product')
    }
    const databaseMonth = (item) => {

    }

    const [modalVisible, setModalVisible] = useState(false)
    const [heightTable, setHeightTable] = useState()
    const [countDelete, setCountDelete] = useState(0)

    useEffect(() => {
        fcHeighTable(displayDeleteMonth, displayDeleteOrgin, displayDeleteReginos1, displayDeleteReginos2)
    }, [displayDeleteMonth])
    useEffect(() => {
        fcHeighTable(displayDeleteMonth, displayDeleteOrgin, displayDeleteReginos1, displayDeleteReginos2)
    }, [displayDeleteOrgin])
    useEffect(() => {
        fcHeighTable(displayDeleteMonth, displayDeleteOrgin, displayDeleteReginos1, displayDeleteReginos2)
    }, [displayDeleteReginos1])
    useEffect(() => {
        fcHeighTable(displayDeleteMonth, displayDeleteOrgin, displayDeleteReginos1, displayDeleteReginos2)
    }, [displayDeleteReginos2])

    const fcHeighTable = (displayDeleteMonth, displayDeleteOrgin, displayDeleteReginos1, displayDeleteReginos2) => {
        const season = displayDeleteMonth == true ? 1 : 0;
        const regions1 = displayDeleteReginos1 == true ? 1 : 0;
        const regions2 = displayDeleteReginos2 == true ? 1 : 0;
        const origin = displayDeleteOrgin == true ? 1 : 0;
        const sum = regions1 + regions2 + season + origin
        console.log("Sum", sum)
        if (sum <= 2) {
            setHeightTable(height * 0.435)
        }
        if (sum > 2) {
            setHeightTable(height * 0.39)
        }
        if (sum == 0) {
            setHeightTable(height * 0.485)
        }
    }

    const btnPaging = (pageNew) => {
        const arr = new Array()
        for (let i = 0; i < ArrayRegions.length; i++) {
            if (ArrayRegions[i] !== undefined) {
                arr.push(`${ArrayRegions[i]}`)
            }
        }
        const arrSearch = new Array("")
        if (txtSearch != undefined) {
            if ((txtSearch.split(","))[0].trim() != "") {
                arrSearch.splice(0, 1)
                for (let i = 0; i < (txtSearch.split(",")).length; i++) {
                    if ((txtSearch.split(","))[i] != "") {
                        arrSearch.push((txtSearch.split(","))[i])
                    }
                }
            }
        }
        callFilter(arrSearch, pageNew, arr.length === 0 ? [""] : arr, season, origin)
    }
    const [keyboardShow, setKeyboardShow] = useState(false)
    useEffect(() => {
        let arr = new Array();
        for (let i = 0; i < dataState.length; i++) {
            arr.push(dataState[i])
        }
        setDataMonth(arr)
    }, [])

    function removeAccents(str) {
        var AccentsMap = [
            "aàảãáạăằẳẵắặâầẩẫấậ",
            "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
            "dđ", "DĐ",
            "eèẻẽéẹêềểễếệ",
            "EÈẺẼÉẸÊỀỂỄẾỆ",
            "iìỉĩíị",
            "IÌỈĨÍỊ",
            "oòỏõóọôồổỗốộơờởỡớợ",
            "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
            "uùủũúụưừửữứự",
            "UÙỦŨÚỤƯỪỬỮỨỰ",
            "yỳỷỹýỵ",
            "YỲỶỸÝỴ"
        ];
        for (var i = 0; i < AccentsMap.length; i++) {
            var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
            var char = AccentsMap[i][0];
            str = str.replace(re, char);
        }
        return str;
    }

    useEffect(() => {
        const Test = removeAccents('e');
        console.log('Test', Test)
    }, [])
    return (
        <>
            <SafeAreaView>
                <View
                    style={responsive().backgroud}>
                    <View>
                        <Header
                            xml={svgcomeback()}
                            onPress={() => {
                                btnBack()
                            }}
                        ></Header>
                    </View>
                    <View>
                        <View style={responsive().menu}>
                            <TouchableOpacity style={responsive().menu1} onPress={() => {
                                btnState()
                            }}>
                                <View style={responsive().textmenu}>
                                    {!listState && <Text style={responsive().text}>{state}</Text>}
                                    {listState && <TextInput
                                        style={{width: width * 0.42, padding: 0, margin: 0}}
                                        placeholder="Tỉnh thành"
                                        onChangeText={(text) => {
                                            let arr = new Array();
                                            const encode = encodeURI(text);
                                            console.log('encode', encode)
                                            if (encode.indexOf('%') != -1) {
                                                for (let i = 0; i < dataState.length; i++) {
                                                    if (dataState[i].indexOf(text) != -1) {
                                                        arr.push(dataState[i])
                                                    }
                                                }
                                                setDataMonth(arr)
                                            } else {
                                                for (let i = 0; i < dataState.length; i++) {
                                                    if (removeAccents(dataState[i]).indexOf(removeAccents(text)) != -1) {
                                                        arr.push(dataState[i])
                                                    }
                                                }
                                                setDataMonth(arr)
                                            }
                                        }}
                                    />}
                                </View>
                                <View style={responsive().btnmenu}>
                                    <View>
                                        <SvgXml xml={svglist()} height={iconXml()} width={iconXml()}></SvgXml>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={responsive().menu2} onPress={() => {
                                btnVung()
                            }}>
                                <View style={responsive().textmenu}>
                                    <Text style={responsive().text}>{vung}</Text>
                                </View>
                                <View style={responsive().btnmenu}>
                                    <SvgXml xml={svglist()} height={iconXml()} width={iconXml()}></SvgXml>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <TouchableWithoutFeedback onPress={() => {
                            Keyboard.dismiss, setListState(false)
                        }}>
                            <View>
                                <View onTouchEnd={() => {
                                    setMenu(false)
                                    setListVung(false)
                                }} style={[responsive().content, {position: 'relative', zIndex: 0}]}>
                                    <View style={[responsive().menu3, {position: 'absolute', zIndex: 100}]}>
                                        {listState && <View style={{width: width * 0.52, alignItems: 'center'}}>
                                            <View style={{width: width * 0.4, height: 'auto'}}>
                                                <FlatList
                                                    style={[responsive().menu1active, {
                                                        paddingLeft: dataMonth.length == 0 ? 0 : height * 0.015,
                                                        paddingBottom: dataMonth.length == 0 ? 0 : height * 0.015,
                                                    }]}
                                                    data={dataMonth}
                                                    keyExtractor={item => `${item}`}
                                                    renderItem={({item}) => {
                                                        return (
                                                            <TouchableOpacity
                                                                style={{padding: dataMonth.length == 0 ? 0 : width * 0.02}}
                                                                onPress={() => {
                                                                    btnOrigin(item), getTextState(item), console.log('ahihi')
                                                                }}>
                                                                <Text>{`${item}`}</Text>
                                                            </TouchableOpacity>
                                                        );
                                                    }}
                                                />
                                            </View>
                                        </View>}
                                        {listVung && <View style={{
                                            width: listState == false ? width : width * 0.5,
                                            paddingRight: width * 0.05,
                                            alignItems: 'flex-end'
                                        }}>
                                            <View style={{width: width * 0.43, alignItems: 'flex-end'}}>
                                                <View style={{width: width * 0.43}}>
                                                    <FlatList
                                                        style={responsive().menu2active}
                                                        data={dataVung}
                                                        keyExtractor={item => `${item}`}
                                                        renderItem={({item}) => {
                                                            return (
                                                                <TouchableOpacity style={{padding: width * 0.02}}
                                                                                  onPress={() => {
                                                                                      btnRegions(item)
                                                                                  }}>
                                                                    <Text>{`${item}`}</Text>
                                                                </TouchableOpacity>
                                                            );
                                                        }}
                                                    />
                                                </View>
                                            </View>
                                        </View>}
                                    </View>
                                    <View style={{alignItems: 'center'}}>
                                        <TouchableOpacity style={responsive().radiobtn} onPress={() => {
                                            btnMonth()
                                        }}>
                                            <View style={responsive().month}>
                                                <Text style={responsive().text}>{month}</Text>
                                            </View>
                                            <View style={responsive().btn}>
                                                <SvgXml xml={svglist()} height={iconXml()} width={iconXml()}></SvgXml>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{zIndex: 0, position: 'relative', alignItems: 'center'}}>
                                        {listMonth && <View style={[responsive().contentmonth, {
                                            position: 'absolute',
                                            zIndex: 100,
                                            height: height * 0.2,
                                            background: '#ffffff'
                                        }]}>
                                            <BTRMonth
                                                databaseMonth={(item) => {
                                                databaseMonth(item)
                                                }}
                                                buttonMonth={btnMonth}
                                            ></BTRMonth>
                                        </View>}
                                        <View style={responsive().search}>
                                            <TextInput style={responsive().edit}
                                                       placeholderTextColor="#c0bdbd"
                                                       placeholder="Tìm kiếm sản phẩm/ mã sản phẩm"
                                                       onChangeText={(text) => {
                                                           setSearch(text)
                                                       }}
                                                       value={txtSearch}
                                                       onBlur={() => {
                                                           setProduct_no([`${txtSearch}`])
                                                       }}
                                            />
                                            <TouchableOpacity style={responsive().btn} onPress={() => {
                                                btnProduct()
                                            }}>
                                                <SvgXml xml={svgsearch()} height={iconXml()} width={iconXml()}></SvgXml>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{
                                            justifyContent: 'flex-start',
                                            width: width,
                                            flexDirection: 'row',
                                            flexWrap: 'wrap'
                                        }}>
                                            {displayDeleteMonth && <ViewDelete content={month} onPress={() => {
                                                btnDelete('month')
                                            }}></ViewDelete>}
                                            {displayDeleteOrgin && <ViewDelete content={origin} onPress={() => {
                                                btnDelete('orgin')
                                            }}></ViewDelete>}
                                            {displayDeleteReginos1 && <ViewDelete content={reginos[0]} onPress={() => {
                                                btnDelete('regins1')
                                            }}></ViewDelete>}
                                            {displayDeleteReginos2 && <ViewDelete content={reginos[1]} onPress={() => {
                                                btnDelete('regins2')
                                            }}></ViewDelete>}
                                        </View>
                                        <View style={[responsive().table, {maxHeight: heightTable}]}>
                                            {displayTable && <View>
                                                <ScrollView
                                                    style={responsive().scroll}
                                                    horizontal={true}>
                                                    <Table dataBase={DataBase} onPress={btnNavigation}></Table>
                                                </ScrollView>
                                                <Paging total_page={DataBase.total_page}
                                                        curent_page={DataBase.curent_page} onPress={(pageNew) => {
                                                    btnPaging(pageNew)
                                                }}></Paging>
                                            </View>}
                                            {!displayTable &&
                                            <View style={{alignItems: 'center'}}>
                                                <Text>Không có sản phẩm bạn cần tìm</Text>
                                            </View>
                                            }
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                </View>
                <Loader modalVisible={modalVisible}/>
            </SafeAreaView>
        </>
    )
}