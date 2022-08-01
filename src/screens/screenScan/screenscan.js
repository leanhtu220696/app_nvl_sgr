import React, { Component, useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  FlatList,
  Alert,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Header from '../../component/Header/header';
import { stylesXs } from "./style";
import Button from '../../component/Button/button';
import { dataProduct, listCodeQR } from '../../function/function';
import { Call_Filter } from '../../config/function';
import QRCodeScanner from 'react-native-qrcode-scanner';
import QRCode from 'react-native-qrcode-svg';
import { svgnull } from '../../assets/svg/svg';
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/Ionicons";
import { SvgXml } from 'react-native-svg';
import { svgTest } from "../../assets/svg/svg";

const { width, height } = Dimensions.get('screen');
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const overlayColor = "rgba(0,0,0,0.5)"; // this gives us a black color with a 50% transparency

const rectDimensions = SCREEN_WIDTH * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.005; // this is equivalent to 2 from a 393 device width
const rectBorderColor = "#fff";

const scanBarWidth = SCREEN_WIDTH * 0.46; // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.0025; //this is equivalent to 1 from a 393 device width
const scanBarColor = "red";

const iconScanColor = "#fff";
const makeSlideOutTranslation = (translationType, fromValue) => {
  return {
    from: {
      [translationType]: SCREEN_WIDTH * -0.18
    },
    to: {
      [translationType]: fromValue
    }
  };
}
function Scan({ navigation }) {
  let scanner;
  //Responsive
  const responsive = () => {
    const wpScreen = Dimensions.get('window').width;
    // if (wpScreen <= 766) {
    return stylesXs;
    //}
  }
  const startScan = () => {
    if (scanner) {
      scanner._setScanning(false);
    }
  };
  const btnBack = () => {
    const countList = listCodeQR.length
    listCodeQR.splice(0, countList)
    navigation.replace('Search')
  }
  const [dataBase, setDataBase] = useState(listCodeQR)
  useEffect(() => {
    setTimeout(() => { setDataBase(listCodeQR) }, 1000)
  })
  const [refreshing, setRefreshing] = useState(false)
  // listCodeQR.push("900.003.004.00223")
  const makeSlideOutTranslation = (translationType, fromValue) => {
    return {
      from: {
        [translationType]: SCREEN_WIDTH * -0.18
      },
      to: {
        [translationType]: fromValue
      }
    };
  }
  return (
    <>
      <SafeAreaView >
        <View
          style={[responsive().backgroud, { backgroundColor: 'rgba(0,0,0,0.6)' }]}
        >
          <QRCodeScanner
            reactivate={true}
            reactivateTimeout={2500}
            showMarker={true}
            markerStyle={{ width: 150, height: 150 }}
            ref={(camera) => scanner = camera}
            onRead={(e) => {
              setRefreshing(true)
              const countList = listCodeQR.length
              if (countList != 0) {
                let dem = 0;
                for (let i = 0; i < countList; i++) {
                  if (`${e.data}` == listCodeQR[i]) {
                    dem = dem + 1;
                  }
                }
                if (dem == 0) {
                  Alert.alert("Thông báo", "Quét mã thành công")
                  listCodeQR.push(`${e.data}`)
                } else {
                  Alert.alert("Thông báo", "Mã quét đã tồn tại")
                }
              } else {
                Alert.alert("Thông báo", "Quét mã thành công")
                listCodeQR.push(`${e.data}`)
              }
              setTimeout(() => { setRefreshing(false) }, 1000)
            }}
            customMarker={
              <View style={styles.rectangleContainer}>
              <View style={{ flexDirection: "row" }}>
                  <View style={styles.leftAndRightOverlay} />
                  <View style={styles.rectangle}>
                    <SvgXml xml={svgTest()} width={width*0.4} height={width*0.4}></SvgXml>
                    <Animatable.View
                      style={styles.scanBar}
                      direction="alternate-reverse"
                      iterationCount="infinite"
                      duration={1700}
                      easing="linear"
                      animation={makeSlideOutTranslation(
                        "translateY",
                        SCREEN_WIDTH * -0.54
                      )}
                    />
                  </View>

                  <View style={styles.leftAndRightOverlay} />
                </View>

                <View style={styles.bottomOverlay} />
              </View>
            }
            bottomViewStyle={{ position: 'relative', top: height*0.13 }}
            cameraStyle={{ position: 'absolute', top: '-25%' }}
            topContent={
              <View style={{position:'absolute',top:0}}>
              <Header
                xml={svgnull()}
                onPress={() => { btnBack() }}
              ></Header>
            </View>
            }
            bottomContent={(
              <View style={{ position: 'absolute', top: '-75%' }} >
                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', }} >
                  <View style={{ marginRight: 20 }}>
                    <Button nameBtn="Huỷ" onPress={() => { btnBack() }} />
                  </View>
                  <Button nameBtn="Xem danh sách" onPress={() => {
                    const countList = listCodeQR.length
                    if (countList != 0) {
                      const dataFilter = JSON.stringify({
                        "key": listCodeQR,
                        "page": 1,
                        "regions": [""],
                        "season": [""],
                        "origin": "",
                      });
                      Call_Filter(dataFilter).then(response => {
                        const data = response.data
                        if (data.data != null) {
                          const count = dataProduct.length
                          dataProduct.splice(0, count)
                          dataProduct.push(data)
                          let str = ""
                          for(let i = 0; i < countList; i++ ){
                              if(i == 0){
                                str = `${listCodeQR[i]},`
                              }else{
                                str = str + `${listCodeQR[i]},`
                              }
                          }
                          dataProduct.push([`${str}`])
                          listCodeQR.splice(0, countList)
                          navigation.replace('Search')
                          navigation.replace('List')
                          navigation.navigate('List')
                        } else {
                          Alert.alert("Thông báo", data.message)
                        }
                      }).catch(error => {
                        console.log(error)
                      })
                    } else {
                      Alert.alert("Thông báo", "Chưa có mã sản phẩm nào!")
                    }
                  }
                  } />
                </View>
                <FlatList
                  style={responsive().menu}
                  data={dataBase}
                  refreshing={refreshing}
                  onRefresh={() => { setRefreshing(true), setDataBase(listCodeQR) }}
                  keyExtractor={item => `${item}`}
                  horizontal
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity onPress={() => {
                        Alert.alert("Thông báo", `Xoá mã sản phẩm ${item} ?`,
                          [
                            {
                              text: "Cancel",
                              onPress: () => console.log("Cancel Pressed"),
                              style: "cancel"
                            },
                            {
                              text: "OK", onPress: () => {
                                setRefreshing(true)
                                const countList = listCodeQR.length
                                if (countList != 0) {
                                  let dem = -1;
                                  for (let i = 0; i < countList; i++) {
                                    if (`${item}` == listCodeQR[i]) {
                                      dem = i;
                                    }
                                  }
                                  if (dem != -1) {
                                    listCodeQR.splice(dem, 1)
                                    Alert.alert("Thông báo", `Xoá mã sản phẩm ${item} thành công!`)
                                    dem = -1;
                                  }
                                }
                                setTimeout(() => { setRefreshing(false) }, 1000)
                              }
                            }
                          ])
                      }}>
                        <View style={{ marginRight: 10 }}>
                          <QRCode size={45} value={`${item}`} />
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Scan;

