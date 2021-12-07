import { useState, useRef, useEffect, useCallback } from 'react';
import imagedataFilters from 'imagedata-filters';
import * as StackBlur from 'stackblur-canvas';
import Compressor from 'compressorjs';
import Loading from './Loading';

import './ImageResultContainer.css';

function ImageResultContainer({ filters, edited, image, onInit, onSuccess }) {
  const canvas = useRef();
  const context = useRef();
  const [loading, setLoading] = useState(false);

  const drawImage = useCallback(
    (ctx, callback) => {
      const img = new Image();
      img.src = image.url;

      img.addEventListener('load', () => {
        ctx.canvas.width = img.width;
        ctx.canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        if (callback) {
          callback();
        }
      });
    },
    [image]
  );

  const initImage = useCallback(() => {
    setLoading(true);
    context.current = canvas.current.getContext('2d');
    const ctx = context.current;
    drawImage(ctx, () => {
      setLoading(false);
      onInit && onInit();
    });
  }, [drawImage, onInit]);

  useEffect(() => {
    initImage();
  }, [initImage]);

  const changeImage = useCallback(
    (filters) => {
      const ctx = context.current;

      drawImage(ctx, () => {
        let imageData = ctx.getImageData(
          0,
          0,
          ctx.canvas.width,
          ctx.canvas.height
        );

        filters.forEach((filter) => {
          const adjust = filter.value;

          if (filter.name === 'blur') {
            if (adjust > 0) {
              imageData = StackBlur.imageDataRGBA(
                imageData,
                0,
                0,
                ctx.canvas.width,
                ctx.canvas.height,
                adjust
              );
            }
          } else {
            const amount = filter.calculate
              ? filter.calculate(adjust)
              : adjust / 100;
            imagedataFilters[filter.name](imageData, { amount });
          }
        });

        ctx.putImageData(imageData, 0, 0);
        canvas.current.toBlob((blob) => {
          new Compressor(blob, {
            mimeType: image.type,
            success(result) {
              onSuccess && onSuccess(result);
            },
            error(err) {
              console.log(err.message);
            },
          });
        });
      });
    },
    [onSuccess, image.type, drawImage]
  );

  useEffect(() => {
    if (edited === 'loading') {
      changeImage(filters);
    }
  }, [filters, edited, changeImage]);

  return (
    <div className="image-container">
      {loading && <Loading style={{ margin: '40px 0' }} />}
      <canvas
        ref={canvas}
        style={{
          opacity: loading ? 0 : 1,
          visibility: loading ? 'hidden' : 'visible',
        }}
        className="canvas"
      />
    </div>
  );
}

export default ImageResultContainer;
