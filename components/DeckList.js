import React, { Component } from 'react'
import * as flashDB from '../utils/storeApi'
import { ActivityIndicator, TouchableNativeFeedback } from 'react-native'
import { FlashFlex, FlashText, CenterView, FlashScrollView} from '../styles/Styles'


//for resetting the store
const reset = false


class DeckList extends Component {

    state = {
        decks: null
       }


    updateEntries = (data) => {

      if (data !== null ){
        this.setState(()=>({decks:data}))
        return
      }

      const update = data === null ? dummy : data

      flashDB.setData(update)
        .then((data) => {
            this.setState(()=>({decks:update}))
        })

    }


    componentDidMount(){

        if(reset){
            flashDB.clearAllData()
                .then(()=>{
                    console.warn('all clear')
                })

        }


        flashDB.getDecks()
           .then((result)=>{
               this.updateEntries(result)
           })

    }

    deckPress(deck, title){
        this.props.navigation.navigate(
            'DeckView', {deck:deck, title:title}
        )
    }

    render() {

        const decks = this.state.decks

        if (decks === null) {

            return(

                <CenterView>
                    <FlashText>
                        Loading,...
                    </FlashText>
                    <ActivityIndicator
                            color='yellow'
                            size='large'
                    />
                </CenterView>

            )

        }

        return(

            <FlashScrollView>


            {Object.keys(decks).map((key) => {

                return(

                    //Attempted to transition from state `RESPONDER_INACTIVE_PRESS_IN` to `RESPONDER_ACTIVE_LONG_PRESS_IN`, which is not supported. This is most likely due to `Touchable.longPressDelayTimeout` not being cancelled
                    //maybe need to wrap this in a view see if this keeps on happening!!
                    <TouchableNativeFeedback key={key} onPress={()=>{this.deckPress(key,decks[key].title)}}
                        background={TouchableNativeFeedback.Ripple('yellow')}>
                        <FlashFlex key={key}>

                                <FlashText>
                                    {decks[key].title}
                                </FlashText>
                                <FlashText>
                                    Cards:{decks[key].questions.length}
                                </FlashText>

                        </FlashFlex>
                    </TouchableNativeFeedback>

                )
            })}


            </FlashScrollView>

        )

    }
}

export default DeckList



// put dummy data in to the store if empty for testing
const dummy = {
  Welcome: {
    title: 'Welcome',
    questions: [
      {
        question: 'What is this app?',
        answer: 'A flash cards app that allows you to add decks and cards to those decks'
      },
      {
        question: 'How does this work?',
        answer: 'You can add decks and cards to decks. Then you can take a quiz. The quiz shows the question and you can view the corresponding answer. You can submit if you did now the answer "correct" or "incorrect"'
      }
    ]
  }
}