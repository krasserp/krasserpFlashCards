import React, { Component } from 'react'
import { FlashFlex,
        FlashText,
        FlashButton,
        FlashFlexRow,
        FlashScrollView,
        QuizCounter
    } from '../styles/Styles'

import { ActivityIndicator, Animated, View, StyleSheet, Text } from 'react-native'
import * as flashDB from '../utils/storeApi'
import { setLocalNotification, clearLocalNotification } from '../utils/helpers'
import FlipCard from './FlipCard'



class QuizView extends Component {

    static navigationOptions =({navigation}) => {
        const {title} = navigation.state.params
        return {title: 'Quiz :: ' + title}

    }

    state={
        name: null,
        questions: null,
        questionCount: null,
        questionIndex: null,
        correctAnswers: 0,
        showAnswer:0,
        allAnswered: false
    }




    goHome(){
        this.props.navigation.navigate(
            'Home'
        )
    }

    goToDeck(){
        const { deck } = this.props.navigation.state.params

        this.props.navigation.navigate(
            'DeckView', {deck:deck, title:deck}
        )
    }


    takeAgain(){
        const { deck } = this.props.navigation.state.params

        this.props.navigation.navigate(
            'QuizView', {deck:deck, title:deck}
        )
    }


    updateEntries(data){


        if(this.state.name === null) {
            this.setState(() => ({
                name:data.title,
                questions:data.questions,
                questionCount:data.questions.length,
                questionIndex:0,
                correctAnswers:0
            }))

        }


    }


    incrementIndex(){
        this.setState(()=>({
            questionIndex: this.state.questionIndex+1
        }))
    }

    goToNext(){
        const { questionIndex, questionCount } = this.state

        this.setState(()=>({
            showAnswer: 0
        }))

        if ((questionIndex+1) < questionCount){
            this.incrementIndex()
            return
        }

        // zero based index
        if ((questionIndex+1) === questionCount){
            this.setAllAnswered()
            return
        }
    }


    answeredCorrect(){

        const { correctAnswers } = this.state

        this.setState(()=>({
            correctAnswers : correctAnswers+1
        }))

        this.goToNext()

    }


    answeredIncorrect(){
        this.goToNext()
    }


    setAllAnswered(){

        //handle notifictions

        clearLocalNotification()
            .then(setLocalNotification)


        const { correctAnswers, questionCount} = this.state

        this.setState(()=>({
            allAnswered: true,
        }))
    }


    showAnswerQuestion(){
        const {showAnswer} = this.state
        const answer = showAnswer === 1 ? 0 : 1

        this.setState(()=>({
            showAnswer: answer,

        }))



    }


    componentDidMount(){
        const {showAnswer,opacityAnswer, opacityQuestion} = this.state




        const {deck} = this.props.navigation.state.params


        flashDB.getDeck(deck)
            .then((data)=>{
                this.updateEntries(data)
            })

    }

    render() {

        const {questions,questionCount, questionIndex, correctAnswers, showAnswer} = this.state

        if (questions === null ){
            return (
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


        if(this.state.allAnswered) {
            return (
                <FlashFlex>
                    <FlashText>
                        You have answered all questions to this Deck init.👾
                    </FlashText>
                    <FlashText>
                        You answered {Math.round((this.state.correctAnswers/this.state.questionCount)*100)}% correct of {this.state.questionCount} questions!
                    </FlashText>
                    <FlashText>
                        See you tomorrow 🐤
                    </FlashText>
                    <FlashFlexRow>
                        <FlashButton color='#404040' onPress={() => {this.goHome()}} title='Home' />
                        <FlashButton color='#404040' onPress={() => {this.goToDeck()}} title='Deck View' />
                        <FlashButton color='#404040' onPress={() => {this.takeAgain()}} title='Take the Quiz again' />
                    </FlashFlexRow>
                </FlashFlex>
            )
        }



        if(!this.state.allAnswered){

            return(

                    <FlashFlex>


                        <QuizCounter>
                            <FlashText txtColor='black'>
                                {questionIndex+1}/{questionCount}
                            </FlashText>
                        </QuizCounter>

                        <FlipCard question={questions[questionIndex]['question']} answer={questions[questionIndex]['answer']} showAnswer={showAnswer} />

                        <FlashFlexRow>
                            <FlashButton color='green' onPress={() => {this.answeredCorrect()}} title='Correct' />
                            <FlashButton color='red' onPress={() => {this.answeredIncorrect()}} title='Incorrect' />
                        </FlashFlexRow>

                    </FlashFlex>

            )



        }




    }
}


const styles = StyleSheet.create({
  card: {
    backgroundColor: '#000',
    borderRadius: 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  }
})


export default QuizView