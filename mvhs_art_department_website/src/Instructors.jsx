import { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { NavDropdown } from 'react-bootstrap';
import { readTSV, setDataTSV } from './DataHandler.js';

class Instructors extends Component {

  constructor() {
    super();

    // object to store the instructors data
    this.state = {
        isLoading: true,
        info: [],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // sets isLoading to false once corresponding var has been updated
    if (prevState.info !== this.state.info) {
      this.setState({ isLoading: false});
    }
  }

  // called automatically when dropdown loads for the first time after the constructor
  componentDidMount() {
    // specific url for instructors page data
    const tsvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQw_IXSXEzdhU7Ivz54HrGkmedNc7Dr9o1OJG5VR9vANoi9HDNKRWPVxFbwvtC7x7uak73Z4uxbmWUm/pub?output=tsv';
    // read tsvUrl TSV using data handler
    readTSV(tsvUrl, (data) => {
      // set images by getting formatted imgsData using data handler
      let infoData = setDataTSV(data, 
        ['name', 'email', 'link'],
        [0, 1, 2]);
      this.setState({ info : infoData});
    });
  }

  render() {
    // wait to return until data is loaded, and show loading animation
    if (this.state.isLoading) {
      return (
        <div className="loading">
          <Spinner animation="border" key = {"spinner"}/>
        </div>
      );
    }

    // when the data is loaded, return dropdown contents
    return (
      <div className = "Instructors">
          {this.state.info.map((instructor, i) => {
              return (
                  <NavDropdown.Item href={instructor.link} key = {"dropdownitem" + i}>{instructor.name}</NavDropdown.Item>
              )
          })}
      </div>
    )
  }
}

export default Instructors
