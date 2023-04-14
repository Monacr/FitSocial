import React, {useState} from 'react';
import {Container, Card, UserInfo, UserImg, UserName, UserInfoText, PostTime, PostText, PostImg, Interaction, InteractionWrapper, Divider, InteractionText} from '../styles/FeedStyles';
import Ionicons from "react-native-vector-icons/Ionicons";

const PostCard = ({item}) =>{
    const [likes, setLikes] = useState(item.likes);
    const [liked, setLiked] = useState(item.liked);

    const handleLike = () => {
        if (liked) {
            setLikes(likes - 1);
            setLiked(false);
        } else {
            setLikes(likes + 1);
            setLiked(true);
        }
    };

    let likeIcon = liked ? 'heart' : 'heart-outline';
    let likeIconColor = liked ? '#2e64e5' : '#333';
    let likeText = likes === 1 ? '1 Like' : `${likes} Likes`;
    let commentText = null;
    if(item.comments==1){
        commentText = '1 Comment';
    } else if(item.comments > 1){
        commentText = item.comments + ' Comments';
    } else{
        commentText = 'Comment';
    }

    return(
        <Card>
            <UserInfo>
                <UserImg source={item.userImg} />
                <UserInfoText>
                    <UserName>{item.userName}</UserName>
                    <PostTime>{item.postTime}</PostTime>
                </UserInfoText>
            </UserInfo>
            <PostText>{item.post}</PostText>
            {item.postImg != 'none' ? <PostImg source={item.postImg}/> : <Divider/>}
            <InteractionWrapper>
                <Interaction active={liked} onPress={handleLike}>
                    <Ionicons name={likeIcon} size={25} color={likeIconColor} />
                    <InteractionText active={liked}>{likeText}</InteractionText>
                </Interaction>
                <Interaction>
                    <Ionicons name="md-chatbubble-outline" size={25} />
                    <InteractionText>{commentText}</InteractionText>
                </Interaction>
            </InteractionWrapper>
        </Card> 
    );
};

export default PostCard;
