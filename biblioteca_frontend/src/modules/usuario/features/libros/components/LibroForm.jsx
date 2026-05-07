import ActionButton from '../../../../../shared/components/inputs/ActionButton';
import FormInput from '../../../../../shared/components/inputs/FormInput';
import FileInput from '../../../../../shared/components/inputs/FileInput';

const LibroForm = ({
  values,
  errors,
  onChange,
  onSubmit,
  onCancel,
  isSubmitting,
  isEditing,
  resetKey,
}) => (
  <form onSubmit={onSubmit} noValidate>
    <div className="row">
      <div className="col-12">
        <FormInput
          label="Titulo"
          name="titulo"
          value={values.titulo}
          onChange={onChange}
          error={errors.titulo}
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="col-12">
        <FormInput
          label="Autor"
          name="autor"
          value={values.autor}
          onChange={onChange}
          error={errors.autor}
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="col-md-6">
        <FormInput
          label="Paginas"
          name="paginas"
          type="number"
          min="1"
          value={values.paginas}
          onChange={onChange}
          error={errors.paginas}
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="col-md-6">
        <FormInput
          label="Editorial"
          name="editorial"
          value={values.editorial}
          onChange={onChange}
          error={errors.editorial}
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="col-12">
        <FileInput
          key={`foto-${resetKey}`}
          label="Foto"
          name="foto"
          accept="image/*"
          onChange={onChange}
          error={errors.foto}
          disabled={isSubmitting}
          helper="Sube una imagen JPG o PNG."
        />
      </div>
    </div>

    <div className="d-flex gap-2 mt-3">
      <ActionButton
        type="submit"
        variant="primary"
        label={isEditing ? 'Actualizar' : 'Guardar'}
        isLoading={isSubmitting}
        className="flex-fill"
      />
      {isEditing ? (
        <ActionButton
          type="button"
          variant="outline-secondary"
          label="Cancelar"
          onClick={onCancel}
          className="flex-fill"
          disabled={isSubmitting}
        />
      ) : null}
    </div>
  </form>
);

export default LibroForm;
