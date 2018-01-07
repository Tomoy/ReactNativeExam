import * as types from '../types/characters'

const initialState = {
    isFetching: false,
    list: [],
    newCharacter: {}, 
    item: null
}

export default function reducer(state = initialState, action = {}) {

    console.log("Llega a reducer con action: ", action.type)

    switch (action.type) {

        case types.CHARACTERS_UPDATE_LIST_WITH_NEW:

        //Agrego temporalmente el nuevo character a la lista de personajes
            return {
                ...state,
                list: state.list.concat(action.character) 
            }

        case types.CHARACTERS_UPDATE_LIST:
            return {
                ...state,
                list: action.value
            }

        case types.CHARACTERS_UPDATE_CHARACTER:

            return {
                ...state,
                item: action.character
            }

        case types.CHARACTERS_SET_FETCHING:

            return {
                ...state,
                isFetching: action.value
            }

        default:
            return state;
    }
}