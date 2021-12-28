import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { View, TouchableNativeFeedback } from "react-native"

const paths = [
    "M6 6h2v12H6zm3.5 6l8.5 6V6z",
    "m6 18 8.5-6L6 6v12zM16 6v12h2V6h-2z"
]

const SvgComponent = (props) => (
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
        <Path d={paths[props.next ? 1 : 0]} />
    </Svg>
</View>
</TouchableNativeFeedback>

 
)

export default SvgComponent
