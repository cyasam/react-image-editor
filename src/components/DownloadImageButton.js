function DownloadImageButton({ image, downLoadUrl }) {
  return (
    <a href={downLoadUrl} download={`${image.name}-result.${image.ext}`}>
      Download
    </a>
  );
}

export default DownloadImageButton;
