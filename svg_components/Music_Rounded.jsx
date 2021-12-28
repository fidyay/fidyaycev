import * as React from "react"
import Svg, { Path } from "react-native-svg"
import Animated, { useSharedValue, withRepeat, withTiming, useAnimatedStyle, Easing } from "react-native-reanimated"


const SvgComponent = (props) => {
const rotation = useSharedValue(0)

const animatedStyle = useAnimatedStyle(() => {
  return {
    transform: [
      {
        rotateZ: `${rotation.value}deg`
      }
    ]
  }
})

React.useEffect(() => {
  rotation.value = withRepeat(withTiming(360, {
    duration: 10000,
    easing: Easing.linear
  }), -1)
})
return (
  <Animated.View style={[{...props.style, aspectRatio: 1}, animatedStyle]}>
    <Svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      viewBox="0 0 197 197"
      height="100%"
      width="100%"
    >
      <Path
        d="M98.5 0C44.128 0 0 44.128 0 98.5S44.128 197 98.5 197 197 152.872 197 98.5 152.872 0 98.5 0ZM78.8 142.825v-88.65L137.9 98.5l-59.1 44.325Z"
        fill="#000"
      />
    </Svg>

  </Animated.View>
)
}

export default SvgComponent
