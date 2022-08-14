import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {Platform, StatusBar} from 'react-native'
import MapView, {Callout, Circle, Marker} from 'react-native-maps';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import {Entypo} from '@expo/vector-icons';

export default function Map(props) {
  const mapViewRef = useRef();
  const [Destination, setDestination] = useState('  ');

  const [parkingLots, setParkingLots] = useState([]);

  console.log(parkingLots.filter(p => p.latitude === null));

  const fetchParkingLots = () => {
    fetch(
      'https://api.airtable.com/v0/app6PE5rMIkIIqPNZ/parking?view=Grid%20view',
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
        const parkingLots = resJson?.records?.map(record => record.fields);
        setParkingLots(parkingLots);
      });
  };

  useEffect(() => {
    fetchParkingLots();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headersMain}>
        <Image
          style={{height: 35, width: 35}}
          source={require('../assets/logo.png')}
        />
        <Text style={styles.boldText}> 개꿀 주차</Text>
      </View>

      <MapView
        ref={mapViewRef}
        style={styles.map}
        initialRegion={{
          latitude: 37.5011,
          longitude: 127.0983,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {parkingLots.length > 0 &&
          parkingLots.map(
            pin =>
              pin.latitude &&
              pin.longitude && (
                <Marker
                  key={`marker-${pin.id}`}
                  coordinate={{
                    latitude: pin.latitude,
                    longitude: pin.longitude,
                  }}
                  title={pin.name}
                  description="상세정보 보기"
                  onPress={event => {
                    const coordinate = event.nativeEvent.coordinate;
                    mapViewRef?.current.animateToRegion(
                      {
                        latitude: pin.latitude,
                        longitude: pin.longitude,
                      },
                      300,
                    );
                  }}>
                  <View style={styles.roundMarker}>
                    <Image
                      style={styles.roundImage}
                      source={require('../assets/logo.png')}
                    />
                  </View>
                  <Callout
                    tooltip
                    onPress={() => {
                      props.navigation.navigate('InfoScreen', {
                        name: pin.name,
                        latitude: pin.latitude,
                        longitude: pin.longitude,
                        pictures: pin.pictures,
                        address: pin.address,
                        isPaid: pin.isPaid,
                        comments: pin.comments,
                        space: pin.space,
                        parkingLotFullInfo: pin,
                      }); //params
                      console.log('onPress');
                    }}>
                    <View>
                      <View style={styles.bubble}>
                        <Text>{pin.name}</Text>
                        <View style={styles.details}>
                          <Entypo
                            name="arrow-with-circle-right"
                            size={15}
                            color="orange"
                          />
                          <Text style={styles.description}> 상세정보 보기</Text>
                        </View>
                      </View>
                      <View style={styles.arrowborder}></View>
                      <View style={styles.arrow}></View>
                    </View>
                  </Callout>
                </Marker>
              ),
          )}
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
  headersMain: {
    backgroundColor: '#ff6600',
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 8,
    width: 200,
  },
  headersSub: {
    marginBottom: 8,
    marginTop: 5,
  },
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    borderRadius: 6,
    borderColor: 'transparent',
    borderWidth: 0.5,
    padding: 8,
    width: 200,
    backgroundColor: '#fff',
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowborder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: 'black',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
  },
  description: {
    color: 'darkorange',
    fontSize: 13,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 4,
  },
  roundMarker: {
    height: 32,
    width: 32,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  roundImage: {
    height: 32,
    width: 32,
    borderRadius: 15,
  },
});
