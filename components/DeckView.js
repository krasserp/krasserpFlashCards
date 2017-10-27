import React, { Component } from 'react'
import { DeckInfo, FlashText } from '../styles/Styles'
import { ActivityIndicator } from 'react-native'
import * as flashDB from '../utils/storeApi'

class DeckView extends Component {

    static navigationOptions =({navigation}) => {
        const {title} = navigation.state.params
        return {title: title}

    } 


    state={
        name: null,
        numberOfQuestions: null
    }




    

    updateEntries(data){

        this.setState(()=>({
            name: data.title,
            numberOfQuestions: data.questions.length
        }))

        console.warn(' do I ', this.props.navigation.state, ' com on ')

    }


    componentDidMount(){
        console.warn(this.navigationOptions, ' nav options?')
        const {deck, title} = this.props.navigation.state.params

        flashDB.getDeck(deck)
            .then((data)=>{
                this.updateEntries(data)
            })
    }


    render() {

        const {name,numberOfQuestions} = this.state


        if (name === null){
            return(
                <DeckInfo>
                    <FlashText>Loading,...</FlashText>
                    <ActivityIndicator />
                </DeckInfo>
            )
        }


        return(
             <DeckInfo>
                <FlashText>
                    {name} 
                </FlashText>
                <FlashText>
                    Questions:{numberOfQuestions}
                </FlashText>
            </DeckInfo>
        )

    }
}

export default DeckView