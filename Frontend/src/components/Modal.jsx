export default function Modal({ isOpen, onClose, children, title }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="btn btn-cancel" onClick={onClose}>
            ✖
          </button>
        </div>

        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}