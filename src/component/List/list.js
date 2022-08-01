import React from 'react';
import { View, Text, Image, Dimensions, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import imageDefault from "../../assets/Image/iconapp.jpeg";
import logo from "../../assets/Image/logo_ngang.png";
const { width, height } = Dimensions.get('screen');
export default function ViewList(props) {
    const { dataBase, onPress } = props;
    const responsive = () => {
        const wpScreen = Dimensions.get('window').width;
        if (wpScreen <= 766) {
            return stylesXs;
        } else {
            return stylesMl;
        }
    }
    const upperCase = (str) => {
        if(str != undefined){
            return str.slice(0,1).toUpperCase() + str.slice(1);
        }
    }
    //Data
    return (
        <View>
        <FlatList
            data={dataBase}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
                return<TouchableOpacity style={{ flexDirection: 'row', width: width, alignItems: 'center' }} onPress={()=>{onPress(item.product_no)}}>
                <View style={responsive().viewimage}>
                    { item.image &&  <Image source={{ uri: item.image[0] }} height={width * 0.2} width={width * 0.2} style={responsive().image} />}
                    { !item.image && <Image source={imageDefault} height={width * 0.2} width={width * 0.2} style={responsive().image} ></Image>}
                </View>
                <Text style={responsive().content}>{upperCase(item.name)}</Text>
            </TouchableOpacity>
            }}
        />
        </View>

    );
}
const stylesXs = StyleSheet.create({
    viewimage: {
        marginLeft: width * 0.1,
        marginRight: width * 0.1,
        marginTop: width * 0.025,
        marginBottom: width * 0.025,
    },
    image: {
        width: width * 0.2,
        height: width * 0.2,
    },
    content: {
        width:width*0.55,
        fontSize: 16,
    }
});
const stylesMl = StyleSheet.create({
    viewimage: {
        margin: width * 0.1
    },
    image: {
        width: width * 0.2,
        height: width * 0.2,
    },
    content: {
        fontSize: 16,
    }
});
