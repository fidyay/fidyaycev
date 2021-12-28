import React, { useState } from "react"
import { View, FlatList, StyleSheet, Text } from "react-native"
import FolderComponent from "./FolderComponent.js"
import SongFile from "./SongFile.js"
import font from "../functions/font.js"
import { useFonts } from "expo-font"
import FilesButton from "./PlaylistButton.js"
import Arrow from "../svg_components/Arrow.jsx"

export default ({navigation}) => {
    const foldersData = [
        {
            name: 'abvgd'
        },
        {
            name: 'ejz'
        },
        {
            name: 'iklm'
        }
    ]
    const songsData = [
        {
            name: 'abvgd.mp3',
            file: true
        },
        {
            name: 'dnkjn.mp3',
            file: true
        },
        {
            name: 'prelast.mp3',
            file: true
        },
        {
            name: 'last.mp3',
            file: true
        },
    ]

    const [fontLoaded] = useFonts(
        {
            Rowdies: require('../assets/fonts/Rowdies-Regular.ttf')
        }
    )

    const startingPath = '/storage/emulated/0'

    const [songsToAdd, setSongsToAdd] = useState([])
    const [currentPath, setCurrentPath] = useState(startingPath)
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
                    onPress={() => {
                        navigation.goBack()
                    }}
                    disabled={songsToAdd.length === 0}
                    textStyle={{...styles.buttonText, color: songsToAdd.length === 0 ? '#ccc' : '#fff', fontFamily: font(fontLoaded)}}
                    style={styles.button}
                />
            </View>
            <Text style={{...styles.title, fontFamily: font(fontLoaded)}}>Choose files</Text>
            <Text style={{...styles.path, fontFamily: font(fontLoaded)}}>{currentPath}</Text>
            <View style={{...styles.buttonWrapper, justifyContent: currentPath !== startingPath ? 'space-between' : 'flex-end'}}>
                {currentPath !== startingPath && <Arrow
                    style={{width: 23}}
                    onPress={() => {
                        const index = currentPath.lastIndexOf('/')
                        setCurrentPath(currentPath.slice(0, index))
                    }}
                />}
                <FilesButton
                    title={songsToAdd.length !== songsData.length ? 'Select all' : 'Deselect all'}
                    textStyle={{...styles.buttonText, fontFamily: font(fontLoaded)}}
                    style={styles.button}
                    onPress={() => {
                        if (songsData.length === songsToAdd.length) {
                            setSongsToAdd([])
                            return
                        }
                        setSongsToAdd([...songsData.map(song => song.name)])

                    }}
                />
            </View>
            <View style={styles.list}>
                <FlatList keyExtractor={(_, index) => index.toString()} data={[...foldersData, ...songsData]} renderItem={({item}) => {
                    return item.file ? 
                    <SongFile songName={item.name} fontFamily={font(fontLoaded)} checked={songsToAdd.includes(item.name)}
                        onPress={() => {
                            if (songsToAdd.includes(item.name)) {
                                const newSongsToAdd = []
                                for (const song of songsToAdd) {
                                    if (song === item.name) continue
                                    newSongsToAdd.push(song)
                                }
                                setSongsToAdd([...newSongsToAdd])
                                return
                            } 
                            setSongsToAdd([...songsToAdd, item.name])
                        }}
                    />
                    :
                    <FolderComponent onPress={() => {
                        setCurrentPath(currentPath + `/${item.name}`)
                    }} folderName={item.name} fontFamily={font(fontLoaded)}/>
                }}/>
            </View>
            
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
    path: {
        color: '#fff',
        fontSize: 15,
        paddingRight: 10,
        paddingLeft: 10
    },
    list: {
        width: '100%',
        display: 'flex'
    }
})