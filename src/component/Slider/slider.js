import React, { useRef, useState, useEffect } from 'react';
import { View, Animated, FlatList, Text, Dimensions, SafeAreaView, Image, StyleSheet, ImageBackground } from 'react-native';
import { SvgXml } from 'react-native-svg'
const { width, height } = Dimensions.get('screen');
export default function Slider(props) {
    //porps
    const { dataImage } = props;
    const scrollX = useRef(new Animated.Value(0)).current;
    //Responsive
    const responsive = () => {
        const wpScreen = Dimensions.get('window').width;
        if (wpScreen <= 766) {
            return stylesXs;
        } else {
            return stylesMl;
        }
    }
    //Data
    // const Data = [{
    //     "id": 1, "url": "https://png.pngtree.com/png-clipart/20190611/original/pngtree-natural-scenery-small-rivers-and-rivers-png-image_3239281.jpg"
    // }, {
    //     "id": 2, "url": "https://png.pngtree.com/png-clipart/20190611/original/pngtree-natural-scenery-small-rivers-and-rivers-png-image_3239281.jpg"
    // }, {
    //     "id": 3, "url": "https://png.pngtree.com/png-clipart/20190611/original/pngtree-natural-scenery-small-rivers-and-rivers-png-image_3239281.jpg"
    // }, {
    //     "id": 4, "url": "https://png.pngtree.com/png-clipart/20190611/original/pngtree-natural-scenery-small-rivers-and-rivers-png-image_3239281.jpg"
    // }]
    const [Data, setData] = useState([{
        "id": 1, "url": "https://png.pngtree.com/png-clipart/20190611/original/pngtree-natural-scenery-small-rivers-and-rivers-png-image_3239281.jpg"
    }])
    const [displayDot , setDisplayDot] = useState(false)
    useEffect(() => {
        let data = new Array()
        if (dataImage != undefined) {
            for (let i = 0; i < dataImage.length; i++) {
                data.push({
                    "id": i,
                    "url": dataImage[i]
                })
            }
            setData(data)
            if(data.length > 1){
                setDisplayDot(true)
            }
        }
    }, [dataImage])
    const Indicator = ({ scrollX }) => {
        return <View style={{ flexDirection: 'row' }}>
            {Data.map((_, i) => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                const scale = scrollX.interpolate({
                    inputRange,
                    outputRange: [1, 1, 1],
                    extrapolate: 'clam',
                })
                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [1, 1, 1],
                    extrapolate: 'clam',
                })
                const indicatorColor = scrollX.interpolate({
                    inputRange,
                    outputRange: ['rgb(244,244,244)', 'rgb(251,227,149)', 'rgb(244,244,244)'],
                })
                return <Animated.View
                    key={`indicator-${i}`}
                    style={[responsive().dot,
                    {
                        backgroundColor: indicatorColor,
                        opacity,
                        transform: [
                            {
                                scale,
                            }
                        ]
                    }]}
                />
            })}
        </View>
    }
    return (
        <>
            <SafeAreaView />
            <View style={responsive().backgroud}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={responsive().colum}></View>
                    <Animated.FlatList
                        data={Data}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => {
                            return <View style={responsive().backgroudslider}>
                                <Image source={{uri: `${item.url}` }} height={width * 0.7} width={width * 0.7} style={responsive().imageslider} />
                            </View>
                        }}
                        horizontal
                        scrollEventThrottle={12}
                        pagingEnabled={true}
                        decelerationRate="fast"
                        bounces={false}
                        decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
                        renderToHardwareTextureAndroid
                        contentContainerStyle={{ alignItems: 'center' }}
                        snapToInterval={width * 0.9}
                        snapToAlignment='start'
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: false }
                        )}
                        showsHorizontalScrollIndicator={false}
                    />
                    <View style={responsive().colum}></View>
                </View>
                {displayDot && <View style={{ position: 'relative', bottom: width * 0.08, width: width, alignItems: 'center' }}>
                    <Indicator scrollX={scrollX} />
                </View>}
                <View style={{paddingTop:20}}>
                    <FlatList
                        horizontal
                        data={Data}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => {
                            return <View style={responsive().backgroudimage} >
                                <Image source={{ uri: `${item.url}` }} height={width * 0.2} width={width * 0.2} style={responsive().image} />
                            </View>
                        }}
                    />
                </View>
            </View>
        </>
    )
}
const stylesXs = StyleSheet.create({
    backgroud: {
        paddingBottom: height * 0.03,
        paddingTop: height * 0.02,
        marginBottom: height * 0.01,
    },
    colum: {
        width: width * 0.05,
        height: width * 0.8,
        backgroundColor: '#fade7b'
    },
    backgroudslider: {
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
    },
    backgroudimage: {
        paddingLeft: width * 0.02,
        paddingRight: width * 0.02,
    },
    imageslider: {
        width: width * 0.8,
        height: width * 0.8,
        borderRadius: 10,
        backgroundColor: 'transparent',
    },
    image: {
        width: width * 0.2,
        height: width * 0.2,
        borderRadius: 10,
        backgroundColor: 'transparent'
    },
    dot: {
        height: width * 0.035,
        width: width * 0.035,
        borderRadius: 10,
        margin: width * 0.01,
    }
})
const stylesMl = StyleSheet.create({
    backgroud: {
        paddingBottom: height * 0.03,
        paddingTop: height * 0.02,
        marginBottom: height * 0.01,
    },
    colum: {
        width: width * 0.05,
        height: width * 0.8,
        backgroundColor: '#fade7b'
    },
    backgroudslider: {
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
    },
    backgroudimage: {
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
    },
    imageslider: {
        width: width * 0.8,
        height: width * 0.8,
        borderRadius: 10,
        backgroundColor: 'transparent'
    },
    image: {
        width: width * 0.2,
        height: width * 0.2,
        borderRadius: 10,
        backgroundColor: 'transparent'
    },
    dot: {
        height: width * 0.035,
        width: width * 0.035,
        borderRadius: 10,
        margin: width * 0.01,
    }
})