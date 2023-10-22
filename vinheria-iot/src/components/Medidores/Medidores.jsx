/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { format } from 'date-fns';
import styled from "styled-components"
import axios from "axios"
import "./style.css"
const Main = styled.main`
    width:100%;
    display:flex;
    align-items:center;
    flex-direction:column;
`
const DivTituloDestaque = styled.div`
    background-color:lightblue;
    width:60%;
    margin-top:1em;
    border-radius:30px;
    h1{
        text-align:center;
        padding:0.2em;
    }
`
const SectionMedidores = styled.section`
    margin-top:2em;
    display:flex;
    flex-direction:column;
    width:40%;
    align-items:center;
    justify-content:center;
    div{
        border:1px solid black;
        border-radius:20px;
        display:flex;
        flex-direction:column;
        align-items:center;
        p{
            padding:0.5em;
            text-align:center;
            font-size:20px;
            font-weight:600;
            color:green;
        }
        h2{
            text-align:center;
            color:green;
        }
        .perigo{
            color:red;
        }
        .atencao{
            color:yellow;
        }
        .status{
            margin-top:2em;
        }
        
        ul{
            display:flex;
            justify-content:center;
            padding:1em;
            color:green;
            font-size:20px;
        }
    }
`
const Medidor = styled.div`
    width: 90%;
    height: 40px;
    border: 1px solid #000;
    border-radius:30px;
    position: relative;
    margin-top:1em;
    background-color:#303030
`
const Barra = styled.div`
    width: 0%;
    height: 100%;
    background-color: green;
    position: absolute;
    border-radius:30px;
    top: 0;
    left: 0;
`
function Medidores() {
    const [luminosidade, setLuminosidade] = useState(0)
    const [temperatura, setTemperatura] = useState(0)
    const [umidade, setUmidade] = useState(0)
    const [historicoTemperatura, setHistoricoTemperatura] = useState([])
    const [historicoLuminosidade, setHistoricoLuminosidade] = useState([])
    const [historicoUmidade, setHistoricoUmidade] = useState([])


    const dados = () => {
        axios.get('http://localhost:3000/api/dados')  // Ou substitua localhost e a porta pelo endereço do seu servidor proxy
            .then((response) => {
                // console.log(response.data);
                setLuminosidade(response.data.luminosidade.value)
                setTemperatura(response.data.temperatura.value)
                setUmidade(response.data.umidade.value)

            })
            .catch((error) => {
                console.log(error);
            });
    }
    setInterval(dados, 10000)

    // Atualize o estilo das barras com base nos valores de temperatura, luminosidade e umidade
    const barTemperaturaStyle = {
        width: `${temperatura}%`,
        backgroundColor: temperatura >= 10 && temperatura < 15 ? "" : "yellow"
    };
    const barLuminosidadeStyle = {
        width: `${luminosidade}%`,
        backgroundColor: luminosidade > 20 && luminosidade < 30 ? "" : "red"
    };
    const barUmidadeStyle = {
        width: `${umidade}%`,
        backgroundColor: umidade > 10 && umidade < 50 ? "" : "red"
    };

    let verificadorTemp = ""
    if (temperatura > 10 && temperatura < 15) {
        verificadorTemp = ""
    } else if (temperatura > 15) {
        verificadorTemp = "atencao"
    } else if (temperatura < 10) {
        verificadorTemp = "perigo"
    } else {
        verificadorTemp = ""
    }

    let verificadorLuz = ""
    if (luminosidade > 20 && luminosidade < 30) {
        verificadorLuz = ""
    } else if (luminosidade > 30) {
        verificadorLuz = "perigo"
    } else if (luminosidade < 20) {
        verificadorLuz = "atencao"
    } else {
        verificadorLuz = ""

    }
    let verificadorUmidade = ""
    if (umidade > 10 && umidade < 50) {
        verificadorUmidade = ""
    } else if (umidade > 50) {
        verificadorUmidade = "perigo"
    } else if (umidade < 10) {
        verificadorUmidade = "atencao"
    } else {
        verificadorUmidade = ""
    }
    const tempHistorico = () => {
        axios.get('http://localhost:3000/api/historico/temperatura')
            .then((response) => {
                setHistoricoTemperatura(response.data)
            }).catch(erro => {
                console.log("Erro", erro);
            })
    }
    const luzHistorico = () => {
        axios.get('http://localhost:3000/api/historico/luminosidade')
            .then((response) => {
                setHistoricoLuminosidade(response.data)
            }).catch(erro => {
                console.log("Erro", erro);
            })
    }
    const umidadeHistorico = () => {
        axios.get('http://localhost:3000/api/historico/umidade')
            .then((response) => {
                setHistoricoUmidade(response.data)
            }).catch(erro => {
                console.log("Erro", erro);
            })
    }
    useEffect(() => {
        tempHistorico()
        luzHistorico()
        umidadeHistorico()
    }, [])
    const dataTemp = []
    const dataLuz = []
    const dataUmidade = []
    historicoTemperatura.forEach(item => {
        const dataOriginal = item.recvTime
        const dataFormatada = format(new Date(dataOriginal), 'dd/MM/yyyy - HH:mm:ss')
        dataTemp.push({
            "id": item._id,
            "recvTime": dataFormatada,
            "valores": item.attrValue,
            "attrType": item.attrType,
            "attrName": item.attrName
        })
    })
    historicoLuminosidade.forEach(item => {
        const dataOriginal = item.recvTime
        const dataFormatada = format(new Date(dataOriginal), 'dd/MM/yyyy - HH:mm:ss')
        dataLuz.push({
            "id": item._id,
            "recvTime": dataFormatada,
            "valores": item.attrValue,
            "attrType": item.attrType,
            "attrName": item.attrName
        })
    })
    historicoUmidade.forEach(item => {
        const dataOriginal = item.recvTime
        const dataFormatada = format(new Date(dataOriginal), 'dd/MM/yyyy - HH:mm:ss')
        dataUmidade.push({
            "id": item._id,
            "recvTime": dataFormatada,
            "valores": item.attrValue,
            "attrType": item.attrType,
            "attrName": item.attrName
        })
    })

    return (
        <Main>
            <DivTituloDestaque>
                <h1>Medidores</h1>
            </DivTituloDestaque>
            <SectionMedidores>
                <div>
                    <Medidor>
                        <Barra style={barLuminosidadeStyle}></Barra>
                    </Medidor>
                    <p className={verificadorLuz}>{luminosidade}%</p>
                    <h2 className={verificadorLuz}>Luminosidade</h2>
                    <h2 className={`status ${verificadorLuz}`}>Status:</h2>
                    <ul>
                        <li className={verificadorLuz}>{luminosidade > 20 && luminosidade < 30 ? "Ok" : "ATENÇÃO"}</li>
                    </ul>
                    <LineChart
                        width={800}
                        height={300}
                        data={dataLuz}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="recvTime" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="valores" stroke="#8884d8" activeDot={{ r: 8 }} />
                        {/* <Line type="monotone" dataKey="recvTime" stroke="#82ca9d" /> */}
                    </LineChart>
                </div>
                <div>
                    <Medidor>
                        <Barra style={barTemperaturaStyle}></Barra>
                    </Medidor>
                    <p className={verificadorTemp}>{temperatura}°C</p>
                    <h2 className={verificadorTemp}>Temperatura</h2>
                    <h2 className={`status ${verificadorTemp}`}>Status:</h2>
                    <ul>
                        <li className={verificadorTemp}>{temperatura > 10 && temperatura < 15 ? "Ok" : "ATENÇÃO"}</li>
                    </ul>
                    <LineChart
                    width={800}
                    height={300}
                    data={dataTemp}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="recvTime" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="valores" stroke="#8884d8" activeDot={{ r: 8 }} />
                    {/* <Line type="monotone" dataKey="recvTime" stroke="#82ca9d" /> */}
                </LineChart>
                </div>
                <div>
                    <Medidor>
                        <Barra style={barUmidadeStyle}></Barra>
                    </Medidor>
                    <p className={verificadorUmidade}>{umidade}%</p>
                    <h2 className={verificadorUmidade}>Umidade</h2>
                    <h2 className={`status ${verificadorUmidade}`}>Status:</h2>
                    <ul>
                        <li className={verificadorUmidade}>{umidade > 10 && umidade < 50 ? "Ok" : "ATENÇÃO"}</li>
                    </ul>
                    <LineChart
                    width={800}
                    height={300}
                    data={dataUmidade}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="recvTime" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="valores" stroke="#8884d8" activeDot={{ r: 8 }} />
                    {/* <Line type="monotone" dataKey="recvTime" stroke="#82ca9d" /> */}
                </LineChart>
                </div>
            </SectionMedidores>

            <SectionMedidores>

                
                

                
            </SectionMedidores>
        </Main>
    )
}
export default Medidores