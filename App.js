import React, { Component } from 'react'
import {Text, View, ActivityIndicator, ScrollView, StatusBar } from 'react-native'
import * as flashDB from './utils/storeApi'
import { CenterView, FlashText, FlashScrollView } from './styles/Styles'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import DeckView from './components/DeckView'
import QuizView from './components/QuizView'
import NewCard from './components/NewCard'
import { FlashStatusBar } from './styles/StatusBar'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { setLocalNotification } from './utils/helpers'


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
  },

  QuizView: {
    screen: QuizView,
  },

  NewCard: {
    screen: NewCard,
  }

},{

  navigationOptions :{
    title: 'Deck',
    headerStyle: { backgroundColor: '#111' },
    headerTintColor:'yellow',
    headerTitleStyle: { color: '#fff' },
  },

    cardStyle:{backgroundColor:'#333'}

})


export default class App extends Component {

  componentDidMount(){
    setLocalNotification()
  }

  render() {

    return (

      <View style={{flex:1}}>
        <FlashStatusBar  barStyle='light-content'  />
        <MainNavi />
      </View>

    )
  }
}




