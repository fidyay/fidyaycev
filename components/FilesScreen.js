import React, { useState, useContext, useEffect, useCallback } from "react"
import { View, FlatList, StyleSheet, Text } from "react-native"
import SongFile from "./SongFile.js"
import font from "../functions/font.js"
import { useFonts } from "expo-font"
import FilesButton from "./PlaylistButton.js"
import * as MediaLibrary from "expo-media-library"
import { Status } from "../App.js"
import state from "../global-state/state.js"
import MusicInfo from "expo-music-info"


export default ({navigation, route}) => {
    const { playlistName } = route.params
    const [songsAdded, setSongsAdded] = useState(false)
    const [songsData, setSongData] = useState([])
    const [fontLoaded] = useFonts(
        {
            Rowdies: require('../assets/fonts/Rowdies-Regular.ttf')
        }
    )
    const status = useContext(Status)
    const [songsToAdd, setSongsToAdd] = useState([])
    const keyExtractor = useCallback((_, index) => index.toString(), [])

    const renderItem = useCallback(({item}) => 
    <SongFile songName={item.filename} fontFamily={font(fontLoaded)} checked={songsToAdd.includes(item.id)}
        onPress={() => {
            const { id } = item
            if (songsToAdd.includes(id)) {
                    const otherSongsToAdd = []
                    songsToAdd.forEach(songId => {
                        if (songId === id) return
                        otherSongsToAdd.push(songId)
                    })
                    setSongsToAdd(otherSongsToAdd)
                    return
            }
            setSongsToAdd([...songsToAdd, id])
        }}
/>, [fontLoaded, `${songsToAdd}`])

    useEffect(async () => {
        if (!status.granted) return
        let assets = await MediaLibrary.getAssetsAsync({
            mediaType: MediaLibrary.MediaType.audio
        })
        assets = await MediaLibrary.getAssetsAsync({
            mediaType: MediaLibrary.MediaType.audio,
            first: assets.totalCount
        })
        setSongData(assets.assets.filter(asset => asset.duration >= 150))
    }, [status])
    return (
        <View style={styles.screen}>
            <View style={styles.buttonWrapper}>
                <FilesButton 
                    onPress={() => {
                        navigation.goBack()
                    }}
                    title="Cancel"
                    textStyle={{...styles.buttonText, fontFamily: font(fontLoaded)}}
                    style={styles.button}
                />
                <FilesButton
                    title="Add files"
                    onPress={async () => {
                        setSongsAdded(true)
                        const chosenSongs = []
                        songsToAdd.forEach(id => {
                            const songInfo = songsData.find(song => song.id === id)
                            chosenSongs.push(songInfo)
                        })
                        const songsMetadata = await Promise.all(chosenSongs.map(song => MusicInfo.getMusicInfoAsync(song.uri, {
                            title: true,
                            artist: true
                        })))
                        state.addSongs(playlistName, [
                            ...chosenSongs.map((song, index) => {
                                let title
                                if (songsMetadata[index]?.title) {
                                    title = songsMetadata[index].title
                                } else {
                                    const dotIndex = song.filename.lastIndexOf('.')
                                    title = song.filename.slice(0, dotIndex)
                                }
                                return {
                                    id: song.id,
                                    uri: song.uri,
                                    duration: song.duration,
                                    title,
                                    artist: songsMetadata[index]?.artist ? songsMetadata[index].artist : 'unknown'
                                }
                            })
                        ])
                        navigation.goBack()
                    }}
                    disabled={songsToAdd.length === 0 || songsAdded}
                    textStyle={{...styles.buttonText, color: songsToAdd.length === 0 || songsAdded ? '#ccc' : '#fff', fontFamily: font(fontLoaded)}}
                    style={styles.button}
                />
            </View>
            <Text style={{...styles.title, fontFamily: font(fontLoaded)}}>Choose files</Text>
            <View style={{...styles.buttonWrapper, justifyContent: 'flex-end'}}>
                <FilesButton
                    title={songsToAdd.length !== songsData.length ? 'Select all' : 'Deselect all'}
                    textStyle={{...styles.buttonText, fontFamily: font(fontLoaded)}}
                    style={styles.button}
                    onPress={() => {
                        if (songsData.length === songsToAdd.length) {
                            setSongsToAdd([])
                            return
                        }
                        setSongsToAdd([...songsData.map(song => song.id)])

                    }}
                />
            </View>
            <FlatList style={{flexShrink: 1, width: '100%'}} maxToRenderPerBatch={23} windowSize={23} keyExtractor={keyExtractor} data={songsData} renderItem={renderItem}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        display: 'flex',
        alignItems: 'center',
        flex: 1
    },
    button: {
        borderRadius: 5
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        paddingLeft: 4,
        paddingRight: 4
    },
    buttonWrapper: {
        width: '80%',
        marginTop: 5,
        marginBottom: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        color: '#fff'
    },
    list: {
        width: '100%',
        display: 'flex'
    }
})