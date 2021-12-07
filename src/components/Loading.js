import './Loading.css';

function Loading({ style }) {
  return (
    <div className="lds-ring" style={style}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Loading;
