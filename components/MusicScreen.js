import React from "react"
import { View } from "react-native"
import MusicRounded from "../svg_components/Music_Rounded.jsx"
import Arrow from "../svg_components/Arrow.jsx"

export default ({navigation}) => {
    return (
        <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, position: 'relative'}}>
            <Arrow style={{position: 'absolute', top: 10, left: 20, width: 20}} onPress={() => {
                navigation.goBack()
            }}/>
            <MusicRounded style={{width: '70%'}}/>
        </View>
    )
}