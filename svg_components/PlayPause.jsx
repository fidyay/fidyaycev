import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { View, TouchableNativeFeedback } from "react-native"

const paths = [
    "M8 5v14l11-7z",
    "M6 19h4V5H6v14zm8-14v14h4V5h-4z"
]

const SvgComponent = (props) => {
    return (
        <TouchableNativeFeedback onPress={props.onPress} background={TouchableNativeFeedback.Ripple('rgba(119, 122, 120 .5)', true)}>
            <View style={{...props.style, aspectRatio: 1}}>
                <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="100%"
                    width="100%"
                    fill="#FFF"
                    viewBox="0 0 24 24"
                >
                    <Path d="M0 0h24v24H0z" fill="none" />
                    <Path d={paths[props.playing ? 1 : 0]}/>
                </Svg>
            </View>
        </TouchableNativeFeedback>         
        )        
} 
export default SvgComponent
