import { makeAutoObservable, when, autorun, action } from 'mobx'
import AsyncStorage from '@react-native-async-storage/async-storage'

class State {
    playlists = {}
    currentSong = {}
    constructor () {
        makeAutoObservable(this)
        when(() => true, async () => {
            const state = await AsyncStorage.getItem('state')
            const oldState = JSON.parse(state)
            if (oldState) {
                this.playlists = oldState.playlists
                this.currentSong = oldState.currentSong
            }
        })
        autorun(() => {
            if (JSON.stringify(this) === '{"playlists":{},"currentSong":{}}') return
            AsyncStorage.setItem('state', JSON.stringify(this))
        })
    }
    addSongs(playlistName, songs) {
        this.playlists[playlistName].push(...songs)
    }
    setCurrentSong(song) {
        this.currentSong = song
    }
    createPlaylist(playlistName) {
        this.playlists[playlistName] = []
    }
    deletePlaylists(playlistsArr) {
        for (let playlist of playlistsArr) {
            delete this.playlists[playlist]
        }
    }
}

export default new State