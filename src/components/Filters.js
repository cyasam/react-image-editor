import { Range } from 'react-range';
import './Filters.css';

function Filters({ filters, onChange, onFinalChange, children }) {
  return (
    <div className="filters-wrapper">
      <div className="filters">
        {filters.map((filter, index) => (
          <div className="filter" key={index}>
            <label>{filter.label}</label>
            <Range
              step={1}
              min={filter.min}
              max={filter.max}
              values={[filter.value]}
              onChange={(values) => onChange({ name: filter.name, values })}
              onFinalChange={() => {
                onFinalChange();
              }}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: '6px',
                    width: '100%',
                    backgroundColor: '#ccc',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      minWidth: '24px',
                      top: '-28px',
                      right: '0',
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: '12px',
                      fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                      padding: '4px',
                      borderRadius: '4px',
                      textAlign: 'center',
                      backgroundColor: '#999',
                    }}
                  >
                    {filter.value}
                  </div>
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: '15px',
                    width: '15px',
                    borderRadius: '100%',
                    backgroundColor: '#999',
                  }}
                />
              )}
            />
          </div>
        ))}
      </div>

      {children}
    </div>
  );
}

export default Filters;
