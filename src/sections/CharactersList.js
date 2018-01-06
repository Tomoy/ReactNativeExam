import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

import CharacterCell from './CharacterCell'
import { Actions } from 'react-native-router-flux'
import { Colors } from 'react_native_exam/src/commons'

//Redux
import { connect } from 'react-redux'
import * as CharactersActions from 'react_native_exam/src/redux/actions/characters'

class CharactersList extends Component {

    componentWillMount() {
        
        this.props.fetchCharactersList()
    }

    onSelect(character) {
        this.props.updateSelected(character)
    }

    renderItem(item, index) {
        return <CharacterCell item={item} onSelect= { (character) => {this.onSelect(character)}} />
    }

    render() {

        return (

            <View style={styles.container}>

                <FlatList
                    data={this.props.list} //viene actualizada por el reducer
                    renderItem= { ({item, index}) => this.renderItem(item, index)}
                    keyExtractor= { (item, index) => index }
                    extraData = { this.props }
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    
    console.log("state: ", state)
    
    return {
        list: state.characters.list,
        item: state.characters.item,
        isFetching: state.characters.isFetching       
    }
}

const mapDispatchToProps = (dispatch, props) => {
    
    return {

        fetchCharactersList: () => {
            dispatch(CharactersActions.fetchCharactersList())
        },

        updateSelected: (character) => {
            console.log("Dispatch charcater selected: ", character)
            dispatch(CharactersActions.updateCharacterSelected(character))
            Actions.push('CharacterDetail', { title: character.name })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharactersList)

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.sectionsBackground
    }
})