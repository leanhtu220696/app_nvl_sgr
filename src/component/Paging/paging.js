import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, TextInput } from 'react-native';
import ItemPaging from "./itemPaging";
const { width, height } = Dimensions.get('screen');
export default function Paging(props) {
    const { total_page, curent_page, onPress } = props;
    const responsive = () => {
        const wpScreen = Dimensions.get('window').width;
        if (wpScreen <= 766) {
            return stylesXs;
        } else {
            return stylesMl;
        }
    }
    const [btnPre, setBtnPre] = useState('pre')
    const [btn1, setBtn1] = useState(1)
    const [btn2, setBtn2] = useState(2)
    const [btn3, setBtn3] = useState(3)
    const [btn4, setBtn4] = useState(4)
    const [btn5, setBtn5] = useState(5)
    const [btnNext, setBtnNext] = useState('next')

    const [activeBtn1, setActiveBtn1] = useState(true)
    const [activeBtn2, setActiveBtn2] = useState(true)
    const [activeBtn3, setActiveBtn3] = useState(true)
    const [activeBtn4, setActiveBtn4] = useState(true)
    const [activeBtn5, setActiveBtn5] = useState(true)

    const [hideBtn1, setHideBtn1] = useState(true)
    const [hideBtn2, setHideBtn2] = useState(true)
    const [hideBtn3, setHideBtn3] = useState(true)
    const [hideBtn4, setHideBtn4] = useState(true)
    const [hideBtn5, setHideBtn5] = useState(true)

    const hideButton = (i) => {
        if (i < total_page) {
            return true
        } else {
            return false
        }
    }
    const textButton = (i) => {
        if (curent_page <= 3) {
            return i + 1;
        } else if (curent_page <= (total_page / 2)) {
            if (i == 0) return curent_page - 2
            if (i == 1) return curent_page - 1
            if (i == 2) return curent_page + 0
            if (i == 3) return curent_page + 1
            if (i == 4) return curent_page + 2
        } else if (curent_page > (total_page / 2)) {
            if (curent_page == total_page) {
                if(total_page == 4){
                    if (i == 0) return curent_page - 3
                    if (i == 1) return curent_page - 2
                    if (i == 2) return curent_page - 1
                    if (i == 3) return curent_page + 0
                }
                if(total_page == 3){
                    if (i == 0) return curent_page - 2
                    if (i == 1) return curent_page - 1
                    if (i == 2) return curent_page + 0
                }
                if(total_page == 2){
                    if (i == 0) return curent_page - 1
                    if (i == 1) return curent_page + 0
                }
                if (i == 0) return curent_page - 4
                if (i == 1) return curent_page - 3
                if (i == 2) return curent_page - 2
                if (i == 3) return curent_page - 1
                if (i == 4) return curent_page + 0
            } else if (curent_page == (total_page - 1)) {
                if (i == 0) return curent_page - 3
                if (i == 1) return curent_page - 2
                if (i == 2) return curent_page - 1
                if (i == 3) return curent_page + 0
                if (i == 4) return curent_page + 1
            } else {
                if (i == 0) return curent_page - 2
                if (i == 1) return curent_page - 1
                if (i == 2) return curent_page + 0
                if (i == 3) return curent_page + 1
                if (i == 4) return curent_page + 2
            }
        }
    }
    const activeButton = (i, text) => {
        if (curent_page <= 3) {
            if (i == (curent_page-1)) return true;
        } else if (curent_page <= (total_page / 2)) {
            if (i == 2) return true
        } else if (curent_page > (total_page / 2)) {
            if (curent_page == total_page) {
                if(total_page == 4){
                    if (i == 3) return true
                }
                if(total_page == 3){
                    if (i == 2) return true
                }
                if(total_page == 2){
                    if (i == 1) return true
                }
                if (i == 4) return true
            } else if (curent_page == (total_page - 1)) {
                if (i == 3) return true
            } else {
                if (i == 2) return true
            }
        }else{
            return false
        }
    }
    const onPressNext = (page, text) => {
        if (text !== "...") {
            const pageNew = curent_page + 1;
            onPress(pageNew)
        }
    }
    const onPressPre = (page, text) => {
        if (text !== "...") {
            const pageNew = curent_page - 1;
            onPress(pageNew)
        }
    }
    const onPressBtn = (page, text) => {
        if (text !== "...") {
            onPress(page)
        }
    }
    const [hideNext, setHideNext] = useState(false);
    const [hidePre, setHidePre] = useState(false);
    const [hidePaging, setHidePaging] = useState(false)
    useEffect(() => {
        if (total_page == curent_page ) {
            setHideNext(true)
        } else {
            setHideNext(false)
        }
        if (curent_page == 1 ) {
            setHidePre(true)
        } else {
            setHidePre(false)
        }
        if (total_page == 1) {
            setHidePaging(true)
        } else {
            setHidePaging(false)
        }

    }, [curent_page])
    return (
        <>
            {!hidePaging && <View style={responsive().background}>
                {!hidePre && <ItemPaging text={btnNext} active={false} onPressBtn={(page) => { onPressPre(page) }}></ItemPaging>}
                {hideButton(0) && <ItemPaging text={textButton(0)} active={activeButton(0, textButton(0))} onPressBtn={(page) => { onPressBtn(page, textButton(0)) }}></ItemPaging>}
                {hideButton(1) && <ItemPaging text={textButton(1)} active={activeButton(1, textButton(1))} onPressBtn={(page) => { onPressBtn(page, textButton(1)) }}></ItemPaging>}
                {hideButton(2) && <ItemPaging text={textButton(2)} active={activeButton(2, textButton(2))} onPressBtn={(page) => { onPressBtn(page, textButton(2)) }}></ItemPaging>}
                {hideButton(3) && <ItemPaging text={textButton(3)} active={activeButton(3, textButton(3))} onPressBtn={(page) => { onPressBtn(page, textButton(3)) }}></ItemPaging>}
                {hideButton(4) && <ItemPaging text={textButton(4)} active={activeButton(4, textButton(4))} onPressBtn={(page) => { onPressBtn(page, textButton(4)) }}></ItemPaging>}
                {!hideNext && <ItemPaging text={btnPre} active={false} onPressBtn={(page) => { onPressNext(page) }}></ItemPaging>}
            </View>}
        </>
    );
}
const stylesXs = StyleSheet.create({
    background: {
        width: width,
        justifyContent: 'center',
        flexDirection: 'row'
    },
});
const stylesMl = StyleSheet.create({
    background: {

    },
});