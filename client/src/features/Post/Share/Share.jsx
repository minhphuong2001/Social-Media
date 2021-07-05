import React from 'react'
import avatar from '../../../assets/images/avatar.jpg'
import './share.scss'
import {EmojiEmotions, PermMedia, Videocam} from '@material-ui/icons'

export default function Share() {
    return (
        <div className="share">
            <div className="share-container">
                <div className="share-top">
                    <img src={avatar} alt="" />
                    <input type="text" placeholder="Minh Phuong, What are you thinking?" />
                </div>
                <hr className="share-hr"/>
                <div className="share-bottom">
                    <div className="share-option">
                        <div className="share-option-item">
                            <Videocam className="video-icon"/>
                            <span>Video Direction</span>
                        </div>
                        <div className="share-option-item">
                            <PermMedia className="image-icon"/>
                            <span>Photo/Video</span>
                        </div>
                        <div className="share-option-item">
                            <EmojiEmotions className="emoji-icon"/>
                            <span>Feelings/Actions</span>
                        </div>
                    </div>
                    <button>Share</button>
                </div>
            </div>
        </div>
    )
}
