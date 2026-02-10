import GalleryImages from "./GalleryComponents.jsx";
import { Component } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Spinner from 'react-bootstrap/Spinner';
import { readTSV, setDataTSV, setArrDataTSV } from '../DataHandler.js';

class Gallery extends Component {

    constructor() {
      super();
  
      // object to store the gallery data
      this.state = {
        test : "",
        isLoadingImgs: true,
        isLoadingCourses: true,
        images: [],
        courses: [],
        filteredImages: []
      };
    }
  
    componentDidUpdate(prevProps, prevState) {
      // sets isLoading bools to false once corresponding vars have been updated
      if (prevState.images !== this.state.images) {
        this.setState({ isLoadingImgs: false});
      } 
      if (prevState.courses !== this.state.courses) {
        this.setState({ isLoadingCourses: false});
      }
    }
  
    // called automatically when page loads for the first time after the constructor
    componentDidMount() {
      // specific urls for artwork and text on gallery page
      console.log('reading spreadsheet');
      const galleryUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSPkAuoxJT5yJ6gjQto-7jOJ-mFvcpPiWq7lGgVTlohJ7kEz-B44RXlwfY2smkzSe0STeNb8sbSsmj4/pub?output=tsv';
      const coursesUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTSBt1H98J_Ld1YQtpmMGLU3kj85o05Vr9PKdgDAJ_IE2VtMEFFno7x9BmovWakBgbCf0qKNk_uTwwx/pub?output=tsv';
  
      // read galleryUrl TSV using data handler
      readTSV(galleryUrl, (data) => {
        // set images by getting formatted imgsData using data handler
        let imgsData = setDataTSV(data,
          ['firstName', 'lastName', 'classOf', 'src', 'alt', 'title', 'className'],
          [1, 2, 3, 4, 5, 6, 7]);
        this.setState({ images : imgsData});
        this.setState({ filteredImages : imgsData});
      });

      // read coursesUrl TSV using data handler
      readTSV(coursesUrl, (data) => {
        // set courses by getting formatted coursesData using data handler
        let coursesData = setArrDataTSV(data, 1);
        coursesData.unshift('All');
        this.setState({ courses : coursesData});
      });

      
    }

    handleClick(course) {
      // handle the clicks when a course from the dropdown filter menu is selected
      // sorts through the images, only displaying the ones for the selected course
      const filteredImagesData = [];
      for (let i = 0; i < this.state.images.length; i++) {
        if (this.state.images[i].className === course) {
          filteredImagesData.push(this.state.images[i]);
        } else if (course === "All") {
          filteredImagesData.push(this.state.images[i]);
        }
      }

      this.setState({ filteredImages : filteredImagesData});
    }

    render() {
      // return loading bar in place of page contents until everything is loaded
      if (this.state.isLoadingImgs || this.state.isLoadingCourses) {
        return (
          <div className="loading">
            <Spinner animation="border" />
          </div>
          );
      }
  
      //when the data is loaded, then return page contents
      return (
        <div>
          <div className = "gallery-page">
            <div className = "filter-header">
                <DropdownButton title="Filter" id="bg-nested-dropdown" variant="light" className = "filter-button">
                  {this.state.courses.map((course, i) => {
                    return (
                      <Dropdown.Item key = {"dropdown" + i}eventKey={i} onClick={() => this.handleClick(course)}>{course}</Dropdown.Item>
                    )
                  })}
                </DropdownButton>
                <div className = "gallery-header-text">
                <p><b>Gallery</b> - Below is a collection of artwork and other images from the Visual Arts department.</p>
              </div>
            </div>
            <GalleryImages data = {this.state.filteredImages} />
          </div>
        </div>
      )
    }
  }
  
  export default Gallery;
  