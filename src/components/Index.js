import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from 'axios';
import ajaxPath from '../helpers/ajax';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Lyrics from './Lyrics';

class Index extends React.Component {

  constructor() {
    super();
    this.state = {
      selectedArtist: '',
      selectedSong: '',
      lyricsPath: '',
      artistList: [],
      lyricsList: [],
      selectedArtistID: ''
    }
  }


  getArtists = () => {
    axios.get(ajaxPath('artists'))
    .then((res) => {
      this.setState({artistList: res.data});
    })
    .catch((err) => console.log(err));
  }

  getLyrics = (artistID) => {
    axios.get(`${ajaxPath('artists')}/${artistID}/lyrics`)
    .then((res) => {
      this.setState({lyricsList: res.data});
    })
    .catch((err) => console.log(err));
  }

  showSongs = (e, artistID) => {
    const targetArtist = e.target.textContent;
    this.setState({selectedArtist: targetArtist, selectedArtistID: artistID});
    this.getLyrics(artistID);
  }

  lyricsHandle = (inHREF, inSong) => {
    this.setState({selectedSong: inSong,lyricsPath: inHREF});
    console.log(this.state.selectedSong, this.state.lyricsPath);
  }

  componentDidMount() {
    this.getArtists();
  }

  render() {
    const { selectedArtist, selectedSong, lyricsPath, artistList, lyricsList, selectedArtistID } = this.state;

    return (
      <div>
        <br />
        <Row>
          <Col lg={{span: 4, offset: 1}}>
            <ListGroup as="ul">
              {artistList.map((e,i) => <ListGroup.Item as="li" key={i} action href={`index/${e['id']}`} onClick={((event) => this.showSongs(event,e['id']))}>{e['name']}</ListGroup.Item>)}
            </ListGroup>
          </Col>
          <Col lg={{span: 4, offset: 1}}>
            {
              selectedArtist !== '' ?
                <Router>
                  <ListGroup as="ul">
                    {lyricsList.map((e,i) => 
                      <ListGroup.Item key={i} as="li" action href={`index/${selectedArtistID}/lyrics/${e['id']}`} onClick={(() => this.lyricsHandle(`index/${selectedArtistID}/lyrics/${e['id']}`,`${e['song_title_korean']} - ${e['song_title_english']}`))}>
                        {`${e['song_title_korean']} - ${e['song_title_english']}`}
                      </ListGroup.Item>)}
                  </ListGroup>

                  <Switch>
                    <Route path={lyricsPath}>
                      <Lyrics artist={selectedArtist} song={selectedSong} />
                    </Route>
                  </Switch>
                </Router>
              :
                ''
            }
          </Col>
        </Row>
      </div>
    )
  }
}

export default Index;