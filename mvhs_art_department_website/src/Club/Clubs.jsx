import { Club } from "./ClubComponent.jsx";
import { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { readTSV, setDataTSV } from '../DataHandler.js';

class Clubs extends Component {

  constructor() {
    super();

    // object to store the clubs data
    this.state = {
	    test : "",
        isLoading: true,
        info: [],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // sets isLoading bool to false once corresponding var has been updated
    if (prevState.info !== this.state.info) {
      this.setState({ isLoading: false});
    }
  }

  // called automatically when page loads for the first time after the constructor
  componentDidMount() {
    // specific url for content of events page
    const tsvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRpRA8sP4VAgA5VYwsKQRsXS-5qqDPbB-rLv8USRMNPmT_QVWYtoArFdnY42fs3Q-zY26rkwi0veqIM/pub?output=tsv';
  
    // read tsvUrl TSV using data handler
    readTSV(tsvUrl, (data) => {
      // set images by getting formatted imgsData using data handler
      let eventData = setDataTSV(data, 
        ['name', 'missionStatement', 'advisor', 'president', 'presidentEmail', 'room', 'day', 'frequency', 'time', 'src'],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      this.setState({ info : eventData});
    });
  }

  render() {
    // return loading bar in place of page contents until everything is loaded
    if (this.state.isLoading) {
      return (
        <div className="loading">
          <Spinner animation="border" />
        </div>
        );
    }

    // when the data is loaded, then return page contents
    return (
      <div className = "Clubs">
        <Club data = {this.state.info} />
      </div>
    )
  }
}

export default Clubs
