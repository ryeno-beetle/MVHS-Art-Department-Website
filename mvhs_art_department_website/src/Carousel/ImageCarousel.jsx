import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';

import "./Carousel.css"

export const ImageCarousel = ({ data }) => {
    return (
      <div className = "carousel-container" key = "carouselcontainer">
        <Carousel className = "image-carousel" key="carousel">
          {data.map((image, i) => 
            <Carousel.Item key = {"carouselitem" + i}>
              <img className = "image" src = {image.src} alt = {image.alt} key = {image.title + i}/>
              <Carousel.Caption key = {"carouselcaption" + i}>
                <p className="caption" key = {"caption" + i}>{image.title} by {image.firstName} {image.lastName}, Class of {image.classOf}, {image.className}</p>
              </Carousel.Caption>
            </Carousel.Item>
          )}
        </Carousel>
      </div>
    )
}