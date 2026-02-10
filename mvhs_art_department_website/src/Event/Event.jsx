import { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { EventComponent } from './EventComponent.jsx';
import { readTSV, setDataTSV } from '../DataHandler.js';

class Events extends Component {

  constructor() {
    super();

    // object to store the event data
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
    const tsvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTumAiYYycLkpnTX2aCbZ-NuyKUHRQeFRtzv1K-LwCy2Ba5VIOcbKkxDT8pOP2MnREzjEkfEAqQnTfG/pub?output=tsv';
  
    // read tsvUrl TSV using data handler
    readTSV(tsvUrl, (data) => {
      // set images by getting formatted imgsData using data handler
      let eventData = setDataTSV(data, 
        ['name', 'description', 'time', 'link'],
        [0, 1, 2, 3]);
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
      <div className = "Events">
        <EventComponent data = {this.state.info} />
      </div>
    )
  }
}

export default Events
