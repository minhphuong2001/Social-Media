import React, { useEffect, useState } from 'react'
import './profile.scss'
import Feed from '../../components/Feed/Feed'
import Rightbar from '../../components/RightBar/Rightbar'
import Sidebar from '../../components/SideBar/Sidebar'
import Topbar from '../../components/TopBar/Topbar'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loading from '../../components/Loading/Loading'

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const username = useParams().username;
    const authLoading = useSelector(state => state.auth.authLoading);
    // console.log(params.username);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`${process.env.REACT_APP_API}auth?username=${username}`)
            setUser(res.data.other);
            window.scrollTo(0, 0);
        }
        fetchUser();
        
    }, [username]);

    const body = authLoading ? (
        <Loading/>
    ) : (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profile-container">
                    <div className="profile-container-right">
                        <div className="profile-cover">
                            <img
                                src={user.coverPicture ? PF + user.coverPicture : PF + "person/noCover.png"}
                                alt=""
                                className="profile-cover-img"
                            />
                            <img
                                src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"}
                                alt=""
                                className="profile-avatar"
                            />
                        </div>
                        <div className="profile-infor">
                            <h4>{user.username}</h4>
                            <p>{user.description}</p>
                        </div>
                    </div>
                    <div className="profile-container-bottom">
                        <Feed username={username} />
                        <Rightbar user={user} key={user._id}/>
                    </div>
                </div>
            </div>
        </>
        
    );

    return body;
}
