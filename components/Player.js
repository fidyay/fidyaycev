import React, { useState, useRef } from "react"
import { View, Text, StyleSheet } from "react-native"
import Skip from "../svg_components/Skip.jsx"
import PlayPause from "../svg_components/PlayPause.jsx"
import Repeat from "../svg_components/Repeat.jsx"
import Shuffle from "../svg_components/Shuffle.jsx"
import workWithSongDuration from "../functions/workWithSongDuration.js"
import Slider from "./Slider.js"
import { useFonts } from "expo-font"
import font from "../functions/font.js"
import { useWindowDimensions } from "react-native"

const setNewX = (X, width) => {
    if ( X < 0 ) return 0
    if ( X > width ) return width
    return X
}

export default () => {
    const [playing, setPlaying] = useState(true)
    const player = useRef(null)
    const [width, setWidth] = useState()
    const [X, setX] = useState(0)
    const { width: windowWidth } = useWindowDimensions()
    const [shuffled, setShuffled] = useState(false)
    const [repeatPlaylist, setRepeatPlaylist] = useState(false)
    const [repeatSong, setRepeatSong] = useState(false)

    const [fontLoaded] = useFonts(
        {   
            Rowdies: require('../assets/fonts/Rowdies-Regular.ttf')
        }
    )

    const sliderUsing = useRef(false)
    return (
        <View
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => {
            if (sliderUsing.current) return true
        }}
        onResponderMove={evt => {
            if (!width) return
            if (!sliderUsing.current) return
            const right = (windowWidth - width)/2
            const newX = evt.nativeEvent.pageX - right
            setX(setNewX(newX, width))
        }}
        onResponderTerminationRequest={() => false}
        onResponderRelease={() => {
            sliderUsing.current = false
        }}
        ref={player} style={styles.player}>
            <Text style={{...styles.songName, fontFamily: font(fontLoaded)}}>Song's name</Text>
            <Text style={{...styles.songAuthor, fontFamily: font(fontLoaded)}}>Song's author</Text>
            <View style={styles.controls}>
                <View style={styles.playSkipWrapper}>
                    <Skip style={{...styles.button, marginLeft: 0}}/>
                    <PlayPause playing={playing} onPress={() => setPlaying(!playing)} style={{...styles.button, width: 34}}/>
                    <Skip style={styles.button} next/>
                </View>
                <View style={styles.repeatAndShuffleWrapper}>
                    <Repeat repeatPlaylist={repeatPlaylist} repeatSong={repeatSong} setRepeatPlaylist={setRepeatPlaylist} setRepeatSong={setRepeatSong} style={{...styles.button, marginLeft: 0}}/>
                    <Shuffle setShuffled={setShuffled} shuffled={shuffled} style={styles.button}/>
                </View>
            </View>
            <View style={styles.sliderAndTimeWrapper}>
                <Text style={{...styles.time, fontFamily: font(fontLoaded)}}>
                    {workWithSongDuration(0)}
                </Text>
                <Slider sliderUsing={sliderUsing} width={width} setNewX={setNewX} setX={setX} X={X} setWidth={setWidth} style={styles.slider}/>
                <Text style={{...styles.time, fontFamily: font(fontLoaded)}}>
                    {workWithSongDuration(100)}
                </Text>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    player: {
        backgroundColor: '#FF715B',
        display: 'flex',
        paddingBottom: 20,
        paddingRight: 20,
        paddingLeft: 20,
        alignItems: 'center'
    },
    songName: {
        fontSize: 18,
        color: '#fff',
    },
    songAuthor: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, .7)',
        marginTop: -10
    },
    controls: {
        width: '100%',
        height: 34,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    playSkipWrapper: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row'
    },
    repeatAndShuffleWrapper: {
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: [
            {translateY: -17}
        ],
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row'
    },
    button: {
        width: 30,
        marginLeft: 10
    },
    sliderAndTimeWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },
    time: {
        fontSize: 14,
        color: '#fff',
    },
    slider: {
        width: '63.98891966759003%'
    }
})