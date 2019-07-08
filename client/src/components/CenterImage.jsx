import React from 'react';
import styles from './style/CenterImage.css';

const CenterImage = (props) => (
    <a href='' onClick ={(e)=>props.onOpenClick(e, props.image.URL)}>
        <img src={props.image.URL} className={styles.centerFoodImg} style={{objectFit: 'cover'}}/>
    </a>
)

export default CenterImage; 

