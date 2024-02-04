import React from 'react'
import PropTypes from 'prop-types'

import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';

const Alerta = ({validarFormulario,montoConvertido,monedaEscogida,pressedButton}) => {
  return (
    <p>
        {
            pressedButton ? (validarFormulario ? 
                                <Alert variant="danger">
                                    <Alert.Heading>Error al completar los Campos</Alert.Heading>
                                    <p>
                                        Porfavor revise los datos, no pueden estar vacios e ingrese un monto sin letras ni caracteres especiales
                                    </p>
                                </Alert>
                                :
                                <Alert variant="success">
                                    <Alert.Heading>Todos los campos correcto</Alert.Heading>
                                    <p style={{fontSize:'20px'}}>
                                        {`El resutado de la conversión de CLP a ${monedaEscogida} es:`}                                       
                                    </p>
                                    <p>
                                        {montoConvertido}
                                    </p>
                                </Alert>
                            )
                            : null
        }
    </p>
  )
}

Alerta.propTypes = {}

export default Alerta