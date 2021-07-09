import React from 'react'
import {Chat, Notifications, Person, Search} from '@material-ui/icons'
// import avatar from '../../assets/images/avatar.jpg'
import './topbar.scss'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
    
export default function Topbar() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const user = useSelector(state => state.auth.user);
    // console.log(user);

    const style = {
        textDecoration: "none",
        color: "#fff"
    }

    return (
        <div className="topbar">
            <div className="topbar-left">
                <Link to="/home" style={{textDecoration: "none"}}>
                    <span>Min</span>
                </Link>

            </div>
            <div className="topbar-center">
                <div className="searchbar">
                    <Search className="search-icon"/>
                    <input placeholder="Search for friend" className="search-input"/>
                </div>
            </div>
            <div className="topbar-right">
                <div className="topbar-right-link">
                    <Link to={`/profile/${user.username}`} style={style}>
                        <img
                            src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"}
                            alt=""
                        />
                        <span className="link-user">{user.username}</span>
                    </Link>
                    
                    <span>Timeline</span>
                </div>
                <div className="topbar-right-icons">
                    <div className="icon-item">
                        <Person />
                        <span className="badge">1</span>
                    </div>
                    <div className="icon-item">
                        <Chat/>
                        <span className="badge">2</span>
                    </div>
                    <div className="icon-item">
                        <Notifications/>
                        <span className="badge">1</span>
                    </div>
                </div>
                <button>Log out</button>
                
            </div>
        </div>
    )
}
