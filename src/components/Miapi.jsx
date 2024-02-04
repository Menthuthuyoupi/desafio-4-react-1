import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const Miapi = ({monedas,infoMonedas,validarForm}) => {
    const [monto,setMonto] = useState('')
    const [select,setSelect] = useState('--Seleccione moneda--')
    const [count,setCount] = useState(0)

    var montoConvertido = ''
    var errorForm = false

    const [errorSelect,setErrorSelect] = useState(false)
    const [errorMonto,setErrorMonto] = useState(false)

    const validarInput = (e) => {
        setCount(count+1)
        const presionoBoton = true
        e.preventDefault()

        if(monto === '' || select === '--Seleccione moneda--'){

            errorForm = true
            const validarInput = () => {
                if(monto === ''){
                    setErrorMonto(true)
                }else{
                    setErrorMonto(false)
                }
            }

            validarInput()

            const validarSelect = () => {
                if( select === '--Seleccione moneda--'){
                    setErrorSelect(true)
                }else{
                    setErrorSelect(false)
                }
            }

            validarSelect()

        }else{
            setErrorMonto(false)
            setErrorSelect(false)
            errorForm = false
            
            infoMonedas.map(item =>{
                if(item.codigo === select){
                    montoConvertido = monto/item.valor   
                }
            })
        }
        validarForm(errorForm,montoConvertido,select,presionoBoton,count)
    }

    return (
        <>
            <h3 style={{color:'white'}}>Monto en Pesos chilenos CLP</h3>
            <Form onSubmit={validarInput}>
                <Form.Control className={errorMonto ? 'error' : 'inputs'} type="text" placeholder="Monto CLP a Convertir"
                pattern="[0-9]{0,13}" onChange={(e) => setMonto(e.target.value)} value={monto}/>
                        
                <Form.Select aria-label="Default select example" className={errorSelect ? 'error' : 'inputs'}
                 onChange={(e) => setSelect(e.target.value)}>

                    <option value="elegir una opction" disabled selected>--Seleccione moneda--</option>
                    {
                        monedas.map(coin =>
                            <>
                                <option>{coin}</option>
                            </>
                        )
                    }

                </Form.Select>
                <Button type='submit' variant="primary" style={{marginBottom:'10px'}}>Convertir</Button>
            </Form>
        </>

    )
}

Miapi.propTypes = {}

export default Miapi