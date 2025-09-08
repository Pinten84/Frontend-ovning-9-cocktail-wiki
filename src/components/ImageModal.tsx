import React from "react";
import "./ImageModal.css";

interface Props {
  src: string;
  alt: string;
  onClose: () => void;
}

const ImageModal: React.FC<Props> = ({ src, alt, onClose }) => (
  <div className="modal-bg" onClick={onClose}>
    <div className="modal-img-container">
      <img
        src={src}
        alt={alt}
        className="modal-img-zoom"
        onClick={onClose}
        aria-label={`Förstorad bild på ${alt}`}
      />
    </div>
  </div>
);

export default ImageModal;
