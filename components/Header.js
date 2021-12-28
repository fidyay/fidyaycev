import React from "react";
import Logo from "../svg_components/Logo.jsx"
import { View, StyleSheet } from "react-native";
import OpenCloseMenu from "../svg_components/OpenCloseMenu.jsx"


export default ({openMenu}) => {
    return <View style={styles.header}>
        <Logo style={{height: 30}}/>
        <OpenCloseMenu style={{width: 27}} onPress={openMenu}/>
    </View>
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#1EA896', 
        paddingTop: 10, 
        paddingBottom: 10, 
        width: '100%',
        display: 'flex',
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})