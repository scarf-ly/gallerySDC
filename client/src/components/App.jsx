import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import sampleData from '../data/sampleData.js';
import customStyles from './style/modalStyle.js';
import ImageGallery from '/Users/TinaLe/Documents/gallery/client/src/components/ImageGallery.jsx';

Modal.setAppElement('#app')

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            images: [],
            current: sampleData, 
            modalIsOpen: false,
            modalURL: '',
            hover: false,
            time: 0
        } 
        
        // this.getGalleryData = this.getGalleryData.bind(this);
        this.openModal = this.openModal.bind(this);
        // this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.hover = this.hover.bind(this);
        this.hoverOut = this.hoverOut.bind(this);
        this.intervalScrolling = this.intervalScrolling.bind(this);
    }

    componentDidMount() {
        this.getGalleryData(); 
        this.intervalScrolling(); 
    }

    intervalScrolling() {
        let n = 0;
        setInterval(() => { 
            this.setState({ current: this.state.images.slice(n, n+3),
            time: this.state.time + 1});
            n = n + 1; 

            }, 3000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalScrolling);
      }

    getGalleryData() {
        axios.get('/gallery')
        .then(({data})=> this.setState({
            images: data,
        }))
        .catch((err)=>console.log(err))
    }

    openModal(e, image) {
        e.preventDefault(); 
        this.setState({
            modalIsOpen: true,
            modalURL: image});
    }
    
    // afterOpenModal() {
    //     // references are now sync'd and can be accessed.
    //     this.subtitle.style.color = 'pink';
    // }
    
    closeModal() {
        this.setState({modalIsOpen: false});
    }

    hover() {
        this.setState({hover: true});
    }

    hoverOut() {
        this.setState({hover: false});
    }

    render(){
        return (
        <div>
            <ImageGallery 
            onHover={this.hover}
            onHoverOut={this.hoverOut}
            hover={this.state.hover}
            images={this.state.current}
            onOpenClick={this.openModal}
            onRequestClose={this.closeModal}
            style={customStyles} 
            />

            <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            >
            {/* <h2 ref={subtitle => this.subtitle = subtitle} style={{float: 'right'}}>Modal Mockup</h2> */}
            <img src={this.state.modalURL} height="625px" width="900px" style={{objectFit: 'contain'}}/>
            <div style={{gridColumn: "2/span 1", backgroundColor: "white"}}>Munch Modal Mockup</div>
            </Modal>
        </div>
        )
    }
}


export default App;

