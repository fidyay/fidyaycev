import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { View, TouchableNativeFeedback } from "react-native"

const paths = [
    "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z",
    "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
]



const SvgComponent = (props) => {

    return (
        <TouchableNativeFeedback onPress={props.onPress} background={TouchableNativeFeedback.Ripple('rgba(119, 122, 120 .5)', true)}>
            <View style={{...props.style, aspectRatio: 1}}>
                <Svg
                    width='100%'
                    height='100%'
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <Path
                        d={props.closer ? paths[1] : paths[0]}
                        fill="#fff"
                    />
                </Svg>
            </View>
        </TouchableNativeFeedback>  
    )
}

export default SvgComponent