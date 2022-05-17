import React, { useState, useEffect } from 'react';
import App from '../../../Layout/App'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Button } from 'semantic-ui-react'
import * as yup from 'yup'
import Axios from 'axios'
import axios from 'axios';
import './Update.css'
import Camera from '../../../components/imgs/camera_icon.svg'
import qs from 'qs'




export default function UpdateUsuario({idModal = 'modal', onClose=()=>{}}) {

  const handleOutsideClick = (e) => {
    if(e.target.id === idModal) onClose();
  }

  const [APITipo, setAPITipo] = useState([]);
    const [id, setID] = useState(null);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [tipo_id, setTipo] = useState('');
    const [comissao_id, setComissao] = useState('');
    const [APICom, setAPICom] = useState([]);
    const [APIData, setAPIData] = useState([]);

    useEffect(() => {
      axios.get('http://192.168.1.33:3030/api/cadastro/tipos')
          .then(function (response) {
              setAPITipo(response.data.result)
          })
  }, []);

  useEffect(() => {
    axios.get('http://192.168.1.33:3030/api/cadastro/comissoes')
        .then(function (response) {
            setAPICom(response.data.result)
        })
  }, []);

    useEffect(() => {
        setID(localStorage.getItem('ID'))
        setNome(localStorage.getItem('Nome'));
        setEmail(localStorage.getItem('Email'));
        setSenha(localStorage.getItem('Senha'));
        setTipo(localStorage.getItem('Tipo de acesso'));
        setComissao(localStorage.getItem('Comissao'));

    }, []);


    const updateAPIData = () => {

      var data = qs.stringify({
        'nome': nome,
        'senha': senha,
        'email': email,
        'comissao_id': comissao_id,
        'tipo_id': tipo_id,
      });



      var config = {
        method: 'put',
        url: 'http://192.168.1.33:3030/api/cadastro/usuario/'+id,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
      };
      Axios(config)
      .then(function (response) {
        alert("Usuário Atualizado")
        window.location.href = ('/cadastrousuarioview');
        console.log(JSON.stringify(response.data));

      })
      .catch(function (error) {
        console.log(error);
      });
    }
    const getData = () => {
      axios.get('http://192.168.1.33:3030/api/cadastro/usuario')
          .then((getData) => {
              setAPIData(getData.data);
          })
  }

  const onDelete = (id) => {
      axios.put(`http://192.168.1.33:3030/api/cadastro/usuario_excluir/${id}`)
      .then(() => {
          getData();
          alert("Excluído com sucesso!!");
          window.location.href = ('/cadastrousuarioview');
      })
  };




    return (

    <div id = {idModal} className='container-register-update' onClick={handleOutsideClick}>
    <button className='close' onClick={onClose}></button>
      <Formik initialValues={{}}
        //  validationSchema={validationsCadastro}
        onSubmit={updateAPIData}
        >

        <Form className='cadastro-form-group-register-update'>

          <div className='cadastro-form-group-conteudo-register-update'>

          <div className='cadastro-form-group-div-regiter-update register-nome'>
            <Field name="nome" className="form-field-regiter-update" autoComplete="off"  value={nome} onChange={(e)=>setNome(e.target.value)} required/>
            <label className='label-register-update'>Nome</label>
            <ErrorMessage component="span" name="nome" className="form-erro"/>
          </div>

          <div className='cadastro-form-group-div-regiter-update  register-nome'>
            <Field name="email" className="form-field-regiter-update" autoComplete="off" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
            <label className='label-register-update'>Email</label>
            <ErrorMessage component="span" name="email" className="form-erro"/>
          </div>

          <div className='cadastro-form-group-div-regiter-update'>
            <select name="comissao_id" className="form-field-regiter-update" value={comissao_id} onChange={(e) => setComissao(e.target.value)} >
            <option value="0">Selecione a comissão</option>
            {APICom.map((data) => {

                return(

                  <option value ={data.value}>{data.label}</option>

                )
              })}
            </select>
            <ErrorMessage component="span" name="comissao_id" className="form-erro"/>
          </div>

          <div className='cadastro-form-group-div-regiter-update'>
            <select name="tipo_id" className="form-field-regiter-update" value={tipo_id} onChange={(e) => setTipo(e.target.value)}>
              <option value="0">Selecione um tipo</option>
            {APITipo.map((data) => {

                  return(

                    <option value ={data.id}>{data.nome}</option>

                    )
               })}
              </select>
            <ErrorMessage component="span" name="tipo_id" className="form-erro"/>
          </div>


          <div className='cadastro-form-group-div-regiter-update'>
            <Field name="senha" type="password" className="form-field-regiter-update"  autoComplete="off" onChange={(e) => setSenha(e.target.value)} required/>
            <label className='label-register-update'> Senha</label>
            <ErrorMessage component="span" name="senha" className="form-erro"/>
          </div>
          <div className='cadastro-form-group-div-regiter-update'>
            <Field name="confirm_password" type="password" className="form-field-regiter-update"  autoComplete="off" required/>
            <label className='label-register-update'>Confirmar Senha</label>
            <ErrorMessage component="span" name="confirm_password" className="form-erro"/>
          </div>
          <div className='cadastro-form-group-div-regiter-update camera-container'>
          <div className='avatar-div'>
          <label htmlFor='avatar'><img className='camera' src={Camera} alt="foto"/></label>
            <Field name="avatar" className="avatar" id="avatar"type="file"/>
            </div>
            <p className='p-camera'>Foto</p>
          </div>
          <div className='cadastro-form-group-div-regiter-update update-vazio'>
          </div>
          <div className='cadastro-form-group-div-regiter-update butao-update'>

                  <Button className='update-button' onClick={() => onDelete(id)}>Apagar</Button>
                  <Button className="button-cadastro-update" type="submit">Salvar</Button>
          </div>
          </div>


        </Form>
      </Formik>
    </div>

    )
}
