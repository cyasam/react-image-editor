import { useState, useCallback } from 'react';
import ImageContainer from './components/ImageContainer';
import ImageResultContainer from './components/ImageResultContainer';
import ImagePlaceholder from './components/ImagePlaceholder';
import './App.css';

import { filterOptions } from './utils';
import Filters from './components/Filters';

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
      <h1>Simple Image Editor</h1>
      <div className="editor-container">
        {mainImage ? (
          <div className="image-wrapper">
            <div className="main-image">
              <ImageContainer image={mainImage} />
            </div>

            <Filters
              filters={filters}
              downLoadUrl={downLoadUrl}
              mainImage={mainImage}
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
    </div>
  );
}

export default App;
