function ImageContainer({ image }) {
  return (
    <div className="image-container">
      <img src={image.url} alt="" />
    </div>
  );
}

export default ImageContainer;
