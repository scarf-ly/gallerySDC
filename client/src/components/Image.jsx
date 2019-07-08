import React from 'react';
import styles from './style/Image.css';

const Image = (props) => (
        <a href='' onClick ={(e)=>props.onOpenClick(e, props.image.URL)} className={styles.overlay}> 
            <img 
            onMouseOver={()=>props.onHover()}
            onMouseOut={()=>props.onHoverOut()}
            src={props.image.URL} 
            className={styles.foodImg} 
            style={{objectFit: 'cover'}}
            />
            <div class={styles.after}>{props.image.caption}</div>
        </a> 
)


export default Image;

