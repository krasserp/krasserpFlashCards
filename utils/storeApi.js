import { AsyncStorage } from 'react-native'
import { FLASH_STORAGE_KEY, FLASH_ACTIVITY_KEY } from './constants'


/*
getDecks: return all of the decks along with their titles, questions, and answers. 
getDeck: take in a single id argument and return the deck associated with that id. 
saveDeckTitle: take in a single title argument and add it to the decks. 
addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title. 
 */


export function getDecks () {
    return AsyncStorage.getItem(FLASH_STORAGE_KEY)
        .then((result) => {

            const data = result === null ? null :JSON.parse(result)

            return data })
}

export function getDeck (key) {
    return AsyncStorage.getItem(FLASH_STORAGE_KEY)
        .then((result) => {

            const data = JSON.parse(result)
            const item = data[key]

            return item
        })

}

export function setData (obj) {
    AsyncStorage.setItem(FLASH_STORAGE_KEY, JSON.stringify(obj), (result) => {
        console.warn('set data ', result)
    })
}