const FormInput = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  error,
  required = false,
  disabled = false,
  min,
  step,
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
        type={type}
        className={`form-control ${errorMessage ? 'is-invalid' : ''}`}
        value={value ?? ''}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        min={min}
        step={step}
      />
      {helper ? <div className="form-text">{helper}</div> : null}
      {errorMessage ? (
        <div className="invalid-feedback">{errorMessage}</div>
      ) : null}
    </div>
  );
};

export default FormInput;
