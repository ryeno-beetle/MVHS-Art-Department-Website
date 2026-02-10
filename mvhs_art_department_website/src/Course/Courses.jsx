import { Course } from "./CourseComponent.jsx";
import { Component } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { readTSV, setDataTSV } from '../DataHandler.js';

class ArtCourses extends Component {

  constructor() {
    super();

    // object to store the course data
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
    const tsvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTSBt1H98J_Ld1YQtpmMGLU3kj85o05Vr9PKdgDAJ_IE2VtMEFFno7x9BmovWakBgbCf0qKNk_uTwwx/pub?output=tsv';
  
    // read tsvUrl TSV using data handler
    readTSV(tsvUrl, (data) => {
      // set images by getting formatted imgsData using data handler
      let courseData = setDataTSV(data, 
        ['courseCode', 'courseName', 'description', 'teacher', 'email'],
        [0, 1, 2, 3, 4]);
      this.setState({ info : courseData});
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
      <div className = "ArtCourses">
        <Course data = {this.state.info} />
      </div>
    )
  }
}

export default ArtCourses
