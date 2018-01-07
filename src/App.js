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
    StatusBar,
    TouchableOpacity
} from 'react-native';

import * as WebServices from './webservices/WebServices'

import { Actions, Scene, Router } from 'react-native-router-flux';
import CharactersList from './sections/CharactersList'
import CharacterDetail from './sections/CharacterDetail'
import CharacterNew from './sections/CharacterNew'

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

    renderNewCharacterButton() {

        return (
            <TouchableOpacity style={styles.addButton} onPress={() => Actions.push('CharacterNew', {title: "Add Hero"})}>
                <Text style={styles.addButtonText}> {'Add'} </Text>
            </TouchableOpacity>
        )
    }

    render() {

        console.disableYellowBox = true

        return (

            <Provider store={store}>
                <Router>
                    <Scene key='root' >

                        <Scene
                            key={'CharactersList'}
                            component={CharactersList}
                            navigationBarStyle={styles.navBar}
                            navBarButtonColor={'white'}
                            title={"List of Heroes"}
                            renderRightButton={() => this.renderNewCharacterButton()}
                        />

                        <Scene
                            key={'CharacterDetail'}
                            component={CharacterDetail}
                            navigationBarStyle={styles.navBar}
                            navBarButtonColor={'white'}
                        />

                        <Scene
                            key={'CharacterNew'}
                            component={CharacterNew}
                            navigationBarStyle={styles.navBar}
                            navBarButtonColor={'white'}
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
    },

    addButtonText: {
        color: Colors.accentBrandLight,
        fontSize: 16,
        fontWeight: '600'
    },

    addButton: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }

});
