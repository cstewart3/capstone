import * as React from 'react';
import { Text, View, StyleSheet, Picker, Button, Modal, TouchableHighlight } from 'react-native';
import Expo from 'expo';

const data = require("..\\assets\\data_points\\fake.json");
 
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
      pickerSelection: 'All Stops',
      pickerDisplayed: false,
      modalVisible: true,
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
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
}

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
              <Text style={{fontWeight: "bold", fontSize: 25}}>Filters</Text>
              { pickerValues.map((value, index) => {
                return <TouchableHighlight key={index} onPress={() => this.setPickerValue(value.value)} style={{ paddingTop: 4, paddingBottom: 4 }}>
                    <Text style={{color: '#5a5f66', fontSize: 20}}>{ value.title }</Text>
                  </TouchableHighlight>
              })}


              <TouchableHighlight onPress={() => this.togglePicker()} style={{ paddingTop: 4, paddingBottom: 4 }}>
                <Text style={{ color: '#999' }}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </Modal>

      <Expo.MapView style = {{flex: 1}} provider = {Expo.MapView.PROVIDER_GOOGLE}
      //<Expo.MapView style = {{flex: 1}}
      initialRegion = {{
        latitude: this.state.location.coords.latitude,
        longitude: this.state.location.coords.longitude,
        //latitude: 39.821205,
        //longitude: -77.232254,
        latitudeDelta: 0.0022,
        longitudeDelta: 0.0421,

      }}>
      {this._maybeRenderDevelopmentModeWarning()}
      {/* User's Location always shown */}
      
      
          <Expo.MapView.Marker coordinate = {this.state.location.coords} title = {"You are here cool person"} >
          <View style = {styles.radius}> 
        <View style = {styles.marker}> 
        </View>
      </View>
      </Expo.MapView.Marker>
      
      {/* <Expo.MapView.Marker coordinate = {{latitude: 39.821205, longitude: -77.232254}} title = {"Scary Place"} /> */}
      {/* <Expo.MapView.Marker coordinate = {{latitude: 39.830947, longitude: -77.231133}} title = {"Lincoln Square"} description = {"The Circle of Gettysburg"} pinColor = {"#ede02d"}/> */}
      {/* <Expo.MapView.Marker coordinate = {{latitude: 39.832010, longitude: -77.231280}} title = {"Lincoln Diner"} description = {"Questionable food"} pinColor = {"#1fddf2"}/> */}
      

      </Expo.MapView>
    </React.Fragment>
    );
  }
  
  renderStopArrays(){
	  for(let i = 0; i <= data.length; i++){
		 if(data[i].category == "Lincoln's Visit"){
			lincolnsVisit.push(<Expo.MapView.Marker coordinate = {{latitude: data[i].lat, longitude: data[i].longit}} title = {data[i].siteName} description = {data[i].desc} pinColor = {"#ed7d31"}/>)
			allStops.push(<Expo.MapView.Marker coordinate = {{latitude: data[i].lat, longitude: data[i].longit}} title = {data[i].siteName} description = {data[i].desc} pinColor = {"#ed7d31"}/>)
		 }
		 
		 else if(data[i].category == "Citizens and the Battle"){
			citandBattle.push(<Expo.MapView.Marker coordinate = {{latitude: data[i].lat, longitude: data[i].longit}} title = {data[i].siteName} description = {data[i].desc} pinColor = {"##7200ff"}/>)
			allStops.push(<Expo.MapView.Marker coordinate = {{latitude: data[i].lat, longitude: data[i].longit}} title = {data[i].siteName} description = {data[i].desc} pinColor = {"#ed7d31"}/>)

		 }
		 else if(data[i].category == "Gettysburg's Black History"){
			burgBlackHistory.push(<Expo.MapView.Marker coordinate = {{latitude: data[i].lat, longitude: data[i].longit}} title = {data[i].siteName} description = {data[i].desc} pinColor = {"##7200ff"}/>)
			allStops.push(<Expo.MapView.Marker coordinate = {{latitude: data[i].lat, longitude: data[i].longit}} title = {data[i].siteName} description = {data[i].desc} pinColor = {"#ed7d31"}/>)

		 }
		 else if(data[i].category == "Early Gettysburg"){
			earlyBurg.push(<Expo.MapView.Marker coordinate = {{latitude: data[i].lat, longitude: data[i].longit}} title = {data[i].siteName} description = {data[i].desc} pinColor = {"##7200ff"}/>)
			allStops.push(<Expo.MapView.Marker coordinate = {{latitude: data[i].lat, longitude: data[i].longit}} title = {data[i].siteName} description = {data[i].desc} pinColor = {"#ed7d31"}/>)

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
});
