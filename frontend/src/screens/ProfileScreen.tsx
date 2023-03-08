import React, {useState, useContext} from 'react';
import {View, StyleSheet, StyleSheetProperties} from 'react-native';
import {Avatar, Title, Caption, Text, TouchableRipple} from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Share from 'react-native-share';
import {useAuth} from "../components/AuthProvider";
import Ionicons from "react-native-vector-icons/Ionicons";
import {PrimaryBlue} from "../constants";

const ProfileScreen = ({navigation}) => {
    const {authUser} = useAuth();
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.userInfoSection}>
                <View style={styles.icon}>
                    <Ionicons name="person-outline"
                              size={60}
                              style={{alignSelf:'center'}}
                    />
                </View>

                    <View style={{marginLeft: 20}}>
                        <Title style={ {
                            marginTop: 15,
                            marginBottom: 5,
                        }}>{authUser}</Title>
                        <Caption style={styles.caption}>{authUser}@gmail.com</Caption>
                    </View>
            </View>
        </SafeAreaView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }, userInfoSection: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    }, icon: {
        textAlign: 'center',
        backgroundColor: '#CFCFCF',
        borderRadius: 100,
        height: 75,
        width: 75
    }

});