import React from 'react'
import PropTypes from 'prop-types'
import {useState, useEffect} from 'react'

import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

  
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const Graph = ({monedaEscogida,pressedButton,contador,validarFormulario}) => {
    const info = `https://mindicador.cl/api/${monedaEscogida}`
    const [datos,setDatos] = useState([])

    useEffect(()=>{
        renderGraph()
    },[contador,pressedButton])

    const renderGraph = async () => {
        if(monedaEscogida !== '' && monedaEscogida !== '--Seleccione moneda--'){
            try {
                const series = await fetch(info)   
                const seriesJson = await series.json()  
                setDatos(seriesJson.serie.reverse())        //seriesJson.serie -> [{fecha1:'',valor1:''},{fecha2:'',valor2:''}]
        
            } catch (error) {
                alert(error.message)
            } 
        }  
    }
    
    return (
        <>
            {
                (pressedButton && !validarFormulario) ? 
                                <Line style={{backgroundColor:'#d7fcfa'}}
                                data=
                                {{
                                    labels: datos.map(info => info.fecha),
                                    datasets:
                                        [{
                                            label: monedaEscogida,
                                            data: datos.map(info => info.valor),
                                            tension:0.5,
                                            pointRadious:5,
                                            borderColor: 'rgb(255, 99, 132)',
                                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                        }]
                                }}/>
                                : null
            }
        </>
    )
}
Graph.propTypes = {}

export default Graph