const FileInput = ({
  label,
  name,
  onChange,
  accept,
  error,
  disabled = false,
  helper,
}) => {
  const errorMessage = Array.isArray(error) ? error.join(', ') : error;

  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="file"
        accept={accept}
        className={`form-control ${errorMessage ? 'is-invalid' : ''}`}
        onChange={onChange}
        disabled={disabled}
      />
      {helper ? <div className="form-text">{helper}</div> : null}
      {errorMessage ? (
        <div className="invalid-feedback">{errorMessage}</div>
      ) : null}
    </div>
  );
};

export default FileInput;
