import React, { Component } from "react";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";

class ImageGallery extends Component {
  state = {
    pixabay: null,
    loding: false,
    error: null,
    status: "idle",
  };

  componentDidUpdate(prevProps, prevState) {
    const nextName = this.props.pixabayName;
    if (prevProps.pixabayName !== nextName) {
      const API = "22732940-a59bc7fc166a5b76f0ac36f93";
      this.setState({ status: "panding" });

      fetch(`https://pixabay.com/api/?q=${nextName}&page=${"1"}&key=${API}&image_type=photo&orientation=horizontal&per_page=12
          `)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(
            new Error(`Нет изображений с таким именем ${nextName}`)
          );
        })
        .then((pixabays) => pixabays.hits)
        .then((pixabay) => this.setState({ pixabay, status: "resolved" }))
        .catch((error) => {
          this.setState({ error, status: "rejected" });
        })
        .finally(() => this.setState({ loding: false }));
    }
  }

  render() {
    const { pixabay, error, status } = this.state;

    if (status === "idle") {
      return <div>Введите запрос изображения в поиск</div>;
    }

    if (status === "panding") {
      return <h2>Загружаем изображения...</h2>;
    }

    if (status === "rejected") {
      return <h2>{error.massage}</h2>;
    }

    if (status === "resolved") {
      return (
        <>
          <ul className="ImageGallery">
            {pixabay.map((img) => (
              <ImageGalleryItem
                key={img.id}
                previewURL={img.previewURL}
                largeImageURL={img.largeImageURL}
              />
            ))}
          </ul>
          {pixabay.length && <Button />}
          {!pixabay.length && (
            <div>
              Нет изображений по данном запросу {this.props.pixabayName}
            </div>
          )}
        </>
      );
    }
  }
}

export default ImageGallery;
