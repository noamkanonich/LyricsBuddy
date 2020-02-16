import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import './Lyrics.css'
import ReactPlayer from 'react-player'
import Search from '../tracks/Search'
import VideoList from '../../youtube-components/video-list'
import VideoDetail from '../../youtube-components/video-detail'
import YTSearch from 'youtube-api-search'
import Moment from 'react-moment'


const YOUTUBE_APIKEY = 'AIzaSyAqiWZ92cBD2Wdkl7AbtEC4IXRCzoWvyfk'


class Lyrics extends Component {
    constructor(props) {
        super(props)

        this.state = {
            track: {},
            lyrics: {},
            albumCover: {},
            videos: [],
            selectedVideo: null
        }
        this.videoSearch('live your life    ')
    }

    async componentDidMount() {
        await axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
            .then(res => {
                this.setState({ lyrics: res.data.message.body.lyrics })

                return axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
            }).then(res => {
                this.setState({ track: res.data.message.body.track })

                /*
                return fetch(`https://api.lyrics.ovh/v1/${this.state.track.arti_name}/Live Your Life`).then(res => res.json()).then(json => {
                    this.setState({
                        isLoaded: true,
                        items: json
                    })
                })
                */
            })
            .catch(err => console.log(err))

        await axios.get(`https://ws.audioscrobbler.com/2.0/?method=album.search&album=${this.state.track.album_name}&api_key=9d75fef99463652339f393a066f00899&format=json`)
            .then(res => {
                this.setState({ albumCover: res.data.results.albummatches.album })
            })
            .catch(err => console.log(err))

    }

    //func for searching youtube video
    videoSearch(searchTerm) {
        YTSearch({ key: YOUTUBE_APIKEY, term: searchTerm },
            (data => {
                this.setState({ videos: data, selectedVideo: data[0] })
            }))
    }


    render() {
        const { track, lyrics, albumCover } = this.state
        var { isLoaded, items } = this.state
        if (track === undefined || lyrics === undefined || Object.keys(track).length === 0 || Object.keys(lyrics).length === 0
            || albumCover === undefined || Object.keys(albumCover).length === 0) {
            return <Spinner />
        }
        else {
            return (

                <React.Fragment>
                    <Link to="/" className="btn btn-dark btn-md mb-4">Go Back</Link>
                    <div className="card">

                        <h5 className="card-header">
                            <img src={albumCover[0].image[3][Object.keys(albumCover[0].image[3])[0]] || "http://s.mxmcdn.net/images-storage/albums/nocover.png"}
                                alt={`Album cover ${track.album_name}`}
                                className="img-thumbnail mt-6"
                                style={{ width: 120, height: 120 }}
                            />
                            <span style={{ marginLeft: 20, fontSize: 26 }}>{track.track_name} - {' '}</span>
                            <span className="text-secondary" style={{ fontSize: 26 }}>{track.artist_name}</span>
                        </h5>
                        <div className="card-body">
                            <p className="card-text">
                                <div className="display-linebreak" style={{ fontSize: 20 }}>
                                    {lyrics.lyrics_body.slice(0, -74)}
                                    {/* {items.lyrics} */}
                                    <br />
                                </div>
                            </p>
                        </div>
                    </div>

                    <ul className="list-group mt-3">
                        <li className="list-group-item">
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                {/* <ReactPlayer url='https://www.youtube.com/watch?v=weRHyjj34ZE' controls={true} /> */}
                                {this.videoSearch(this.state.track.track_name)}
                                <VideoDetail video={this.state.selectedVideo} />

                            </div>
                        </li>
                        <li className="list-group-item">
                            <strong>Album ID</strong>: {track.album_id}
                        </li>

                        <li className="list-group-item">
                            <strong>Song Genre</strong>: {track.primary_genres.music_genre_list.length === 0 ? "none" :
                                track.primary_genres.music_genre_list[0].music_genre.music_genre_name}
                        </li>

                        <li className="list-group-item">
                            <strong>Explicit Words</strong>: {track.explicit === 0 ? 'No' : 'Yes'}
                        </li>

                        <li className="list-group-item">
                            <strong>Release Date</strong>: <Moment format="MM/DD/YYYY">{track.release_date}</Moment>
                        </li>
                    </ul>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                    </div>
                </React.Fragment>
            )
        }
    }
}

export default Lyrics;
