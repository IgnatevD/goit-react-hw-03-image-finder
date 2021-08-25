const ImageGalleryItem = ({previewURL, largeImageURL}) => {
    return (
<li className="ImageGalleryItem">
  <img src={previewURL} alt= 'Скоро будет фото' name={largeImageURL} className="ImageGalleryItem-image" />
</li>
    );
}

export default ImageGalleryItem;