import React, { useEffect, useState } from "react";
import TableInterface from "./TableProducts";
import { Modal, useMediaQuery, Button } from "@material-ui/core";
import { getProducts } from "../../hooks/utils"
import ModalCreateProducts from "./ModalCreateProducts";

const Products = () => {
  // const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const view = React.useState(1);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getProducts().then( (value) => {
      console.log("VALUE PRODUCTS", value);
      setRows(value);
    });
  }, [rows.length])


  return (
    <>
      <ModalCreateProducts setRows={ setRows } />
      <TableInterface rows={ rows } />
      {/* <Box py={20} textAlign="center">
          <Typography variant="h2">Orders Page</Typography>
        </Box> */}
    </>
  );
};
export default Products;
