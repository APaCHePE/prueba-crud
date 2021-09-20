import { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper, Button } from "@material-ui/core";


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable({ productsRows, setRows }) {

  const [quantity, setQuantity] = useState(0)
  const [quantityCost, setQuantityCost] = useState()
  const [mode, setMode] = useState(1)
  console.log("recibed productsRows", productsRows);
  function handleChange(e) {
    setQuantity(e.target.value);
    setQuantityCost(e.target.id)

    let a = parseInt(e.target.value)
    let b = parseFloat(e.target.id)
  }

  const handleClickDelete = (id) => {
    console.log("delete", id);
    let arrayAux = [];
  }
  const handleClickEdit = (id) => {
    console.log("edit", id);
    productsRows.forEach((item) => {
        if(item.idProduct == id){
          console.log("editar row");
          item.mode=2;
        }else {
          item.mode=1;
        }
    })
    setRows(productsRows);
  }
  const handleClickCancel = (id) => {
    console.log("cancel", id);
    setMode(1);
    let arrayAux = [];
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nro</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Unit Price</TableCell>
            <TableCell align="right">Cost</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productsRows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.idProduct}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right"><input type="number" className="input-Quantity" min="1" step="1"
                disabled={(row.mode == 1 ? true : false)}
                onChange={handleChange} name={row.id} id={row.priceUnit} /></TableCell>
              <TableCell align="right">${row.priceUnit.toFixed(1)}</TableCell>
              <TableCell align="right" >${row.amount.toFixed(1)}</TableCell>
              <TableCell align="center">
                {(row.mode == 1) ? <><button className="btn btn-link" onClick={(e) => handleClickEdit(row.idProduct)} >Edit</button>
                  <button className="btn btn-link" onClick={(e) => handleClickDelete(row.idProduct)} >Delete</button>
                </> :
                  <><button className="btn btn-link" onClick={(e) => handleClickCancel(row.idProduct)} >Save</button>
                    <button className="btn btn-link" onClick={(e) => handleClickCancel(row.idProduct)} >Cancel</button></>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}