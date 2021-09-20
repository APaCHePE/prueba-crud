import React from 'react';
import {
  Box,
  Typography,
  useMediaQuery,
  Button,
  Grid,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import SchoolIcon from "@material-ui/icons/School";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import ProductComponent from "../../components/Products";
import "./Product.scss";

const Products = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <>
      <div className= "table__title"> Products </div>

      <ProductComponent className="title-table"/>
      {/* <Box py={20} textAlign="center">
        <Typography variant="h2">Products Page</Typography>
      </Box> */}
      {isMobile ? (
        <Grid container justify="space-between">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/Products"
            >
              <ChevronLeftIcon />
              <Typography variant="button">Orders</Typography>
              <SchoolIcon style={{ marginLeft: 15 }} />
            </Button>
          </Grid>
          {/* <Grid item>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/Personal"
            >
              <BookmarksIcon style={{ marginRight: 15 }} />
              <Typography variant="button">Personal</Typography>
              <ChevronRightIcon />
            </Button>
          </Grid> */}
        </Grid>
      ) : (
        <></>
      )}
    </>
  );
};

export default Products;