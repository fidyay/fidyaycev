import React from "react";
import Logo from "../svg_components/Logo.jsx"
import { View, StyleSheet } from "react-native"

const styles = StyleSheet.create({
    splash: {
        display: 'flex',
        backgroundColor: '#1EA896',
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center',
    }
})


const SplashScreen = () => {
    return <View style={styles.splash}>
            <Logo animated style={{width: '70%'}}/>
           </View>
}


export default SplashScreen