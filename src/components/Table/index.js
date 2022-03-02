import React, { useEffect } from 'react';
import MaterialTable, { MTableActions } from 'material-table';

const Table = (props) => {
  const {
    data,
    title,
    columns,
    actions,
    localization,
    headerColor = null,
    parentChildData = null,
    selection = false,
    refTable = null,
    useCustomRef = false,
    details = null,
    onRowClickTrue,
    exportButton,
    setToolbar,
    onSelectionChange,
    paging = false,
  } = props;

  const tableRef = React.createRef();
  const editableData = data?.map((o) => ({ ...o }));

  useEffect(() => {
    if (useCustomRef) {
      refTable.current.onQueryChange();
    } else {
      tableRef.current.onQueryChange();
    }
  }, [tableRef, refTable, data]);

  return (
    <div>
      <MaterialTable
        actions={actions}
        columns={columns}
        localization={{
          header: { actions: 'Actions' },
          body: {
            localization,
            emptyDataSourceMessage: <div>No Data</div>,
          },
        }}
        components={{
          Actions: (props) => (
            <div className='actions-custom'>
              <MTableActions {...props} />
            </div>
          ),
        }}
        data={() => {
          return new Promise((resolve) => {
            resolve({
              data: editableData,
            });
          });
        }}
        options={{
          exportButton,
          actionsColumnIndex: -1,
          headerStyle: {
            fontSize: '1.3rem',
            backgroundColor: headerColor,
            position: 'sticky',
            top: 0,
          },
          rowStyle: {
            fontSize: '1.3rem',
            border: '0px',
          },
          draggable: false,
          filtering: false,
          sorting: true,
          search: false,
          toolbar: setToolbar,
          emptyRowsWhenPaging: false,
          searchAutoFocus: true,
          selection,
          actionsCellStyle: {
            justifyContent: 'flex-end',
          },
          paging,
        }}
        parentChildData={parentChildData}
        set
        tableRef={useCustomRef ? refTable : tableRef}
        title={title || ''}
        totalCount={60}
        detailPanel={details}
        onRowClick={
          onRowClickTrue ? (event, rowData, togglePanel) => togglePanel() : null
        }
        onSelectionChange={onSelectionChange}
      />
    </div>
  );
};

export default Table;
