import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import sampleData from '../data/sampleData.js'
import customStyles from './style/style.js';

Modal.setAppElement('#app')

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            images: [],
            current: sampleData, 
            modalIsOpen: false,
            modalURL: ''
        } 
        
        this.getGalleryData = this.getGalleryData.bind(this);
        this.openModal = this.openModal.bind(this);
        // this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        this.getGalleryData(); 
    }

    getGalleryData() {
        axios.get('/gallery')
        .then(({data})=> this.setState({
            images: data,
            current: data.slice(0, 3)
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

    render(){
        return (
        <div>
            {this.state.current.map(image => (
                <a href='' onClick ={(e)=>this.openModal(e, image.URL)}>
                    <img src={image.URL} width="220" height="220" style={{objectFit: 'cover'}}/>
                </a>
            ))}
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

