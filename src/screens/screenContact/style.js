import {StyleSheet,Dimensions, Button} from 'react-native';
const {width,height} = Dimensions.get('screen');
export const stylesXs = StyleSheet.create({
    backgroud:{
        width:width,
        height:height*0.9,
        backgroundColor:'#f4f4f4',
        alignItems:'center'
    },
    note:{
        alignItems:'center',
        marginLeft:width*0.1 ,
        marginRight:width*0.1 ,
        marginTop:width*0.05 ,
        marginBottom:width*0.1 ,
    },
    title_note:{
        fontSize:16,
        fontWeight:'bold',
        marginBottom:height*0.025,
    },
    content_note:{
        fontSize:13
    },
    textInput:{
        width:width,
        alignItems:'center'
    },
    edit:{
        justifyContent:'flex-start',
        borderRadius:10,
        width:width*0.85,
        backgroundColor:'#ffffff',
        paddingBottom:height*0.02,
        paddingTop:height*0.02,
        marginBottom:height*0.005,
        marginTop:height*0.005,
        paddingLeft:width*0.05,
        color:'#000000'
    },
    button:{
        width:width,
        alignItems:'center',
        marginTop:height*0.025,
    }
})