import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';


const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };


Modal.setAppElement('#app')

class App extends React.Component {
    constructor(props){
        super(props);
        this.getGalleryData = this.getGalleryData.bind(this);
        this.state = {
            images: [],
            current: [], 
            modalIsOpen: false,
            modalURL: ''
        } 

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
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
    
    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = 'pink';
    }
    
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
          contentLabel="Example Modal"
        >
 
          <h2 ref={subtitle => this.subtitle = subtitle}>Modal Mockup</h2>
          <p><button onClick={this.closeModal}>close</button></p>
          <img src={this.state.modalURL} width="350"/>
        </Modal>
        </div>
        )
    }
}

export default App;

