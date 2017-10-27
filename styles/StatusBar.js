import React from 'react'
import { StatusBar } from 'react-native'
import { Constants } from 'expo'
import { CenterView } from './Styles'

export function FlashStatusBar ({bgColor,...props}){
    return(
        <CenterView bgColor={bgColor} style={{height: Constants.statusBarHeight}}>
            <StatusBar  {...props} />
        </CenterView>
    )
}