import { useState, useCallback } from 'react';
import ImageContainer from './components/ImageContainer';
import ImageResultContainer from './components/ImageResultContainer';
import ImagePlaceholder from './components/ImagePlaceholder';
import DownloadImageButton from './components/DownloadImageButton';
import './App.css';

import { filterOptions } from './utils';

const createImageObject = (file) => {
  const regex = /(?:\.([^.]+))?$/;
  const extension = regex.exec(file.name)[1];
  const extensionWithDot = regex.exec(file.name)[0];
  const name = file.name.split(extensionWithDot)[0];
  const type = file.type;

  const url = URL.createObjectURL(file);

  return {
    name,
    extension,
    url,
    type,
  };
};

function App() {
  const [mainImage, setMainImage] = useState(null);
  const [edited, setEdited] = useState(false);
  const [filters, setFilters] = useState(filterOptions);
  const [downLoadUrl, setDownloadUrl] = useState(null);

  const handleAddImage = useCallback((file) => {
    const object = createImageObject(file);
    console.log(object);
    setMainImage(object);
  }, []);

  const handleDownloadUrl = useCallback((url) => {
    setDownloadUrl(url);
  }, []);

  return (
    <div className="container">
      {mainImage ? (
        <div className="image-wrapper">
          <div className="main-image">
            <ImageContainer image={mainImage} />
          </div>

          <div>
            {filters.map((filter, index) => (
              <div key={index}>
                {filter.label}
                <input
                  type="range"
                  name={filter.name}
                  value={filter.value}
                  min={filter.min}
                  max={filter.max}
                  onChange={(e) => {
                    setFilters((prevState) => {
                      return prevState.map((filter) => {
                        if (filter.name === e.target.name) {
                          filter.value = parseInt(e.target.value);
                        }

                        return filter;
                      });
                    });

                    setEdited(true);
                  }}
                />
              </div>
            ))}

            {downLoadUrl && (
              <DownloadImageButton
                image={mainImage}
                downLoadUrl={downLoadUrl}
              />
            )}
          </div>

          <div className="image-result">
            <ImageResultContainer
              edited={edited}
              image={mainImage}
              filters={filters}
              handleDownloadUrl={handleDownloadUrl}
            />
          </div>
        </div>
      ) : (
        <ImagePlaceholder handleAddImage={handleAddImage} />
      )}
    </div>
  );
}

export default App;
