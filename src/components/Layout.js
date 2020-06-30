import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Home from './Home';
import Index from './Index';
import AddLyrics from './AddLyrics';

class Layout extends React.Component {

  render() {

    return (
      <div>
        <Router>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">가사 DB</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/index">Browse Lyrics</Nav.Link>
                <Nav.Link href="/add_lyrics">Add Lyrics</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/index">
              <Index />
            </Route>
            <Route path="/add_lyrics">
              <AddLyrics />
            </Route>
          </Switch>


        </Router>
      </div>
    )
  }
}

export default Layout;
