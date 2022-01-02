import React, { useState, useRef, useCallback, useContext } from 'react';
import { View, FlatList, Text, StyleSheet, LayoutAnimation } from 'react-native';
import font from '../functions/font.js';
import PlaylistSong from './PlaylistSong.js';
import { useFonts } from 'expo-font';
import PlaylistButton from './PlaylistButton.js';
import Dots from '../svg_components/Dots.jsx';
import PlaylistOptions from './PlaylistOptions.js';
import ClearPlaylistConfirmation from './ClearPlaylistConfirmation.js';
import { observer } from 'mobx-react-lite';
import state from '../global-state/state.js';
import { Status } from '../App.js'
import * as MediaLibrary from 'expo-media-library'


export default observer(({navigation, route}) => {
    const status = useContext(Status)
    const [appState] = useState(state)
    const { playlistName } = route.params
    const optY = useRef(0)
    const chosenSong = appState.currentSong.id
    const [deleteSongs, setDeleteSongs] = useState('')
    const [songsToDelete, setSongsToDelete] = useState([])
    const [optionsOpened, setOptionsOpened] = useState(false)
    const [clearConfirmationOpened, setClearConfirmationOpened] = useState(false)
    const data = appState.playlists[playlistName]
    const [fontLoaded] = useFonts(
        {
            Rowdies: require('../assets/fonts/Rowdies-Regular.ttf')
        }
    )
    const keyExtractor = useCallback((_, index) => index.toString(), [])

    const renderItem = useCallback(({item}) => {
        return <PlaylistSong onPress={deleteSongs ? () => {
            if (songsToDelete.includes(item.id)) {
                const newSongsToDelete = []
                songsToDelete.forEach(id => {
                    if (id === item.id) return
                    newSongsToDelete.push(id)
                })
                setSongsToDelete(newSongsToDelete)
                return
            } 
            setSongsToDelete([...songsToDelete, item.id])
            } : () => {
                appState.setCurrentSong({
                    id: item.id,
                    uri: item.uri,
                    playlistName
                })
                if (chosenSong === item.id) {
                    navigation.navigate('Music')
                }
            }} 
            name={item.title}
            author={item.artist}
            duration={Math.floor(Number(item.duration))}
            chosen={!deleteSongs && chosenSong === item.id}
            fontFamily={font(fontLoaded)}
            selected={deleteSongs && songsToDelete.includes(item.id)}
            deleteSongs={deleteSongs}
        />
    }, [deleteSongs, `${songsToDelete}`, fontLoaded, chosenSong])


    return (
<>
    <View style={styles.screen}>
        <View style={{...styles.controls, alignItems: deleteSongs ? 'flex-start' : 'center'}}>
            {deleteSongs ? <>
                <PlaylistButton title='Cancel' onPress={() => {
                    LayoutAnimation.easeInEaseOut()
                    setDeleteSongs('')
                    }}
                    style={{borderRadius: 5}} textStyle={{...styles.controlsButton, fontFamily: font(fontLoaded)}}
                />
                <View style={{display: 'flex', alignItems: 'flex-end'}}>
                    <PlaylistButton disabled={songsToDelete.length === 0} title={deleteSongs} onPress={() => {
                        LayoutAnimation.easeInEaseOut()
                        if (deleteSongs === 'Delete from playlist') {
                            appState.removeFromPlaylist(playlistName, songsToDelete)
                        }
                        if (deleteSongs === 'Delete from device') {
                            appState.removeFromPlaylist(playlistName, songsToDelete)
                            if (status.granted) {
                                MediaLibrary.deleteAssetsAsync(songsToDelete)
                            }
                        }
                        setDeleteSongs('')
                        }}
                        style={{borderRadius: 5}} textStyle={{...styles.controlsButton, fontFamily: font(fontLoaded), color: songsToDelete.length === 0 ? '#ccc' : '#fff'}}
                    />
                    <PlaylistButton style={{borderRadius: 5}} textStyle={{...styles.controlsButton, fontFamily: font(fontLoaded)}} title={`${songsToDelete.length === data.length ? 'Deselect' : 'Select'} all`}
                    onPress={() => {
                        songsToDelete.length === data.length ? setSongsToDelete([]) : setSongsToDelete(data.map(item => item.id))
                    }}
                    />
                </View>
                
            </>
            :
            <>
                <Text style={{...styles.playlistName, fontFamily: font(fontLoaded)}}>{playlistName}</Text>
                <Dots optY={optY} onPress={() => {
                    LayoutAnimation.easeInEaseOut()
                    setOptionsOpened(!optionsOpened)}
                }  style={{width: 20}}/>
            </>
            }
            
        </View>
        <FlatList maxToRenderPerBatch={15} windowSize={5} keyExtractor={keyExtractor} data={data} renderItem={renderItem}/>
    </View>
    {optionsOpened && !deleteSongs && <PlaylistOptions Y={optY.current} fontFamily={font(fontLoaded)}
                    openClearConfirmation={() => {
                        LayoutAnimation.easeInEaseOut()
                        setClearConfirmationOpened(true)
                        }}
                    deleteFromDevice={() => {
                        LayoutAnimation.easeInEaseOut()
                        setDeleteSongs('Delete from device')
                        }}
                    deleteFromPlaylist={() => {
                        LayoutAnimation.easeInEaseOut()
                        setDeleteSongs('Delete from playlist')
                        }}
                    addSongs={() => {
                        navigation.navigate('Choose files', {playlistName})
                        }}
                />}
    {clearConfirmationOpened && <ClearPlaylistConfirmation fontFamily={font(fontLoaded)}  playlistName={playlistName} closeCreatingPlaylistPrompt={() => {
        LayoutAnimation.easeInEaseOut()
        setClearConfirmationOpened(false)
        }}/>}

    </>
    )
})

const styles = StyleSheet.create({
    screen: {
        display: 'flex',
        flex: 1
    },
    controls: {
        display: 'flex',
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    songList: {
        zIndex: 0
    },
    playlistName: {
        fontSize: 15,
        color: '#fff'
    },
    controlsButton: {
        fontSize: 16,
        color: '#fff',
        paddingLeft: 4,
        paddingRight: 4
    }
})