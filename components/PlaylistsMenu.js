import React, { useState, useEffect } from "react";
import { View, Text, TouchableNativeFeedback, FlatList, StyleSheet, LayoutAnimation} from 'react-native';
import Checkbox from '../svg_components/Checkbox.jsx';
import { useFonts } from 'expo-font';
import PlaylistButton from "./PlaylistButton.js";
import CreateNewPlaylist from "./CreateNewPlaylist.js";
import OpenCloseMenu from "../svg_components/OpenCloseMenu.jsx";
import font from "../functions/font.js";
import { useNavigation } from '@react-navigation/native'


export default ({opened, closeMenu}) => {
    const navigation = useNavigation()
    const [deletePlaylists, setDeletePlaylists] = useState(false)
    const [openedPlaylist, setOpenedPlaylist] = useState('')
    const [playlistsToDelete, setPlaylistsToDelete] = useState([])
    const [createPlaylist, setCreatePlaylist] = useState(false)
    const playlists = [{
        name: 'skipidypaparabajhjjbjb'
    },{
        name: 'gjj'
    },{
        name: 'ldk'
    },
    {
        name: ',jk'
    },{
        name: '.,/gjj'
    },{
        name: 'dfgf'
    },
]
    const [fontLoaded] = useFonts(
        {
            Rowdies: require('../assets/fonts/Rowdies-Regular.ttf')
        }
    )



 


    return <>
    <View style={{...styles.menu, left: opened ? 0 : -140}}>
        <View style={styles.titleAndCloseWrapper}>
            <Text style={{...styles.title, fontFamily: font(fontLoaded)}}>Playlists</Text>
            <OpenCloseMenu closer onPress={closeMenu} style={{width: 25, alignSelf: 'flex-end', marginBottom: -15}}/>
        </View>
        <FlatList keyExtractor={(_, index) => index.toString()} style={styles.playlists}
        showsVerticalScrollIndicator={false}
        data={playlists} renderItem={({item}) => 
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('rgba(119, 122, 120 .5)', false)}
            onPress={() => {
                if (!deletePlaylists) {
                    setOpenedPlaylist(item.name)
                    navigation.navigate('Playlist', {
                        playlistName: item.name
                    })
                    return
                }
                if (playlistsToDelete.includes(item.name)) {
                    const playlists = []
                    playlistsToDelete.forEach(playlist => {
                        if (playlist === item.name) return
                        playlists.push(playlist)
                    })
                    setPlaylistsToDelete(playlists)
                    return
                }
                setPlaylistsToDelete([...playlistsToDelete, item.name])

            }}>
                <View style={deletePlaylists ? {...styles.playlist, ...styles.deletingPlaylists} : openedPlaylist === item.name ? {...styles.playlist, backgroundColor: 'rgb(191, 141, 4)'} : styles.playlist}>
                    <Text style={{fontFamily: font(fontLoaded), textAlign: 'center', fontSize: 16, color: '#fff', paddingLeft: 4, paddingRight: 4, width: '100%', flexShrink: 1}}>
                        {item.name}
                    </Text>
                    {deletePlaylists && <Checkbox checked={playlistsToDelete.includes(item.name)} style={{width: 14, flexShrink: 0, flexGrow: 0, marginRight: 4}}/>}
                </View>
            </TouchableNativeFeedback>}/>
        <PlaylistButton style={styles.controls}
        onPress={() => {
            LayoutAnimation.easeInEaseOut()
            setCreatePlaylist(true)
            }}
                textStyle={{fontFamily: font(fontLoaded), textAlign: 'center', fontSize: 16, color: '#fff', width: '100%'}}
                title={deletePlaylists ? 'Ok' : 'Create playlist'}
            />
        <PlaylistButton style={{...styles.controls, borderBottomWidth: 1, borderBottomColor: '#fff'}}
            textStyle={{fontFamily: font(fontLoaded), textAlign: 'center', fontSize: 16, color: '#fff', width: '100%'}}
            title={deletePlaylists ? 'Cancel' : 'Delete playlist'}
            onPress={() => {
                LayoutAnimation.easeInEaseOut()
                setDeletePlaylists(!deletePlaylists)
                }}
        />
    </View>
    {createPlaylist && <CreateNewPlaylist fontFamily={font(fontLoaded)} playlists={playlists.map(playlist => playlist.name)} closeCreatingPlaylistPrompt={() => {
        LayoutAnimation.easeInEaseOut()
        setCreatePlaylist(false)
        }}/>}
    </>

     
}

const styles = StyleSheet.create({
    menu: {
        display: 'flex',
        position: 'absolute',
        width: 140,
        height: '100%',
        backgroundColor: '#3E6259',
        alignItems: 'center',
        left: -140,
        zIndex: 999
    },
    titleAndCloseWrapper: {
        display: 'flex', 
        flexDirection: 'column-reverse', 
        alignItems: 'center', 
        width: '100%', 
        paddingLeft: 10, 
        paddingRight: 10, 
        paddingTop: 7
    },
    title: {
        fontSize: 20,
        paddingTop: 5,
        paddingBottom: 5,
        color: '#fff'
    },
    playlists: {
        width: '100%',
        maxWidth: 140,
        flexGrow: 0, 
    },
    playlist: {
        padding: 2
    },
    deletingPlaylists: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    controls: {
        backgroundColor: 'transparent',
        borderTopWidth: 1,
        borderTopColor: '#fff',
        width: '100%',
        paddingBottom: 2,
        paddingTop: 2
    }

})