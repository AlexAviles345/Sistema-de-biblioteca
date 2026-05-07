const Modal = ({
  isOpen,
  title,
  children,
  footer,
  onClose,
  size = 'lg',
  closeLabel = 'Close',
}) => {
  if (!isOpen) {
    return null;
  }

  const sizeClass = size ? `modal-${size}` : '';

  const handleBackdropClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      <div
        className="modal fade show"
        style={{ display: 'block' }}
        role="dialog"
        aria-modal="true"
        onClick={handleBackdropClick}
      >
        <div className={`modal-dialog ${sizeClass} modal-dialog-centered`}>
          <div
            className="modal-content"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              {onClose ? (
                <button
                  type="button"
                  className="btn-close"
                  aria-label={closeLabel}
                  onClick={onClose}
                />
              ) : null}
            </div>
            <div className="modal-body">{children}</div>
            {footer ? <div className="modal-footer">{footer}</div> : null}
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </>
  );
};

export default Modal;
