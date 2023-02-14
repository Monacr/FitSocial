import React, {useEffect, useState} from 'react';
import Ionicons from "react-native-vector-icons/Ionicons";
import {Container,} from '../styles/FeedStyles.js';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView,
    Alert,
    TouchableOpacity,
  } from 'react-native';
import PostCard from '../components/PostCard';

    const Posts = [
    {
        id: '1',
        userName: 'Jenny Doe',
        userImg: require('../pics/user1.png'),
        postTime: '4 mins ago',
        post: 'Hey there, this is my test for a post of my social app in React Native.',
        postImg: require('../pics/post2.jpg'),
        liked: true,
        likes: '0',
        comments: '5',
    },
    {
        id: '2',
        userName: 'Dobby Doe',
        userImg: require('../pics/user2.jpg'),
        postTime: '5 mins ago',
        post: 'Im active.',
        postImg: 'none',
        liked: false,
        likes: '14',
        comments: '0',
    },
    {
        id: '3',
        userName: 'Froggy Doe',
        userImg: require('../pics/user3.jpg'),
        postTime: '10 mins ago',
        post: 'Spot me',
        postImg: 'none',
        liked: true,
        likes: '1',
        comments: '1',
    },
  ];

  const HomeScreen = ({navigation}) => {
    return (
        <Container>
            <FlatList
                data= {Posts}
                renderItem={({item}) => <PostCard item={item} />}
                keyExtractor={item=>item.id}
                showsVerticalScrollIndicator={false}
            />
        </Container>
    );
  };

  export default HomeScreen;

