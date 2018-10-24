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
      pickerSelection: 'All Stops',
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
           <Text style={{textAlignVertical: "center",textAlign: "center"}}>Currently Showing { this.state.pickerSelection }</Text>
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

      <Expo.MapView.Marker coordinate = {this.state.location.coords} title = {"You are here cool person"} pinColor = {"#f442f1"} />
      <Expo.MapView.Marker coordinate = {{latitude: 39.821205, longitude: -77.232254}} title = {"Scary Place"} />
      <Expo.MapView.Marker coordinate = {{latitude: 39.830947, longitude: -77.231133}} title = {"Lincoln Square"} description = {"The Circle of Gettysburg"} pinColor = {"#ede02d"}/>
      <Expo.MapView.Marker coordinate = {{latitude: 39.832010, longitude: -77.231280}} title = {"Lincoln Diner"} description = {"Questionable food"} pinColor = {"#1fddf2"}/>
      <Expo.MapView.Marker coordinate = {{latitude: 39.831058, longitude: -77.230580}} title = {"David Wills House"} description = {"Lincoln made final adjustments to the Gettysburg Address here"} pinColor = {"#1fddf2"}/>

      </Expo.MapView>
    </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
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
