import React from 'react'
import './message.scss'
import {format} from 'timeago.js'
import { useSelector } from 'react-redux';
// import axios from 'axios';

export default function Message({ message, own}) {
    const user = useSelector(state => state.auth.user);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    // const [friend, setFriend] = useState(null);

    // useEffect(() => {
    //     const getFriend = async () => {
    //         const res = await axios.get(`${process.env.REACT_APP_API}conversation/${user._id}`);
    //         // console.log(res.data.data);
    //         setFriend(res.data.data);
    //     }
    //     getFriend();
    // }, [user])
    // console.log(friend);

    return (
        <div className={own ? "message own" : "message"}>
            <div className="message-top">
                <img
                    src={user?.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"}
                    alt="" 
                />
                <p>{message?.content}</p>
            </div>
            <div className="message-bottom">
                {format(message?.createdAt)}
            </div>
        </div>
    )
}
