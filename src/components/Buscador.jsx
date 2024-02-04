import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table';

const Buscador = ({infoMonedas}) => {
    const [input,setInput] = useState('')
    const [errorInput,setErrorInput] = useState(false)

    const [mostrar,setMostrar] = useState(false)

    const [informacionMoneda, setInformacionMoneda] = useState([])

    const arr = []
    
    const [press,setPress] = useState(false)

    const validarBuscador = (e) => {
        setPress(true)
        e.preventDefault()
        setInformacionMoneda([])

        if(input === ''){
            setErrorInput(true)
            setMostrar(false)
        }else{
            setErrorInput(false)
            let i = 0
            infoMonedas.filter(info => {
                if(info.codigo.includes(input.toLowerCase())){
                    console.log('banana 2')
                    arr.push(info)
                    setInformacionMoneda(arr)
                    setMostrar(true)
                    i++
                }else{
                    if(i < 1){
                        setMostrar(false)
                    }
                }
            })      
        }
    }
    return (
        <div className='mb-2'>
            <h3 style={{color:'white'}}>Última informacion de Moneda</h3>
            <Form className='display-flex-form py-2 px-1' onSubmit={validarBuscador}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control className={errorInput ? 'error' : 'inputs'} placeholder={errorInput ? 'Introduzca el nombre de la moneda' : 'Nombre de la moneda'}
                        style={{width:'60%'}} type='text' name='buscador' onChange={(e) => setInput(e.target.value)} value={input}/>
                </Form.Group>
                <Button className='display-flex-start' variant="primary" type="submit">
                    Buscar moneda
                </Button>
            </Form>
            <div className='p-1' style={{backgroundColor:'#2a9c93'}}>
                {
                    mostrar && !errorInput ?
                    <>
                        <h4 style={{color:'white'}}>Resultado de la busqueda</h4>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Codigo</th>
                                    <th>nombre</th>
                                    <th>fecha</th>
                                    <th>valor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    informacionMoneda.map(item => 
                                        <>
                                            <tr>
                                                <td key={item.codigo}>{item.codigo}</td>
                                                <td key={item.nombre}>{item.nombre}</td>
                                                <td key={item.fecha}>{item.fecha}</td>
                                                <td key={item.valor}>{item.valor}</td>
                                            </tr> 
                                        </>

                                    )
                                }
                            </tbody>
                        </Table>
                    </> : (press ? <p className='resultado-busqueda' style={{color:'white'}}>Ningún Resultado</p> : null)

                }
            </div>
        </div>
    )
}

Buscador.propTypes = {}

export default Buscador