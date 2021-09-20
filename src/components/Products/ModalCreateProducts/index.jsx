import React,{useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createProduct, getCategoryProducts } from '../../../hooks/utils';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

import "./ModalCreateProducts.scss";

export default function ModalCreateProducts({ setRows }) {

    const [open, setOpen] = React.useState( false );

    const handleClickOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const addProduct = (newProduct) => {
        console.log("NUEVO",newProduct);
        if(!validateProduct(newProduct)) {
            console.log("NO VALIDOO");
            return;
        }
        createProduct({...newProduct, status: 1}).then((value) => {
            if(value!=null) {
                setRows((rows) => (
                    [...rows, value]
                ));
            }
        }).finally( ()=> {
            clearProduct();
            handleClose();
        });
    }

    const validateProduct = ({ idProduct, name, category, priceUnit, status }) => {
        console.log(name,category.name,priceUnit);
        if(
            name!="" &&
            category.name!="" &&
            priceUnit!=""
        ){
            return true;
        }else {
            return false;
        }
    };

    const [auxProduct, setauxProduct] = useState({
        idProduct: '',
        name: "",
        category: {
            idCategory: "",
            name: "",
            status: ""
        },
        priceUnit: '',
        status: ""
    });

    const {idProductAux, nameAux, categoryAux, priceUnitAux, statusAux} = auxProduct;
    // const {idCategoryAux , nameCategoryAux, statusCategoryAux }  = categoryAux;

    const clearProduct = () => {
        setauxProduct({
            idProduct: '',
            name: "",
            category: {
                idCategory: "",
                name: "",
                status: ""
            },
            priceUnit: '',
            status: ""
        });
    };

    const [listCategory, setlistCategory] = useState([]);

    useEffect(() => {
        getCategoryProducts().then( value => {
            setlistCategory(value);
        });
    }, [listCategory.length])

    const listStatus = [{label: "Activo", value: 1 }, {label: "Inactivo", value: 0}];

  return (
    <div className="left-button">
        <Button variant="contained" color="primary" onClick={handleClickOpen} >
            Create Product
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Product</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                value={ nameAux }
                onChange= { (e)=>setauxProduct({ ...auxProduct, name: e.target.value }) }
                fullWidth
            />
            <FormControl fullWidth >
                <InputLabel id="demo-simple-select-autowidth-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={ categoryAux }
                    onChange={ (e) => setauxProduct({...auxProduct, category: e.target.value}) }
                    label="Category"
                    >
                    {
                        listCategory.map(category => {
                            return (
                                <MenuItem key={category.idCategory} value={ category }>
                                    <em>{ category.name }</em>
                                </MenuItem>
                            );
                        })
                    }
                </Select>
            </FormControl>
            <TextField
                autoFocus
                margin="dense"
                id="price"
                label="Unit Price"
                type="number"
                value={ priceUnitAux }
                onChange= { (e)=>setauxProduct({ ...auxProduct, priceUnit: e.target.value }) }
                fullWidth
            />
            <FormControl fullWidth >
                <InputLabel id="demo-simple-select-autowidth-label">Status</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={ statusAux }
                    onChange={ (e) => setauxProduct({...auxProduct, status: e.target.value.value}) }
                    label="Status"
                    >
                    {
                        listStatus.map((status, index) => {
                            return (
                                <MenuItem key={ index } value={ status.value }>
                                    <em>{ status.label }</em>
                                </MenuItem>
                            );
                        })
                    }
                </Select>
            </FormControl>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={(e)=> addProduct(auxProduct) } color="primary">
                Add
            </Button>
            </DialogActions>
        </Dialog>
    </div>
  );
}
