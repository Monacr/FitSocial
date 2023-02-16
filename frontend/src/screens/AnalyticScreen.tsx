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

const AnalyticScreen = ({navigation}) => {
    return(
        <View style={styles.container}>
            <Text>These are your Analytics</Text>
        </View>
    );
};

export default AnalyticScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});