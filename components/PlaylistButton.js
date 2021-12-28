import React from "react";
import { View, Text, TouchableNativeFeedback} from 'react-native';

export default ({style, onPress, textStyle, title, disabled}) => (
    <TouchableNativeFeedback disabled={disabled} background={TouchableNativeFeedback.Ripple('rgba(119, 122, 120 .5)', false)}
        onPress={onPress}>
            <View style={style}>
                <Text style={textStyle}>
                    {title}
                </Text>
            </View>
    </TouchableNativeFeedback>
)
