import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ImageGallery from "./ImageGallery/ImageGallery";
// import Modal from "./Modal/Modal";
import Searchbar from "./Searchbar/Searchbar";

class App extends Component {
  state = {
    pixabayName: "",
  };

  getFormSubmit = (searcNameForm) => {
    this.setState({ pixabayName: searcNameForm });
  };

  render() {
    const { pixabayName } = this.state;
    return (
      <>
        <Searchbar onGetSubmit={this.getFormSubmit} />
        <ImageGallery pixabayName={pixabayName} />
        <ToastContainer />
      </>
    );
  }
}

export default App;
