/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import * as WebServices from './webservices/WebServices'

export default class App extends Component {
  
 componentWillMount() {
    
    WebServices.configureAxios()
 }

 render() {
    
    return (
      
      <View style={styles.container}>
        <Text style={styles.welcome}>
            Hola desde react native
        </Text>
      </View>

    );

  }

}

const styles = StyleSheet.create({
 
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
