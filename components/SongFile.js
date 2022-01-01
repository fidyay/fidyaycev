import React, {memo} from "react"
import { View, Text, TouchableNativeFeedback, StyleSheet } from "react-native"
import Checkbox from "../svg_components/Checkbox.jsx"
import MusicalNote from "../svg_components/MusicalNote.jsx"

export default memo(({songName, checked, fontFamily, onPress}) => {
    return (
    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('rgba(119, 122, 120 .5)', false)}
    onPress={onPress}>
        <View style={styles.file}>
            <View style={styles.textAndImageWrapper}>
                <MusicalNote style={styles.image}/>
                <Text style={{...styles.text, fontFamily}}>
                    {songName}
                </Text>
            </View>
            <Checkbox style={{width: 21, marginLeft: 10, marginRight: 10}} checked={checked}/>
        </View>
    </TouchableNativeFeedback>
    )
}, (prevProps, nextProps) => {
    if (prevProps.checked === nextProps.checked && prevProps.fontFamily === nextProps.fontFamily) return true
    return false
})

const styles = StyleSheet.create({
    file: {
        backgroundColor: 'rgba(0, 0, 0, .2)',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    textAndImageWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
        paddingRight: 10
    },
    image: {
        width: 19,
        marginRight: 10,
        alignSelf: 'flex-start'
    },
    text: {
        fontSize: 15,
        color: '#fff'
    }
})