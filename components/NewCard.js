import React, { Component } from 'react'
import { FlashText, FlashFlex, FlashButton, FlashFlexRow, FlashScrollView} from '../styles/Styles'
import { TextInput, KeyboardAvoidingView } from 'react-native'
import * as flashDB from '../utils/storeApi'


class NewCard extends Component {
    state={
        question:'',
        answer:''
    }

    submit(){

        const {question, answer} = this.state
        const {deck} = this.props.navigation.state.params

        const questionObj = {
            'question':question,
            'answer': answer
        }

        flashDB.addCardToDeck(questionObj,deck)
            .then(()=>{

                this.props.navigation.navigate(
                    'DeckView', {deck:deck, title:deck}
                )
            })
    }


    render() {
        let {question, answer} = this.state

        return(

            <FlashScrollView>
                <FlashFlex>
                    <FlashText>
                        Add your question below:
                    </FlashText>
                    <FlashFlexRow>
                        <TextInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 1,backgroundColor:'#fff', flex:1, flexDirection:'row', justifyContent:'flex-start',alignItems:'flex-start'}}
                            onChangeText={(question) => this.setState({question})}
                            value={this.state.question}
                        />
                    </FlashFlexRow>

                    <FlashText>
                        Add your answer below:
                    </FlashText>
                    <FlashFlexRow>
                        <TextInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 1,backgroundColor:'#fff', flex:1, flexDirection:'row', justifyContent:'flex-start',alignItems:'flex-start'}}
                            onChangeText={(answer) => this.setState({answer})}
                            value={this.state.answer}
                        />
                    </FlashFlexRow>
                    <FlashFlexRow>
                        <FlashButton title='Add to Deck' onPress={()=>{this.submit()}} disabled={this.state.question.length < 1 || this.state.answer.length < 1 ? true : false} />
                    </FlashFlexRow>
                </FlashFlex>
            </FlashScrollView>

        )

    }
}

export default NewCard