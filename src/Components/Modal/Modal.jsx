import React, { Component } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal");

class Modal extends Component {
  state = {};
  componentDidMount() {
    window.addEventListener("keydown", this.closeModalFn);
    const body = document.querySelector("body");
    body.style.overflow = "hidden";
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.closeModalFn);
    const body = document.querySelector("body");
    body.style.overflow = "auto";
  }

  closeModalFn = (e) => {
    if (e.code === "Escape") this.props.onClose();
  };

  closeModalBd = (e) => {
    if (e.target === e.currentTarget) this.props.onClose();
  };

  render() {
    const { largeImageURL, name } = this.props;
    return createPortal(
      <div className="Overlay" onClick={this.closeModalBd}>
        <div className="Modal">
          <img src={largeImageURL} alt={name} />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
