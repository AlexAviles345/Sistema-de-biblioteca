import { useEffect, useMemo, useState } from 'react';
import useLibros from '../hooks/useLibros';
import LibroForm from '../components/LibroForm';
import LibroDetail from '../components/LibroDetail';
import ActionButton from '../../../../../shared/components/inputs/ActionButton';
import AlertMessage from '../../../../../shared/components/feedback/AlertMessage';
import DataTable from '../../../../../shared/components/table/DataTable';
import Modal from '../../../../../shared/components/modal/Modal';
import './LibrosPage.css';

const initialForm = {
  titulo: '',
  autor: '',
  paginas: '',
  editorial: '',
  foto: null,
};

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

const LibrosPage = () => {
  const {
    libros,
    isLoading,
    isSaving,
    fieldErrors,
    requestError,
    fetchLibros,
    saveLibro,
    removeLibro,
    clearFieldError,
  } = useLibros();

  const [search, setSearch] = useState('');
  const [notice, setNotice] = useState(null);
  const [selectedLibro, setSelectedLibro] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [formValues, setFormValues] = useState(initialForm);
  const [resetKey, setResetKey] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchLibros();
  }, [fetchLibros]);

  useEffect(() => {
    if (requestError) {
      setNotice({ type: 'danger', message: requestError });
    }
  }, [requestError]);

  const filteredLibros = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) {
      return libros;
    }

    return libros.filter((libro) => {
      const titulo = libro.titulo?.toLowerCase() || '';
      const autor = libro.autor?.toLowerCase() || '';
      return titulo.includes(term) || autor.includes(term);
    });
  }, [libros, search]);

  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;
    const nextValue = type === 'file' ? files[0] : value;

    setFormValues((current) => ({
      ...current,
      [name]: nextValue,
    }));

    clearFieldError(name);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormValues(initialForm);
    setResetKey((value) => value + 1);
    setIsFormOpen(false);
  };

  const openCreateModal = () => {
    setEditingId(null);
    setFormValues(initialForm);
    setResetKey((value) => value + 1);
    setIsFormOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await saveLibro(formValues, editingId);

    if (result.ok) {
      setNotice({
        type: 'success',
        message: editingId
          ? 'Libro actualizado correctamente.'
          : 'Libro registrado exitosamente.',
      });
      resetForm();
      fetchLibros();
      return;
    }

    if (result.reason !== 'validation') {
      setNotice({
        type: 'danger',
        message: 'No se pudo guardar el libro.',
      });
    }
  };

  const handleEdit = (libro) => {
    setEditingId(libro.id);
    setFormValues({
      titulo: libro.titulo || '',
      autor: libro.autor || '',
      paginas: libro.paginas ?? '',
      editorial: libro.editorial || '',
      foto: null,
    });
    setResetKey((value) => value + 1);
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (libro) => {
    const shouldDelete = window.confirm(
      `Eliminar el libro "${libro.titulo || 'Sin titulo'}"?`,
    );

    if (!shouldDelete) {
      return;
    }

    const result = await removeLibro(libro.id);

    if (result.ok) {
      setNotice({ type: 'success', message: 'Libro eliminado.' });
      fetchLibros();
    }
  };

  const columns = [
    { header: 'Titulo', accessor: 'titulo' },
    { header: 'Autor', accessor: 'autor' },
    { header: 'Paginas', accessor: 'paginas' },
    { header: 'Editorial', accessor: 'editorial' },
    {
      header: 'Foto',
      render: (row) =>
        row.foto ? (
          <img
            src={resolveImageUrl(row.foto)}
            alt={row.titulo || 'Libro'}
            className="libro-thumb"
          />
        ) : (
          <span className="text-muted">Sin foto</span>
        ),
    },
    {
      header: 'Acciones',
      render: (row) => (
        <div className="d-flex flex-wrap gap-2">
          <ActionButton
            label="Ver"
            size="sm"
            variant="outline-primary"
            onClick={() => setSelectedLibro(row)}
          />
          <ActionButton
            label="Editar"
            size="sm"
            variant="outline-secondary"
            onClick={() => handleEdit(row)}
          />
          <ActionButton
            label="Eliminar"
            size="sm"
            variant="outline-danger"
            onClick={() => handleDelete(row)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="libros-page">
      <div className="container">
        <div className="libros-hero fade-rise">
          <div className="libros-hero-content">
            <div className="row align-items-center gy-3">
              <div className="col-lg-7">
                <h1 className="display-5 mb-2">Catalogo de libros</h1>
                <p className="lead mb-0">
                  Gestiona el inventario, agrega nuevas portadas y mantente al
                  dia con la coleccion.
                </p>
              </div>
              <div className="col-lg-5">
                <div className="search-panel">
                  <label className="form-label">Buscar</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Buscar por titulo o autor"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                    />
                    {search ? (
                      <ActionButton
                        label="Limpiar"
                        variant="outline-secondary"
                        onClick={() => setSearch('')}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 text-muted small">
              {filteredLibros.length} libros encontrados
            </div>
          </div>
        </div>

        <div className="row g-4 mt-3">
          <div className="col-12">
            <div className="table-card fade-rise delay-2">
              <div className="p-3 border-bottom border-light">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                  <div>
                    <h5 className="mb-1">Listado de libros</h5>
                    <span className="text-muted small">
                      {filteredLibros.length} resultados
                    </span>
                  </div>
                  <ActionButton
                    label="Agregar libro"
                    variant="primary"
                    onClick={openCreateModal}
                  />
                </div>
              </div>

              <div className="p-3">
                <AlertMessage
                  variant={notice?.type}
                  message={notice?.message}
                  onClose={() => setNotice(null)}
                />

                <DataTable
                  columns={columns}
                  data={filteredLibros}
                  isLoading={isLoading}
                  emptyMessage="No hay libros con ese filtro."
                />
              </div>
            </div>
          </div>
        </div>

        <Modal
          isOpen={Boolean(selectedLibro)}
          title="Detalle del libro"
          onClose={() => setSelectedLibro(null)}
          size="lg"
        >
          <LibroDetail
            libro={selectedLibro}
            onClose={() => setSelectedLibro(null)}
            onEdit={() => {
              if (selectedLibro) {
                handleEdit(selectedLibro);
              }
              setSelectedLibro(null);
            }}
          />
        </Modal>

        <Modal
          isOpen={isFormOpen}
          title={editingId ? 'Editar libro' : 'Registrar libro'}
          onClose={resetForm}
          size="lg"
        >
          <LibroForm
            values={formValues}
            errors={fieldErrors}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
            onCancel={resetForm}
            isSubmitting={isSaving}
            isEditing={Boolean(editingId)}
            resetKey={resetKey}
          />
        </Modal>
      </div>
    </div>
  );
};

export default LibrosPage;
