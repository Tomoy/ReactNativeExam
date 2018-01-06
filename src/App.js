/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    StatusBar
} from 'react-native';

import * as WebServices from './webservices/WebServices'

import { Actions, Scene, Router } from 'react-native-router-flux';
import CharactersList from './sections/CharactersList'
import { Colors } from './commons'

//Redux
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import * as reducers from './redux/reducers'
const reducer = combineReducers(reducers)
const store = createStore(
    reducer,
    applyMiddleware(thunk)
)


export default class App extends Component {

    componentWillMount() {

        WebServices.configureAxios()
        StatusBar.setBarStyle('light-content') //iOS StatusBar light style

    }

    render() {

        console.disableYellowBox = true

        return (

            <Provider store= {store}>
                <Router>
                    <Scene key = 'root' >

                        <Scene
                            key = { 'CharactersList' }
                            component = { CharactersList }
                            navigationBarStyle= {styles.navBar}
                            navBarButtonColor= {'white'}
                        />

                    </Scene>
                </Router>
            </Provider>
        );

    }

}

const styles = StyleSheet.create({
   
    navBar: {
        backgroundColor: Colors.navBar
    }
    
});
