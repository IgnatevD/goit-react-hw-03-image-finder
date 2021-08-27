import React, { Component } from "react";
import PropTypes from "prop-types";
import Loader from "react-loader-spinner";
import Button from "../Button/Button";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import pixAPI from "../../Api/Api";

class ImageGallery extends Component {
  state = {
    pixabay: null,
    loding: false,
    error: null,
    page: 1,
    status: "idle",
    name: "",
  };

  componentDidUpdate(prevProps, prevState) {
    const nextName = this.props.pixabayName;

    if (prevProps.pixabayName !== nextName) {
      this.setState({ status: "panding", name: nextName, page: 1 });
      const page = this.state.page;

      pixAPI
        .fetchPixabay(nextName, page)
        .then((pixabays) => pixabays.hits)
        .then((pixabay) =>
          this.setState({
            pixabay,
            status: "resolved",
            page: this.state.page + 1,
          })
        )
        .catch((error) => {
          this.setState({ error, status: "rejected" });
        })
        .finally(() => this.setState({ loding: false }));
    }
  }

  newPage = () => {
    const { pixabay, name, page } = this.state;
    pixAPI
      .fetchPixabay(name, page)
      .then((pixabays) => pixabays.hits)
      .then((newImg) => {
        this.setState({
          pixabay: [...pixabay, ...newImg],
          status: "resolved",
          page: this.state.page + 1,
        });
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      })
      .catch((error) => {
        this.setState({ error, status: "rejected" });
      })
      .finally(() => this.setState({ loding: false }));
  };

  render() {
    const { pixabay, error, status } = this.state;

    if (status === "idle") {
      return <h2 className="title">Введите запрос для поиска изображений</h2>;
    }

    if (status === "panding") {
      return (
        <div className="conteinerLoding">
          <Loader
            type="Puff"
            color="#000000"
            height={100}
            width={100}
            timeout={2000}
          />
          <h2 className="titleLoding">Загружаем изображения...</h2>
        </div>
      );
    }

    if (status === "rejected") {
      return <h2>{error.massage}</h2>;
    }

    if (status === "resolved") {
      return (
        <div className="conteinerImageGallery">
          <ul className="ImageGallery">
            {pixabay.map((img) => (
              <ImageGalleryItem
                key={img.id}
                previewURL={img.previewURL}
                largeImageURL={img.largeImageURL}
                name={img.tags}
              />
            ))}
          </ul>
          {pixabay.length && <Button newPage={this.newPage} />}
          {!pixabay.length && (
            <div>
              Нет изображений по данному запросу - {this.props.pixabayName}
            </div>
          )}
        </div>
      );
    }
  }
}

ImageGallery.propTypes = {
  pixabay: PropTypes.array,
  loding: PropTypes.bool,
  error: PropTypes.string,
  page: 1,
  status: PropTypes.string,
  name: PropTypes.string,
};

export default ImageGallery;
