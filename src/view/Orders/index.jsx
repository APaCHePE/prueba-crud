import React, { Component, useEffect, useState } from "react";
import { Box, Typography, useMediaQuery, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import PersonIcon from "@material-ui/icons/Person";
import "./Orders.scss";
import NOrders from "../../components/NOrders/index";
import OrderComponent from "../../components/Order/index";

const Orders = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));


  
  const [formValues, setFormValues] = useState({
    name1: "",
    name2: "",
    name3: "",
    name4: "",
  });


  return (
    <>
      <OrderComponent />
      {isMobile ? (
        <Box textAlign="left">
          <Button
            component={Link}
            variant="contained"
            color="primary"
            to="/Products"
          >
            <ChevronLeftIcon />
            <Typography variant="button">Products</Typography>
            <PersonIcon style={{ marginLeft: 15 }} />
          </Button>
        </Box>
      ) : (
        <> </>
      )}
    </>
  );
};
export default Orders;
