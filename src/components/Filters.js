import DownloadImageButton from './DownloadImageButton';
import './Filters.css';

function Filters({ filters, downLoadUrl, mainImage, onChange }) {
  return (
    <div className="filters">
      {filters.map((filter, index) => (
        <div className="filter" key={index}>
          <label>{filter.label}</label>
          <input
            type="range"
            name={filter.name}
            value={filter.value}
            min={filter.min}
            max={filter.max}
            onChange={(e) => {
              onChange(e);
            }}
          />
        </div>
      ))}

      {downLoadUrl && (
        <DownloadImageButton image={mainImage} downLoadUrl={downLoadUrl} />
      )}
    </div>
  );
}

export default Filters;
