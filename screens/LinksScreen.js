import * as React from 'react';
import { Text, View, StyleSheet, Picker, Button, Modal, TouchableHighlight, Image, Platform, TouchableOpacity} from 'react-native';
import Expo from 'expo';
import MapView, { Marker, AnimatedRegion, Polyline, MarkerAnimated } from "react-native-maps";
import haversine from "haversine";

const LATITUDE = 29.95539;
const LONGITUDE = 78.07513;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const data = require("../assets/data_points/fake.json");
 
	var lincolnsVisit = [];
	var citandBattle = []; 
	var burgBlackHistory = []; 
	var earlyBurg = []; 
	var allStops = [];
export default class App extends React.Component {
  static navigationOptions = {
    title: 'Map View',
  };
  constructor(props) {
    super(props); 
    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      coordinate: new AnimatedRegion ({
        latitude: LATITUDE,
        longitude: LONGITUDE
      }),
      pickerSelection: '',
      pickerDisplayed: false,
      modalVisible: true,
      locationVisible: false,
      curMarker: 0
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  setLocationModalVisible(visible) {
    this.setState({locationVisible: visible})
  }

  setPickerValue(newValue) {
    this.setState({
      pickerSelection: newValue
    })

    this.togglePicker();
  }

  togglePicker() {
    this.setState({
      pickerDisplayed: !this.state.pickerDisplayed
    })
  }


  state = {
    location: null,
  }

  _getLocationAsync = async () => {
    let {status} = await Expo.Permissions.askAsync(Expo.Permissions.LOCATION);
    if (status !== 'granted') {
      console.error("Location permission not granted!");
      return;
    }


  let location = await Expo.Location.getCurrentPositionAsync({});
  this.setState({location: location});
};

componentDidMount() {
  this._getLocationAsync(); // call method as soon as component mounts
  const { coordinate } = this.state;
  this.watchID = navigator.geolocation.watchPosition(
    position => {
      const { coordinate, routeCoordinates, distanceTravelled } = this.state;
      const { latitude, longitude } = position.coords;

      const newCoordinate = {
        latitude,
        longitude
      };

      if (Platform.OS === 'android') {
        if (this.marker) {
          this.marker._component.animateMarkerToCoordinate(
            newCoordinate,
            500 
          
          );
        }
      } else {
        coordinate.timing(newCoordinate).start();
      }

      this.setState({
        latitude,
        longitude,
        routeCoordinates: routeCoordinates.concat([newCoordinate]),
        distanceTravelled:
          distanceTravelled + this.calcDistance(newCoordinate),
        prevLatLng: newCoordinate
      });
    },
    error => console.log(error),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
  );
}

componentWillUnmount() {
  navigator.geolocation.clearWatch(this.watchID);
}

calcDistance = newLatLng => {
  const { prevLatLng } = this.state;
  return haversine(prevLatLng, newLatLng) || 0;
};

getMapRegion = () => ({
  latitude: this.state.latitude,
  longitude: this.state.longitude,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
});

  render() {

    this.renderStopArrays();
	
	
    const pickerValues = [
      {
        title: 'All Stops',
        value: 'All Stops'
      },
      {
        title: "Lincoln's Visit",
        value: "Lincoln's Visit"
      },
      {
        title: 'Citizens and the Battle',
        value: 'Citizens and the Battle'
      },
      {
        title: "Gettysburg's Black History",
        value: "Gettysburg's Black History"
      },
      {
        title: "Early Gettysburg",
        value: "Early Gettysburg"
      }
    ]


    if (!this.state.location) {
      return (<View />)
    }
    return (
      <React.Fragment>


        <View >
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style ={{alignItems: 'center'}}>
            
              <Text style={styles.getStartedText}>GettysburgAR</Text>

              <TouchableHighlight
                style = {styles.getStartedButton}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={styles.buttonText}>Get Started!</Text>
              </TouchableHighlight>
           
          </View>
        </Modal>

      </View>

        <View style={{height: 0}} />
          
          <Button onPress={() => this.togglePicker()} title={ "Map Filters" }/>
           <Text style={{textAlignVertical: "center",textAlign: "center"}}> { this.state.pickerSelection }</Text>
          <Modal visible={this.state.pickerDisplayed} animationType={"slide"} transparent={true}>
            <View style={{ margin: 20, padding: 20,
              backgroundColor: '#efefef',
              bottom: 20,
              left: 20,
              right: 20,
              alignItems: 'center',
              position: 'absolute' }}>
              <Text style={{fontWeight: "bold"}}>Filters</Text>
              { pickerValues.map((value, index) => {
                return <TouchableHighlight key={index} onPress={() => this.setPickerValue(value.value)} style={{ paddingTop: 4, paddingBottom: 4 }}>
                    <Text style={{color: '#5a5f66'}}>{ value.title }</Text>
                  </TouchableHighlight>
              })}


              <TouchableHighlight onPress={() => this.togglePicker()} style={{ paddingTop: 4, paddingBottom: 4 }}>
                <Text style={{ color: '#999' }}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </Modal>

       <View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.locationVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style ={{flex: 1, alignItems: 'stretch'}}>
        <TouchableHighlight onPress={() => this.setLocationModalVisible(!this.state.locationVisible)} style={{ paddingTop: 4, paddingBottom: 4 }}>
                <Text style={{ color: '#999', fontSize: 30, paddingLeft: 5, paddingTop: 15, fontWeight: 'bold'}}>x</Text>
          </TouchableHighlight>
            {this.getImages(this.state.curMarker)}
            {/* <Image source={require('../assets/images/' + data[this.state.curMarker].images.image1.fn)} style={{width:40, height:20}} /> */}
            {/* <Text style={styles.getStartedText}>{data[this.state.curMarker].images.image1.fn}</Text> */}
            <Text style={styles.siteText}>{data[this.state.curMarker].siteName}</Text>
            <Text style={styles.descText}>{data[this.state.curMarker].desc}</Text>


            {/* <TouchableHighlight
              style = {styles.getStartedButton}
              onPress={() => {
                this.setLocationModalVisible(!this.state.locationVisible);
              }}>
              <Text style={styles.buttonText}>Get Started!</Text>
            </TouchableHighlight> */}
        </View>
      </Modal>
      </View>

      <Expo.MapView style = {{flex: 1}} provider = {Expo.MapView.PROVIDER_GOOGLE}
      //<Expo.MapView style = {{flex: 1}}
      // initialRegion = {{
      //   latitude: this.state.location.coords.latitude,
      //   longitude: this.state.location.coords.longitude,
      //   //latitude: 39.821205,
      //   //longitude: -77.232254,
      //   latitudeDelta: 0.0022,
      //   longitudeDelta: 0.0421,

      // }}
      showUserLocation
      followUserLocation
      loadingEnabled
      region={this.getMapRegion()}
      >
      {/* {this.markerModal(-1)} */}
      {this._maybeRenderDevelopmentModeWarning()}
      {/* User's Location always shown */}
      {/* <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} /> */}
      <Marker.Animated
        ref={marker => {
          this.marker = marker;
        }}
        coordinate={this.state.coordinate} >
        <View style = {styles.marker}>  </View> 
        </Marker.Animated>
      
          {/* <Expo.MapView.Marker coordinate = {this.state.location.coords} title = {"You are here cool person"} >
          <View style = {styles.radius}> 
        <View style = {styles.marker}> 
        </View>
      </View>
      </Expo.MapView.Marker> */}
      </Expo.MapView>
      {/* code to show how far a person has traveled
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.bubble, styles.button]}>
          <Text style={styles.bottomBarContent}>
            {parseFloat(this.state.distanceTravelled).toFixed(2)} km
          </Text>
        </TouchableOpacity>
      </View> 
      */}
    </React.Fragment>
    );
  }
  
  renderStopArrays(){
	  for(let i = 0; i < data.length; i++){
		 if(data[i].category == "Lincoln's Visit"){
			lincolnsVisit.push(<Expo.MapView.Marker onPress={() => this.markerClick(i)} coordinate = {{latitude: data[i].lat, longitude: data[i].longit}} title = {data[i].siteName} description = '' pinColor = {"#ed7d31"}/>)
			allStops.push(<Expo.MapView.Marker onPress={() => this.markerClick(i)} coordinate = {{latitude: data[i].lat, longitude: data[i].longit}} title = {data[i].siteName} description = '' pinColor = {"#ed7d31"}/>)
		 }
		 
		 else if(data[i].category == "Citizens and the Battle"){
			citandBattle.push(<Expo.MapView.Marker onPress={() => this.markerClick(i)} coordinate = {{latitude: data[i].lat, longitude: data[i].longit}} title = {data[i].siteName} description = '' pinColor = {"#7200ff"}/>)
			allStops.push(<Expo.MapView.Marker onPress={() => this.markerClick(i)} coordinate = {{latitude: data[i].lat, longitude: data[i].longit}} title = {data[i].siteName} description = '' pinColor = {"#7200ff"}/>)

		 }
		 else if(data[i].category == "Gettysburg's Black History"){
			burgBlackHistory.push(<Expo.MapView.Marker onPress={() => this.markerClick(i)} coordinate = {{latitude: data[i].lat, longitude: data[i].longit}} title = {data[i].siteName} description = '' pinColor = {"#7200ff"}/>)
			allStops.push(<Expo.MapView.Marker onPress={() => this.markerClick(i)} coordinate = {{latitude: data[i].lat, longitude: data[i].longit}} title = {data[i].siteName} description = '' pinColor = {"#7200ff"}/>)

		 }
		 else if(data[i].category == "Early Gettysburg"){
			earlyBurg.push(<Expo.MapView.Marker onPress={() => this.markerClick(i)} coordinate = {{latitude: data[i].lat, longitude: data[i].longit}} title = {data[i].siteName} description = '' pinColor = {"#7200ff"}/>)
			allStops.push(<Expo.MapView.Marker onPress={() => this.markerClick(i)} coordinate = {{latitude: data[i].lat, longitude: data[i].longit}} title = {data[i].siteName} description = '' pinColor = {"#7200ff"}/>)

		 }
	 }
	  
  }

  /*
  Filtering tour types
  Return specific tour type
  */
  _maybeRenderDevelopmentModeWarning() {
	  
	if (this.state.pickerSelection == "Lincoln's Visit") {
      return (
      <React.Fragment>
		    {lincolnsVisit}
      </React.Fragment>
      );
    }
    
    else if (this.state.pickerSelection == "Citizens and the Battle"){
      return (
      <React.Fragment>
      {citandBattle}
      </React.Fragment>
      );
    }

    else if (this.state.pickerSelection == "Gettysburg's Black History") {
      return (
      <React.Fragment>
      {burgBlackHistory}
      </React.Fragment>
      );
    }

    else if (this.state.pickerSelection == "Early Gettysburg") {
      return (
      <React.Fragment>
		{earlyBurg}     
      </React.Fragment>
      );
    }
    else {
      return (
        <React.Fragment>
        
        {allStops}
        
        </React.Fragment>
      
      ); 
	  
   }
  

  }

  getImages(index) {
    im1 = '../assets/images/';
    im1 = im1.concat(data[index].images.image1.fn.toString())
   return (
      <Image source={require('../assets/images/David_Wills.jpg')} style={{paddingTop: 5, width:200, height:200}} />

   );
 }

  markerClick(index) {
    this.state.curMarker = index;
    this.setLocationModalVisible();
  }

}

const styles = StyleSheet.create({
  getStartedText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#e3256b',
    lineHeight: 400,
   
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#7f7f7f',
    justifyContent: 'center'

  },
  siteText: {
    fontSize: 30,
    fontWeight: 'bold',
    backgroundColor: '#7f7f7f',
    color: '#fff',
    alignItems: 'center',
    padding: 5
  },
  descText: {
    fontSize: 20,
    color: '#7f7f7f',
    alignItems: 'center',
    padding: 10
  },
  getStartedButton: {
    borderWidth: 3,
    borderColor: '#00ffff',
    alignItems: 'center',

    padding: 10,
    width: 175
  },
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 112, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  marker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: '#bd0247',
    borderRadius: 20 / 2,
    overflow: 'hidden',
    backgroundColor: '#e3256b'
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Expo.Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  bubble: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  latlng: {
    width: 200,
    alignItems: "stretch"
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent"
  }
});
