import { StyleSheet, Dimensions, Button } from 'react-native';
const { width, height } = Dimensions.get('screen');
export const stylesXs = StyleSheet.create({
    backgroud: {
        width: width,
        height: height,
    },
    header: {
        width: width,
        height: height * 0.08,
        backgroundColor: '#333333',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: width * 0.3,
        height: height * 0.045,
    },
    content: {
        marginTop: height * 0.35
    },
    viewedit: {
        flex:1,
        position:'relative',
        width: width,
    },
    menu:{
        marginTop:30,
        width:width,
        marginLeft:width*0.1,
        paddingLeft:width*0.05,
        marginRight:width*0.1,
        paddingRight:width*0.05,
    },
    button: {
        width:width,
        position:'absolute',
        top:430,
    },
    editpass: {
        width: width * 0.68,
        paddingLeft: width * 0.07,
        fontSize: 13,
        color: '#555555',
    },
    btnpass: {
        width: width * 0.1,
        paddingLeft: width * 0.02,
        backgroundColor: '#ffffff',
    }
})