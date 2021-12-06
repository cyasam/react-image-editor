import { useRef, useEffect, useCallback } from 'react';
import imagedataFilters from 'imagedata-filters';
import * as StackBlur from 'stackblur-canvas';
import Compressor from 'compressorjs';

function ImageResultContainer({ filters, edited, image, handleDownloadUrl }) {
  const canvas = useRef();
  const context = useRef();

  const drawImage = useCallback(
    (ctx, callback) => {
      const img = new Image();
      const imageUrl = image.url;
      img.src = imageUrl;

      img.addEventListener('load', () => {
        ctx.canvas.width = img.width;
        ctx.canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        if (callback) {
          callback();
        }
      });
    },
    [image.url]
  );

  const initImage = useCallback(() => {
    context.current = canvas.current.getContext('2d');
    const ctx = context.current;
    drawImage(ctx);
  }, [drawImage]);

  useEffect(() => {
    initImage();
  }, [initImage]);

  const changeImage = useCallback(
    (filters) => {
      const ctx = context.current;

      drawImage(ctx, function () {
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
              handleDownloadUrl(URL.createObjectURL(result));
            },
            error(err) {
              console.log(err.message);
            },
          });
        });
      });
    },
    [handleDownloadUrl, image.type, drawImage]
  );

  useEffect(() => {
    if (filters && edited) {
      changeImage(filters);
    }
  }, [filters, edited, changeImage]);

  return (
    <div className="image-container">
      <div className="canvas-wrapper">
        <canvas ref={canvas} className="canvas" />
      </div>
    </div>
  );
}

export default ImageResultContainer;
