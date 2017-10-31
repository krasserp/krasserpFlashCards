import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Animated
} from 'react-native';

import {FlashFlexRow, FlashButton, FlashFlex} from '../styles/Styles'


/**
 * this component is mainly based on this github example
 * https://github.com/browniefed/examples/blob/animated_basic/flip/animatedbasic/index.android.js
 * thx @browniefed
 */


export default class FlipCard extends Component {


  state ={
    showAnswer: null
  }



  componentWillReceiveProps(nextProps) {
    const {question, answer, showAnswer} = nextProps
    this.setState(()=>({
        showAnswer:showAnswer,
        question:question,
        answer:answer

    }))

    if (this.value >= 90) {
      this.flipCard()
    }

  }

  componentWillMount() {


      const {question, answer, showAnswer} = this.props

      this.setState(()=>({
        showAnswer:showAnswer,
        question:question,
        answer:answer
        }))


      this.animatedValue = new Animated.Value(0)
      this.value = 0;
      this.animatedValue.addListener(({ value }) => {
        this.value = value;
      })
      this.frontInterpolate = this.animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg'],
      })
      this.backInterpolate = this.animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '360deg']
      })

      this.frontOpacity = this.animatedValue.interpolate({
        inputRange:[0,180],
        outputRange:[1,0]
      })

      this.backOpacity = this.animatedValue.interpolate({
        inputRange:[0,180],
        outputRange:[0,1]
      })


  }
  flipCard() {

    this.setState(()=>({
      showAnswer : this.state.showAnswer === 0 ? 1 : 0
    }))

    if (this.value >= 90) {
      Animated.spring(this.animatedValue,{
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      Animated.spring(this.animatedValue,{
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
    }

  }




  render() {

    const {question,answer, showAnswer} = this.state


    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate}
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate}
      ]
    }




    return (
      <FlashFlex>

          <Animated.View style={[styles.flipCard, frontAnimatedStyle,{opacity:this.frontOpacity}]}>
            <Text style={styles.flipText}>
              {question}
            </Text>
          </Animated.View>

        <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack,{opacity:this.backOpacity}]}>
            <Text style={styles.flipText}>
              {answer}
            </Text>
          </Animated.View>

        <FlashFlexRow justifyCcontent='center'>
          <FlashButton color='#404040'onPress={() => this.flipCard()} title={showAnswer === 0 ? 'Show Answer' : 'Show Question'} />
        </FlashFlexRow>


      </FlashFlex>
    );
  }
}

const styles = StyleSheet.create({

  flipCard: {
    width:300,
    height:300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222',
    backfaceVisibility: 'hidden',
    alignSelf:'flex-start',
    padding:10,
    margin:15,

  },
  flipCardBack: {
    backgroundColor: '#333',
    position: "absolute",
    top: 15
  },
  flipText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  }
})