import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { View, TouchableNativeFeedback } from 'react-native'

const SvgComponent = (props) => {

    return (
    <TouchableNativeFeedback onPress={props.onPress} background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, .2)', true)}
    onLayout={event => {
        props.optY.current = event.nativeEvent.layout.y + event.nativeEvent.layout.width + 2
    }}>
        <View style={{...props.style, aspectRatio: 1}}>
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                height='100%'
                width='100%'
                fill="#FFF"
                viewBox="0 0 24 24"
            >
                <Path d="M0 0h24v24H0V0z" fill="none" />
                <Path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </Svg>
        </View>
    </TouchableNativeFeedback>  
)}

export default SvgComponent
