import React, { memo } from "react"
import { TouchableNativeFeedback, View, Text, StyleSheet } from "react-native"
import workWithSongDuration from "../functions/workWithSongDuration.js"
import Checkbox from "../svg_components/Checkbox.jsx"



export default memo(({chosen, name, author, duration, fontFamily, onPress, selected, deleteSongs}) => {
    return (
    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('rgba(119, 122, 120 .5)', false)}
        onPress={onPress}>
            <View style={{...styles.song, backgroundColor: chosen ? 'rgba(255, 113, 91, .5)' : 'transparent'}}>
                <View style={styles.nameAndAuthorWrapper}>
                    <Text style={{...styles.name, fontFamily}}>{name}</Text>
                    <Text style={{...styles.author, fontFamily}}>{author}</Text>
                </View>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', height: '100%'}}>
                    <Text style={{...styles.duration, fontFamily}}>{workWithSongDuration(duration)}</Text>
                    {!!deleteSongs && <Checkbox checked={selected} style={{width: 14, alignSelf: 'center', marginLeft: 10}}/>}
                </View>
            </View>
    </TouchableNativeFeedback>
    )
}, (prevProps, nextProps) => {
    if (prevProps.chosen === nextProps.chosen && prevProps.fontFamily === nextProps.fontFamily && 
        prevProps.onPress === nextProps.onPress && prevProps.selected === nextProps.selected && `${prevProps.deleteSongs}` === `${nextProps.deleteSongs}`) return true
    return false
})

const styles = StyleSheet.create({
    song: {
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        zIndex: 0
    },
    nameAndAuthorWrapper: {
        display: 'flex'
    },
    name: {
        color: '#fff',
        fontSize: 14,
        marginTop: -3
    },
    author: {
        fontSize: 11,
        color: 'rgba(255, 255, 255, .6)',
        marginTop: -8
    },
    duration: {
        fontSize: 12,
        color: '#fff'
    }
})