import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';

const AddPostScreen = () => {
    return(
        <View style={styles.container}>
            <Text>Add Post Screen</Text>
            <Button
                title="Clicke Here"
                onPress={()=> alert('Button Clicked!')}
            />
        </View>
    );
};

export default AddPostScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});