import * as Constants from './Constants'

import axios from 'axios'
import marvelApi from 'marvel-comics-api'

export function configureAxios() {

    axios.defaults.baseURL = Constants.SERVER_BASE_URL;
    axios.defaults.headers.common['Referer'] = Constants.MARVEL_REFERER_URL;
    axios.defaults.headers.post['Content-Type'] = 'application/json'
}

export function fetch(url) {
    
    const urlWithApiKey = url + '?apikey=' + Constants.MARVEL_API_KEY

    return new Promise( function(resolve, reject) {

        axios.get(urlWithApiKey).then( (response) => {
            
            if (response.data)
                resolve( response.data )
            else 
                reject( response )
    
        }).catch( (error) => {
            reject(error)
        })
    })

}