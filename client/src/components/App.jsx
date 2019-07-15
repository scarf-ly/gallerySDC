import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import sampleData from '../data/sampleData.js';
import customStyles from './style/modalStyle.js';
import ImageGallery from '/Users/TinaLe/Documents/gallery/client/src/components/ImageGallery.jsx';
import styles from './style/App.css'

if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#app')

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            images: [],
            current: sampleData, 
            modalIsOpen: false,
            modal: '',
            hover: false,
            currStart: 0,
            arrows: false
        } 
        
        this.getGalleryData = this.getGalleryData.bind(this);
        this.prepareData = this.prepareData.bind(this);
        this.openModal = this.openModal.bind(this);
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
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.formatName = this.formatName.bind(this);
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

    clickScroll() {
        let n = this.state.currStart;
        if(n + 3 < this.state.images.length){
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

    backScroll() {
        // e.preventDefault();
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
        let urlStrings = location.href.split('/')
        let num = urlStrings [urlStrings.length - 2]; 
        axios.get(`/data/${num}`)
        .then(({data}) => this.prepareData(data))
        .catch((err)=>console.log(err))
    }

    /********** prepareData and formatName will eventually be moved to the backend***********/

    prepareData(arr) {
        let result = [];
        for(let i = 0; i < arr.length; i++) {
            result.push(Object.assign(arr[i], {idx: i}));
        };
        for(let i = 0; i < result.length; i++) {
            result[i].name = this.formatName(result[i].name);
        };
        this.setState({
            current: result.slice(0, 3),
            images: result
        });
    }

    formatName(name) {
        let names = name.split(' '); 
        let yelpName = names[0] + ' ' + names[1].slice(0, 1) + '.';
        return yelpName;
    }

    openModal(e, image) {
        if(e) {
            e.preventDefault(); 
        }
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
        this.setState({arrows: true});
    }

    removeArrows() {
        this.setState({arrows: false});
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

    handleKeyDown(e) {
        if (e.key === 'ArrowLeft') {
            this.modalLeft();
        }
        if (e.key === 'ArrowRight') {
            this.modalRight();
        }
    }

    render(){
        return (
        <div onKeyDown={(e) => this.handleKeyDown(e)}>
            {this.state.modalIsOpen && <p className = {styles.close} onClick={()=>this.closeModal()}> Close <svg id="24x24_close" height="24" viewBox="0 0 24 24" width="24" className={styles.iconX}><path d="M17.657 19.07L12 13.415 6.343 19.07 4.93 17.658 10.585 12 4.93 6.343 6.342 4.93 12 10.585l5.657-5.657L19.07 6.34 13.416 12l5.657 5.657-1.413 1.414z"></path></svg></p>}
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
                            <i className="fas fa-chevron-left"></i>
                        </span>
                        <span className={[styles.right, styles.arrow].join(' ')} onClick={()=>this.modalRight()}>
                            <i className="fas fa-chevron-right"></i>
                        </span>
                        <div className={styles.caption}>
                            <p className={styles.captionInfo}>
                                <span className={styles.capWords}>
                                    <i class="fas fa-th-large"></i> Browse all
                                </span>
                                <span className={styles.number}>
                                    {`${this.state.modal.idx + 1} of ${this.state.images.length}`}
                                </span>
                                <span className={styles.endCap}>
                                    <span className={styles.capHover} >
                                        <span className={styles.icon}>
                                            <svg id="18x18_share" height="18" viewBox="0 0 18 18" width="18"><path d="M17.714 6.43L13 10.356v-3.03c-1 0-5.097 1.47-6.286 3.62.274-3.08 4.286-5.5 6.286-5.5V2.5l4.714 3.93zM3 4v10h11v-2.5l1-1V15H2V3h8.5l-1 1H3z"></path></svg>
                                        </span>
                                        <span className={styles.capWords}>Share</span>
                                    </span>
                                    <span className={styles.capHover} >
                                        <span className={styles.icon}>
                                            <svg id="18x18_compliment" height="18" viewBox="0 0 18 18" width="18"><path d="M14.5 6.75a5.5 5.5 0 0 0-11 0 5.495 5.495 0 0 0 2.993 4.892L5.5 16.75l3.505-2 3.495 2-.993-5.108A5.495 5.495 0 0 0 14.5 6.75zm-5.5 4c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z"></path></svg>
                                        </span>
                                        <span className={styles.capWords}>Compliment</span>
                                    </span>
                                    <span className={styles.icon}>
                                        <svg id="18x18_flag" height="18" viewBox="0 0 18 18" width="18"><path d="M6 10V3c4.976 1.098 4.024-1 8 0v7c-4.024-.976-3.024 1.024-8 0zM4 2h1v14H4V2z"></path></svg>
                                    </span>
                                </span>
                            </p>
                        </div>
                        <img src={this.state.modal.URL} className={styles.image} />
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
                                {/* <span>
                                    <svg height="18" viewBox="0 0 18 18" width="18" className={styles.star}>
                                        <g color="orange">
                                            <path d="M13 3H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1.505 9.643l-2.526-1.55L6.526 12.7 7 9.934 5 7.977l2.766-.404L8.97 4.7l1.264 2.873L13 7.977l-2 1.957.495 2.71z">
                                            </path>
                                        </g>
                                    </svg>
                                </span><span className={styles.num}>10</span> */}
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

{/* <i className="fas fa-times" style={{fontSize: "18px", verticalAlign: "middle"}}></i> */}