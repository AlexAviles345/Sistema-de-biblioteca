import LoadingSpinner from '../feedback/LoadingSpinner';

const DataTable = ({
  columns,
  data,
  isLoading = false,
  emptyMessage = 'Sin datos',
  rowKey = 'id',
  className = '',
}) => (
  <div className="table-responsive">
    <table className={`table table-striped table-hover align-middle ${className}`.trim()}>
      <thead className="table-light">
        <tr>
          {columns.map((column) => (
            <th key={column.header} className={column.className || ''} scope="col">
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <tr>
            <td colSpan={columns.length}>
              <LoadingSpinner label="Cargando registros..." />
            </td>
          </tr>
        ) : data.length ? (
          data.map((row, index) => {
            const key = row[rowKey] ?? `${rowKey}-${index}`;
            return (
              <tr key={key}>
                {columns.map((column, colIndex) => {
                  let content = '';
                  if (column.render) {
                    content = column.render(row);
                  } else if (typeof column.accessor === 'function') {
                    content = column.accessor(row);
                  } else if (column.accessor) {
                    content = row[column.accessor];
                  }

                  return (
                    <td key={`${key}-${colIndex}`} className={column.cellClassName || ''}>
                      {content ?? '-'}
                    </td>
                  );
                })}
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={columns.length} className="text-center text-muted py-4">
              {emptyMessage}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default DataTable;
