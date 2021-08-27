import React, { Component } from "react";
import PropTypes from "prop-types";
import Modal from "../../Modal/Modal";

class ImageGalleryItem extends Component {
  state = { showModal: false };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  render() {
    const { previewURL, largeImageURL, name } = this.props;

    return (
      <li className="ImageGalleryItem">
        <img
          src={previewURL}
          alt={name}
          className="ImageGalleryItem-image"
          onClick={this.toggleModal}
        />
        {this.state.showModal && (
          <Modal
            onClose={this.toggleModal}
            largeImageURL={largeImageURL}
            alt={name}
          />
        )}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  showModal: PropTypes.bool,
};

export default ImageGalleryItem;
