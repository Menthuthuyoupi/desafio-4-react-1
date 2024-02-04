import {useState, useEffect} from 'react'
import './App.css'

import Miapi from './components/Miapi'
import Alerta from './components/Alerta'
import Graph from './components/Graph'
import Buscador from './components/Buscador'

function App() {
    const [monedas, setMonedas] = useState([])
    const [infoMonedas, setInfoMonedas] = useState([])

    const [validarFormulario,setValidarFormulario] = useState(false)
    const [pressedButton,setPressedButton] = useState(false)
    const [montoConvertido,setMontoConvertido] = useState('')
    const [monedaEscogida, setMonedaEscogida] = useState('')
    const [contador,setContador] = useState(0)


    useEffect(()=>{
        datosEconomicos()
    },[])


    const datosEconomicos = async () => {
      const url = 'https://mindicador.cl/api/'
      const response = await fetch(url);
      const data = await response.json();
      const monedasDatos = Object.entries(data).splice(3, Object.entries(data).length - 8) //[[moneda1,{}],[moneda2,{}]....]
      monedasDatos.splice(5,1)

      const arrMonedas = []
      const arrInfoMonedas = []

      monedasDatos.forEach((coin) => {
          arrMonedas.push(coin[0]);
          arrInfoMonedas.push(coin[1])
      });

      setMonedas(arrMonedas)
      setInfoMonedas(arrInfoMonedas)
    }

    const validarForm = (errorForm,resultado,select,presionoBoton,count) => {
      setValidarFormulario(errorForm)
      setMontoConvertido(resultado)
      setMonedaEscogida(select)
      setPressedButton(presionoBoton)
      setContador(count)
    }

    return (
      <>
        <div style={{backgroundColor:'#2a9c93'}}>
          <h2 style={{marginBottom:'20px',padding:'5px 25px',color:'white',borderBottom:'1px solid white'}}>Datos Económicos y Conversor CLP</h2>
          <Buscador infoMonedas={infoMonedas} />
          <Miapi monedas={monedas} infoMonedas={infoMonedas} validarForm={validarForm}/>
          <Alerta validarFormulario={validarFormulario} montoConvertido={montoConvertido} monedaEscogida={monedaEscogida} pressedButton={pressedButton}/>
          <Graph monedaEscogida={monedaEscogida} pressedButton={pressedButton} validarFormulario={validarFormulario} contador={contador}/>
        </div>
      </>
    )
}

export default App
