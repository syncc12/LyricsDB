import React from 'react';
import axios from 'axios';
import ajaxPath from '../helpers/ajax';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';


class AddLyrics extends React.Component {

  constructor() {
    super();
    this.state = {
      artistList: [],
      artistNames: [],
      artistIDs: {}
    }
  }

  setDefaults = () => {
    document.getElementById('add-lyrics-form').reset();
  }

  collectInputs = (e) => {
    e.preventDefault();
    const { artistIDs } = this.state;
    const postJSON = {};
    let thisKey, thisValue, thisArtist;

    [...Array(e.target.length-1).keys()].map(((event,i) => {
      thisKey = e['target'][event]['id'].replace('-input','');
      thisValue = e['target'][event]['value'];
      if (thisKey === 'artist') {
        thisKey = 'artist_id';
        thisArtist = thisValue;
        thisValue = artistIDs[thisArtist];
      }
      postJSON[thisKey] = thisValue;
      return null;
    }));
    this.postRecord(postJSON, thisArtist, e);
  }

  getArtists = () => {
    axios.get(ajaxPath('artists'))
    .then((res) => {
      let nameList = [];
      let idJSON = {};
      res.data.map((e,i) => {
        idJSON[e['name'].toString()] = parseInt(e['id']);
        nameList.push(e['name']);
        return null;
      });
      this.setState({artistList: res.data, artistNames: nameList, artistIDs: idJSON});
    })
    .catch((err) => console.log(err));
  }

  postRecord = (postJSON, artistName, e) => {
    const { artistNames, artistIDs } = this.state;
    let postPath;
    if (artistNames.includes(artistName)) {
      const artistID = artistIDs[artistName];
      postPath = `${ajaxPath('artists')}/${artistID}/lyrics`;
      console.log('postPath - Lyrics Only',postPath);
      delete postJSON['artist_id'];
      axios.post(postPath, postJSON)
      .then((res) => {
        this.setDefaults();
      })
      .catch((err) => console.log(err));
      e.preventDefault();
    } else {
      const artistPostJSON = {name: artistName};
      postPath = ajaxPath('artists');
      console.log('postPath - Artist First',postPath);
      axios.post(postPath, artistPostJSON)
      .then((res) => {
        const artistID =  res.data['id'];
        postPath = `${ajaxPath('artists')}/${artistID}/lyrics`;
      console.log('postPath - Lyrics Second',postPath);
        axios.post(postPath, postJSON)
        .then((res) => {
          this.setDefaults();
          this.getArtists();
        })
        .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
      e.preventDefault();
    }
  }

  componentDidMount() {
    this.getArtists();
  }

  render() {

    return (
      <div>
        <Form id="add-lyrics-form" onSubmit={(e) => this.collectInputs(e)}>
          <Form.Row>
            <Col xs={12} lg={3}>
              <InputGroup className="lyrics-input">
                <InputGroup.Prepend>
                  <InputGroup.Text id="artist-ig-text">Artist</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="artist-input" aria-label="Artist" aria-describedby="artist-ig-text"/>
              </InputGroup>
            </Col>
          
            <br className="col-br" /><br className="col-br" />

            <Col xs={12} lg={3}>
              <InputGroup className="lyrics-input">
                <InputGroup.Prepend>
                  <InputGroup.Text id="song_title-ig-text">Song Title</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="song_title_korean-input" placeholder="Korean" aria-label="Song's Korean Title" aria-describedby="song_title_korean-ig-text"/>
                <FormControl id="song_title_english-input" placeholder="English" aria-label="Song's English Title" aria-describedby="song_title_english-ig-text"/>
              </InputGroup>
            </Col>
          
            <br className="col-br" /><br className="col-br" />

            <Col xs={12} lg={3}>
              <InputGroup className="lyrics-input">
                <InputGroup.Prepend>
                  <InputGroup.Text id="origional_language-ig-text">Origional Language</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="origional_language-input" aria-label="Origional Language" aria-describedby="origional_language-ig-text"/>
              </InputGroup>
            </Col>
          </Form.Row>
          
          <br />
          
          <Form.Row>
            <Col xs={12} lg={6}>
              <InputGroup className="lyrics-input">
                <InputGroup.Prepend>
                  <InputGroup.Text id="korean_lyrics-ig-text">Korean Lyrics</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="korean_lyrics-input" as="textarea" aria-label="Korean Lyrics" aria-describedby="korean_lyrics-ig-text" />
              </InputGroup>
            </Col>
          
            <br className="col-br" /><br className="col-br" /><br className="col-br" />

            <Col xs={12} lg={6}>
              <InputGroup className="lyrics-input">
                <InputGroup.Prepend>
                  <InputGroup.Text id="english_lyrics-ig-text">English Lyrics</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="english_lyrics-input" as="textarea" aria-label="English Lyrics" aria-describedby="english_lyrics-ig-text" />
              </InputGroup>
            </Col>
          </Form.Row>
          
          <br />
          
          <Form.Row>

            <Col xs={12}>
              <Button className="lyrics-input" variant="primary" type="submit">Add</Button>
            </Col>
          </Form.Row>
        </Form>
      </div>
    )
  }
}

export default AddLyrics;