import {StyleSheet,Dimensions, Button} from 'react-native';
const {width,height} = Dimensions.get('screen');
export const stylesXs = StyleSheet.create({
    backgroud:{
        width:width,
        height:height,
        backgroundColor:'#ffffff'
    },
    item:{
        marginTop:width*0.005,
        marginBottom:width*0.005,
    },
    title:{
        paddingLeft: width * 0.05,
        fontSize:16,
        fontWeight:'700',
    },
    scroll:{
        marginBottom:height*0.125,
    },
    content:{
        marginTop:width*0.02,
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
        lineHeight:width * 0.06,
        fontSize:16,
    }
})
