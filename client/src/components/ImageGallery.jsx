import React from 'react';
import axios from 'axios';
import styles from './style/ImageGallery.css';


const ImageGallery = (props) => {
   return props.images.map(image => (
        <a href='' onClick ={(e)=>props.onOpen(e, image.URL)}>
            <img src={image.URL} className={styles.foodImg}/>
        </a>
    ));
};


export default ImageGallery