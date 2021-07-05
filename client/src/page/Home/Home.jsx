import React from 'react'
import Feed from '../../components/Feed/Feed'
import Rightbar from '../../components/RightBar/Rightbar'
import ProtectedRoute from '../../components/routing/ProtectedRoute'
import Sidebar from '../../components/SideBar/Sidebar'
import Topbar from '../../components/TopBar/Topbar'
import './home.scss'

function Home() {
    return (
        <>
            <Topbar/>
            <div className="home">
                <Sidebar />
                <Feed />
                <Rightbar />
            </div>
        </>
        
    )
}

const HomeWithHOC = ProtectedRoute(Home);

export default HomeWithHOC;
