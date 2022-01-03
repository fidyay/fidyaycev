import React, { useState, useRef, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import Skip from "../svg_components/Skip.jsx"
import PlayPause from "../svg_components/PlayPause.jsx"
import Repeat from "../svg_components/Repeat.jsx"
import workWithSongDuration from "../functions/workWithSongDuration.js"
import Slider from "./Slider.js"
import Shuffle from "../svg_components/Shuffle.jsx"
import { useFonts } from "expo-font"
import font from "../functions/font.js"
import { useWindowDimensions } from "react-native"
import { Audio } from "expo-av"
import { observer } from "mobx-react-lite"
import state from "../global-state/state.js"
import shuffle from "../functions/shuffle.js"



const setNewX = (X, width) => {
    if ( X < 0 ) return 0
    if ( X > width ) return width
    return X
}

export default observer(() => {
    const [appState] = useState(state)
    const currentSong = appState.currentSong
    const player = useRef(null)
    const [width, setWidth] = useState()
    const [X, setX] = useState(0)
    const { width: windowWidth } = useWindowDimensions()
    const [shuffled, setShuffled] = useState(false)
    const [repeatPlaylist, setRepeatPlaylist] = useState(false)
    const [repeatSong, setRepeatSong] = useState(false)
    const [playbackObj, setPlaybackObj] = useState(null)
    const [secondsFromStart, setSecondsFromStart] = useState(0)
    const [soundObj, setSoundObj] = useState(null)
    const playlist = appState.playlists[currentSong.playlistName]?.slice()
    if (shuffled) {
        shuffle(playlist)
    }

    const songIndex = useRef(0)
    const song = appState.playlists[currentSong.playlistName]?.find((song, index) => {
        if (song.id === currentSong.id) {
            songIndex.current = index
            return true
        } 
        return false
    })


    const loopUnloopSong = async () => {
        if (repeatSong && !soundObj.isLooping) {
            const status = await playbackObj.setStatusAsync({isLooping: true})
            setSoundObj(status)
        }
        if (!repeatSong && soundObj.isLooping) {
            const status = await playbackObj.setStatusAsync({isLooping: false})
            setSoundObj(status)
        }
    }

    useEffect(loopUnloopSong, [repeatSong, soundObj])

    const onPlaybackStatusUpdate = async playbackStatus => {
        if (playbackStatus.didJustFinish) {
            if (repeatSong) return
            let nextIndex = songIndex.current + 1
            if (repeatPlaylist && (nextIndex === playlist.length)) {
                nextIndex = 0
            }
            const nextSong = playlist[nextIndex]
            appState.setCurrentSong({playlistName: currentSong.playlistName, id: nextSong.id, uri: nextSong.uri})
            return
        }
        const X = setNewX((playbackStatus.positionMillis/playbackStatus.durationMillis) * width)
        if (!X) return
        setSecondsFromStart(Math.floor(playbackStatus.positionMillis/1000))
        setX(X)
    }

    useEffect(() => {
        if (!playbackObj) return
        playbackObj.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
    }, [playbackObj, repeatPlaylist, shuffled, repeatSong])

    const changeSong = async song => {
        if (!soundObj || !song || `file://${soundObj.uri}` === song.uri) return
        await playbackObj.unloadAsync()
        const status = await playbackObj.loadAsync({uri: song.uri}, {shouldPlay: true})
        setSoundObj(status)
    }

    changeSong(song)

    const handleAudioPress = async song => {
        if (soundObj === null) {
            const playbackObject = new Audio.Sound()
            playbackObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
            const status = await playbackObject.loadAsync({uri: song.uri}, {shouldPlay: true})
            setPlaybackObj(playbackObject)
            setSoundObj(status)
            return
        }
        if (soundObj.isLoaded && soundObj.isPlaying) {
           const status = await playbackObj.pauseAsync()
           setSoundObj(status)
           return
        }
        if (soundObj.isLoaded && !soundObj.isPlaying) {
            const status = await playbackObj.playAsync()
            setSoundObj(status)
        }
    }



    const [fontLoaded] = useFonts(
        {   
            Rowdies: require('../assets/fonts/Rowdies-Regular.ttf')
        }
    )
    const pausedByPerson = useRef(true)
    const sliderUsing = useRef(false)
    return (
        song ?
        <View
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => {
            if (sliderUsing.current) return true
        }}
        onResponderMove={async evt => {
            if (!width) return
            if (!sliderUsing.current) return
            const right = (windowWidth - width)/2
            const newX = evt.nativeEvent.pageX - right
            setX(setNewX(newX, width))
        }}
        onResponderTerminationRequest={() => false}
        onResponderRelease={async (evt) => {
            if (!width) return
            if (!sliderUsing.current) return
            const right = (windowWidth - width)/2
            const X = evt.nativeEvent.pageX - right
            const percentage = X/width
            await playbackObj.setStatusAsync({positionMillis: song.duration * 1000 * percentage})
            if (!pausedByPerson.current && !soundObj.isPlaying) {
                const status = await playbackObj.playAsync()
                setSoundObj(status)
            }
            sliderUsing.current = false
        }}
        ref={player} style={styles.player}>
            <Text style={{...styles.songName, fontFamily: font(fontLoaded)}}>{song.title}</Text>
            <Text style={{...styles.songAuthor, fontFamily: font(fontLoaded)}}>{song.artist}</Text>
            <View style={styles.controls}>
                <View style={styles.playSkipWrapper}>
                    <Skip style={{...styles.button, marginLeft: 0}} onPress={() => {
                        let previousIndex = songIndex.current - 1
                        if (songIndex.current === 0) {
                            previousIndex = playlist.length - 1
                        }
                        const nextSong = playlist[previousIndex]
                        appState.setCurrentSong({playlistName: currentSong.playlistName, id: nextSong.id, uri: nextSong.uri})
                    }}/>
                    <PlayPause playing={!!soundObj && soundObj.isPlaying} onPress={() => {
                        pausedByPerson.current = !pausedByPerson.current
                        handleAudioPress(currentSong)
                    }} style={{...styles.button, width: 34}}/>
                    <Skip style={styles.button} next onPress={() => {
                        let nextIndex = songIndex.current + 1
                        if (nextIndex === playlist.length) {
                            nextIndex = 0
                        }
                        const nextSong = playlist[nextIndex]
                        appState.setCurrentSong({playlistName: currentSong.playlistName, id: nextSong.id, uri: nextSong.uri})
                    }}/>
                </View>
                <View style={styles.repeatAndShuffleWrapper}>
                    <Repeat repeatPlaylist={repeatPlaylist} repeatSong={repeatSong} setRepeatPlaylist={setRepeatPlaylist} setRepeatSong={setRepeatSong} style={{...styles.button, marginLeft: 0}}/>
                    <Shuffle setShuffled={setShuffled} shuffled={shuffled} style={styles.button}/>
                </View>
            </View>
            <View style={styles.sliderAndTimeWrapper}>
                <Text style={{...styles.time, fontFamily: font(fontLoaded)}}>
                    {workWithSongDuration(secondsFromStart)}
                </Text>
                <Slider sliderUsing={sliderUsing} width={width} setNewX={setNewX} setX={setX} X={X} setWidth={setWidth} style={styles.slider} playbackObj={playbackObj} soundObj={soundObj} setSoundObj={setSoundObj}/>
                <Text style={{...styles.time, fontFamily: font(fontLoaded)}}>
                    {workWithSongDuration(Math.floor(song.duration))}
                </Text>
            </View>
        </View> : null
    )
})

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
        width: 50
    },
    slider: {
        width: '63.98891966759003%'
    }
})