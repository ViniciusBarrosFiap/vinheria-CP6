const express = require("express")
const axios = require("axios")
const cors = require("cors")
const app = express()

app.use(cors())
app.get("/api/dados", async (req, res)=>{
    try{
        const response = await axios.get('http://46.17.108.113:1026/v2/entities/urn:ngsi-ld:Vinheria',{
            headers: {
                "accept": "application/json",
                'fiware-service': 'smart',
                'fiware-servicepath': '/'
              }
        })
        res.json(response.data)
    }catch(error){
        console.log(error)
        res.status(500).send('Erro ao obter os dados do servidor remoto.');
    }
})
app.get("/api/historico/temperatura", async (req, res)=>{
    try{
        const response = await axios.get('http://46.17.108.113:8666/STH/v1/contextEntities/type/iot/id/urn:ngsi-ld:Vinheria/attributes/temperatura?lastN=50',{
            headers: {
                "accept": "application/json",
                'fiware-service': 'smart',
                'fiware-servicepath': '/'
              }

        })
        res.json(response.data.contextResponses[0].contextElement.attributes[0].values)
    }catch(error){
        console.log(error)
        res.status(500).send('Erro ao obter os dados do servidor remoto.');
    }
})
app.get("/api/historico/luminosidade", async (req, res)=>{
    try{
        const response = await axios.get('http://46.17.108.113:8666/STH/v1/contextEntities/type/iot/id/urn:ngsi-ld:Vinheria/attributes/luminosidade?lastN=50',{
            headers: {
                "accept": "application/json",
                'fiware-service': 'smart',
                'fiware-servicepath': '/'
              }

        })
        res.json(response.data.contextResponses[0].contextElement.attributes[0].values)
    }catch(error){
        console.log(error)
        res.status(500).send('Erro ao obter os dados do servidor remoto.');
    }
})
app.get("/api/historico/umidade", async (req, res)=>{
    try{
        const response = await axios.get('http://46.17.108.113:8666/STH/v1/contextEntities/type/iot/id/urn:ngsi-ld:Vinheria/attributes/umidade?lastN=50',{
            headers: {
                "accept": "application/json",
                'fiware-service': 'smart',
                'fiware-servicepath': '/'
              }

        })
        res.json(response.data.contextResponses[0].contextElement.attributes[0].values)
    }catch(error){
        console.log(error)
        res.status(500).send('Erro ao obter os dados do servidor remoto.');
    }
})

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor proxy em execução na porta ${port}`);
});