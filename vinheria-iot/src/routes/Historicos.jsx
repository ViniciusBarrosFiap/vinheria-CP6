import styled from "styled-components"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useEffect, useState } from "react";
import { format } from 'date-fns';
import axios from "axios";
import Header from "../components/Header/Header";
const Main = styled.main`
    width:100%;
    display:flex;
    ter;
    align-items:center;
    flex-direction:column;
    .sectionTitulo{
        width:60%;
        background-color:lightblue;
        border-radius:30px;
        margin-top:2em;
        h1{
            text-align:center;
            padding:1em;
        }
    }
    div{
        h1{
            padding:1em;
            color:white;
            text-align:center;
        }
    }
`
function Historicos() {
    const [historicoTemperatura, setHistoricoTemperatura] = useState([])
    const [historicoLuminosidade, setHistoricoLuminosidade] = useState([])
    const [historicoUmidade, setHistoricoUmidade] = useState([])
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
        <>
            <Header />
            <Main>
                <section className="sectionTitulo">
                    <h1>Históricos</h1>
                </section>
                <div>
                    <div>
                        <h1>Luminosidade</h1>
                        <LineChart
                            width={1100}
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
                        <h1>Temperatura</h1>
                        <LineChart
                            width={1100}
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
                        <h1>Umidade</h1>
                        <LineChart
                            width={1100}
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
                </div>
            </Main>
        </>
    )
}
export default Historicos