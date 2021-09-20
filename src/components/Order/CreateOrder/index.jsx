import React, { useEffect, useState } from "react";
import { useMediaQuery, Button } from "@material-ui/core";
import { Input } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import { getProducts, createOrders } from "../../../hooks/utils";
import "./CreateOrder.scss";
import TableProducts from "../TableProductCheck";
import TableProductsFilter from "../TableProductsFilter";
import moment from 'moment';

// import Table from "../TableOrders";

function CreateOrder({ setpageNumber }) {

  const [clientInput, setClientInput] = useState("");
  const [dateInput, setDateInput] = useState(moment(new Date()).format("YYYY-MM-DD"));

  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowsSelection, setRowsSelection] = useState([]);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [rowsSelectionAux, setRowsSelectionAux] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    // setProductSeleccionado(prevState=>({
    //   ...prevState,
    //   [name]: value
    // }));
  };

  useEffect(() => {
    getProducts().then((value) => {
      console.log("VALUE PRODUCTS", value);
      let i = 100;
      value.forEach((element) => {
        // let obj = value;
        element.nameCategory = element.category.name;
        element.numberProduct = i;
        element.id = i;
        element.amount = 1;
        element.cost=element.amount*element.priceUnit;
        i++;
      });
      setRows(value);
    });
  }, []);

  useEffect(() => {
    console.log("rowsSelection");
    console.log(rowsSelection);

    let arrayAux = [];
    setRowsSelectionAux([])

    rowsSelection.forEach(element => {
      rows.forEach(item => {
        if (item.id == element)
          arrayAux.push(item);
      });
    });
    console.log("arrayAux", arrayAux)
    setRowsSelectionAux(arrayAux)
    console.log("use effect", rowsSelection)


  }, [rowsSelection]);

  const handleClickEdit = () => {
    console.log("item click");
    setpageNumber(0);
  };
  const handleClickComplete = () => {
    let orderSend = new Object();
    orderSend.client = clientInput
    orderSend.date = dateInput
    orderSend.status = 1
    orderSend.amountTotal = 100.0 //subtotal
    orderSend.taxesAmount = 25.0//monto del impuesto
    orderSend.taxesTotal = 125.0 //subtotal mas impuestos
    orderSend.listProducts = rowsSelectionAux
    console.log(orderSend);
    
    createOrders(orderSend).then((value) => {
      console.log("Create Order", value);
    });
  }

  return (
    <>
      <div className="content-create">
        <div className="titleOrder">
          <p className="h1 h1Title table__title">Create Order</p>
        </div>

        <div className="left-button">
          <Button variant="contained" color="primary" onClick={(e) => handleClickEdit()}>Back
          </Button>
        </div>
        <div className="customerDetails">
          <div className="container">
            <div className="row">
              <div className="col-25">
                <label htmlFor="fname">Customer</label>
              </div>
              <div className="col-75">
                <Input
                  type="text"
                  id="fname"
                  name="firstname"
                  value={clientInput}
                  placeholder="Writing customer..."
                  onChange={(e) => {
                    setClientInput(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-25">
                <label htmlFor="fname">Status</label>
              </div>
              <div className="col-75">
                <Input
                  type="text"
                  id="fname"
                  name="firstname"
                  value="Pending"
                  placeholder="Pending"
                  disabled
                />
              </div>
            </div>

            <div className="row">
              <div className="col-25">
                <label htmlFor="fname">Date</label>
              </div>
              <div className="col-75">
                <Input
                  className="dateColor"
                  type="date"
                  id="fname"
                  name="firstname"
                  value={dateInput}
                  placeholder="Select to date"
                  onChange={(e) => {
                    setDateInput(e.target.value);
                    console.log(dateInput);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <TableProductsFilter rowsSelectionAux={rowsSelectionAux} setRowsSelectionAux={setRowsSelectionAux} setRowsSelection={setRowsSelection} rowsSelection={rowsSelection} />

        <Dialog fullScreen open={open} onClose={handleClose}>
          <button type="button" className="btn btn-secondary" onClick={handleClose}>
            Back
          </button>

          <div className="containerTable">
            <TableProducts rows={rows} setRowsSelection={setRowsSelection} rowsSelection={rowsSelection} />
            <button type="button" className="btn btn-primary" onClick={handleClose}>
              Close
            </button>
          </div>
        </Dialog>

        <div className="orderResults">
          <div className="right-button">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleClickOpen}
            >
              Add Item
            </button>
          </div>
          <div className="detailsResults border-0">
            <ul className="list-group me-5 border-0">
              <li className="list-group-item border-0 fw-bold">Subtotal</li>
              <li className="list-group-item border-0 fw-bold">Taxes</li>
              <li className="list-group-item border-0 ms-3">Total City Tax</li>
              <li className="list-group-item border-0 ms-3">Total County Tax</li>
              <li className="list-group-item border-0 ms-3">Total State Tax</li>
              <li className="list-group-item border-0 ms-3">Total Federal Tax</li>
              <li className="list-group-item border-0 fw-bold">Total Taxes</li>
              <li className="list-group-item border-0 fw-bold">Total</li>
            </ul>
            <ul className="list-group ms-5 border-0">
              <li className="list-group-item border-0 list-group-item-r">${ }10.20</li>
              <li className="list-group-item border-0 list-group-item-r">${ }10.20</li>
              <li className="list-group-item border-0 list-group-item-r">${ }10.20</li>
              <li className="list-group-item border-0 list-group-item-r">${ }10.20</li>
              <li className="list-group-item border-0 list-group-item-r">${ }10.20</li>
              <li className="list-group-item border-0 list-group-item-r">${ }10.20</li>
              <li className="list-group-item border-0 list-group-item-r">${ }10.20</li>
              <li className="list-group-item border-0 list-group-item-r">${ }10.20</li>
            </ul>
          </div>
          <div className="right-button">
            <button type="button" className="px-2 btn btn-success " onClick={(e) => handleClickComplete()}>
              {"Send order"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateOrder;
