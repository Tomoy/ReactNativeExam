import * as Constants from './Constants'

import axios from 'axios'
import marvelApi from 'marvel-comics-api'

export function configureAxios() {

    axios.defaults.baseURL = Constants.SERVER_BASE_URL;
    axios.defaults.headers.common['Referer'] = Constants.MARVEL_REFERER_URL;
    axios.defaults.headers.post['Content-Type'] = 'application/json'

    fetchCharacters()
}

export function fetchCharacters() {
    const url = '/characters?apikey=' + Constants.MARVEL_API_KEY

    axios.get(url).then( (response) => {
        console.log("Fetch characters response: ", response)
    }).catch( (error) => {
        console.log("Fetch characters error: ", error)
    })
}