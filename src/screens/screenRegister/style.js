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
        marginTop: height * 0.1
    },
    viewedit: {
        width: width,
        alignItems: 'center',
    },
    edit: {
        // marginTop: height * 0.02,
        // flexDirection: 'row',
        // paddingTop: height * 0.01,
        // paddingBottom: height * 0.01,
        // backgroundColor:'#ffffff',
        // borderRadius:15,
        // width: width * 0.78,
    },
    button: {
        marginTop: height * 0.02
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