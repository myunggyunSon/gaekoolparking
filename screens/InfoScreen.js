import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Image,
  StatusBar,
  Platform,
} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';
import {useRoute} from '@react-navigation/native';
import {FontAwesome5} from '@expo/vector-icons';
import {Entypo} from '@expo/vector-icons';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const onchange = nativeEvent => {
  if (nativeEvent) {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    if (slide != imgActive) {
      setimgActive(slide);
    }
  }
};

export default function InfoScreen(props) {
  const [imgActive, setimgActive] = useState(0);

  const onchange = nativeEvent => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide != imgActive) {
        setimgActive(slide);
      }
    }
  };

  const route = useRoute();

  return (
    <SafeAreaView style={styles.container}>
      <View style={{height: 20}} />
      <ScrollView>
        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack();
          }}>
          <Ionicons name="ios-chevron-back" size={30} color="black" />
        </TouchableOpacity>

        <View style={styles.wrap}>
          <ScrollView
            onScroll={({nativeEvent}) => onchange(nativeEvent)}
            scrollEventThrottle={1}
            horizontal={true}
            showHorizontalScrollIndicator={false}
            pagingEnabled
            style={styles.wrap}>
            {(props.route.params?.parkingLotFullInfo?.pictures ?? [])?.map(
              (picture, index) => (
                <Image
                  key={`picture-${picture?.id}`}
                  resizeMode="stretch"
                  style={styles.wrap}
                  source={{uri: picture?.url}}
                />
              ),
            )}
          </ScrollView>
          <View style={styles.wrapDot}>
            {props.route.params.parkingLotFullInfo?.pictures?.map(
              (e, index) => (
                <Text
                  key={`dot-${index}`}
                  style={imgActive == index ? styles.dotActive : styles.dot}>
                  ●
                </Text>
              ),
            )}
          </View>
        </View>

        <View style={styles.header}>
          <Text style={styles.mainheader}>{props.route.params.name}</Text>
        </View>
        <View style={styles.greybox}></View>
        {/*<View style={styles.option1}>*/}
        {/*  <View style={styles.box01}>*/}
        {/*    <FontAwesome name="share-square-o" size={24} color="black" />*/}
        {/*    <View style height={4}></View>*/}
        {/*    <Text stlye={styles.optiontext}>공유</Text>*/}
        {/*  </View>*/}
        {/*  <View style={styles.box1}>*/}
        {/*    <FontAwesome name="bookmark-o" size={24} color="black" />*/}
        {/*    <View style height={4}></View>*/}
        {/*    <Text stlye={styles.optiontext}>저장하기</Text>*/}
        {/*  </View>*/}
        {/*  <View style={styles.box1}>*/}
        {/*    <FontAwesome name="pencil" size={24} color="black" />*/}
        {/*    <View style height={4}></View>*/}
        {/*    <Text stlye={styles.optiontext}>수정요청</Text>*/}
        {/*  </View>*/}
        {/*  <View style={styles.box1}>*/}
        {/*    <Ionicons name="images-outline" size={24} color="black" />*/}
        {/*    <View style height={4}></View>*/}
        {/*    <Text stlye={styles.optiontext}>사진업로드</Text>*/}
        {/*  </View>*/}
        {/*</View>*/}
        <View style={styles.greybox}></View>
        <View style={styles.infobox}>
          <Entypo name="location" size={20} color="darkorange" />
          <Text style={styles.detail}>위치: {props.route.params.address}</Text>
        </View>
        <View style={styles.infobox}>
          <FontAwesome5 name="car" size={20} color="darkorange" />
          <Text style={styles.detail}>
            주차공간: {props.route.params.space ? props.route.params.space?.trim() : '알 수 없음'}
          </Text>
        </View>
        <View style={styles.infobox}>
          <FontAwesome5 name="info-circle" size={20} color="darkorange" />
          <Text style={styles.detail}>
            개꿀팁: {props.route.params.comments ? props.route.params.comments?.trim() : '없음'}
          </Text>
        </View>
        <View style={styles.infobox}>
          <FontAwesome5 name="money-check" size={15} color="darkorange" />
          <Text style={styles.detail}>요금: {props.route.params.isPaid}</Text>
          <View style={styles.space}></View>
        </View>
        <View style={styles.vertical}></View>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Reviews', {
              name: props.route.params.name,
              latitude: props.route.params.latitude,
              longitude: props.route.params.longitude,
              pictures: props.route.params.pictures,
              address: props.route.params.address,
              isPaid: props.route.params.isPaid,
              comments: props.route.params.comments,
              space: props.route.params.space,
              parkingLotFullInfo: props.route.params.parkingLotFullInfo,
            });
          }}>
          <View style={styles.reviewbox}>
            <FontAwesome5 name="comment-dots" size={24} color="darkorange" />
            <Text>리뷰보기</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerimage: {
    height: 200,
    width: '100%',
    backgroundColor: 'lightgrey',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    paddingTop: 15,
    paddingBottom: 8,
    backgroundColor: 'bisque',
  },
  mainheader: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },

  option1: {
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
  },
  box1: {
    width: '25%',
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderColor: 'darkorange',
    flexDirection: 'column',
  },
  box01: {
    width: '25%',
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  optiontext: {
    textAlign: 'center',
  },
  greybox: {
    width: '100%',
    height: 7,
    backgroundColor: 'darkorange',
  },
  infobox: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'darkorange',
    paddingLeft: '4%',
  },
  detail: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 8,
    width: '80%',
  },
  feeinfo: {
    height: 35,
    width: 100,
    flexDirection: 'row',
    alignSelf: 'center',
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'darkorange',
    backgroundColor: 'bisque',
  },
  space: {
    width: '20%',
  },
  vertical: {
    height: 25,
  },
  reviewbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    width: 300,
    height: 50,
    borderRadius: 10,
    borderColor: 'darkorange',
    alignSelf: 'center',
  },
  wrap: {
    width: WIDTH,
    height: HEIGHT * 0.4,
  },
  wrapDot: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dotActive: {
    margin: 3,
    color: 'black',
  },
  dot: {
    margin: 3,
    color: 'white',
  },
});
