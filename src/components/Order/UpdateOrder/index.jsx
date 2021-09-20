import React, { useEffect, useState } from "react";
import { useMediaQuery, Button } from "@material-ui/core";
import { Input } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import { getProducts } from "../../../hooks/utils";
import Stylos from "./Update.scss";
import UpdateOrderTable from "../UpdateOrderTable";
import AddProduct from "../UpdateAddProduct";
import moment from 'moment';

function UpdateOrder({ setpageNumber, order }) {

  const [dateInput, setDateInput] = useState(moment(new Date(order.date), "YYYY/MM/DD").format("YYYY-MM-DD"));
  const [clientInput, setClientInput] = useState(order.client);
  const [open, setOpen] = useState(false);
  const [maxWidth, setMaxWidth] = useState('sm');

  const [rows, setRows] = useState([]);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    order.listProducts.forEach(element => {
      element.mode=1;
    });
    setRows(order.listProducts);
  }, [])
  useEffect(() => {
    setClientInput(setClientInput)
  }, [clientInput]);
  useEffect(() => {
    setDateInput(dateInput)
  }, [dateInput]);

  const handleClickBack = () => {
    setpageNumber(0);
  }

  const handleClickComplete = () => {

  }

  const handleClickReject = () => {

  }
  return (
    <>

      <div className="content-update" >
        <div className="titleOrder">
          <p className="h1 h1Title table__title">Edit Order</p>
        </div>

        <div className="left-button">
          <Button variant="contained" color="primary" onClick={(e) => handleClickBack()}>Back
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
                  disabled
                  onChange={ e => {
                    setClientInput(e.target.value) 
                    console.log(e.target.value) 
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
                  type="date"
                  id="fname"
                  name="firstname"
                  value={dateInput}
                  disabled
                  placeholder="Select to date"
                  onChange={(e)=>{
                    setDateInput(e.target.value);
                    console.log(order);
                    console.log(moment(new Date(order.date), "YYYY/MM/DD").format("DD/MM/YYYY"));
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="containerTable">
          <UpdateOrderTable productsRows={rows} setRows={setRows} />
        </div>

        <Dialog fullWidth={true} maxWidth={maxWidth} open={open} onClose={handleClose}>
          <AddProduct setOpen={setOpen}/>
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
              Complete order
            </button>
            <button type="button" className="px-2 btn btn-danger btn-margin" onClick={(e) => handleClickReject()}>
              Reject order
            </button>
          </div>
        </div>
        <br />
      </div>
    </>
  );
}

export default UpdateOrder;
