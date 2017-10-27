import React, { Component } from 'react'
import { ActivityIndicator, TouchableNativeFeedback } from 'react-native'
import { DeckInfo, FlashText, CenterView, FlashScrollView} from '../styles/Styles'

class DeckList extends Component {


    deckPress(deck, title){
        console.warn(deck, 'Deck pressed')
        this.props.navigation.navigate(
            'DeckView', {deck:deck, title:title}
        )
    }

    render() {

        const decks = this.props.screenProps.decks

        if (decks === null) {

            return(

                <CenterView>
                <FlashText>Loading,...</FlashText>
                    <ActivityIndicator />
                </CenterView>

            )

        }

        return(

            <FlashScrollView>


            {Object.keys(decks).map((key) => {
               
                return(
                    <TouchableNativeFeedback key={key} onPress={()=>{this.deckPress(key,decks[key].title)}}
                        background={TouchableNativeFeedback.Ripple('green')}>
                        <DeckInfo key={key}>
                            
                                <FlashText>
                                    {decks[key].title}
                                </FlashText>
                                <FlashText>
                                    Cards:{decks[key].questions.length}
                                </FlashText>
                            
                        </DeckInfo>
                    </TouchableNativeFeedback>
                    
                )
            })}
           
            
            </FlashScrollView>

        )

    }
}

export default DeckList