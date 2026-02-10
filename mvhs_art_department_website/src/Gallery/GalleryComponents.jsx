import "./Gallery.css"
import Figure from 'react-bootstrap/Figure';
import { useState } from "react";

// component for all gallery images
const GalleryImages = ({ data }) => {
    const [model, setModel] = useState(false);
    const [tempImgSrc, setTempImgSrc] = useState('');
    const [tempImgAlt, setTempImgAlt] = useState('');
    const getImg = (src, alt) => {
        setTempImgSrc(src);
        setTempImgAlt(alt);
        setModel(true);
    }

    // return full gallery
    return (
        <div>
            <div className = {model? "model open" : "model"}>
                <img src = {tempImgSrc} alt = {tempImgAlt}/>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-x-circle" viewBox="0 0 16 16" onClick={() => setModel(false)}>
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg>
            </div>
            <div className = "gallery">
                {data.map((image, i) => {
                    return (
                        <div className = "gallery-item" key = {"item" + i}>
                            <div className = "pics" key = {"pic" + i} onClick = {() => getImg(image.src, image.alt)}>
                                <Figure key = {"figure" + i}>
                                    <Figure.Image src = {image.src} alt = {image.alt} style = {{width: '100%'}} key = {"figureimage" + i}/>
                                    <Figure.Caption className = "gallery-caption" key = {"figurecaption" + i}>{image.title} by {image.firstName} {image.lastName}, Class of {image.classOf}, {image.className}</Figure.Caption>
                                </Figure>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default GalleryImages;