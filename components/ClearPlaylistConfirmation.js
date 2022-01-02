import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ConfirmationButton from './PlaylistButton.js'
import state from "../global-state/state.js";

export default ({playlistName, closeCreatingPlaylistPrompt, fontFamily}) => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.confirmation}>
                <Text style={{...styles.title, fontFamily}}>
                    Clear playlist "{playlistName}"
                </Text>
                <View style={styles.buttonWrapper}>
                    <ConfirmationButton style={{borderRadius: 5}} textStyle={{...styles.button, fontFamily}} title="Cancel" onPress={closeCreatingPlaylistPrompt}/>
                    <ConfirmationButton onPress={() => {
                        closeCreatingPlaylistPrompt()
                        state.clearPlaylist(playlistName)
                    }} style={{borderRadius: 5}} textStyle={{...styles.button, fontFamily}} title="Clear"/>
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
    confirmation: {
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