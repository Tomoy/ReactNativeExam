import React, { Component } from 'react'
import { View, TextInput, Image, StyleSheet, TouchableOpacity, Text } from 'react-native'

import { Colors } from 'react_native_exam/src/commons'
import { MyTextInput, Button } from 'react_native_exam/src/widgets'

import ImagePicker from 'react-native-image-picker'

//Redux
import { connect } from 'react-redux'
import * as CharactersActions from 'react_native_exam/src/redux/actions/characters'

class CharacterNew extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name        : '',
            nameError   : '',

            image       : null
        }
    }

    validateForm() {

        console.log("Enter to validate from")
        
        let valid = true
        let errors = {}

        if(!this.state.name) {
            errors.name = 'Choose a valid name'
            valid = false
        }

        if(!this.state.description) {
            errors.description = 'Choose a valid description'
            valid = false
        }

        this.setState({ 
            nameError: errors.name ? errors.name : '',
            descriptionError: errors.description ? errors.description : '',
        })

        return valid
    }

    onSubmit() {

        if( this.validateForm() ) {
            
            const characterData = {
                name: this.state.name,
                description: this.state.description ? this.state.description : null,
                image: this.state.image ? 'data:image/jpeg;base64,' + this.state.image.data : null
            }
            
            console.log("Call post character en Submit")
            this.props.postCharacter(characterData)  
        } 
    }

    onSelectImageTapped() {

        const options = {
            title: 'Seleccionar Imágen',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        }

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            }
            else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            }
            else {
          
              this.setState({
                image: response
              });
            }
          });
    }

    render() {

        console.log("this.state.image: ", this.state.image)

        const imageUri = this.state.image ? { uri: this.state.image.uri} : null
        const imageButtonText = this.state.image ? this.state.image.fileName : 'Elegir imágen'

        return (

            <View style= {styles.container}>
                
                <View style= {styles.imageContainer}>
                    <Image source={imageUri} style={styles.imageContainerBackground} resizeMode={'cover'} />
                    <TouchableOpacity style= {styles.button} onPress= { () => this.onSelectImageTapped()}>
                        <Text style= {styles.textButton}>{imageButtonText}</Text>
                    </TouchableOpacity>
                </View>

                <View style= {styles.inputContainer}>
                    
                    <MyTextInput 
                        onChangeText= { (v) => this.setState({ name: v}) }
                        value = {this.state.name}
                        error= {this.state.nameError}
                        label = {'Name: '}
                        placeholder = {'3-D Man'}
                    />

                </View>

                <View style= {styles.inputContainer}>
                    
                    <MyTextInput 
                        onChangeText= { (v) => this.setState({ age: v}) }
                        value = {this.state.description}
                        error= {this.state.descriptionError}
                        label = {'Description: '}
                        placeholder = {'The description of your Hero'}
                    />

                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        label={'Add Character'}
                        onPress= { () => this.onSubmit() }
                        isFetching = { this.props.isFetching}
                    /> 
                </View>
                
            </View>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        isFetching: state.characters.isFetching,
    }
}

const mapDispatchToProps = (dispatch, props) => {

    return {
        postCharacter: (data) => {
            console.log("Postcharacter data en mapDispatchToProps")
            dispatch(CharactersActions.postCharacter(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterNew)

const styles = StyleSheet.create({

    container: {
        height: '100%',
        backgroundColor: Colors.accentBrandLight
    },

    imageContainer: {
        alignItems: 'center',
        width: '100%',
        height: 200,
        backgroundColor: Colors.brand,
        justifyContent: 'center'
    },

    imageContainerBackground: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },

    button: {
        padding: 10,
        borderColor: Colors.accentBrand,
        borderWidth: 1,
        borderRadius: 6
    },

    textButton: {
        color: Colors.accentBrand,
        fontWeight: '600',
        backgroundColor: 'transparent'
    },

    inputContainer: {
        margin: 20
    },

    buttonContainer: {
        margin: 20
    }
})