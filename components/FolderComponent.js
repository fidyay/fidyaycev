import React from "react"
import { View, TouchableNativeFeedback, Text, StyleSheet } from "react-native"
import FolderImage from "../svg_components/FolderImage.jsx"

export default ({folderName, fontFamily, onPress}) => {
    return (
    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('rgba(119, 122, 120 .5)', false)}
    onPress={onPress}>
            <View style={styles.folder}>
                <FolderImage style={styles.image}/>
                <Text style={{...styles.text, fontFamily}}>
                    {folderName}
                </Text>
            </View>
    </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({
    folder: {
        backgroundColor: 'rgba(0, 0, 0, .2)',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },
    image: {
        width: 31.67,
        marginRight: 10
    },
    text: {
        fontSize: 15,
        color: '#fff'
    }
})