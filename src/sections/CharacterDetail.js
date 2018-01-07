import React, { Component } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'

import { connect } from 'react-redux'
import * as CharactersActions from 'react_native_exam/src/redux/actions/characters'

import { Colors } from 'react_native_exam/src/commons'

class CharacterDetail extends Component {

    render() {

        console.log("thIS PROPS: ", this.props)
        const  {character } = this.props
        const name = character ? character.name : ''
        let description = character ? character.description : ''
        if (description == '') description = "No description."

        const comicsAmount = character.comics ? character.comics.available : 0
        
        let image = require('react_native_exam/src/resources/placeholder.jpg')
        
        if (character.thumbnail && character.thumbnail.path) {
            image = { uri: character.thumbnail.path.replace("http", "https") + "." + character.thumbnail.extension}
        } else if (character.image) {
            image = {uri: character.image}
        }

        /*const imageUrl = character.thumbnail.path ? character.thumbnail.path.replace("http", "https") : require('react_native_exam/src/resources/placeholder.jpg')
        const image = { uri: imageUrl + "." + character.thumbnail.extension}*/


        return (
            <View style={styles.container}>

                <Image source={image} style={styles.image} resizeMode={'cover'} /> 
                
                <View style={styles.textContainer}>
                    <Text style={styles.description}>{ description }</Text>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.comics}>{"Present in " + comicsAmount + " comics"}</Text>
                </View>

            </View>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        character: state.characters.item
    }
}

const mapDispatchToProps = (dispatch, props) => {

    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterDetail)

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: Colors.sectionsBackground,
    },

    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },

    description: {
        fontSize: 16,
        color: Colors.brand,
    },

    comics: {
        fontSize: 16,
        color: Colors.brand
    },

    image: {
        width: '100%',
        height: 400,
    }

});