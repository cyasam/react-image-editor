import { useState, useCallback } from 'react';
import ImageContainer from './components/ImageContainer';
import ImageResultContainer from './components/ImageResultContainer';
import ImagePlaceholder from './components/ImagePlaceholder';
import DownloadImageButton from './components/DownloadImageButton';
import './App.css';

import { filterOptions } from './utils';
import Filters from './components/Filters';
import Loading from './components/Loading';

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
  const [edited, setEdited] = useState(null);
  const [filters, setFilters] = useState(filterOptions);
  const [downLoadUrl, setDownloadUrl] = useState(null);

  const handleAddImage = useCallback((file) => {
    const object = createImageObject(file);
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
              onChange={({ name, values }) => {
                setEdited('editing');
                setFilters((prevState) => {
                  return prevState.map((filter) => {
                    if (filter.name === name) {
                      filter.value = parseInt(values);
                    }

                    return filter;
                  });
                });
              }}
              onFinalChange={() => setEdited('loading')}
            >
              <div className="download-area">
                {edited === 'editing' && <p>Editing...</p>}
                {edited === 'loading' && <Loading />}
                {edited === 'success' && (
                  <DownloadImageButton
                    image={mainImage}
                    downLoadUrl={downLoadUrl}
                  />
                )}
              </div>
            </Filters>

            <div className="image-result">
              <ImageResultContainer
                edited={edited}
                image={mainImage}
                filters={filters}
                style={{ opacity: edited === 'loading' ? 0.8 : 1 }}
                onSuccess={(result) => {
                  setEdited('success');
                  handleDownloadUrl(URL.createObjectURL(result));
                }}
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
