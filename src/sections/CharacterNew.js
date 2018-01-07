import React, { Component } from 'react'
import { View, TextInput, Image, StyleSheet, TouchableOpacity, Text } from 'react-native'

import { Colors } from 'react_native_exam/src/commons'
import { MyTextInput, Button, TextBox } from 'react_native_exam/src/widgets'

import ImagePicker from 'react-native-image-picker'
import Spinner from 'react-native-spinkit'

//Redux
import { connect } from 'react-redux'
import * as CharactersActions from 'react_native_exam/src/redux/actions/characters'

class CharacterNew extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name        : '',
            nameError   : '',

            description        : '',
            descriptionError   : '',

            image           : null,
            isLoadingImage  : false
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
            this.props.addCharacterTemporary(characterData)  
        } 
    }

    addImage() {

        const options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        }

        this.setState({
            isLoadingImage: true
        });

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
                this.setState({
                    isLoadingImage: false
                });
            }
            else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
                this.setState({
                    isLoadingImage: false
                });
            }
            else {
          
              this.setState({
                image: response,
                isLoadingImage: false
              });
            }
          });
    }

    render() {

        console.log("this.state.image: ", this.state.image)

        const imageUri = this.state.image ? { uri: this.state.image.uri} : null
        const imageButtonText = this.state.image ? this.state.image.fileName : 'Select image'

        return (

            <View style= {styles.container}>
                
                <View style= {styles.imageContainer}>

                    <View style={styles.spinnerContainer}>
                        {this.state.isLoadingImage ? <Spinner style={styles.spinner} isVisible={true} size={150} type={'WanderingCubes'} color={Colors.accentBrand}/>: null}
                    </View>

                    <Image source={imageUri} style={styles.imageContainerBackground} resizeMode={'cover'} />
                    <TouchableOpacity style= {styles.button} onPress= { () => this.addImage()}>
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
                        isTextBox = { false }
                    />

                </View>

                <View style= {styles.inputContainer}>
                    
                    <TextBox 
                        onChangeText= { (v) => this.setState({ description: v}) }
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
        addCharacterTemporary: (characterData) => {
            console.log("addCharacterTemporary data en mapDispatchToProps")
            dispatch(CharactersActions.addCharacterTemporary(characterData))
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
        borderRadius: 5
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
    },

    spinnerContainer: {
        position: 'absolute'
    }
})