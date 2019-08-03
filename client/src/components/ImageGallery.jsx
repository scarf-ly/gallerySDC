import React from 'react';
import Image from './Image.jsx';
import CenterImage from './CenterImage.jsx'; 
import styles from './style/ImageGallery.css';


const ImageGallery = (props) => (
    //**********for layout purposes, this div can be used to position the gallery*********
    <span className={styles.gallery} onMouseOver={()=>props.onAddArrows()} onMouseOut={()=>props.onRemoveArrows()}>
        {/* This code code prevents the gallery from repositioning with the arrows */}
        {props.arrows && !props.modal && <span className={styles.left}><i className="fas fa-chevron-left" onClick={()=>props.onBackScroll()}></i></span>}
        {!props.arrows && <span className={styles.left2}><i className="fas fa-chevron-left"></i></span>}
        <Image image ={props.images[0]} onOpenClick = {props.onOpenClick} onHover={props.onHover} onHoverOut={props.onHoverOut}/>
        <CenterImage image={props.images[1]} onOpenClick = {props.onOpenClick}  hover={props.hover}/>
        <Image image ={props.images[2]} onOpenClick = {props.onOpenClick} onHover={props.onHover} onHoverOut={props.onHoverOut}/>
        {/* This code code prevents the gallery from repositioning with the arrows */}
        {props.arrows && !props.modal && <span className={styles.right}><i className="fas fa-chevron-right" onClick={(e)=>props.onClickScroll(e)}></i></span>}
        {!props.arrows && <span className={styles.right2}><i className="fas fa-chevron-right"></i></span>}
    </span>
);



export default ImageGallery