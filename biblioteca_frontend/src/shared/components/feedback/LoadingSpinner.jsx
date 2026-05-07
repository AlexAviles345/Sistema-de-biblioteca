const LoadingSpinner = ({ label = 'Cargando...' }) => (
  <div className="d-flex flex-column align-items-center justify-content-center py-4 text-muted">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">{label}</span>
    </div>
    <span className="mt-2 small">{label}</span>
  </div>
);

export default LoadingSpinner;
