import React, { useEffect, useState } from 'react'
import './chatonline.scss'
import axios from 'axios';

export default function ChatOnline({ onlineUser, currentId, currentChat }) {
    const [friends, setFriends] = useState([]);
    const [onlineFriend, setOnlineFriend] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const getFriends = async () => {
            try {
                const dataFriend = await axios.get(`${process.env.REACT_APP_API}auth/friends/${currentId}`);
                // console.log(dataFriend.data.data);
                setFriends(dataFriend.data.data)
            } catch (error) {
                console.log(error.message);
            }
        }
        getFriends();
    }, [currentId]);

    useEffect(() => {
        const friend = friends.filter(value => onlineUser.includes(value._id))
        setOnlineFriend(friend);
    }, [friends, onlineUser]);
    
    return (
        <div className="chat-online">
            {
                onlineFriend.map((item,index) => {
                    return (
                        <div className="chat-online-friend" key={index}>
                            <div className="friend-img">
                                <img
                                    src={ item?.profilePicture ? PF + item.profilePicture : PF + "person/noAvatar.png" }
                                    alt=""
                                />
                                <div className="chat-online-badge"></div>
                            </div>
                            <span className="name">{ item.username }</span>
                        </div>
                    )
                })
            }
        </div>
    )
}
