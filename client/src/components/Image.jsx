import React from 'react';
import styles from './style/Image.css';

const Image = (props) => (
    <a href='' onClick ={(e)=>props.onOpenClick(e, props.image.URL)}>
        <img 
        onMouseOver={()=>props.onHover()}
        onMouseOut={()=>props.onHoverOut()}
        src={props.image.URL} 
        className={styles.foodImg} 
        style={{objectFit: 'cover'}}
        />
    </a>
)


export default Image;

