import React, { useState } from "react"
import { View } from "react-native"


export default ({style, X, setWidth, setX, setNewX, width, sliderUsing}) => {
    return (
        <View style={{...style, backgroundColor: '#000', height: 5}}
        onStartShouldSetResponder={() => {
            sliderUsing.current = true
            return true
        }}
        onMoveShouldSetResponder={() => {
            sliderUsing.current = true
            return true
        }}
        onResponderGrant={evt => {
            if (!width) return
            setX(setNewX(evt.nativeEvent.locationX, width))
        }}
        onLayout={event => {
            setWidth(event.nativeEvent.layout.width)
        }}>
        <View style={{height: 5, backgroundColor: '#fff', width: X}}/>
        <View style={{height: 11, width: 11, position: 'absolute', top: -3, left: X-5, backgroundColor: '#fff', borderRadius: 5.5}}/>

        </View>
    )
}