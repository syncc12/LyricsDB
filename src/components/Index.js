import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import history from 'history/browser';
import axios from 'axios';
import ajaxPath from '../helpers/ajax';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Lyrics from './Lyrics';


function Songs(props) {

  const { e, selectedArtistID, lyricsHandle } = props;

  return (
    <ListGroup.Item 
      as="li"
      action
      href={`/index/artists/${selectedArtistID}/lyrics/${e['id']}`}
      onClick={(() => lyricsHandle(`/index/artists/${selectedArtistID}/lyrics/${e['id']}`,e['id']))}
    >
      {`${e['song_title_korean']} - ${e['song_title_english']}`}
    </ListGroup.Item>
  );
}

class Index extends React.Component {

  constructor() {
    super();
    this.state = {
      selectedArtist: '',
      artistList: [],
      lyricsList: [],
      selectedArtistID: '',
      selectedSongID: '',
      showLyrics: false
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
    history.push(`/index/artists/${artistID}`);
  }

  lyricsHandle = (inHREF, inSongID) => {
    this.setState({selectedSongID: inSongID,lyricsPath: inHREF, showLyrics: true});
    history.push(inHREF);
  }

  possibleRoutes = () => {

  }

  componentDidMount() {
    // this.setState({showLyrics: false});
    this.getArtists();
  }

  render() {
    const { selectedArtist, artistList, lyricsList, selectedArtistID, selectedSongID, showLyrics } = this.state;

    return (
      <div>
        <Router>
          <br />
          {
            showLyrics === false ?
              <Row>
                <Col lg={{span: 4, offset: 1}}>
                  <ListGroup as="ul">
                    {artistList.map((e,i) => <ListGroup.Item as="li" key={i} action href={`/index/artists/${e['id']}`} onClick={((event) => this.showSongs(event,e['id']))}>{e['name']}</ListGroup.Item>)}
                  </ListGroup>
                </Col>
                <Col lg={{span: 4, offset: 1}}>
                  {
                    selectedArtist !== '' ?
                      <ListGroup as="ul">
                        {lyricsList.map((e,i) =>
                          <Songs key={i} e={e} selectedArtistID={selectedArtistID} lyricsHandle={this.lyricsHandle}/>
                        )}
                      </ListGroup>
                    :
                      ''
                  }
                </Col>
              </Row>
            :
              ''
          }
              <Switch>
                <Route exact path={`/index/artists/${selectedArtistID}/lyrics/${selectedSongID}`}>
                  {
                    showLyrics ?
                      <Row>
                        <Col>
                          <Lyrics songID={selectedSongID} lyricsData={lyricsList} artistName={selectedArtist} />
                        </Col>
                      </Row>
                    :
                      ''
                  }
                </Route>
              </Switch>
        </Router>
      </div>
    )
  }
}

export default Index;


// <ListGroup.Item key={i} as="li" action href={`/artists/${selectedArtistID}/lyrics/${e['id']}`} onClick={(() => this.lyricsHandle(`/index/${selectedArtistID}/lyrics/${e['id']}`,`${e['id']} - ${e['song_title_english']}`))}>
//   {`${e['song_title_korean']} - ${e['song_title_english']}`}
// </ListGroup.Item>