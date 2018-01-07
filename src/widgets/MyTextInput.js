import React, { Component } from 'react'
import {  TextInput, View , Text, StyleSheet } from 'react-native'

import { Colors } from 'react_native_exam/src/commons'


export default class MyTextInput extends Component {


    //Props por default por si no las pasan, pero se podrían mandar todas desde el componente padre
    static defaultProps = {
        labelStyle  : {},
        inputStyle  : {},
        errorStyle  : {},
        label       : '',
        value       : '',
        error       : '',
        placeholder : '',
        onChangeText: () => {}
    }

    render () {
        
        return (
            <View style={styles.container}>
                {//Si nos mandan un inputStyle del componente padre, el segundo estilo pisa al primero, se tomaría ese.}
                }
                <Text style={ [styles.label, this.props.labelStyle]}>{this.props.label} </Text>
                <TextInput 
                    value                    =   {this.props.value}
                    onChangeText             =   { (v) => this.props.onChangeText(v)}
                    placeholder              =   {this.props.placeholder}
                    placeholderTextColor     =   { Colors.brand }
                    style                    =   { [styles.input, this.props.inputStyle]}
                    underlineColorAndroid    =   { 'transparent' }
                />

                { this.props.error ? <Text style= {[styles.error, this.props.errorStyle]}>{this.props.error} </Text> : null }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    
        error: {
            color: Colors.accentBrandDark,
            textAlign: 'right',
            marginTop: 4,
        },
    
        input: {
            borderColor: Colors.brand,
            borderWidth: 1,
            padding: 10,
            borderRadius: 6,
            fontSize: 16,
            color: Colors.brand,
        },
    
        label: {
            color: Colors.brand,
            fontSize: 16,
            marginBottom: 10,
            fontWeight: '600',
        },
    })