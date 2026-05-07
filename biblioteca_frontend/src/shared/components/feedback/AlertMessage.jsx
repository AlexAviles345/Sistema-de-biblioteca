const AlertMessage = ({ variant = 'info', message, onClose }) => {
  if (!message) {
    return null;
  }

  return (
    <div
      className={`alert alert-${variant} d-flex align-items-start gap-2`}
      role="alert"
    >
      <div className="flex-grow-1">{message}</div>
      {onClose ? (
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={onClose}
        />
      ) : null}
    </div>
  );
};

export default AlertMessage;
