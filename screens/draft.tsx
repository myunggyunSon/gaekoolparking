import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TextInput,
  Alert,
  Platform,
  StatusBar,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';
import {addNewReview} from '../src/api/addNewReview';
import {Entypo} from '@expo/vector-icons';

export default function Reviews(props) {
  const [Author, onChangeAuthor] = React.useState(null);
  const [Review, onChangeReview] = React.useState(null);
  const parkingLotFullInfo = props.route.params.parkingLotFullInfo;

  const _addNewReview = async () => {
    addNewReview({
      author: Author,
      comment: Review,
      parkingId: props.route.params.parkingLotFullInfo.id,
    }).then(() => {
      Alert.alert('알림', '리뷰 작성에 성공했습니다!');
      //TODO 성공했을 때 뭔가 수행하기?
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{height: 20}} />

      <ScrollView>
        <View style={styles.menu}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}>
            <Ionicons name="ios-chevron-back" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Map');
            }}>
            <MaterialIcons name="home" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.title}>{props.route.params.name}</Text>
          <Text style={styles.title}>리뷰 작성하기</Text>
        </View>
        <View style={{height: 30}} />
        <Text style={{paddingLeft: '5%', fontSize: 17, fontWeight: 'bold'}}>
          아이디:
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeAuthor}
          value={Author}
          placeholder="아이디를 작성해주세요"
        />
        <View style={{height: 25}} />
        <Text style={{paddingLeft: '5%', fontSize: 17, fontWeight: 'bold'}}>
          리뷰:
        </Text>
        <TextInput
          style={styles.input2}
          onChangeText={onChangeReview}
          value={Review}
          placeholder="이 주차장에 대한 리뷰를 작성해주세요"
          multiline
          numberofLines={6}
        />
        <View style={{height: 25}} />
        <View
          style={{
            paddingLeft: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Entypo name="warning" size={18} color="black" />
          <Text style={{fontWeight: 'bold', fontSize: 17}}> 주의사항:</Text>
        </View>
        <View style={{paddingLeft: 40, paddingTop: 10, paddingRight: 20}}>
          <Text>
            - 리뷰 작성시 솔직한 평가 부탁드립니다. 수정 요청있으시면 빠른
            시일내에 관리자들이 수정하도록 하겠습니다.
          </Text>
          <View style={{height: 10}} />

          <Text>
            - 욕설 및 비하적인 발언을 할 시에 리뷰가 삭제 될 수 있으니 주의
            바랍니다.
          </Text>
          <View style={{height: 10}} />

          <Text>- 해당 주차장에 관한 리뷰만 작성해주시기 바랍니다.</Text>
        </View>
        <View style={{height: 50}} />

        <TouchableOpacity
          onPressIn={_addNewReview}
          onPress={() => {
            props.navigation.navigate('Reviews', {
              name: props.route.params.name,
              parkingLotFullInfo: props.route.params.parkingLotFullInfo,
            });
          }}
          style={styles.submission}>
          <Ionicons name="ios-enter-outline" size={30} color="darkorange" />
          <Text style={{color: 'darkorange', fontWeight: 'bold', fontSize: 20}}>
            {' '}
            제출하기
          </Text>
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
  title: {
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 25,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  add: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    height: 30,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: 'lightsalmon',
    width: 85,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    borderColor: 'darkorange',
  },
  input2: {
    height: 160,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    borderColor: 'darkorange',
  },
  menu: {
    width: '98%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  submission: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    width: 300,
    height: 60,
    borderRadius: 10,
    borderColor: 'darkorange',
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: 'oldlace',
  },
});
