import React from 'react';
import { View, Image, Text, FlatList, Dimensions, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import ItemTable from './itemTable';
import { dataID } from '../../function/function';
const { width, height } = Dimensions.get('screen')
export default function Table(props) {
    const {dataBase, onPress} = props
    const responsive = () => {
        const wpScreen = Dimensions.get('window').width;
        if (wpScreen <= 800) {
            return stylesXs;
        }
    }
    return (
        <>
            <View>
                <View style={responsive().title}>
                    <View style={responsive().viewitemtitleImage}>
                        <Text style={responsive().itemtitle} >Hình ảnh</Text>
                    </View>
                    <View style={responsive().viewitemtitle}>
                        <Text style={responsive().itemtitle} >Tên sản phẩm</Text>
                    </View>
                    <View style={responsive().viewitemtitle}>
                        <Text style={responsive().itemtitle} >Mã sản phẩm</Text>
                    </View>
                    <View style={responsive().viewitemtitle}>
                        <Text style={responsive().itemtitle} >Mùa vụ</Text>
                    </View>
                    <View style={[responsive().viewitemtitle,{width:width*0.25}]}>
                        <Text style={responsive().itemtitle} >Xuất xứ</Text>
                    </View>
                    <View style={[responsive().viewitemtitle,{width:width*0.25}]}>
                        <Text style={responsive().itemtitle} >Vùng miền</Text>
                    </View>
                </View>
                <View>
                    <FlatList
                        style={{height:height*0.4}}
                        data={dataBase.data}
                        keyExtractor={item => `${item.product_no}`}
                        renderItem={({ item , index}) => {
                            if(index == ((dataBase.data).length-1)){
                                return <TouchableOpacity onPress={()=>{
                                    const count = dataID.length
                                    dataID.splice(0,count)
                                    dataID.push(`${item.product_no}`)
                                    onPress()
                                    }}>
                                    <ItemTable data={item} index={index}></ItemTable>
                                    <View style={{height:height*0.14}}></View>
                                </TouchableOpacity>
                            }
                            return<TouchableOpacity onPress={()=>{
                                    const count = dataID.length
                                    dataID.splice(0,count)
                                    dataID.push(`${item.product_no}`)
                                    onPress()
                                    }}>
                                    <ItemTable data={item} index={index}></ItemTable>
                            </TouchableOpacity>
                        }}
                    />
                </View>
            </View>
        </>
    )
}
const stylesXs = StyleSheet.create({
    title: {
        flexDirection: 'row',
        backgroundColor: '#d7a333',
        paddingTop: height * 0.02,
        paddingBottom: height * 0.02,
    },
    viewitemtitle: {
        // alignItems: 'center',
        // justifyContent: 'center',

        width: width * 0.4,
        marginLeft:width*0.07,
    },
    viewitemtitleImage:{
        // alignItems: 'center',
        // justifyContent: 'center',
        marginLeft:width*0.05,
        width: width * 0.2,
    },
    itemtitle:{
        fontSize:16,
        fontWeight:'bold',
        color:'#ffffff'
    },
    image: {
        width: width * 0.1,
        height: width * 0.1
    },
});
