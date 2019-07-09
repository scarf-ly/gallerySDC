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
        <a href='' onClick ={(e)=>props.onOpenClick(e, props.image.URL)} className={styles.overlay}>
            <img src={props.image.URL} className={style} style={{objectFit: 'cover'}}/>
            <div className={capt}>
                {props.image.userURL && <img src={props.image.userURL} className={styles.userImage} />}
                <p> <span className={styles.description}>{props.image.caption}</span> by {props.image.name}</p>
            </div>
        </a>
    )
};

export default CenterImage; 

