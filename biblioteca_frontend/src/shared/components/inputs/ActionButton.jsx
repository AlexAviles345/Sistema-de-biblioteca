const ActionButton = ({
  label,
  children,
  variant = 'primary',
  size,
  type = 'button',
  className = '',
  isLoading = false,
  disabled = false,
  ...props
}) => {
  const content = label ?? children;
  const sizeClass = size ? `btn-${size}` : '';
  const classes = `btn btn-${variant} ${sizeClass} ${className}`.trim();

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span
          className="spinner-border spinner-border-sm me-2"
          role="status"
          aria-hidden="true"
        />
      ) : null}
      {content}
    </button>
  );
};

export default ActionButton;
