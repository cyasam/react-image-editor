import { useRef, useCallback } from 'react';

function ImagePlaceholder({ handleAddImage }) {
  const imageInput = useRef(null);

  const addImage = useCallback(() => {
    const file = imageInput.current.files[0];
    handleAddImage(file);
  }, [handleAddImage]);

  return (
    <div className="image-placeholder">
      <p>Select an image!</p>
      <input
        ref={imageInput}
        type="file"
        accept="image/png, image/jpeg"
        onChange={addImage}
      />
    </div>
  );
}

export default ImagePlaceholder;
