import styled from 'styled-components';
import { Link } from 'react-router-dom';
const HeaderStyled = styled.header`
    display:flex;
    justify-content:center;
    background-color:#404040;
    div{
        display:flex;
        width:50%;
        justify-content:space-between;
        h1{
            padding:1em;
            color:white;
        }
        ul{
            display:flex;
            align-items:center;
            list-style:none;
            li{
                padding:1em;
                margin:0.5em;
                border-radius:10px;
                &:hover{
                    background-color:lightblue;
                }
                a{
                    color:white;
                    text-decoration:none;
                }
            }
        }
    }
`
function Header(){
    return(
        <HeaderStyled>
            <div>
                <h1>Vinheria Agnello</h1>
                <ul>
                    <li><Link to={"/"}>Home</Link></li>
                    <li><Link to={"historico"}>Históricos</Link></li>
                </ul>
            </div>
        </HeaderStyled>
    )
}
export default Header