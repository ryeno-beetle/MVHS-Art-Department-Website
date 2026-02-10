import './App.css'
import { ImageCarousel } from "./Carousel/ImageCarousel.jsx";
import { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { readTSV, setDataTSV } from './DataHandler.js';

class App extends Component {
  constructor() {
    super();

    // object to store the page data
    this.state = {
	    test : "",
      isLoading: true,
      isLoadingText: true,
      images: [],
      text: []
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // sets isLoading bools to false once corresponding vars have been updated
    if (prevState.images !== this.state.images) {
      this.setState({ isLoading: false});
    }
    if (prevState.text !== this.state.text) {
      this.setState({isLoadingText: false});
    }
  }

  // called automatically when page loads for the first time after the constructor
  componentDidMount() {
    // specific urls for artwork and text on home page
    const artDisplayUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSPkAuoxJT5yJ6gjQto-7jOJ-mFvcpPiWq7lGgVTlohJ7kEz-B44RXlwfY2smkzSe0STeNb8sbSsmj4/pub?output=tsv';
    const textUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRnoZ6wzl7v2HANqfAL_T8efZT-8LXSUr2DMhmHDRyoOB_nNjiaDW0JgLXKdqalJTPfb2dYVMiP8GbH/pub?output=tsv';
    
    // read artDisplayUrl TSV using data handler
    readTSV(artDisplayUrl, (data) => {
      // set images by getting formatted imgsData using data handler
      let imgsData = setDataTSV(data, 
        ['firstName', 'lastName', 'classOf', 'src', 'alt', 'title', 'className'],
        [1, 2, 3, 4, 5, 6, 7],
        11);
      this.setState({ images : imgsData});
    });
    // read textUrl TSV using data handler
    readTSV(textUrl, (data) => {
      // set text by getting formatted imgsData using data handler
      let txtData = setDataTSV(data, 
        ['header', 'text'],
        [0, 1]);
      this.setState({ text : txtData});
    });
  }

  render() {
    // return loading bar in place of page contents until everything is loaded
    if (this.state.isLoading && this.state.isLoadingText) {
      return (
        <div className="loading">
          <Spinner animation="border" />
        </div>
      );
    }

    // when the data is loaded, then return page contents
    return (
      <div>
        <div className = "App">
          <ImageCarousel data = {this.state.images} />
        </div>         
        <div>
          {this.state.text.map(({header, text}, i) => (
            <div key={i} className="home-text-container">
              <h3 className = "home-header">{header}</h3>
              {text.map((paragraph, j) => <p key={j} className = "home-text">{paragraph}</p>)}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default App;
