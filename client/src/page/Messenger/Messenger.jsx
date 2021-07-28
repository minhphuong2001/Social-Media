import React, { useEffect, useRef, useState } from 'react'
import Conversation from '../../features/Chat/Conversation/Conversation'
import ProtectedRoute from '../../components/routing/ProtectedRoute'
import Topbar from '../../components/TopBar/Topbar'
import './messenger.scss'
import Message from '../../features/Chat/Message/Message'
import ChatOnline from '../../features/Chat/ChatOnline/ChatOnline'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Alert } from 'antd'
import {io} from 'socket.io-client'

function Messenger() {
    const user = useSelector(state => state.auth.user);
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUser, setOnlineUser] = useState([])
    const scrollRef = useRef();
    const socket = useRef()

    useEffect(() => {
        socket.current = io("ws://localhost:5000");
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                content: data.content,
                createdAt: Date.now()
            })
        })
    }, []);

    useEffect(() => {
        arrivalMessage &&
            currentChat.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat])

    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (users) => {
            // console.log("users: ", users);
            const userFollowing = user.followings.filter((id) => users.some((value) => value.userId === id))
            setOnlineUser(userFollowing)
        })
    }, [user]);

    useEffect(() => {
        const getConversation = async () => {
            try {
                const conData = await axios.get(`${process.env.REACT_APP_API}conversation/${user._id}`);
                // console.log(conData);
                setConversations(conData.data.data);
            } catch (error) {
                console.log(error.message);
            }
        }
        
        getConversation();
    }, [user._id]);

    useEffect(() => {
        const getMessage = async () => {
            try {
                const mesData = await axios.get(`${process.env.REACT_APP_API}message/${currentChat?._id}`);
                // console.log(mesData.data.data);
                setMessages(mesData.data.data);
            } catch (error) {
                console.log(error.message);
            }
        }
        getMessage();
    }, [currentChat])

    const handleSend = async(e) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            content: newMessage,
            conversationId: currentChat._id
        }

        const receiverId = currentChat.members.find(value => value !== user._id)
        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            content: newMessage
        })

        try {
            const res = await axios.post(`${process.env.REACT_APP_API}message`, message);
            // console.log(res.data.data);
            setMessages([...messages, res.data.data]);
            setNewMessage("");
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    },[messages])

    return (
        <>
            <Topbar/>
            <div className="messenger">
                <div className="chat-menu">
                    <div className="chat-menu-container">
                        <input type="text" placeholder="Search for friends" name="" />
                        {
                            conversations.map((item) => {
                                return (
                                    <div key={item.id} onClick={() => setCurrentChat(item)}>
                                        <Conversation
                                            conversation={item}
                                            curUser={user}
                                        />
                                    </div>
                                    
                                )
                            })
                        }
                    </div>
                </div>
                <div className="chatbox">
                    <div className="chatbox-container">
                        {
                            currentChat ?
                        <>
                            <div className="chatbox-top">
                                {
                                    messages.map((item) => {
                                        return (
                                            <div
                                                key={item.id}
                                                ref={scrollRef}
                                            >
                                                <Message
                                                    message={item}
                                                    own={item.sender === user._id}
                                                />
                                            </div>
                                        )
                                    })            
                                }
                            </div>
                            <div className="chatbox-bottom">
                                <textarea
                                    className="chat-message"
                                    placeholder="write something..."
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    value={newMessage}        
                                >
                                </textarea>
                                <button onClick={handleSend}>Send</button>
                            </div>
                            </> :
                                <Alert
                                    description="Open a conversation to start chat."
                                    type="info"
                                    showIcon
                                    closable
                                />
                        }
                        
                    </div>
                </div>
                <div className="chat-online">
                    <div className="chat-online-container">
                        <ChatOnline
                            onlineUser={onlineUser}
                            currentId={user._id}
                            currentChat={setCurrentChat}
                        />
                    </div>
                </div>
            </div>
        </>
        
    )
}

const MessWithHOC = ProtectedRoute(Messenger);

export default MessWithHOC;