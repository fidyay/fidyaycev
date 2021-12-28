import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { View } from "react-native"

const SvgComponent = (props) => (
    <View style={{...props.style, aspectRatio: 19/28}}>
        <Svg
            width="100%"
            height="100%"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
            viewBox="0 0 19 28"
        >
            <Path
            d="m9.5 0 .016 16.411a6.415 6.415 0 0 0-3.167-.855C2.834 15.556 0 18.34 0 21.778 0 25.216 2.834 28 6.35 28c3.514 0 6.317-2.784 6.317-6.222V6.222H19V0H9.5ZM6.35 24.889c-1.742 0-3.167-1.4-3.167-3.111 0-1.711 1.425-3.111 3.166-3.111 1.742 0 3.167 1.4 3.167 3.11 0 1.712-1.425 3.112-3.167 3.112Z"
            fill="#fff"
            />
        </Svg>
    </View>
 
)

export default SvgComponent
