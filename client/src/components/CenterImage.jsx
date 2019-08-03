import React from 'react';
import styles from './style/CenterImage.css';

const CenterImage = (props) => {
    let style;
    let capt;
    if(props.hover) {
        style = styles.centerFoodImgSmall;
        capt = styles.none; 
    } else {
        style = styles.centerFoodImg;
        capt = styles.caption;
    }
    return (
        <a href='' className={styles.overlay}>
            <img 
            onClick ={(e)=>props.onOpenClick(e, props.image)}
            src={props.image.URL} 
            className={style} 
            style={{objectFit: 'cover'}}
            />
            <div className={capt}>
                <img src={props.image.userURL} className={styles.userImage} />
                <div className={styles.description}><span className={styles.bold}>{props.image.caption}</span> by {props.image.name}</div> 
            </div>
        </a>
    )
};

export default CenterImage; 

