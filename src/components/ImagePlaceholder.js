import { useRef, useCallback, useState } from 'react';
import './ImagePlaceholder.css';

function ImagePlaceholder({ handleAddImage }) {
  const imageInput = useRef(null);
  const [inputStatus, setInputStatus] = useState(null);
  const maxFileSize = 1024;

  const addImage = useCallback(() => {
    setInputStatus(null);
    const file = imageInput.current.files[0];
    const fileSize = Math.round(file.size / maxFileSize);

    if (fileSize < 1024) {
      setInputStatus(true);
      handleAddImage(file);
    } else {
      setInputStatus(false);
    }
  }, [handleAddImage]);

  return (
    <div className="image-placeholder">
      <div className="text">
        <p>Select an image!</p>
        {inputStatus === false && (
          <p className="error">File size is too big. (Max {maxFileSize} KB)</p>
        )}
      </div>
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
