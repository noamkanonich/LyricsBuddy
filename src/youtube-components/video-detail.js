import React from 'react'
import Spinner from '../components/layout/Spinner'

const VideoDetail = (props) => {
    const video = props.video

    if (!video) {
        return (<div>
            <Spinner />
        </div>)
    }

    const videoId = video.id.videoId;
    const url = `https://www.youtube.com/embed/${videoId}`;

    return (
        <div className="video-detail col-md-8">
            <div className="embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item" src={url}></iframe>
                <div></div>
            </div>

        </div>
    )
}

export default VideoDetail;