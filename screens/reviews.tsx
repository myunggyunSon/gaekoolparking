import React, {Component, useEffect, useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';
import {Review} from '../src/api/addNewReview';
import moment from 'moment';
import {FontAwesome} from '@expo/vector-icons';
import {Entypo} from '@expo/vector-icons';

export default function Reviews(props) {
  const [reviews, setReviews] = useState<Review[]>([]);

  const fetchReviews = (id: number) => {
    fetch(
      `https://api.airtable.com/v0/app6PE5rMIkIIqPNZ/review?filterByFormula=%7BparkingId%7D%3D${id}`,
      {
        headers: {
          Authorization: 'Bearer keybAes5GAMvz2kuG',
        },
      },
    )
      .then(res => {
        return res.json();
      })
      .then(resJson => {
        const reviews = resJson?.records?.map(record => record.fields);
        setReviews(reviews);
      });
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      fetchReviews(props.route.params.parkingLotFullInfo.id);
    });

    return unsubscribe;
  }, [props.navigation]);

  useEffect(() => {
    fetchReviews(props.route.params.parkingLotFullInfo.id);
  }, []);
  const win = Dimensions.get('window');
  const ratio = win.width;

  return (
    <View style={styles.container}>
      <View>
        <View style={{height: 20}} />
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
          <Text style={styles.title}>{props.route.params.name} 리뷰</Text>
        </View>
        <View style={{height: 20}} />
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('ReviewDraft', {
              name: props.route.params.name,
              parkingLotFullInfo: props.route.params.parkingLotFullInfo,
            });
          }}>
          <View style={styles.add}>
            <MaterialIcons name="add-comment" size={20} color="darkorange" />
            <Text
              style={{color: 'darkorange', fontWeight: 'bold', fontSize: 16}}>
              {' '}
              리뷰쓰기
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{height: 10}} />
      <ScrollView>
        {reviews &&
          reviews.map(review => (
            <View style={styles.review}>
              <FontAwesome name="user" size={40} color="darkorange" />
              <View style={{width: 20}} />
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 17}}>
                  {review.author}
                </Text>
                <View style={{height: 10}} />
                <Text style={{fontSize: 15}}>{review.comment}</Text>
                <View style={{height: 15}} />
                <Text style={{fontSize: 13, color: 'grey'}}>
                  {moment(review.createdAt).format('YYYY년 MM월 DD일 LT')}
                </Text>
              </View>
            </View>
          ))}

        {reviews?.length === 0 && (
          <View>
            <View style={{height: 25}} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 25,
                  color: 'orangered',
                }}>
                아직 리뷰가 없습니다{'   '}
              </Text>
              <Entypo name="emoji-sad" size={24} color="orangered" />
            </View>
          </View>
        )}

        <View style={{height: 20}} />
        <View style={{padding: 20}}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 25,
              color: 'darkorange',
            }}>
            개꿀 주차장 앱의 발전을 위해 많은 리뷰 작성바랍니다!
          </Text>
        </View>
        <View>
          <Image
            source={require('../assets/mainlogo.png')}
            style={{
              width: win.width,
              height: ratio,
              alignSelf: 'center',
            }}
          />
        </View>
      </ScrollView>
    </View>
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
    alignSelf: 'center',
    alignItems: 'center',
    height: 60,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: 'lightsalmon',
    width: 325,
    justifyContent: 'center',
    backgroundColor: 'moccasin',
  },
  menu: {
    width: '98%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  review: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'orange',
    padding: 20,
  },
});
