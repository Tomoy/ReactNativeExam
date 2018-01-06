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

import { Actions, Scene, Router } from 'react-native-router-flux';
import CharactersList from './sections/CharactersList'

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
    }

    render() {

        return (
            
            <Provider store= {store}>
                <Router>
                    <Scene key = 'root' >

                        <Scene
                            key = { 'CharactersList' }
                            component = { CharactersList }
                        />

                    </Scene>
                </Router>
            </Provider>
        );

    }

}

const styles = StyleSheet.create({

});
