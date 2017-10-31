import React, { Component } from 'react'
import { FlashFlex, FlashText, FlashButton, FlashFlexRow, FlashScrollView } from '../styles/Styles'
import { ActivityIndicator } from 'react-native'
import * as flashDB from '../utils/storeApi'

class DeckView extends Component {

    static navigationOptions =({navigation}) => {
        const {title} = navigation.state.params
        return {title: 'Deck :: ' + title}

    }


    state={
        title: null,
        questionCount: null,
        deck: null,
    }

    updateEntries(data,deck){

        this.setState(()=>({
            title: data.title,
            questionCount: data.questions.length,
            deck: deck
        }))

    }


    goHome(){
        this.props.navigation.navigate(
                    'Home'
            )
    }


    deleteDeck(){
        flashDB.deleteDeck(this.state.deck)
            .then(() => {
                this.goHome()
            })


    }

    takeQuiz(){
        const { deck, title } = this.state

        this.props.navigation.navigate(
            'QuizView', {deck:deck, title:title}
        )
    }


    addCard(){

        const {deck, title, questionCount} = this.state

        this.props.navigation.navigate(
            'NewCard', {deck:deck, title:title}
        )
    }

    componentDidMount(){

        const {deck, title} = this.props.navigation.state.params

        flashDB.getDeck(deck)
            .then((data)=>{
                this.updateEntries(data, deck)
            })
    }


    render() {

        const {title,questionCount} = this.state


        if (title === null){
            return(
                <FlashFlex>
                    <FlashText>
                        Loading,...
                    </FlashText>
                    <ActivityIndicator
                        color='yellow'
                        size='large'
                    />
                </FlashFlex>
            )
        }


        return(
            <FlashScrollView>

             <FlashFlex>
                <FlashFlexRow>
                    <FlashButton color='#404040' disabled={this.state.questionCount < 1 ? true: false}  onPress={() => {this.takeQuiz()}} title='Take Quiz' />
                    <FlashButton color='#404040' onPress={() => {this.addCard()}} title='Add Question' />
                </FlashFlexRow>

                <FlashText style={{fontSize:25}}>
                    {title}
                </FlashText>
                <FlashText txtColor='grey'>
                    {questionCount} cards
                </FlashText>


                <FlashFlexRow>
                    <FlashButton color='#404040' onPress={() => {this.deleteDeck()}} title='Delete Deck' />
                    <FlashButton color='#404040' onPress={() => {this.goHome()}} title='Home' />
                </FlashFlexRow>

            </FlashFlex>

            </FlashScrollView>
        )

    }
}

export default DeckView