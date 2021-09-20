import React, { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'numberProduct', headerName: 'Nro.', minWidth: 50 ,width: 100 },
  { field: 'name', headerName: 'Name', minWidth: 100 ,width: 500  },
  { field: `nameCategory`, headerName: 'Category', minWidth: 150 ,width: 600 },
  {
    field: 'priceUnit', headerName: 'Price', minWidth: 80 ,width: 200,// type: 'number', 
  },
];


export default function DataTable({ rows, setRowsSelection, rowsSelection }) {
  // const selectionModel = React.useMemo(() => {
  //   return (rows != null && rows.length>0)?rows.filter((r) => r.id < 101).map((r) => r.id): [];
  // }, rows);
  // console.log("rowsSelection datatable",rowsSelection);
  // const selectionModel = [];
  // const selectionModelAux = Rea

  console.log(rows);
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={(rows != null && rows.length > 0) ? rows : []}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableColumnResize={true}
        checkboxSelection
        selectionModel={rowsSelection}
        onSelectionModelChange={(e) => {
          console.log(e);
          setRowsSelection(e)
          // const selectedIDs = new Set(e.selectionModel);
          // const selectedRowData = rows.filter((r) =>
          //   selectedIDs.has(r.id.toString())
          // );
          // console.log(selectedRowData);
          // console.log(selectionModel);

        }}
      />
    </div>
  );
}