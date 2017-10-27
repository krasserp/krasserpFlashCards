import React, { Component } from 'react'
import {Text, View, ActivityIndicator, ScrollView, StatusBar } from 'react-native'
import * as flashDB from './utils/storeApi'
import { CenterView, FlashText, FlashScrollView } from './styles/Styles'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import DeckView from './components/DeckView'
import { FlashStatusBar } from './styles/StatusBar'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { MaterialCommunityIcons } from '@expo/vector-icons'


const Tabs = TabNavigator({
  DeckList: {
    screen:DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name='cards-outline' size={30} color={tintColor} />
    }
  },

  NewDeck: {
    screen:NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name='cards-variant' size={30} color={tintColor} />
    }   
  }


},{

  navigationOptions: {
    header: null
  },

  tabBarOptions: {
    activeTintColor: 'yellow',
    style:{
      height: 50,
      backgroundColor: '#202020',
      shadowColor: 'rgba(255,255,255,0.24)',
      shadowOffset: {
        width:0,
        height:3
      },
      shadowRadius:6,
      shadowOpacity:1
    }

  }

})


const MainNavi = StackNavigator({
  Home: {
    screen: Tabs
  },
  DeckView: {
    screen: DeckView,
    headerMode: 'screen',
    headerTintColor:'#202020',
    headerStyle:{
      backgroundColor: '#fff'
    }
  }

},{

navigationOptions :{
  title: 'Deck',
  headerStyle: { backgroundColor: '#111' },
  headerTintColor:'yellow',
  headerTitleStyle: { color: '#fff' },
},


    headerMode: 'screen',
    cardStyle:{backgroundColor:'#333'}

})


export default class App extends Component {

  state = {
      entries: null
     }


  updateEntries = (data) => {

    if (data !== null ){
      this.setState(()=>({entries:data}))
      return
    }

    const update = data === null ? dummy : data

    flashDB.setData(update)
      .then(() => {
        this.setState(()=>({entries:update}))
      })

  }


  componentDidMount(){

    flashDB.getDecks()
      .then((result)=>{
          this.updateEntries(result)
      })
  }



  render() {

    const decks = this.state.entries

    return (

      <View style={{flex:1, justifyContent:'flex-start'}}>
        <FlashStatusBar  barStyle='light-content'  />
        <MainNavi  screenProps={{decks}} />
      </View>

    )
  }
}



// put dummy data in to the store if empty for testing
const dummy = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}
