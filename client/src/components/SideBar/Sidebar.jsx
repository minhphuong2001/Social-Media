import React from 'react'
import './sidebar.scss'
// import avatar from '../../assets/images/avatar.jpg'
import { Bookmark, Event, GroupAdd, HelpOutline, PeopleAlt, PlayCircleFilledOutlined, School, SportsEsports, Work } from '@material-ui/icons'
import Users from '../../global/user'
import CloseFriend from '../CloseFriend/CloseFriend'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

export default function Sidebar() {
    const user = useSelector(state => state.auth.user)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const style = {
        textDecoration: "none",
        color: "#000"
    }

    return (
        <div className="sidebar">
            <div className="sidebar-container">
                <ul className="sidebar-container-list">
                    <Link to={`/profile/${user.username}`} style={style}>
                        <li className="sidebar-list-item"> 
                            <img
                                src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"}
                                alt=""
                                className="sidebar-img"
                            />
                            <span>{user.username}</span>
                        </li>
                    </Link>
                    <li className="sidebar-list-item">
                        <PeopleAlt className="icon"/>
                        <span>Friend</span>
                    </li>
                    <li className="sidebar-list-item">
                        <GroupAdd className="icon"/>
                        <span>Group</span>
                    </li>
                    <li className="sidebar-list-item">
                        <PlayCircleFilledOutlined className="icon"/>
                        <span>Watch</span>
                    </li>
                    <li className="sidebar-list-item">
                        <HelpOutline className="icon"/>
                        <span>Questions</span>
                    </li>
                    <li className="sidebar-list-item">
                        <Bookmark className="icon"/>
                        <span>Bookmark</span>
                    </li>
                    <li className="sidebar-list-item">
                        <Work className="icon"/>
                        <span>Jobs</span>
                    </li>
                    <li className="sidebar-list-item">
                        <School className="icon"/>
                        <span>Courses</span>
                    </li>
                    <li className="sidebar-list-item">
                        <Event className="icon"/>
                        <span>Events</span>
                    </li>
                    <li className="sidebar-list-item">
                        <SportsEsports className="icon"/>
                        <span>Games</span>
                    </li>
                </ul>
                <button>Show more</button>
                <hr />
                <ul className="list-friend">
                    {Users.map(item => {
                        return (
                            <CloseFriend
                                key={item.id}
                                user={item}
                            />
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
