import React from 'react'
import { Text, View, ScrollView } from 'react-native'
import styled from 'styled-components/native'



export const CenterView = styled.View`
    background: ${props => (props.bgColor ? props.bgColor: '#333')};
    padding: 5px;
`


export const FlashScrollView = styled.ScrollView`
    padding:5px; 
    background: ${props => (props.bgColor ? props.bgColor: '#333')};    

`

export const FlashText = styled.Text`
    color: ${props => (props.txtColor ? props.txtColor: '#fff')};
`

export const DeckInfo = styled.View`
    border: 1px solid #202020;
    flex:1;
    justify-content: center;
    align-items: center;
    margin: 5px;
    padding: 5px;
    background : #111111;
    width:98%;
    border-radius:8px;

`