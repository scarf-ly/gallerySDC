import React from 'react';
import Image from './Image.jsx';
import CenterImage from './CenterImage.jsx'; 


const ImageGallery = (props) => (
    <div>
        <Image image ={props.images[0]} onOpenClick = {props.onOpenClick} onHover={props.onHover} onHoverOut={props.onHoverOut}/>
        <CenterImage image={props.images[1]} onOpenClick = {props.onOpenClick} hover={props.hover}/>
        <Image image ={props.images[2]} onOpenClick = {props.onOpenClick} onHover={props.onHover} onHoverOut={props.onHoverOut}/>
    </div>
);


export default ImageGallery