import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { View, TouchableNativeFeedback } from "react-native"

const SvgComponent = (props) => {
return (
    <TouchableNativeFeedback onPress={() => {
        props.setShuffled(!props.shuffled)
    }} background={TouchableNativeFeedback.Ripple('rgba(119, 122, 120 .5)', true)}>
        <View style={{...props.style, aspectRatio: 1}}>
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                height="100%"
                width="100%"
                viewBox="0 0 24 24"
                fill={props.shuffled ? '#fff' : 'rgba(255, 255, 255, .7)'}
            >
                <Path d="M0 0h24v24H0z" fill="none" />
                <Path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/>
            </Svg>
        </View>
    </TouchableNativeFeedback>

 
)}

export default SvgComponent
