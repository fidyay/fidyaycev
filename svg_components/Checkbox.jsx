import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { View } from "react-native"


const paths = [
    "M14.625 2.375v12.25H2.375V2.375h12.25Zm0-1.75H2.375c-.962 0-1.75.788-1.75 1.75v12.25c0 .963.788 1.75 1.75 1.75h12.25c.963 0 1.75-.787 1.75-1.75V2.375c0-.962-.787-1.75-1.75-1.75Z",
    "M14.625 0.625H2.375C1.40375 0.625 0.625 1.4125 0.625 2.375V14.625C0.625 15.5875 1.40375 16.375 2.375 16.375H14.625C15.5962 16.375 16.375 15.5875 16.375 14.625V2.375C16.375 1.4125 15.5962 0.625 14.625 0.625ZM6.75 12.875L2.375 8.5L3.60875 7.26625L6.75 10.3988L13.3913 3.7575L14.625 5L6.75 12.875Z"
]

const SvgComponent = (props) => {
    return <View style={{...props.style, aspectRatio: 1}}>
    <Svg
      height="100%" width="100%"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      viewBox="0 0 15.75 15.75"
  >
    <Path d={paths[props.checked ? 1 : 0]} fill="#fff"/>
  </Svg>
</View>
}

export default SvgComponent
