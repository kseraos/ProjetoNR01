import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PaginationComponents from './PaginationComponents'
import PaginationSelect from './PaginationSelect'
import { Table} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import App from '../../../../Layout/App';
import './CadastroUsuarioView.css'
import CadastroModal from '../CadastroUsuario'
import UpdateUsuario from '../UpdateUsuario'



export default function CadastroUsuarioView() {

    const [isModalVisibleCadastro, setIsModalVisibleCadastro ] = useState(false);
    const [isModalVisibleUpdate, setIsModalVisibleUpdate ] = useState(false);
    const [APIData, setAPIData] = useState([]);
    const [itensPages, setItensPages] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);

    const pages = Math.ceil(APIData.length / itensPages);
    const startIndex = currentPage * itensPages;
    const endIndex = startIndex + itensPages;
    const currentItens = APIData.slice(startIndex, endIndex);

    useEffect(() =>{
        setCurrentPage(0)
    }, [itensPages])


    useEffect(() => {
        axios.get('http://192.168.1.33:3030/api/cadastro/usuarios')
            .then(function (response) {
                setAPIData(response.data.result)
            })
    }, []);


    const setData = (data) => {
        let { id, nome, email, senha, tipo_id, comissao_id } = data;
        localStorage.setItem('ID', id);
        localStorage.setItem('Nome', nome);
        localStorage.setItem('Email', email);
        localStorage.setItem('Senha', senha);
        localStorage.setItem('Tipo de acesso', tipo_id);
        localStorage.setItem('Comissao', comissao_id);
    }

    return (
        <App>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
        <div className='container-register-view'>
           <div className='container-cabecalho'>
                <div className='container-title-regiter-view'>
                    <Link  to="/usuario"> Usuários » </Link>
                    <span> <b>Dados de Usuários</b></span>
                 </div>

                <div className='texto-cadastrar button-cadastrar' onClick ={()=>setIsModalVisibleCadastro(true)} >Cadastrar</div>
                <span onClick ={()=>setIsModalVisibleCadastro(true)}  className='texto-cadastrar-celular button-cadastrar'>+</span>
                {isModalVisibleCadastro ? <CadastroModal onClose={()=>setIsModalVisibleCadastro(false)} /> : null }

           </div>

           <div>
           <Table  className='table-view' celled>
               <Table.Header>
                   <Table.Row className='cabecalho-view-index'>

                       <Table.HeaderCell className='cabecalho-view cabecalho-view-nome'  title="Atualizar Usuario" >Nome</Table.HeaderCell>
                       <Table.HeaderCell className='cabecalho-view'>Status</Table.HeaderCell>

                   </Table.Row>

               </Table.Header>

               <Table.Body>


               {currentItens.map((data) => {
                    if(data.ativo == 1){
                        var status = "Ativo";
                    }else {
                        var status = "Inativo"
                    }
                   return (
                    <Table.Row>
                          <Table.Cell className='dados-nome' onClick ={()=>setIsModalVisibleUpdate(true)} >{data.nome}</Table.Cell>
                                 {isModalVisibleUpdate ? <UpdateUsuario onClose={()=>setIsModalVisibleUpdate(false)} /> : null }
                         <Table.Cell className='dados-status-tam'><span className='dados-status' >{status}</span></Table.Cell>
                    </Table.Row>
               )
               })}

<Link to="/updateusuario"> <Table.Cell className='dados-nome' onClick={() => setData(data)}>{data.nome}</Table.Cell> </Link>

               </Table.Body>
           </Table>

            <PaginationSelect itensPages ={itensPages} setItensPages={setItensPages} />

           <PaginationComponents pages={pages} setCurrentPage={setCurrentPage}/>
       </div>
       </div>
    </App>
    )
            }

