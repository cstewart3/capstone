import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    // Button,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import { Button } from 'react-native-elements';

class MainSettings extends Component {
   
    handleAboutNavigation = () => {
        this.props.navigation.navigate('AboutScreen')
    }

    render() {
        return [
            
            <Button
              title="About the ACHS"
              onPress = {this.handleAboutNavigation}
              style = {{ paddingTop: 40 }}
              titleStyle={{ fontWeight: "700" }}
              buttonStyle={{
                backgroundColor: "#A62E20",
                width: 350,
                height: 45,
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 5
              }}
              containerStyle={{ marginTop: 20 }}
            />,

            <Button
              title="Settings 2"
              onPress = {this.handleAddEvent}
              style = {{ paddingTop: 40 }}
              titleStyle={{ fontWeight: "700" }}
              buttonStyle={{
                backgroundColor: "#A62E20",
                width: 350,
                height: 45,
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 5
              }}
              containerStyle={{ marginTop: 20 }}
            />,

            <Button
              title="Settings 3"
              onPress = {this.handleAddEvent}
              style = {{ paddingTop: 40 }}
              titleStyle={{ fontWeight: "700" }}
              buttonStyle={{
                backgroundColor: "#2E3F47",
                width: 350,
                height: 45,
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 5
              }}
              containerStyle={{ marginTop: 20 }}
            />,


        ];
    }
}

export default MainSettings;
