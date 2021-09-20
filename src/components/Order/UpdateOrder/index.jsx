import React, { useEffect, useState } from "react";
import { useMediaQuery, Button } from "@material-ui/core";
import { Input } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { getProducts, updateOrder } from "../../../hooks/utils";
import Stylos from "./Update.scss";
import UpdateOrderTable from "../UpdateOrderTable";
import AddProduct from "../UpdateAddProduct";
import moment from 'moment';
import EditProduct from "../UpdateEditProduct";

function UpdateOrder({ setpageNumber, order }) {

  const [dateInput, setDateInput] = useState(moment(new Date(order.date), "YYYY/MM/DD").format("YYYY-MM-DD"));
  const [clientInput, setClientInput] = useState(order.client);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false)
  const [maxWidth, setMaxWidth] = useState('sm');
  const [productEdit, setProductEdit] = useState({})
  const [productDelete, setProductDelete] = useState({})

  const [rows, setRows] = useState([]);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    order.listProducts.forEach(element => {
      element.mode = 1;
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
  const handleDelete = () => {
    let orderSave = new Object();
    orderSave.id = order.id;
    //add product
    orderSave.action = 4
    orderSave.listProducts = [{ productDelete }]
    console.log("eliminar producto ", orderSave);

    updateOrder(orderSave).then((value) => {
      console.log("orden añadida con un producto mas ", value);
      setOpenDelete(false)
    });
  }

  const handleClickComplete = (action) => {
    let orderSave = new Object();
    orderSave.id = order.id;
    //add product
    orderSave.action = 3
    orderSave.status = action
    console.log(orderSave);

    updateOrder(orderSave).then((value) => {
      console.log("orden añadida con un producto mas ", value);
    });
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
                  onChange={e => {
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
                  onChange={(e) => {
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
          <UpdateOrderTable productsRows={rows} setRows={setRows} setOpenEdit={setOpenEdit} setProductEdit={setProductEdit} setOpenDelete={setOpenDelete} setProductDelete={setProductDelete}/>
        </div>

        <Dialog fullWidth={true} maxWidth={maxWidth} open={open} onClose={handleClose}>
          <AddProduct setOpen={setOpen} order={order} />
        </Dialog>
        <Dialog fullWidth={true} maxWidth={maxWidth} open={openEdit} onClose={handleClose}>
          <EditProduct setOpenEdit={setOpenEdit} order={order} product={productEdit} />
        </Dialog>
        <Dialog
          open={openDelete}
          onClose={() => { setOpenDelete(false) }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"delete product?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={() => { setOpenDelete(false) }} >Cancel</Button>
            <Button onClick={handleDelete} autoFocus>
              Ok
            </Button>
          </DialogActions>
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
            <button type="button" className="px-2 btn btn-success " onClick={(e) => handleClickComplete(2)}>
              Complete order
            </button>
            <button type="button" className="px-2 btn btn-danger btn-margin" onClick={(e) => handleClickComplete(3)}>
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
