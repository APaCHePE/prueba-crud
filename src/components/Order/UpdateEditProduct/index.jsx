import React, { useEffect, useState } from "react";
import Select from "../../Select";
import SelectMultiple from "../../SelectMultiple";
import Button from '@material-ui/core/Button';
import { getProducts, getCategoryProducts, updateOrder } from "../../../hooks/utils";
import "./AddProduct.scss"

const EditProduct = ({setOpenEdit, order, product}) => {
  const [listCategory, setlistCategory] = useState([]);
  const [listProducts, setProducts] = useState([]);
  const [listCategorySelecteds, setlistCategorySelected] = useState([]);
  const [itemProductSelecteds, setItemSelected] = useState({});
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  useEffect(() => {
    setQuantity(product.amount)
    setPrice(product.priceUnit)
    setTotal(product.amount*product.priceUnit)
    getCategoryProducts().then(value => {
      setlistCategory(value);
    });
    getListProducts();
  }, []);
  const getListProducts = () => {
    getProducts().then((value) => {
      console.log("VALUE PRODUCTS", value);
      let i = 100;
      value.forEach((element) => {
        element.nameCategory = element.category.name;
        element.numberProduct = i;
        element.id = i;
        element.amount = 1;
        i++;
      });
      setProducts(value);
    });
  }
  useEffect(() => {
    console.log("listCategorySelecteds", listCategorySelecteds);
    let array = []
    if (listCategorySelecteds.length > 0) {
      listCategory.forEach(item => {
        listCategorySelecteds.forEach(element => {
          if (element == item.name)
            array.push(item.idCategory)
        });
      });
    }
    console.log("array ", array);
  }, [listCategorySelecteds])
  useEffect(() => {
    console.log("listProductSelecteds", itemProductSelecteds);
    if (Object.keys(itemProductSelecteds).length > 0) {
      setQuantity(1);
      setPrice(itemProductSelecteds.priceUnit);
      setTotal(itemProductSelecteds.priceUnit * 1);
    }
  }, [itemProductSelecteds])
  const handleClickSave = () => {
    let orderSave = new Object();
    orderSave.id = order.id;
    //add product
    orderSave.action = 1
    product.amount= quantity
    orderSave.listProducts = [product]
    console.log(orderSave);
    
    updateOrder(orderSave).then((value) => {
      console.log("orden editado con un producto mas ", value);
      setOpenEdit(false)
    });
  }
  const handleClickCancel = () => {
    setOpenEdit(false);
  }
  return (
    <>
      <div className="content-product">
        <div>
          <h1>Edit Product</h1>
          <div className="select select-multiple my-3">
            <label className="col-2">Categoy</label>
            <input value={product.category.name} disabled/>
          </div>
          <div className="select select-unique mb-3">
            <label className="col-2">Product</label>
            <input value={product.name} disabled/>
          </div>
          <div className="row my-2">
            <label className="col-2">Price</label>
            <label className="col-2"><div>{price.toFixed(1)}</div></label>
          </div>
          <div className="row my-2">
            <label className="col-2">Quantity</label>
            <input className="col-2" type="number" value={quantity} onChange={(e) => { setTotal(e.target.value * price); setQuantity(e.target.value) }}></input>
          </div>
          <div className="row my-2">
            <label className="col-2">Cost</label>
            <label className="col-2"><div>{total.toFixed(1)}</div></label>
          </div>
          <div className="d-flex justify-content-end">
            <Button className="mx-2" variant="contained" onClick={() => { handleClickSave() }}>Save</Button>
            <Button className="ml-2" variant="outlined" onClick={() => { handleClickCancel() }}>Cancel</Button>
          </div>
        </div>
      </div>
    </>
  )
}
export default EditProduct;