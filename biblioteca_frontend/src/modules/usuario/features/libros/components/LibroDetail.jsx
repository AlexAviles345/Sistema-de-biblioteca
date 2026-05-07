import ActionButton from '../../../../../shared/components/inputs/ActionButton';

const resolveImageUrl = (path) => {
  if (!path) {
    return '';
  }

  try {
    return new URL(path, import.meta.env.VITE_API_URL).toString();
  } catch (error) {
    return path;
  }
};

const LibroDetail = ({ libro, onClose, onEdit }) => {
  if (!libro) {
    return null;
  }

  const imageUrl = libro.foto ? resolveImageUrl(libro.foto) : '';

  return (
    <div className="libro-detail">
      <div className="d-flex flex-column flex-lg-row gap-4 align-items-start">
        <div className="flex-shrink-0">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={libro.titulo || 'Libro'}
              className="libro-detail-img"
            />
          ) : (
            <div className="libro-detail-placeholder">Sin foto</div>
          )}
        </div>
        <div className="flex-grow-1">
          <h2 className="mb-2">{libro.titulo || 'Sin titulo'}</h2>
          <p className="text-muted mb-4">{libro.autor || 'Autor no definido'}</p>

          <div className="row g-3">
            <div className="col-6">
              <div className="detail-label">Paginas</div>
              <div className="detail-value">{libro.paginas ?? '-'}</div>
            </div>
            <div className="col-6">
              <div className="detail-label">Editorial</div>
              <div className="detail-value">{libro.editorial || '-'}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex gap-2 mt-4">
        <ActionButton
          label="Cerrar"
          variant="outline-secondary"
          onClick={onClose}
          className="flex-fill"
        />
        <ActionButton
          label="Editar"
          variant="primary"
          onClick={onEdit}
          className="flex-fill"
        />
      </div>
    </div>
  );
};

export default LibroDetail;
