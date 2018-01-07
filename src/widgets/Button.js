import React, { Component } from 'react'
import { TouchableOpacity, Text, ActivityIndicator , StyleSheet } from 'react-native'

import { Colors } from 'react_native_exam/src/commons'

export default class Button extends Component {


    //Props por default por si no las pasan, pero se podrían mandar todas desde el componente padre
    static defaultProps = {
        labelStyle: {},
        containerStyle: {},
        spinnerColor: 'white',
        label: '',
        onPress: () => {},
        isFetching: false
    }

    onPress() {
        
        if (!this.props.isFetching) {
            this.props.onPress()
        }
    }

    render () {
        
        return (
            <TouchableOpacity style= {styles.container} onPress ={ () => this.onPress()}>
                <Text style= {[styles.label, this.props.labelStyle]}>{this.props.label}</Text>
                { this.props.isFetching ? <ActivityIndicator animating={true} color={this.props.spinnerColor} style={styles.spinner} /> : null}
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            backgroundColor: Colors.brand,
            borderRadius: 4,
            flexDirection: 'row',
        },
    
        label: {
            color: Colors.accentBrandLight,
            fontWeight: '600',
            fontSize: 16,
        },
    
        spinner: {
            marginLeft: 20,
        }
    })