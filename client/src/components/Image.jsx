import React from 'react';
import styles from './style/Image.css';

const Image = (props) => {
    return (
    <a href='' onClick ={(e)=>props.onOpenClick(e, props.image.URL)} className={styles.overlay}> 
        <img 
            onMouseOver={()=>props.onHover()}
            onMouseOut={()=>props.onHoverOut()}
            src={props.image.URL} 
            className={styles.foodImg} 
            style={{objectFit: 'cover'}}
        />
        <div className={styles.caption}>
            <img src={props.image.userURL ? props.image.userURL : "https://munch-gallery.s3-us-west-1.amazonaws.com/Users/default.jpg"} className={styles.userImage} />
            <div className={styles.description}><span className={styles.bold}>{props.image.caption}</span> by {props.image.name}</div> 
        </div>
    </a> 
    )
}





export default Image;

