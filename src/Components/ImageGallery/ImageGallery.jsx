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
      this.setState({
        pixabay: null,
        status: "panding",
        name: nextName,
      });
      const page = 1;

      pixAPI
        .fetchPixabay(nextName, page)
        .then((pixabays) => {
          this.setState({
            pixabay: [...pixabays.hits],
            status: "resolved",
            page: this.state.page + 1,
          });
          return pixabays.hits;
        })
        .catch((error) => {
          this.setState({ error, status: "rejected" });
        })
        .finally(() => this.setState({ loding: false }));
    }
  }

  newPage = () => {
    const { pixabay, name, page } = this.state;
    this.setState({ status: "panding" });

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

  –°omponentWillUnmount() {
    this.setState({
      pixabay: null,
      loding: false,
      error: null,
      page: 1,
      status: "idle",
      name: "",
    });
  }

  render() {
    const { pixabay, error, status } = this.state;

    if (status === "idle") {
      return <h2 className="title">–í–≤–Ķ–ī–ł—ā–Ķ –∑–į–Ņ—Ä–ĺ—Ā –ī–Ľ—Ź –Ņ–ĺ–ł—Ā–ļ–į –ł–∑–ĺ–Ī—Ä–į–∂–Ķ–Ĺ–ł–Ļ</h2>;
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
          <h2 className="titleLoding">–ó–į–≥—Ä—É–∂–į–Ķ–ľ –ł–∑–ĺ–Ī—Ä–į–∂–Ķ–Ĺ–ł—Ź...</h2>
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
              –Ě–Ķ—ā –ł–∑–ĺ–Ī—Ä–į–∂–Ķ–Ĺ–ł–Ļ –Ņ–ĺ –ī–į–Ĺ–Ĺ–ĺ–ľ—É –∑–į–Ņ—Ä–ĺ—Ā—É - {this.props.pixabayName}
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
  page: PropTypes.number,
  status: PropTypes.string,
  name: PropTypes.string,
};

export default ImageGallery;
