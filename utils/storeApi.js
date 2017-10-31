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
            return data
        })
}

export function setData (obj) {
    return AsyncStorage.setItem(FLASH_STORAGE_KEY, JSON.stringify(obj))
        .then((result) => {
            const data = result === null ? null :JSON.parse(result)
            return data
    })

}



export function getDeck (key) {
    return AsyncStorage.getItem(FLASH_STORAGE_KEY)
        .then((result) => {
            const data = JSON.parse(result)
            const item = data[key]
            return item
        })

}


export function addCardToDeck(cardobj,deck){
    return getDeck(deck)
        .then((deck)=>{
            let newDeck = deck

            newDeck.questions.push(cardobj)

            addObj = {}

            addObj[newDeck.title] = newDeck

            return AsyncStorage.mergeItem(FLASH_STORAGE_KEY,JSON.stringify(addObj), () => {
                getDecks()
            })

        })
}


export function setDeckTitle (title) {
    addDeck = {}

        addDeck[title] = {
            title: title,
            questions: []
        }

    return AsyncStorage.mergeItem(FLASH_STORAGE_KEY,JSON.stringify(addDeck), () => {
        getDecks()
    })
}


export function deleteDeck (key) {
    return getDecks(key).then((result)=>{
        let newDecks = result
        delete newDecks[key]
        setData(newDecks)
    })
}


// clear for testing

export function clearAllData() {
    const keys = [FLASH_STORAGE_KEY, FLASH_ACTIVITY_KEY]
    return AsyncStorage.multiRemove(keys)

}