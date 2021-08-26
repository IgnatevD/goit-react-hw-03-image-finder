import React, { Component } from "react";
import Modal from "../../Modal/Modal";

class ImageGalleryItem extends Component {
  state = { showModal: false };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  render() {
    const { previewURL, largeImageURL } = this.props;

    return (
      <li className="ImageGalleryItem">
        <img
          src={previewURL}
          alt="Скоро будет фото"
          className="ImageGalleryItem-image"
          onClick={this.toggleModal}
        />
        {this.state.showModal && (
          <Modal onClose={this.toggleModal} largeImageURL={largeImageURL} />
        )}
      </li>
    );
  }
}

export default ImageGalleryItem;
