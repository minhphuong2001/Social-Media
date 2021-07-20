import React from 'react'
import Conversation from '../../features/Chat/Conversation/Conversation'
import ProtectedRoute from '../../components/routing/ProtectedRoute'
import Topbar from '../../components/TopBar/Topbar'
import './messenger.scss'
import Message from '../../features/Chat/Message/Message'
import ChatOnline from '../../features/Chat/ChatOnline/ChatOnline'

function Messenger() {
    return (
        <>
            <Topbar/>
            <div className="messenger">
                <div className="chat-menu">
                    <div className="chat-menu-container">
                        <input type="text" placeholder="Search for friends" name="" />
                        <Conversation/>
                    </div>
                </div>
                <div className="chatbox">
                    <div className="chatbox-container">
                        <div className="chatbox-top">
                            <Message/>
                            <Message own={true}/>
                            <Message/>
                            <Message/>
                            <Message/>
                            <Message/>
                            <Message/>
                            <Message/>
                            <Message/>
                            <Message/>
                            <Message/>
                            <Message/>
                        </div>
                        <div className="chatbox-bottom">
                            <textarea className="chat-message" placeholder="write something..."></textarea>
                            <button>Send</button>
                        </div>
                    </div>
                </div>
                <div className="chat-online">
                    <div className="chat-online-container">
                        <ChatOnline/>
                    </div>
                </div>
            </div>
        </>
        
    )
}

const MessWithHOC = ProtectedRoute(Messenger);

export default MessWithHOC;