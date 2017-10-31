import React, { Component } from 'react'
import { FlashText, FlashFlex, FlashButton, FlashFlexRow, FlashScrollView} from '../styles/Styles'
import { TextInput } from 'react-native'
import * as flashDB from '../utils/storeApi'


class NewDeck extends Component {
    state={
        text:''
    }

    submit(){

        flashDB.setDeckTitle(this.state.text)
            .then(()=>{
                let deck = this.state.text
                this.props.navigation.navigate(
                    'DeckView', {deck:deck, title:deck}
                )
            })
    }


    render() {
        let text = this.state.text

        return(

            <FlashScrollView>
                <FlashFlex>
                    <FlashText>
                        Deck Name:
                    </FlashText>
                    <FlashFlexRow>
                        <TextInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 1,backgroundColor:'#fff', flex:1, flexDirection:'row', justifyContent:'flex-start',alignItems:'flex-start'}}
                            onChangeText={(text) => this.setState({text})}
                            value={this.state.text}
                        />
                    </FlashFlexRow>
                    <FlashFlexRow>
                        <FlashButton title='Add Deck' onPress={()=>{this.submit()}} disabled={this.state.text.length < 5 ? true : false} />
                    </FlashFlexRow>
                </FlashFlex>
            </FlashScrollView>

        )

    }
}

export default NewDeck