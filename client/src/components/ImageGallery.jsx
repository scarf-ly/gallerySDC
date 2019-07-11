import React from 'react';
import Image from './Image.jsx';
import CenterImage from './CenterImage.jsx'; 
import styles from './style/ImageGallery.css';


const ImageGallery = (props) => (
    //**********for layout purposes, this div can be used to position the gallery*********
    <div>
        <span className={styles.left}><i className="fas fa-chevron-left"></i></span>
        <Image image ={props.images[0]} onOpenClick = {props.onOpenClick} onHover={props.onHover} onHoverOut={props.onHoverOut}/>
        <CenterImage image={props.images[1]} onOpenClick = {props.onOpenClick} hover={props.hover}/>
        <Image image ={props.images[2]} onOpenClick = {props.onOpenClick} onHover={props.onHover} onHoverOut={props.onHoverOut}/>
        <span className={styles.right}><i className="fas fa-chevron-right" onClick={(e)=>props.onClickScroll(e)}></i></span>
    </div>
);



export default ImageGallery