import React from 'react';
import { View, Image, Modal, StyleSheet, Dimensions,StatusBar} from 'react-native';
import loader from "../../assets/Image/loader.gif";
const {width, height} = Dimensions.get('screen');
export const heightScreens = Math.round(Dimensions.get('window').height)
export const widthScreens = Math.round(Dimensions.get('window').width)

export default function Loader(props) {
    const { modalVisible } = props;
    return (
        <Modal
            animationType="fade"
            transparent
            visible={modalVisible}>
            <StatusBar hidden={true}/>
            <View style={styles.wrapper}>
                <View style={styles.loaderContainer}>
                    <Image
                        style={[styles.loaderImage,{backgroundColor: 'transparent'}]}
                        source={loader}
                    />
                </View>
            </View>
        </Modal>
    );
}
const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
    },
    loaderContainer: {
    },
    loaderImage: {
        width: ((widthScreens <= 766) ? width*0.15 : width*0.1),
        height: ((widthScreens <= 766) ? width*0.15 : width*0.1),
    },
});
