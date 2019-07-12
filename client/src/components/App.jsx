import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import sampleData from '../data/sampleData.js';
import customStyles from './style/modalStyle.js';
import ImageGallery from '/Users/TinaLe/Documents/gallery/client/src/components/ImageGallery.jsx';
import styles from './style/App.css'

Modal.setAppElement('#app')

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            images: [],
            current: sampleData, 
            modalIsOpen: false,
            modal: '',
            hover: false,
            currStart: 2,
            arrows: false
        } 
        
        this.getGalleryData = this.getGalleryData.bind(this);
        this.addIndex = this.addIndex.bind(this);
        this.openModal = this.openModal.bind(this);
        // this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.hover = this.hover.bind(this);
        this.hoverOut = this.hoverOut.bind(this);
        this.intervalScrolling = this.intervalScrolling.bind(this);
        this.clickScroll = this.clickScroll.bind(this);
        this.backScroll = this.backScroll.bind(this);
        this.addArrows = this.addArrows.bind(this);
        this.removeArrows = this.removeArrows.bind(this); 
        this.modalRight = this.modalRight.bind(this);
        this.modalLeft = this.modalLeft.bind(this);
    }

    componentDidMount() {
        this.getGalleryData(); 
        this.intervalScrolling(); 
    }

    intervalScrolling() {
        setInterval(() => { 
            if(!this.state.modalIsOpen && !this.state.hover){
                let n = this.state.currStart;
                if(n+3 < this.state.images.length){
                    this.setState({ 
                        current: this.state.images.slice(n, n+3),
                        currStart: n + 1
                    });
                }
            }
        }, 4000);
    }

// ****************Continuous Scroll*************************//

    // intervalScrolling() {
    //     setInterval(() => { 
    //         if(!this.state.modalIsOpen && !this.state.hover){
    //             let n; 
    //             if((this.state.currStart + 3) > this.state.images.length){
    //                 n = 0;
    //             } else {
    //                 n = this.state.currStart;
    //             };
    //             this.setState({ 
    //             current: this.state.images.slice(n, n+3),
    //             currStart: n + 1
    //         });
    //         }
    //     }, 7000);
    // }

    clickScroll(e) {
        e.preventDefault();
        let n = this.state.currStart;
        if(n+3 < this.state.images.length){
            this.setState({ 
                current: this.state.images.slice(n, n+3),
                currStart: n + 1
                });
            }
        }

    // ****************Continuous Scroll*************************//

    // clickScroll(e) {
    //     e.preventDefault();
    //     let n; 
    //     if((this.state.currStart + 3) > this.state.images.length){
    //         n = 0;
    //     } else {
    //         n = this.state.currStart;
    //     };
    //     this.setState({ 
    //         current: this.state.images.slice(n, n+3),
    //         currStart: n + 1
    //         });
    // }

    backScroll(e) {
        e.preventDefault();
        let start = this.state.currStart; 
        if(start > 0){
            let n = this.state.currStart;
            this.setState({ 
                current: this.state.images.slice(n-1, n+2),
                currStart: n - 1
            });
        }
    }

    componentWillUnmount() {
        clearInterval(this.intervalScrolling);
      }

    getGalleryData() {
        axios.get('/gallery')
        .then(({data})=> this.addIndex(data))
        .catch((err)=>console.log(err))
    }

    addIndex(arr) {
        let result = [];
        for(let i = 0; i < arr.length; i++) {
            result.push(Object.assign(arr[i], {idx: i}));
        };
        this.setState({
            current: result.slice(0, 3),
            images: result})
    }

    openModal(e, image) {
        e.preventDefault(); 
        this.setState({
            modalIsOpen: true,
            modal: image});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    hover() {
        this.setState({hover: true});
    }

    hoverOut() {
        this.setState({hover: false});
    }

    addArrows() {
        this.setState({arrows: true})
    }

    removeArrows() {
        this.setState({arrows: false})
    }

    modalRight() {
        if (this.state.modal.idx < this.state.images.length - 1) {
            let nextIdx = this.state.modal.idx + 1; 
            let nextModal = this.state.images.filter(image => image.idx === nextIdx);
            this.setState({modal: nextModal[0]});
        }
    }

    modalLeft() {
        if (this.state.modal.idx > 0) {
            let prevIdx = this.state.modal.idx - 1; 
            let prevModal = this.state.images.filter(image => image.idx === prevIdx); 
            this.setState({modal: prevModal[0]}); 
        }
    }

    render(){
        return (
        <div>
            {this.state.modalIsOpen && <p className = {styles.close} onClick={()=>this.closeModal()}> Close <i className="fas fa-times" style={{fontSize: "18px", verticalAlign: "middle"}}></i></p>}
            <ImageGallery 
            onHover={this.hover}
            onHoverOut={this.hoverOut}
            hover={this.state.hover}
            images={this.state.current}
            onOpenClick={this.openModal}
            onRequestClose={this.closeModal}
            onClickScroll={this.clickScroll}
            onBackScroll={this.backScroll}
            onAddArrows={this.addArrows}
            onRemoveArrows={this.removeArrows}
            arrows={this.state.arrows}
            modal={this.state.modalIsOpen}
            />
            
            <div className={styles.modal}>
                <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                >
                    <div className={styles.overlay}>
                        <span className={[styles.left, styles.arrow].join(' ')} onClick={()=>this.modalLeft()}>
                            <i class="fas fa-chevron-left"></i>
                        </span>
                        <span className={[styles.right, styles.arrow].join(' ')} onClick={()=>this.modalRight()}>
                            <i class="fas fa-chevron-right"></i>
                        </span>
                        <img src={this.state.modal.URL} height="630px" width="900px" style={{objectFit: 'contain', position: 'relative', top: '-60px'}}/>
                    </div>
                    <div className={styles.info} style={{gridColumn: "2/span 1", backgroundColor: "#ffffff"}}>
                        <div>
                            <img src={this.state.modal.userURL} className={styles.userImage}/>
                        </div>
                        <div className={styles.user}>
                            {this.state.modal.name} 
                            <div>
                                <span className={styles.friend}><i className="fas fa-user-friends"></i></span><span className={styles.num}>8</span>
                                <span className={styles.star}><i className="far fa-star"></i></span><span className={styles.num}>10</span>
                                <span className={styles.elite}>Elite '19</span>
                            </div>
                            <div className={styles.comment}>{this.state.modal.caption}</div>
                            <div className={styles.date}>August 9, 2018</div>
                            <div className={styles.query}>Was this photo ...?</div>
                            <button className={styles.btn}><i className="fas fa-arrow-up"></i> Helpful</button>
                            <button className={styles.btn}><i className="fas fa-arrow-down"></i> Not Helpful</button>
                            <div className={styles.reservations}><i className="fas fa-calendar-day"></i><span className={styles.resText}>Make a Reservation</span></div>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
        )
    }
}


export default App;

