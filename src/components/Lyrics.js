import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Lyrics extends React.Component {

  getJSONFromID = (inList, inID) => {
    for (let i of inList) {
      if (i['id'] === inID) {
        return i;
      }
    }
  }

  render() {
    const { songID, lyricsData, artistName } = this.props;
    const lyricsJSON = this.getJSONFromID(lyricsData, songID);

    return (
      <>
        <Row>
          <Col>
            {lyricsJSON['song_title_korean']}
          </Col>
        </Row>
        <Row>
          <Col>
            {lyricsJSON['song_title_english']}
          </Col>
        </Row>
        <Row>
          <Col> 
            {artistName}
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={{span: 10, offset: 1}} lg={{span: 4, offset: 1}}>
            {lyricsJSON['korean_lyrics']}
          </Col>
          <Col xs={{span: 10, offset: 1}} lg={{span: 4, offset: 1}}>
            {lyricsJSON['english_lyrics']}
          </Col>
        </Row>
      </>
    )
  }
}

export default Lyrics;