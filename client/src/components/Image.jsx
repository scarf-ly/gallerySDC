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
            {props.image.userURL && <img src={props.image.userURL} className={styles.userImage} />}
            <p> <span className={styles.description}>{props.image.caption}</span> by {props.image.name}</p>
        </div>
    </a> 
    )
}





export default Image;

