import React, { Component, useEffect, useState } from "react";
import { getAllOrders } from '../../hooks/utils'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import "./NOrders.scss";

const baseUrl = "https://apch-service-crud.herokuapp.com/api";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos: {
    cursor: 'pointer'
  },
  inputMaterial: {
    width: '100%'
  }
}));

const NOrders = () => {

  const styles = useStyles();

  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [consolaSeleccionada, setConsolaSeleccionada] = useState(
    {
      "amountTotal": 0,
      "client": "ALEXANDERS PRADO",
      "date": "2021/09/15",
      "id": 1,
      "listProducts": [
        {
          "amount": 5,
          "category": {
            "idCategory": "1",
            "name": "GALLETA",
            "status": "STOCK"
          },
          "idProduct": 1,
          "name": "SODA",
          "priceUnit": 2.5,
          "status": 1
        }
      ],
      "orderNumber": "001",
      "status": 1,
      "taxesAmount": 20.4,
      "taxesTotal": 15.2
    })

  const handleChange = e => {
    const { name, value } = e.target;
    setConsolaSeleccionada(prevState => ({
      ...prevState,
      [name]: value
    }))
    console.log(consolaSeleccionada);
  }

  const peticionGet = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      })
  }

  const peticionPost = async () => {
    await axios.post(baseUrl, consolaSeleccionada)
      .then(response => {
        setData(data.concat(response.data))
        abrirCerrarModalInsertar()
      })
  }
  ////
  const peticionDelete = async () => {
    await axios.delete(baseUrl + consolaSeleccionada.id)
      .then(response => {
        setData(data.filter(consola => consola.id !== consolaSeleccionada.id));
        abrirCerrarModalEliminar();
      })
  }

  const peticionPut = async () => {
    await axios.put(baseUrl + consolaSeleccionada.id, consolaSeleccionada)
      .then(response => {
        var dataNueva = data;
        dataNueva.map(consola => {
          if (consolaSeleccionada.id === consola.id) {
            consola.nombre = consolaSeleccionada.nombre;
            consola.lanzamiento = consolaSeleccionada.lanzamiento;
            consola.empresa = consolaSeleccionada.empresa;
            consola.unidades_vendidas = consolaSeleccionada.unidades_vendidas;
          }
        })
        setData(dataNueva);
        abrirCerrarModalEditar();
      })
  }


  useEffect(() => {
    getAllOrders().then((value) => {
      console.log("VALUE Orders", value);
      setData(value);
    });
  }, [])


  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }
  /////
  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  }

  const seleccionarConsola = (consola, caso) => {
    setConsolaSeleccionada(consola);
    (caso === 'Editar') ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
  }

  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Agregar Nueva Consola</h3>
      <TextField name="nombre" className={styles.inputMaterial} label="Nombre" onChange={handleChange} />
      <br />
      <TextField name="empresa" className={styles.inputMaterial} label="Empresa" onChange={handleChange} />
      <br />
      <TextField name="lanzamiento" className={styles.inputMaterial} label="Lanzamiento" onChange={handleChange} />
      <br />
      <TextField name="unidades_vendidas" className={styles.inputMaterial} label="Unidades Vendidas" onChange={handleChange} />
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={() => peticionPost()}>Insertar</Button>
        <Button onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Editar Consola</h3>
      <TextField name="nombre" className={styles.inputMaterial} label="Nombre" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.nombre} />
      <br />
      <TextField name="empresa" className={styles.inputMaterial} label="Empresa" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.empresa} />
      <br />
      <TextField name="lanzamiento" className={styles.inputMaterial} label="Lanzamiento" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.lanzamiento} />
      <br />
      <TextField name="unidades_vendidas" className={styles.inputMaterial} label="Unidades Vendidas" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.unidades_vendidas} />
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={() => peticionPut()}>Editar</Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar la consola <b>{consolaSeleccionada && consolaSeleccionada.nombre}</b> ? </p>
      <div align="right">
        <Button color="secondary" onClick={() => peticionDelete()} >Sí</Button>
        <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>

      </div>

    </div>
  )


  return (
    <>
      <div className="App">
        <br />
        <Button onClick={() => abrirCerrarModalInsertar()} >Add Order</Button>
        <br /><br />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nro</TableCell>
                <TableCell>Consumer</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map(consola => (
                <TableRow key={consola.id}>
                  <TableCell>{consola.id}</TableCell>
                  <TableCell>{consola.client}</TableCell>
                  <TableCell>{consola.status}</TableCell>
                  <TableCell>{consola.date}</TableCell>
                  <TableCell>{consola.taxesAmount}</TableCell>
                  <TableCell> edit
                    <Edit className={styles.iconos} onClick={() => seleccionarConsola(consola, 'Editar')} />
                    &nbsp;&nbsp;&nbsp;
                    {/* <Delete  className={styles.iconos} onClick={()=>seleccionarConsola(consola, 'Eliminar')}/> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal
          open={modalInsertar}
          onClose={abrirCerrarModalInsertar}>
          {bodyInsertar}
        </Modal>

        <Modal
          open={modalEditar}
          onClose={abrirCerrarModalEditar}>
          {bodyEditar}
        </Modal>

        <Modal
          open={modalEliminar}
          onClose={abrirCerrarModalEliminar}>
          {bodyEliminar}
        </Modal>

      </div>
    </>
  );
}

export default NOrders;