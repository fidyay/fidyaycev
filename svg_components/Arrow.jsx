import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { View, TouchableNativeFeedback } from "react-native"

const SvgComponent = (props) => {

    return (
        <TouchableNativeFeedback onPress={props.onPress} background={TouchableNativeFeedback.Ripple('rgba(119, 122, 120 .5)', true)}>
            <View style={{...props.style, aspectRatio: 1}}>
                <Svg
                    width='100%'
                    height='100%'
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <Path
                        d="M.293 7.293a1 1 0 0 0 0 1.414l6.364 6.364a1 1 0 0 0 1.414-1.414L2.414 8l5.657-5.657A1 1 0 0 0 6.657.93L.293 7.293ZM24 7H1v2h23V7Z"
                        fill="#fff"
                    />
                </Svg>
            </View>
        </TouchableNativeFeedback>  
    )
}

export default SvgComponent