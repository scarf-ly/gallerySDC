import React from 'react';
import Image from './Image.jsx';
import CenterImage from './CenterImage.jsx'; 
import styles from './style/ImageGallery.css';


const ImageGallery = (props) => (
    //**********for layout purposes, this div can be used to position the gallery*********
    <div onMouseOver={()=>props.onAddArrows()} onMouseOut={()=>props.onRemoveArrows()}>
        {props.arrows && <span className={styles.left}><i className="fas fa-chevron-left" onClick={(e)=>props.onBackScroll(e)}></i></span>}
        {!props.arrows && <span className={styles.left2}><i className="fas fa-chevron-left" onClick={(e)=>props.onBackScroll(e)}></i></span>}
        <Image image ={props.images[0]} onOpenClick = {props.onOpenClick} onHover={props.onHover} onHoverOut={props.onHoverOut}/>
        <CenterImage image={props.images[1]} onOpenClick = {props.onOpenClick} hover={props.hover}/>
        <Image image ={props.images[2]} onOpenClick = {props.onOpenClick} onHover={props.onHover} onHoverOut={props.onHoverOut}/>
        {props.arrows && <span className={styles.right}><i className="fas fa-chevron-right" onClick={(e)=>props.onClickScroll(e)}></i></span>}
        {!props.arrows && <span className={styles.right2}><i className="fas fa-chevron-right" onClick={(e)=>props.onClickScroll(e)}></i></span>}
    </div>
);



export default ImageGallery