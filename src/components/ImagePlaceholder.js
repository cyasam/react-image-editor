import { useRef, useCallback, useState } from 'react';
import './ImagePlaceholder.css';

function ImagePlaceholder({ handleAddImage }) {
  const imageInput = useRef(null);
  const [inputStatus, setInputStatus] = useState(null);
  const [draggedOver, setDraggedOver] = useState(false);
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

  const draggedOverStyle = {
    backgroundColor: draggedOver ? '#ccc' : 'rgb(245, 245, 245)',
  };

  return (
    <div
      className="image-placeholder"
      draggable={true}
      style={draggedOverStyle}
      onDragOver={() => {
        if (!draggedOver) {
          setDraggedOver(true);
        }
      }}
      onDragLeave={() => {
        if (draggedOver) {
          setDraggedOver(false);
        }
      }}
    >
      <div className="text">
        {!draggedOver && <p>Select or drop an image!</p>}
        {draggedOver && <p>Dropping the image!</p>}

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
