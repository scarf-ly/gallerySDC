import React from 'react';
import axios from 'axios';


class App extends React.Component {
    constructor(props){
        super(props);
        this.getGalleryData = this.getGalleryData.bind(this);
        this.state = {
            images: []
        } 
    }

    componentDidMount() {
        this.getGalleryData(); 
    }

    getGalleryData() {
        axios.get('/gallery')
        .then(({data})=> this.setState({
            images: data
        }))
        .catch((err)=>console.log(err))
    }

    render(){
        return (
        <h1>Client Request/Server Response Testing</h1>
        )
    }
}

export default App;

