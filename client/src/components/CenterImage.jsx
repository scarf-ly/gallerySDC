import React from 'react';
import styles from './style/CenterImage.css';

const CenterImage = (props) => {
    let style;
    if(props.hover) {
        style = styles.centerFoodImgSmall
    } else {
        style = styles.centerFoodImg
    }
    return (
        <a href='' onClick ={(e)=>props.onOpenClick(e, props.image.URL)}>
            <img src={props.image.URL} className={style} style={{objectFit: 'cover'}}/>
        </a>
    )
};

export default CenterImage; 

