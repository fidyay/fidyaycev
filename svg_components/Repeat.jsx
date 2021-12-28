import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { View, TouchableNativeFeedback } from "react-native"

const paths = [
    "M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z",
    "M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4zm-4-2V9h-1l-2 1v1h1.5v4H13z"
]

const SvgComponent = (props) => (
<TouchableNativeFeedback onPress={() => {
    if (!props.repeatPlaylist) {
        props.setRepeatPlaylist(true)
        return
    }
    if (!props.repeatSong) {
        props.setRepeatSong(true)
        return
    }
    props.setRepeatPlaylist(false)
    props.setRepeatSong(false)
}} background={TouchableNativeFeedback.Ripple('rgba(119, 122, 120 .5)', true)}>
<View style={{...props.style, aspectRatio: 1}}>
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        height="100%"
        width="100%"
        fill={props.repeatPlaylist ? '#fff' : 'rgba(255, 255, 255, .7)'}
        viewBox="0 0 24 24"
    >
        <Path d="M0 0h24v24H0z" fill="none" />
        <Path d={paths[props.repeatSong ? 1 : 0]}/>
    </Svg>
</View>
</TouchableNativeFeedback>

 
)

export default SvgComponent
