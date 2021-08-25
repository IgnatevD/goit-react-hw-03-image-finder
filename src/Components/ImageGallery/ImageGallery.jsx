import React, { Component } from "react";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem"

class ImageGallery extends Component {
  static defaultProps = {
    pixabayName: "car",
  }

  state = { 
    pixabay: null,
    loding: false,
   }

   componentDidUpdate (prevProps, prevState) {
     const nextName = this.props.pixabayName;
     if(prevProps.pixabayName !== nextName){
      const API = "22732940-a59bc7fc166a5b76f0ac36f93"
      fetch(`https://pixabay.com/api/?q=${nextName}&page=${"1"}&key=${API}&image_type=photo&orientation=horizontal&per_page=12
          `).then(res=> res.json()).then(pixabay => this.setState({pixabay})).finally(()=> this.setState({loding: false}))
     }
   }

  render() {
    const {pixabay, loding } = this.state;
  
    // const newImg = pixabay["hits"];
    
  
  
    return (
  <ul className="ImageGallery">
      {loding && <h2>Загружаем изображения...</h2>}
      {/* {pixabay[hits].map((img) =>  */}
    <ImageGalleryItem />
  </ul>
    );
  }
}

export default ImageGallery;