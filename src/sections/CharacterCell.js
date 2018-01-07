import React, { Component } from 'react'
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native'
import { Colors } from 'react_native_exam/src/commons'

export default class CharacterCell extends Component {

    static defaultProps = {
        item        : {},
        onSelect    : () => {}
    }

    render() {

        const {item, onSelect } = this.props

        const name = item.name ? item.name : ''
        const imageUrl = item.thumbnail.path ? item.thumbnail.path.replace("http", "https") : require('react_native_exam/src/resources/placeholder.jpg')
        const image = { uri: imageUrl + "." + item.thumbnail.extension}

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
        height: 300
    }, 

    textContainer: {

        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: Colors.accentBrandOpacity
    }, 

    nameText: {

        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.accentBrandLight,
        textAlign: 'center'
    }

})