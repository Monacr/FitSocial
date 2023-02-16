import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Button,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingScreen = ({navigation}) => {
    return(
            <View style={styles.container}>
                <Text style={styles.topPage}> Fit Social Settings</Text>
                <Button onPress={() => navigation.navigate("Login")} title="Log Out"  />
            </View>
    );
};

export default SettingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    topPage: {
        fontSize: 26,
        paddingTop: 10
    }
});