import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, LayoutAnimation } from "react-native";
import PromtButton from './PlaylistButton.js'

export default ({playlists, closeCreatingPlaylistPrompt, fontFamily}) => {
    const [playlistName, setPlaylistName] = useState('')
    const cantCreate = playlistName === '' || playlists.includes(playlistName)
    return (
        <View style={styles.wrapper}>
            <View style={styles.createPlaylist}>
                <Text style={{...styles.title, fontFamily}}>
                    Create playlist
                </Text>
                {playlists.includes(playlistName) && <Text style={{...styles.warning, fontFamily}}>
                   Playlist {playlistName} already exists
                </Text>}
                <TextInput placeholderTextColor="#ccc" style={{...styles.input, fontFamily}} placeholder="Enter playlist's name" onChangeText={value => setPlaylistName(value)} defaultValue={playlistName}/>
                <View style={styles.buttonWrapper}>
                    <PromtButton style={{borderRadius: 5}} textStyle={{...styles.button, fontFamily}} title="Cancel" onPress={closeCreatingPlaylistPrompt}/>
                    <PromtButton onPress={() => {
                        closeCreatingPlaylistPrompt()
                    }} style={{borderRadius: 5}} textStyle={{...styles.button, fontFamily, color: cantCreate ? '#ccc' : '#fff'}} disabled={cantCreate} title="Create"/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, .5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
    },
    createPlaylist: {
        width: '70%',
        backgroundColor: '#333838',
        padding: 5,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        color: '#fff'
    },
    warning: {
        color: '#c7002f',
        fontSize: 16,
        marginTop: -10
    },
    input: {
        fontSize: 16,
        width: '80%',
        color: '#fff',
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        height: 25
    },
    buttonWrapper: {
        width: '80%',
        marginTop: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    button: {
        fontSize: 16,
        color: '#fff',
        paddingLeft: 4,
        paddingRight: 4
    }
})