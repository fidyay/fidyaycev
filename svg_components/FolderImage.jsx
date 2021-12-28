import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { View,  } from "react-native"

const SvgComponent = (props) => (
    <View style={{...props.style, aspectRatio: 32/26}}>
        <Svg
            width="100%"
            height="100%"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
            viewBox="0 0 32 26"
        >
            <Path
            d="m11.352 3.167 3.167 3.166H28.5v15.834H3.167v-19h8.185ZM12.667 0h-9.5C1.425 0 .016 1.425.016 3.167l-.016 19a3.176 3.176 0 0 0 3.167 3.166H28.5a3.176 3.176 0 0 0 3.167-3.166V6.333A3.176 3.176 0 0 0 28.5 3.167H15.833L12.667 0Z"
            fill="#fff"
            />
        </Svg>
    </View>
)

export default SvgComponent
