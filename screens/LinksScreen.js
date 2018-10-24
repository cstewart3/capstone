import * as React from 'react';
import { Text, View, StyleSheet, Picker, Button, Modal, TouchableHighlight } from 'react-native';
import Expo from 'expo';


export default class App extends React.Component {
  static navigationOptions = {
    title: 'Map View',
  };
  constructor(props) {
    super(props);

    this.state = {
      pickerSelection: '',
      pickerDisplayed: false
    }
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

  /*
  Filtering tour types
  Return specific tour type
  */
  _maybeRenderDevelopmentModeWarning() {
    if (this.state.pickerSelection == "Lincoln's Visit") {
      return (
      <React.Fragment>
      
      <Expo.MapView.Marker coordinate = {{latitude: 39.831058, longitude: -77.230580}} title = {"David Wills House"} description = {"Lincoln made final adjustments to the Gettysburg Address here"} pinColor = {"#ed7d31"}/>
      
      </React.Fragment>
      );
    }
    
    else if (this.state.pickerSelection == "Citizens and the Battle"){
      return (
      <React.Fragment>
      
      <Expo.MapView.Marker coordinate = {{latitude: 39.821205, longitude: -77.232254}} title = {"Scary Place"} pinColor = {"#00ffff"} />
      
      </React.Fragment>
      );
    }

    else if (this.state.pickerSelection == "Gettysburg's Black History") {
      return (
      <React.Fragment>
      
      <Expo.MapView.Marker coordinate = {{latitude: 39.830947, longitude: -77.231133}} title = {"Lincoln Square"} description = {"The Circle of Gettysburg"} pinColor = {"#7200ff"}/>
      
      </React.Fragment>
      );
    }

    else if (this.state.pickerSelection == "Early Gettysburg") {
      return (
      <React.Fragment>
    
      <Expo.MapView.Marker coordinate = {{latitude: 39.832010, longitude: -77.231280}} title = {"Lincoln Diner"} description = {"Questionable food"} pinColor = {"#517e33"}/>
     
      </React.Fragment>
      );
    }
    else {
      return (
        <React.Fragment>
        
        <Expo.MapView.Marker coordinate = {{latitude: 39.831058, longitude: -77.230580}} title = {"David Wills House"} description = {"Lincoln made final adjustments to the Gettysburg Address here"} pinColor = {"#ed7d31"}/>
        <Expo.MapView.Marker coordinate = {{latitude: 39.830947, longitude: -77.231133}} title = {"Lincoln Square"} description = {"The Circle of Gettysburg"} pinColor = {"#7200ff"}/>
        <Expo.MapView.Marker coordinate = {{latitude: 39.821205, longitude: -77.232254}} title = {"Scary Place"} pinColor = {"#00ffff"} />
        <Expo.MapView.Marker coordinate = {{latitude: 39.832010, longitude: -77.231280}} title = {"Lincoln Diner"} description = {"Questionable food"} pinColor = {"#517e33"}/>
        
        </React.Fragment>
      
      );
    }


  }

}

const styles = StyleSheet.create({
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
