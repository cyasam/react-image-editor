import './DownloadImageButton.css';

function DownloadImageButton({ image, downLoadUrl }) {
  return (
    <a
      className="download-button"
      href={downLoadUrl}
      download={`${image.name}-result.${image.extension}`}
    >
      Download
    </a>
  );
}

export default DownloadImageButton;
