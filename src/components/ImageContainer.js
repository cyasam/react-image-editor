import { useState, useRef, useEffect } from 'react';
import Loading from './Loading';
import './ImageContainer.css';

function ImageContainer({ image }) {
  const imgRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const imgEl = imgRef.current;
    const imgLoadEvent = imgEl.addEventListener('load', () => {
      setLoading(false);
    });
    return () => {
      imgEl.removeEventListener('load', imgLoadEvent);
    };
  }, []);
  return (
    <div className="image-container">
      {loading && <Loading style={{ margin: '40px 0' }} />}
      <img
        ref={imgRef}
        src={image.url}
        style={{
          opacity: loading ? 0 : 1,
          visibility: loading ? 'hidden' : 'visible',
        }}
        alt=""
      />
    </div>
  );
}

export default ImageContainer;
