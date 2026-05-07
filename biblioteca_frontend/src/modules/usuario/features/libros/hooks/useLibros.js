import { useCallback, useState } from 'react';
import {
  getLibros,
  createLibro,
  updateLibro,
  deleteLibro,
} from '../api/librosApi';

const buildLibroPayload = (values) => {
  const payload = new FormData();
  payload.append('titulo', values.titulo?.trim() || '');
  payload.append('autor', values.autor?.trim() || '');
  payload.append('paginas', String(values.paginas ?? ''));
  payload.append('editorial', values.editorial?.trim() || '');

  if (values.foto instanceof File) {
    payload.append('foto', values.foto);
  }

  return payload;
};

const useLibros = () => {
  const [libros, setLibros] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [requestError, setRequestError] = useState('');

  const fetchLibros = useCallback(async () => {
    setIsLoading(true);
    setRequestError('');

    try {
      const response = await getLibros();
      setLibros(response.data || []);
    } catch (error) {
      setRequestError('No se pudieron cargar los libros.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveLibro = useCallback(async (values, id = null) => {
    setIsSaving(true);
    setFieldErrors({});
    setRequestError('');

    try {
      const payload = buildLibroPayload(values);

      if (id) {
        await updateLibro(id, payload);
      } else {
        await createLibro(payload);
      }

      return { ok: true };
    } catch (error) {
      const payloadErrors = error?.response?.data;

      if (payloadErrors && typeof payloadErrors === 'object') {
        setFieldErrors(payloadErrors);
        return { ok: false, reason: 'validation' };
      }

      setRequestError('No se pudo guardar el libro.');
      return { ok: false, reason: 'request' };
    } finally {
      setIsSaving(false);
    }
  }, []);

  const removeLibro = useCallback(async (id) => {
    setRequestError('');

    try {
      await deleteLibro(id);
      return { ok: true };
    } catch (error) {
      setRequestError('No se pudo eliminar el libro.');
      return { ok: false };
    }
  }, []);

  const clearFieldError = useCallback((field) => {
    setFieldErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const next = { ...current };
      delete next[field];
      return next;
    });
  }, []);

  return {
    libros,
    isLoading,
    isSaving,
    fieldErrors,
    requestError,
    fetchLibros,
    saveLibro,
    removeLibro,
    clearFieldError,
  };
};

export default useLibros;
