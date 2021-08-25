import React, { Component } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from "./Button/Button";
import ImageGallery from "./ImageGallery/ImageGallery"
// import Modal from "./Modal/Modal";
import Searchbar from "./Searchbar/Searchbar"

class App extends Component {
 
    state = { 
        pixabayName: "",
     };
    
    componentDidMount () {
        const {pixabayName} = this.state;
        this.setState({loding: true});
        const API = "22732940-a59bc7fc166a5b76f0ac36f93"
        fetch(`https://pixabay.com/api/?q=${pixabayName}&page=${"1"}&key=${API}&image_type=photo&orientation=horizontal&per_page=12
            `).then(res=> res.json()).then(pixabay => this.setState({pixabay})).finally(()=> this.setState({loding: false}))
    }

    getFormSubmit = searcNameForm => {
        this.setState({pixabayName: searcNameForm});

    }

    render() {
        const {pixabayName} = this.state;
        return (
            <>
                <Searchbar onGetSubmit={this.getFormSubmit}/>
                
                <ImageGallery pixabayName={pixabayName}/>
                <ToastContainer />
                {pixabayName && <Button/>}
                {/* <Loader/> */}
                
                {/* <Modal/> */}
            </>
            
        );
    }
}

export default App;