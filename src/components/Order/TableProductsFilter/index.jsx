import { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


export default function BasicTable({ rowsSelectionAux, setRowsSelectionAux, setRowsSelection, rowsSelection }) {

  const [quantity, setQuantity] = useState(0)
  const [quantityCost, setQuantityCost] = useState();
  function handleChange(e) {
    setQuantity(e.target.value);
    setQuantityCost(e.target.id)

    let a = parseInt(e.target.value)
    let b = parseFloat(e.target.id)

    rowsSelectionAux.forEach((item) => {
      if (item.id.toString() == e.target.name) {
        item.cost = a * b;
        item.amount=e.target.value
      }
    });
    setRowsSelectionAux(rowsSelectionAux)
  }

  const handleClickDelete = (id) => {

    console.log('DELETE')
    console.log('rowsSelection', rowsSelection);
    console.log('id', id);

    let arrayAux = [];
    let arrayAuxCheck = [];

    rowsSelectionAux.forEach((item) => {
      if (item.id !== id) {
        arrayAux.push(item);
      }
    })

    rowsSelection.forEach((item, i) => {
      if (item !== id) {
        arrayAuxCheck.push(item);
      }
    })
    setRowsSelection(arrayAuxCheck);
    setRowsSelectionAux(arrayAux);
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell width="10%" >Nro</TableCell>
            <TableCell width="40%" align="left">Name</TableCell>
            <TableCell width="15%" align="right">Quantity</TableCell>
            <TableCell width="10%" align="right">Unit Price</TableCell>
            <TableCell width="15%" align="right">Cost</TableCell>
            <TableCell width="10%" align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsSelectionAux.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="right"><input style={{ width: "70%" }} type="number" className="input-Quantity" min="1" step="1"
                value={row.amount} onChange={handleChange} name={row.id} id={row.priceUnit} /></TableCell>
              <TableCell align="right">${row.priceUnit.toFixed(1)}</TableCell>
              <TableCell align="right" >${row.cost.toFixed(1)}</TableCell>
              <TableCell align="right">
                <button className="btn btn-link mx-0" onClick={(e) => handleClickDelete(row.id)} >Delete</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}