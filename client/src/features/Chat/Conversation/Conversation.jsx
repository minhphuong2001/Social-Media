import React, { useEffect, useState } from 'react'
import './conversation.scss'
import axios from 'axios';

export default function Conversation({ conversation, curUser }) {
    const [user, setUser] = useState(null);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const friendId = conversation.members.find((value) => value !== curUser._id);
        const getUser = async () => {
            try {
                const resData = await axios.get(`${process.env.REACT_APP_API}auth?userId=${friendId}`);
                // console.log(resData.data.other);
                setUser(resData.data.other)
            } catch (error) {
                console.log(error.message);
            }
        }

        getUser();
    }, [curUser, conversation]);

    return (
        <div className="conversation">
            <img
                src={user?.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"}
                alt=""
            />
            <span>{user?.username}</span>
        </div>
    )
}
