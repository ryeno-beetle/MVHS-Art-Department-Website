import React from 'react';
import ReactDOM from 'react-dom/client';
import { Component } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Home from './App.jsx';
import ArtCourses from './Course/Courses.jsx';
import Clubs from './Club/Clubs.jsx';
import Gallery from './Gallery/Gallery.jsx';
import Events from './Event/Event.jsx';
import './index.css';
import Instructors from './Instructors.jsx';


class Main extends Component {
  constructor() {
    super();
    
    // var to store page state
    this.state = {
      page: "Home" // default page is home
    };

    this.handleClick = this.handleClick.bind(this);
  }

  pageControl(){
    // redirect to the right page here
    if (this.state.page === "Home") {
      return (<Home />);
    } else if (this.state.page === "ArtCourses"){
      return (<ArtCourses />);
    } else if (this.state.page === "Clubs"){
      return (<Clubs />);
    } else if (this.state.page === "Gallery"){
      return (<Gallery />);
    } else if (this.state.page === "Events"){
      return (<Events />);
    } else if (this.state.page === "Donate"){
      return (<ArtCourses />);
    } else if (this.state.page === "Volunteer"){
      return (<ArtCourses />);
    } 
  }

  // set page state when a page button is clicked
  handleClick(input) {
    this.setState( {page: input});
  }

  render() {
    // home page contents
    return (
      <div className="all">
        <Navbar expand="lg" className="navbar">
          <Container>
            <div className="navbar-brand" onClick={this.handleClick.bind(this, "Home")}>
              <img src="/src/assets/website_logo.png" 
                alt="logo" width="150"  className="d-inline-block align-top"
              />
              <Navbar.Brand>
                Mountain View High School 
                <br></br>
                Art Department
              </Navbar.Brand>
            </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="nav-item-group">
                <Nav.Link onClick={this.handleClick.bind(this, "Gallery")}>Gallery</Nav.Link>
                <Nav.Link onClick={this.handleClick.bind(this, "ArtCourses")}>Courses</Nav.Link>
                <Nav.Link onClick={this.handleClick.bind(this, "Clubs")}>Clubs</Nav.Link>
                <Nav.Link onClick={this.handleClick.bind(this, "Events")}>Events</Nav.Link>
                <NavDropdown title="Instructors" id="basic-nav-dropdown">
                  <Instructors/>
                </NavDropdown>
                <Nav.Link href="https://mountainviewhs.myschoolcentral.com/(S(2bn432byttlf1gsk4jjys2gu))/Index.aspx#/2280/40">Donate</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        
        <br/><br/>

        {this.pageControl()}
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
