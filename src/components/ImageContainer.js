function ImageContainer({ image }) {
  return (
    <div className="image-container">
      <figure className="main-image">
        <img src={image.url} alt="" />
      </figure>
    </div>
  );
}

export default ImageContainer;
