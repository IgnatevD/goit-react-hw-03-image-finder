import React, { Component } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal");

class Modal extends Component {
  state = {};
  componentDidMount() {
    window.addEventListener("keydown", this.closeModalFn);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.closeModalFn);
  }

  closeModalFn = (e) => {
    if (e.code === "Escape") this.props.onClose();
  };

  closeModalBd = (e) => {
    if (e.target === e.currentTarget) this.props.onClose();
  };

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.closeModalBd}>
        <div className="Modal">
          <img src={this.props.largeImageURL} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
