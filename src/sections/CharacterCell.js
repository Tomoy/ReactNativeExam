import React, { Component } from 'react'
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native'

export default class CharacterCell extends Component {

    static defaultProps = {
        item        : {},
        onSelect    : () => {}
    }

    render() {

        const {item, onSelect } = this.props

        const name = item.name ? item.name : ''
        const image = item.thumbnail.path ? { uri: item.thumbnail.path + "." + item.thumbnail.extension} : require('react_native_exam/src/resources/placeholder.jpg')

        console.log("Image: ", image)

        return (
            <TouchableOpacity onPress={ () => onSelect(item) }>
                <Image source= { image } resizeMode={'cover'} style={styles.image} />
                <View style= {styles.textContainer}>
                    <Text style={styles.nameText}> {name} </Text>
                </View>
            </TouchableOpacity> 
        )
    }
}

const styles = StyleSheet.create({

    image: {
        width: '100%',
        height: 200
    }, 

    textContainer: {

        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(255,255,255,0.2)'
    }, 

    nameText: {

        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    }

})