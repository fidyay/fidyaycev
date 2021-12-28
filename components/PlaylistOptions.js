import React from "react";
import { View, StyleSheet } from "react-native";
import PlaylistButton from "./PlaylistButton.js";

export default ({fontFamily, openClearConfirmation, deleteFromDevice, deleteFromPlaylist, addSongs, Y}) => {
    return ( 
            <View style={{...styles.options, top: Y}}>
                <PlaylistButton style={styles.button} textStyle={{...styles.buttonText, fontFamily}} title='Add songs'
                    onPress={addSongs}
                />
                <PlaylistButton style={styles.button} textStyle={{...styles.buttonText, fontFamily}} title='Delete from playlist'
                    onPress={deleteFromPlaylist}
                />
                <PlaylistButton style={styles.button} textStyle={{...styles.buttonText, fontFamily}} title='Delete from device'
                    onPress={deleteFromDevice}
                />
                <PlaylistButton style={styles.button} textStyle={{...styles.buttonText, fontFamily}} title='Clear playlist' 
                    onPress={openClearConfirmation}
                />
            </View>
    )
}

const styles = StyleSheet.create({
    options: {
        position: 'absolute',
        right: 10,
        borderRadius: 5,
        display: 'flex',
        backgroundColor: '#333838',
        zIndex: 998
    },
    button: {
        padding: 5
    },
    buttonText: {
        fontSize: 16,
        color: '#fff'
    }
})