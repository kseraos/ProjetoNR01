import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PaginationComponents from '../TipoUsuario/PaginationSelect'
import PaginationSelect from '../TipoUsuario/PaginationComponents'
import { Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import App from '../../../Layout/App'
import './../Usuario/CadastroView/CadastroUsuarioView.css'
import Update from '../../../components/imgs/lapis.svg'
import Delete from '../../../components/imgs/delete.svg'


export default function CadastrotipousuarioView() {

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
        axios.get('http://192.168.1.33:3030/api/cadastro/tipos')
            .then(function (response) {

                setAPIData(response.data.result)
            })
    }, []);


    const setData = (data) => {
        let { id, nome} = data;
        localStorage.setItem('ID', id);
        localStorage.setItem('Nome', nome);

    }



    const getData = () => {
        axios.get('http://192.168.1.33:3030/api/cadastro/tipos')
            .then((getData) => {
                setAPIData(getData.data);
            })
    }

    const onDelete = (id) => {
        axios.put(`http://192.168.1.33:3030/api/cadastro/tipo_excluir/${id}`)
        .then(() => {
            getData();
            alert("Excluído com sucesso!!");
            window.location.href = ('/cadastrotipousuarioview');
        })
    };


    return (
        <App>
        <div className='container-register-view'>
           <div className='container-cabecalho'>
                <h1 className='container-title-regiter-view'>Tipos de Acesso</h1>
                <Link className='button-cadastrar' to="/cadastrotipousuario">
                <span className='texto-cadastrar'>Cadastrar</span>
                <span className='texto-cadastrar-celular'>+</span>

               </Link>

           </div>

           <div>
           <Table singleLine className='table-view'>
               <Table.Header>
                   <Table.Row className='cabecalho-view-index'>
                       <Table.HeaderCell className='cabecalho-view cabecalho-view-nome'>Nome</Table.HeaderCell>
                       <Table.HeaderCell className='cabecalho-view'>Status</Table.HeaderCell>
                       <Table.HeaderCell className='cabecalho-view cabecalho-view-pontos'> ...</Table.HeaderCell>
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
                            <Table.Cell className='dados-nome'>{data.nome}</Table.Cell>
                            <Table.Cell><span className='dados-status' >{status}</span></Table.Cell>

                                <Table.Cell>
                               <Link to="/updatetipousuario"> <Button className='update-button' onClick={() => setData(data)} ><img className='update-img' src={Update} alt="atualizar"/></Button></Link>
                                <Button className='update-button' onClick={() => onDelete(data.id)}><img className='update-img' src={Delete} alt="atualizar"/></Button>
                                <Button className='update-button'> ... </Button>
                                </Table.Cell>
                    </Table.Row>
               )
               })}

               </Table.Body>
           </Table>
            <PaginationSelect itensPages ={itensPages} setItensPages={setItensPages} />
           <PaginationComponents pages={pages} setCurrentPage={setCurrentPage}/>
       </div>
       </div>
    </App>
    )
            }

