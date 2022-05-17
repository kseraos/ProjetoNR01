import React, { useState, useEffect } from 'react'
// import Select from 'react-select'
import App from '../../../Layout/App'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import './CadastroUsuario.css'
import Axios from 'axios'
import qs from 'qs'
import Camera from '../../../components/imgs/camera_icon.svg'

function Update(){
  //Busca dados do Formulário
  const [inputs, setInputs] = useState({});

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
        method: 'put',
        url: 'http://192.168.1.33:3030/api/cadastro/usuario/'+data.id,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
      };
      Axios(config)
      .then(function (response) {
        alert("Usuário")
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
  <App>
    <div className='container-register'>

    <h1 className='container-title-regiter'>Atualizar Cadastra do Usuário</h1>
    <div>
    <div className='filtro-register'>
        <div className=' filtro dados-usuarios'>
          <ol className='filtro-ol'>

          <span className='span-filtro'>1</span><li className="filtro-um">Dados do Usuário</li>
          <span className='span-filtro'>2</span><li className="filtro-dois">Integrações</li>
          <span className='span-filtro'>3</span><li className="filtro-tres">Preferência de Dados</li>
         </ol>
        </div>
    </div>

  </div>
      <Formik initialValues={{}}
        //  validationSchema={validationsCadastro}
        onSubmit={handleClickButton}>

        <Form className='cadastro-form-group-register'>
          <div className='cadastro-form-group-conteudo-register'>
          <div className='cadastro-form-group-div-regiter'>
            <Field name="nome" className="form-field-regiter" value={data.nome}  autoComplete="off" onChange={handleChange}/>
            <label className='label-register'>Nome</label>
            <ErrorMessage component="span" name="nome" className="form-erro"/>
          </div>

          <div className='cadastro-form-group-div-regiter'>
            <Field name="email" className="form-field-regiter"  autoComplete="off" onChange={handleChange}/>
            <label className='label-register'>Email</label>
            <ErrorMessage component="span" name="email" className="form-erro"/>
          </div>

          <div className='cadastro-form-group-div-regiter'>
            <Field name="tipo_id" className="form-field-regiter"  onChange={handleChange} autoComplete="off"/>
            <label className='label-register'>Tipo acesso</label>
            <ErrorMessage component="span" name="tipo_id" className="form-erro"/>
          </div>


          <div className='cadastro-form-group-div-regiter'>
            <Field name="senha" type="password" className="form-field-regiter"  onChange={handleChange}  autoComplete="off"/>
            <label className='label-register'> Senha</label>
            <ErrorMessage component="span" name="senha" className="form-erro"/>
          </div>
          <div className='cadastro-form-group-div-regiter'>
            <Field name="confirm_password" type="password" className="form-field-regiter"  onChange={handleChange}  autoComplete="off"/>
            <label className='label-register'>Confirmar Senha</label>
            <ErrorMessage component="span" name="confirm_password" className="form-erro"/>
          </div>
          <div className='cadastro-form-group-div-regiter camera-container'>
          <div className='avatar-div'>
          <label htmlFor='avatar'><img className='camera' src={Camera} alt="foto"/></label>
            <Field name="avatar" className="avatar" id="avatar"type="file"/>
            </div>
            <p className='p-camera'>Foto</p>
          </div>
          <div className='cadastro-form-group-div-regiter'>
          <button className="button-cadastro" type="submit">
            Atualizar
          </button>
          </div>
          </div>


        </Form>
      </Formik>
    </div>
  </App>
)
}
export default Update;