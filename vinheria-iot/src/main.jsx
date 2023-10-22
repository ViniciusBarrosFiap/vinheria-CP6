/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/Home.jsx'
import {createGlobalStyle} from 'styled-components'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Historicos from './routes/Historicos.jsx';
const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;600&family=Poppins:wght@300&display=swap');  
*{
    padding:0;
    margin:0;
    box-sizing:border-box;
    font-family:'Inter', sans-serif;
  }
  body{
    background-color:#202020;
  }
`

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle/>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}></Route>
        <Route path='/historico' element={<Historicos/>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
