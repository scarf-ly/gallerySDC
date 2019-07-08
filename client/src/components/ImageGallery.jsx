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

// return props.images.map(image => (
//     <a href='' onClick ={(e)=>props.onOpen(e, image.URL)}>
//         <img src={image.URL} className={styles.foodImg}/>
//     </a>
// ));

export default ImageGallery