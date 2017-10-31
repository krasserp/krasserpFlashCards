import React from 'react'
import { Text, View, ScrollView, Button } from 'react-native'
import styled from 'styled-components/native'



export const CenterView = styled.View`
    background: ${props => (props.bgColor ? props.bgColor: '#333')};
    padding: 5px;
    overflow:visible;
`


export const FlashScrollView = styled.ScrollView`
    padding:5px;
    background: ${props => (props.bgColor ? props.bgColor: '#333')};

`

export const FlashText = styled.Text`
    color: ${props => (props.txtColor ? props.txtColor: '#fff')};
    font-size:  ${props => (props.fontSize?props.fontSize:'14')};
`

export const FlashFlex = styled.View`
    border: 1px solid #202020;
    flex:1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 5px;
    padding: 5px;
    background : #111111;
    width:98%;
    border-radius:8px;

`

export const QuizCounter = styled.View`
    flex:1;
    justify-content:center;
    align-items: center;
    width:30px;
    max-height: 30px;
    background-color:#fff;
    opacity:0.9;
    border-radius:30px;
    width:60px;
    align-self: flex-end;

`

export const FlashButton = styled.Button`
    flex:1;
    border:1px solid #fff;
    border-radius:8px;
    text-align:center;
    padding:5px;
    margin:5px;
    flex-grow:1;
    opacity: ${props => (props.opacity ? props.opacity: 1)};
`

export const FlashFlexRow = styled.View`
    flex:1;
    flex-direction: row;
    align-self: flex-end;
    justify-content: ${props => (props.justifyCcontent ? props.justifyCcontent: 'space-between')};
    align-items: center;
    width:100%;
    margin-top:5px;
    margin-bottom:5px;
    max-height: 80px;

`