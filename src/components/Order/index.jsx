import React, { useEffect, useState } from "react";
import TableOrder from "./TableOrders";
import CreateOrder from "./CreateOrder";
import UpdateOrder from "./UpdateOrder";
import Dialog from '@material-ui/core/Dialog';
import { Modal, useMediaQuery, Button } from "@material-ui/core";
import api from '../../hooks/utils';
import { getAllOrders } from "../../hooks/utils";
import "./Order.scss";

import { useHistory } from 'react-router-dom';

const Orders = () => {
  const view = React.useState(1);
  const history = useHistory();

  const [listOrders, setStateListOrder] = useState([])
  const handleSubmit = (data) => {
    getAllOrders().then((response) => {
      setStateListOrder(response)
      console.log("Get Orders", response)
    });
  };
  useEffect(() => {
    handleSubmit();
  }, [])

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openEdit, setOpenEdit] = useState(false);
  const handleClickOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const [pageNumber, setpageNumber] = useState(0)
  const [orderSelected, setOrderSelected] = useState({})
  useEffect(() => {
    console.log(listOrders);
  }, [])

  

  return (
    <>

      {/* <Button variant="contained" color="primary" onClick={handleClickOpenEdit}>Redirect Order</Button> */}
      {(pageNumber == 0) ?
        <>
          <div className="table__title"> Orders </div>
          <div className="left-button">
            <Button variant="contained" color="primary" onClick={() => { setpageNumber(2) }}>Create Order
            </Button>
          </div>
          <TableOrder rows={listOrders} setpageNumber={setpageNumber} setOrderSelected={setOrderSelected}/>
        </> :
        (pageNumber == 1) ? <UpdateOrder order={orderSelected} setpageNumber={setpageNumber} /> : <CreateOrder setpageNumber={setpageNumber} />
      }

    </>
  );
};
export default Orders;
