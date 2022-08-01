import {StyleSheet,Dimensions} from 'react-native';
const {width,height} = Dimensions.get('screen');
export const stylesXs = StyleSheet.create({
    backgroud:{
        backgroundColor:"#FCC02C",
        width:width,
        height:height,
    },
    viewlogo:{
        height:height*0.9,
        justifyContent:'center',
        alignItems:'center',
    },
    viewslogan:{
        marginTop:height*0.02,
    },
    txtslogan:{
        color: '#ffffff',
        fontSize: 13,
    },
    img:{
        width:width*0.46,
        height:width*0.15
    }

});
export const stylesMl = StyleSheet.create({
    backgroud:{
        backgroundColor:"#FCC02C",
        width:width,
        height:height,
    },
    viewlogo:{
        height:height,
        justifyContent:'center',
        alignItems:'center',
    },
    viewslogan:{
        marginTop:height*0.02,
    },
    txtslogan:{
        color: '#ffffff',
        fontSize: 23,
    },
    img:{
        width:width*0.2,
        height:width*0.15,
    }

});