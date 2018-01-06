
import * as types from '../types/characters'
import { Actions } from 'react-native-router-flux'

import * as Constants from 'react_native_exam/src/webservices/Constants'
import { fetch } from 'react_native_exam/src/webservices/WebServices'

function updateCharactersList(value) {

    return {
        type: types.CHARACTERS_UPDATE_LIST,
        value: value
    }
}

function setCharactersFetching(value) {

    return {
        type: types.CHARACTERS_SET_FETCHING,
        value: value
    }
}

export function updateCharacterSelected(character) {

    return {
        type: types.CHARACTERS_UPDATE_CHARACTER,
        character: character
    }
}

export function fetchCharactersList() {

    return (dispatch, getState) => {

        dispatch(setCharactersFetching(true))
        dispatch(updateCharactersList([])) //Limpiar la lista antes de mostrar nuevo contenido.

        const url = '/characters'

        fetch(url).then((response) => {
            console.log("Response: ", response.data.results)
            dispatch(setCharactersFetching(false))
            dispatch(updateCharactersList(response.data.results))
        }).catch((error) => {
            console.log("error downloading characters list ", error)
            dispatch(setCharactersFetching(false))
        })

    }
}