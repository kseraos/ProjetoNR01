import React, { useState, useEffect } from 'react';
import App from '../../../Layout/App'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Button } from 'semantic-ui-react'
import * as yup from 'yup'
import axios from 'axios';
import './CadastroUsuario.css'
import Axios from 'axios';
import qs from 'qs';
import Camera from '../../../components/imgs/camera_icon.svg'

function CadastroUsuario({idModalCadastro = 'modal', onClose=()=>{}}){

  const handleOutsideClick = (e) => {
    if(e.target.id === idModalCadastro) onClose();
  }

  const [APIData, setAPIData] = useState([]);
  const [APITipo, setAPITipo] = useState([]);
  const [APICom, setAPICom] = useState([]);
  const [inputs, setInputs] = useState({});
  const [avatar, setImage] = useState('')
  const [endImg] = useState({Camera});


  useEffect(() => {
    axios.get('http://192.168.1.33:3030/api/cadastro/tipos')
        .then(function (response) {
            console.log(response.data.result)
            setAPITipo(response.data.result)
        })
}, []);

useEffect(() => {
  axios.get('http://192.168.1.33:3030/api/cadastro/comissoes')
      .then(function (response) {
          console.log(response.data.result)
          setAPICom(response.data.result)
      })
}, []);


  const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
  }

  const handleClickButton = () =>{
      var data = qs.stringify({
        'nome': inputs.nome,
        'senha': inputs.senha,
        'email': inputs.email,
        'comissao_id': inputs.comissao_id,
        'tipo_id': inputs.tipo_id,
      });
      var config = {
        method: 'post',
        url: 'http://192.168.1.33:3030/api/cadastro/usuario',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
      };
      Axios(config)
      .then(function (response) {
        alert("Usuário Cadastrado")
        window.location.href = ('/cadastrousuarioview');
        console.log(JSON.stringify(response.data));

      })
      .catch(function (error) {
        console.log(error);
      });


  }
  const validationsCadastro  = yup.object().shape({
    nome: yup.string().min(8, 'campo inválido').required('O nome é obrigatório'),
    email: yup.string().email('Email inválido').required('O email é obrigatório'),
    senha: yup.string().required("A senha é obrigatória").matches(/[a-zA-Z]/, 'Use apenas letras.'),
    confirm_password: yup.string().oneOf([yup.ref("senha"), null], "As senhas não sao iguais"),
    tipo_id: yup.string().min(8, 'campo inválido').required('O tipo é obrigatório'),
  });

    return (

    <div id = {idModalCadastro} className='container-register' onClick={handleOutsideClick}>
    <button className='close-cadastro' onClick={onClose}></button>
      <Formik initialValues={{}}
        // validationSchema={validationsCadastro}
        onSubmit={handleClickButton}
        >

        <Form className='cadastro-form-group-register'>

        <h1 className='container-title-regiter'>Cadastro de Usuário</h1>
        <div>
        <div className='filtro-register'>
            <div className=' filtro dados-usuarios'>
             <ol className='filtro-ol'>

              <span className='span-filtro-um'>1</span><li ><button className="filtro-um">Dados do Usuário</button></li>
              <span className='span-filtro'>2</span><li className="filtro-dois">Integrações</li>
              <span className='span-filtro'>3</span><li className="filtro-tres">Preferência de Dados</li>
            </ol>
            </div>
       </div>

    </div>



          <div className='cadastro-form-group-conteudo-register'>
          <div className='cadastro-form-group-div-regiter'>
            <Field name="nome" className="form-field-regiter" autoComplete="off" onChange={handleChange} required/>
            <label className='label-register'>Nome</label>
            <ErrorMessage component="span" name="nome" className="form-erro"/>
          </div>

          <div className='cadastro-form-group-div-regiter'>
            <Field name="email" className="form-field-regiter" autoComplete="off"onChange={handleChange} required />
            <label className='label-register'>Email</label>
            <ErrorMessage component="span" name="email" className="form-erro"/>
          </div>

          <div className='cadastro-form-group-div-regiter'>
            <select name="tipo_id" className="form-field-regiter" autoComplete="off" onChange={handleChange}>
              <option value="0">Selecione um tipo</option>
            {APITipo.map((data) => {

                  return(

                    <option value ={data.id}>{data.nome}</option>

                    )
               })}
              </select>
            <ErrorMessage component="span" name="tipo_id" className="form-erro"/>
          </div>

          <div className='cadastro-form-group-div-regiter'>
            <select name="comissao_id" className="form-field-regiter" onChange={handleChange}>
            <option value="0">Selecione a comissão</option>
            {APICom.map((data) => {

                return(

                  <option value ={data.value}>{data.label}</option>

                )
              })}
            </select>
            <ErrorMessage component="span" name="comissao_id" className="form-erro"/>
          </div>


          <div className='cadastro-form-group-div-regiter'>
            <Field name="senha" type="password" className="form-field-regiter"  autoComplete="off"  onChange={handleChange} required/>
            <label className='label-register'> Senha</label>
            <ErrorMessage component="span" name="senha" className="form-erro"/>
          </div>
          <div className='cadastro-form-group-div-regiter'>
            <Field name="confirm_password" type="password" className="form-field-regiter"  autoComplete="off" required/>
            <label className='label-register'>Confirmar Senha</label>
            <ErrorMessage component="span" name="confirm_password" className="form-erro"/>
          </div>
          <div className='cadastro-form-group-div-regiter camera-container-cadastro'>
          <div className='avatar-div'>
          <Field name="avatar" className="avatar" id="avatar"type="file" onChange={e => setImage(e.target.files[0])}/>
          <label htmlFor='avatar'> {avatar ? <img className='avatar-usuario' src={URL.createObjectURL(avatar)} width='95' height='95'  alt='teste'/>: <img className='camera' src={Camera}/>}</label>

            </div>
            <p className='p-camera'>Foto</p>
          </div>
          <div className='cadastro-form-group-div-regiter'>
          <Button className="button-cadastro" type="submit">
            Cadastrar
          </Button>
          </div>
          </div>


        </Form>
      </Formik>
    </div>

    )
}

export default CadastroUsuario;