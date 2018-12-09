import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    // Button,
    StyleSheet,
    TouchableOpacity,
    Platform
} from 'react-native';
// import TabBarIcon from '../components/TabBarIcon';

import { Button } from 'react-native-elements';
import { Icon } from 'expo';

class MainSettings extends Component {
   
    handleAboutNavigation = () => {
        this.props.navigation.navigate('AboutScreen')
    }

    render() {
        return [
            
            // <Button
            //   title="About the ACHS"
            //   onPress = {this.handleAboutNavigation}
            //   style = {{ paddingTop: 40 }}
            //   titleStyle={{ fontWeight: "700"}}
            //   outline = {true}
            //   textStyle={{color: '#2E3F47'}}
            //   buttonStyle={{
            //     backgroundColor: "transparent",
            //     width: 350,
            //     height: 45,
            //     borderColor: "#A62E20",
            //     borderWidth: 2,
            //     borderRadius: 5
            //   }}
            //   containerStyle={{ marginTop: 20 }}
            // />,

            <TouchableHighlight onPress={() => this.handleAboutNavigation()} style={{ paddingLeft: 20, paddingTop: 20, paddingBottom: 4 }}>
            <Text style={{ fontSize: 20, color: '#2E3F47' }}><Icon.Ionicons name={
        Platform.OS === 'ios'
          ? 'ios-information-circle-outline'
          : 'md-information-circle'
      } size={40}></Icon.Ionicons>  About the ACHS</Text>
          </TouchableHighlight>,

          <TouchableHighlight onPress={() => this.handleAddEvent()} style={{ paddingLeft: 20, paddingTop: 20, paddingBottom: 4 }}>
          <Text style={{ fontSize: 20, color: '#2E3F47' }}><Icon.Ionicons name={
        Platform.OS === 'ios'
          ? 'ios-compass-outline'
          : 'md-compass'
      } size={40}></Icon.Ionicons>  Setting 2</Text>
          </TouchableHighlight>,

          <TouchableHighlight onPress={() => this.handleAddEvent()} style={{ paddingLeft: 20, paddingTop: 20, paddingBottom: 4 }}>
          <Text style={{ fontSize: 20, color: '#2E3F47' }}><Icon.Ionicons name={
        Platform.OS === 'ios'
          ? 'ios-download-outline'
          : 'md-download'
      } size={40}></Icon.Ionicons>   Setting 3</Text>
          </TouchableHighlight>,

          <TouchableHighlight onPress={() => this.handleAddEvent()} style={{ paddingLeft: 20, paddingTop: 20, paddingBottom: 4 }}>
          <Text style={{ fontSize: 20, color: '#2E3F47' }}><Icon.Ionicons name={
        Platform.OS === 'ios'
          ? 'ios-hammer-outline'
          : 'md-hammer'
      } size={40}></Icon.Ionicons>  Setting 4</Text>
          </TouchableHighlight>,

          <TouchableHighlight onPress={() => this.handleAddEvent()} style={{ paddingLeft: 20, paddingTop: 20, paddingBottom: 4 }}>
          <Text style={{ fontSize: 20, color: '#2E3F47' }}><Icon.Ionicons name={
        Platform.OS === 'ios'
          ? 'ios-help-circle-outline'
          : 'md-help-circle'
      } size={40}></Icon.Ionicons>  Setting 5</Text>
         </TouchableHighlight>,

            // <Button
            //   title="Settings 2"
            //   onPress = {this.handleAddEvent}
            //   // style = {{ paddingTop: 40 }}
            //   titleStyle={{ fontWeight: "700" }}
            //   buttonStyle={{
            //     backgroundColor: "#A62E20",
            //     width: 350,
            //     height: 45,
            //     borderColor: "transparent",
            //     borderWidth: 0,
            //     borderRadius: 5
            //   }}
            //   containerStyle={{ marginTop: 20 }}
            // />,

            // <Button
            //   title="Settings 3"
            //   onPress = {this.handleAddEvent}
            //   // style = {{ paddingTop: 40 }}
            //   titleStyle={{ fontWeight: "700" }}
            //   buttonStyle={{
            //     backgroundColor: "#2E3F47",
            //     width: 350,
            //     height: 45,
            //     borderColor: "transparent",
            //     borderWidth: 0,
            //     borderRadius: 5
            //   }}
            //   containerStyle={{ marginTop: 20 }}
            // />,


        ];
    }
}

export default MainSettings;
