'use strict';

import React, { Component } from 'react';
import LinksScreen from '../screens/LinksScreen';

import {Text, View, StyleSheet, Picker, Button, Modal, TouchableHighlight, Image, Platform, TouchableOpacity} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroPolyline,
  ViroConstants,
  ViroMaterials,
  ViroSphere,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

 

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR...",
      locationVisible: false
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
       <ViroSphere
          heightSegmentCount={20}
          widthSegmentCount={20}
          radius={0.2}
          position={[0, 0, -2]}
          onClick={this._onClick}
          materials={["ball"]}
          
         />

      </ViroARScene>
      
    );
  }

  _onClick(position, source)  {
    console.log('hi')
}


 _setLocationModalVisible() {
  this.setState({
    locationVisible : true
  });
  }

  getImages(index) {
   return (
      <Image source={require('../assets/images/David Wills.jpg')} style={{paddingTop: 5, width:200, height:200}} />

   );
 }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "Hello World Test!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

ViroMaterials.createMaterials({
  ball: {
     diffuseColor: "#29559b",
   },
});


var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});



module.exports = HelloWorldSceneAR;
