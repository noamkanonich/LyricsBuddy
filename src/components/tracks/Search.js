
import React, { Component } from 'react'
import axios from 'axios'
import { Consumer } from '../../context'
import YTSearch from 'youtube-api-search'
import VideoList from '../../youtube-components/video-list'
import './Search.css'

class Search extends Component {

    state = {
        trackTitle: '',
        term: ''
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            term: event.target.value
        })
    }

    findTrack = (dispatch, event) => {
        event.preventDefault();

        axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=24&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`)
            .then(res => {
                dispatch({
                    type: 'SEARCH_TRACKS',
                    payload: res.data.message.body.track_list
                })
                // this.setState({ track_list: res.data.message.body.track_list })
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                            <div className="card card-body mb-5 p-a">
                                <div className="row justify-content-center" >
                                <h1 className="display-6 text-center" style={{marginTop: 20}}>
                                            <i className="fas fa-music"  style={{ fontSize: 50 }} /> <strong style={{ fontSize: 50 }}> Search For A Song</strong>
                                        </h1>
                                    <div className="col-12 col-md-10 col-lg-8" >
                                        <p className="lead text-center">Get the lyrics for any song</p>
                                        <form onSubmit={this.findTrack.bind(this, dispatch)}>

                                            <div className="card-body row no-gutters align-items-center">
                                                <div className="col-auto" >
                                                    <i className="fas fa-search h2 text-body" ></i>
                                                </div>
                                                <div className="col" style={{ marginLeft: 10 }}>
                                                    <input className="form-control form-control-lg form-control-borderless"
                                                        type="search"
                                                        placeholder="song name.."
                                                        name="trackTitle"
                                                        value={this.state.trackTitle}
                                                        onChange={this.onChange}
                                                    />
                                                </div>
                                                <div className="col-auto" style={{ marginLeft: 10 }}>
                                                    <button className="btn btn-lg btn-primary" type="submit" style={{width: 160}}>Search </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                     
                        /*
                        //<div className="border-bottom card-body mb-4 p-a">
                          <div className="search">
                            <br />
                            <h1 className="display-4 text-center">
                                <i className="fas fa-music" /> <strong>Search For A Song</strong>
                            </h1>
                            <p className="lead text-center">Get the lyrics for any song</p>
                            <form onSubmit={this.findTrack.bind(this, dispatch)}>
                                <div className="form-group">
                                    <input type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Song Name..."
                                        name="trackTitle"
                                        value={this.state.trackTitle}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <button className="btn btn-primary btn-lg btn-block mb-4" type="submit">
                                    Get Track Lyrics
                                </button>
                            </form>
                        </div>
                        */
                    )
                }
                }
            </Consumer>
        )
    }
}

export default Search;